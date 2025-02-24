import { ref } from 'vue';

export function bufferToHexString(array: Uint8Array) {
    return Array.from(new Uint8Array(array))
        .map((x) => x.toString(16).padStart(2, "0"))
        .join("")
        .toUpperCase();
}

export type Callback = (err: Error | null, result: string) => void

type ErrorWithMessage = {
    message: string
}

function isErrorWithMessage(error: unknown): error is ErrorWithMessage {
    return (
        typeof error === 'object' &&
        error !== null &&
        'message' in error &&
        typeof (error as Record<string, unknown>).message === 'string'
    )
}

function toErrorWithMessage(maybeError: unknown): ErrorWithMessage {
    if (isErrorWithMessage(maybeError)) return maybeError

    try {
        return new Error(JSON.stringify(maybeError))
    } catch {
        // fallback in case there's an error stringifying the maybeError
        // like with circular references for example.
        return new Error(String(maybeError))
    }
}
interface ChunkReadResult {
    chunk: ArrayBuffer;
    currentPosition: number;
    done: boolean;
}
class FileChunkReader {
    private file: File;
    private chunkSize: number;
    private currentPosition: number;
    
    constructor(file: File, chunkSize: number = 256) { // 默认256字节
        this.file = file;
        this.chunkSize = chunkSize;
        this.currentPosition = 0;
    }
    
    async readNextChunk(): Promise<ChunkReadResult> {
        const chunk = this.file.slice(
            this.currentPosition,
            this.currentPosition + this.chunkSize
        );
    
        const arrayBuffer = await chunk.arrayBuffer();
        const done = this.currentPosition + this.chunkSize >= this.file.size;
        
        this.currentPosition += arrayBuffer.byteLength;
    
        return {
            chunk: arrayBuffer,
            currentPosition: this.currentPosition,
            done
        };
    }
    
    getProgress(): number {
        return Math.floor((this.currentPosition / this.file.size) * 100);
    }
    
    reset(): void {
        this.currentPosition = 0;
    }
}

export function makePayload (datastr: String) : Uint8Array {
    const text = datastr
    const cleanedText = text.replace(/\s+/g, '')
    const uint8Array = new Uint8Array(cleanedText.length / 2)
    for (let i = 0; i < cleanedText.length; i += 2) {
        uint8Array[i / 2] = parseInt(cleanedText.substr(i, 2), 16)
    }
    return uint8Array
}

export function getErrorMessage(error: unknown) {
    return toErrorWithMessage(error).message
}

