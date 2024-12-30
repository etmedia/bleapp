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

export function makePayload (datastr: String) {
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
        console.log(`Bluetooth error: ${e}`)
        alert(`error: ${e}`)
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
};