export const globalObject = {
    bluetoothDevice: null as BluetoothDevice | null,
    Characteristic: null as BluetoothRemoteGATTCharacteristic | null,
    CharacteristicRx: null as BluetoothRemoteGATTCharacteristic | null,
    connectedDeviceName: ref(''),
    isStarted: ref(false),
    pendingStartEpilogue: 0, // workaround for determining new firmware, see handleRxdNotifications
    pendingTimeoutMessage: 0, // if we don't get a response in time, we should show an error message
    returnData: ref(''), // data returned from the device
    termaddress: ref(''),
    errorInfo: ref(''),
    handleData: null as Callback | null,

    handleRxdNotifications: (event: Event) => {
        const target = event.target as any
        if (target && target.value)
        {
            console.log(`Notification received: ${target.value}`)
            const hexString = bufferToHexString(target.value.buffer)
            globalObject.returnData.value = hexString
            if (globalObject.handleData) {
                globalObject.handleData(null, hexString);
            } else {
                console.error('handleData is null or undefined');
            }
        } else {
            console.error('Notification received but target or target.value is undefined');
        }
    },

    // setupTimeoutMessage: () => {
    //     if (!pendingTimeoutMessage) {
    //         pendingTimeoutMessage = setTimeout(() => {
    //         handleBluetoothError("WATERCTL INTERNAL Operation timed out");
    //         }, 15000);
    //     }
    // },
    

    handleBluetoothError: (error: unknown) => {
        if (!error) throw error
        const e = error.toString()
        if(e === "NotFoundError: User cancelled the requestDevice() chooser.")
        {
            console.log(`Bluetooth error: ${e}`)
        }
        else
        {
            alert(`error: ${e}`)
        }
    },

    start: async function() {
        try {
            this.bluetoothDevice = await navigator.bluetooth.requestDevice({
                acceptAllDevices: true,
                // https://github.com/WebBluetoothCG/web-bluetooth/issues/234
                optionalServices: ['6e400001-b5a3-f393-e0a9-e50e24dc4179', window.navigator.userAgent.match(/Bluefy/) ? "generic_access" : 0xFFE0], // workaround for Bluefy
            })
            console.log(this.bluetoothDevice)            
            const server = await this.bluetoothDevice.gatt!.connect()
            console.log(server)
            const services = await server.getPrimaryServices();
            if(services.length == 0){
                throw new Error('No services found')
            }
            const service = services[0]
            const Characteristics = await service.getCharacteristics()
            if(Characteristics.length == 0)
            {
                throw new Error('No characteristics found')
            }
            if(Characteristics.length == 1)
            {
                this.Characteristic = Characteristics[0]
                this.CharacteristicRx = Characteristics[0]
            }
            else
            {
                this.Characteristic = Characteristics[0]
                this.CharacteristicRx = Characteristics[1]
            }
            await this.CharacteristicRx.startNotifications()
            this.CharacteristicRx.addEventListener("characteristicvaluechanged", this.handleRxdNotifications)
            this.isStarted.value = true
            this.connectedDeviceName.value = this.bluetoothDevice.name!
            console.log(this.isStarted)
            // setupTimeoutMessage();
          } catch (error) {
            this.isStarted.value = false;
            this.handleBluetoothError(error);
          }        
    },

    stop:  async function() {
        try {
            if (this.bluetoothDevice)
            {
                this.bluetoothDevice.gatt!.disconnect()
            }
        } catch (error) {
            this.isStarted.value = false;
            this.handleBluetoothError(error);
        }
        this.isStarted.value = false
        this.connectedDeviceName.value = ''
        this.returnData.value = ''
        this.termaddress.value = ''
    },

    send: async function(payload: Uint8Array, callback: Callback) {
        this.handleData = callback
        globalObject.returnData.value = ''
        try {
            if (this.Characteristic) {
                await this.Characteristic.writeValue(payload)
                console.log("send", payload)
            }
        } catch (error) {
            this.isStarted.value = false;
            this.handleBluetoothError(error);
        }   
    },

    updateUi: (status: string) => {
        console.log(`UI status: ${status}`);
    },

    processChunk: async function (chunk: ArrayBuffer): Promise<void> {
        try {
            // 模拟处理分块数据
            console.log(`Processing chunk of size: ${chunk.byteLength} bytes`);

            // 在这里添加处理逻辑，例如发送到服务器或写入文件
            // await sendChunkToServer(chunk);
            // await writeChunkToFile(chunk);
            //循环发送文件传输帧并接收返回，重试3次。

            // 模拟异步操作的延迟
            await new Promise(resolve => setTimeout(resolve, 100));

            console.log('Chunk processed successfully');
        } catch (error) {
            console.error('Error processing chunk:', error);
            throw error;
        }
    },

    sendAndReceiveMessage: async function(payload: Uint8Array, timeout: number = 5000): Promise<Uint8Array> {
        return new Promise((resolve, reject) => {
            const startTime = Date.now()

            const timeoutId = setTimeout(() => {
                reject(new Error('Message receive timeout'))
            }, timeout)
    
            // 接收消息的函数
            const receiveMessage = (err: Error | null, result: string) => {
                // 模拟接收到的消息
                clearTimeout(timeoutId)
                resolve(makePayload(result))
            };

            console.log(`Sending message : ${payload}`)
            this.send(payload, receiveMessage)
        });
    },

    //固件升级
    firmwareUpgrade: async function(chunkSize: number = 256 ) {
        // 创建文件选择元素
        const input = document.createElement('input');
        input.type = 'file';
        
        return new Promise<void>((resolve, reject) => {
            input.onchange = async (event) => {
                const target = event.target as HTMLInputElement;
                if (!target.files || target.files.length === 0) {
                    reject(new Error('No file selected'));
                    return;
                }

                //发送初始化升级指令并接收返回
                // await sendInitCommand();
                

                const file = target.files[0];
                const reader = new FileChunkReader(file, chunkSize);

                try {
                    // 读取所有分块
                    while (true) {
                        const { chunk, currentPosition, done } = await reader.readNextChunk();
                        
                        console.log(
                            `Read chunk: ${chunk.byteLength} bytes, ` +
                            `Position: ${currentPosition}, ` +
                            `Progress: ${reader.getProgress()}%`
                        );

                        // 在这里处理chunk数据
                        // 例如: await processChunk(chunk);
                        await this.processChunk(chunk);
                        
                        if (done) break;
                    }
                    
                    resolve();
                } catch (error) {
                    reject(error);
                }
            };

            // 触发文件选择对话框
            input.click();
        });
    }
};