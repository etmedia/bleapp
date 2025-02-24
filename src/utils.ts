export function hexStringToVisibleString(hexString: string): string {
    // 检查输入是否为有效的十六进制字符串
    if (!/^[\da-fA-F]+$/.test(hexString) || hexString.length % 2 !== 0) {
        throw new Error("Invalid hex string")
    }

    let visibleString = ''
    for (let i = 0; i < hexString.length; i += 2) {
        // 将每两个字符的十六进制值转换为十进制
        const hexPair = hexString.substr(i, 2);
        const charCode = parseInt(hexPair, 16);
        // 将十进制值转换为对应的字符
        visibleString += String.fromCharCode(charCode);
    }
    return visibleString;
}

export function OctStringToIPString(octString: string): string {
    if (octString.length !== 8) {
        throw new Error('Invalid octet string length');
    }

    // 将每两个字符转换为一个字节（十六进制）
    const bytes = [];
    for (let i = 0; i < octString.length; i += 2) {
        const byte = parseInt(octString.substring(i, i + 2), 16);
        bytes.push(byte);
    }

    // 将字节数组转换为 IP 地址字符串
    const ipString = bytes.join('.');
    return ipString;
}

export function EnumToIPMode(enumdata: number): string {
    if (enumdata == 0) {
        return "DHCP";
    }
    else if (enumdata == 1) {
        return "DHCP";
    }
    else
    {
        return "PPPOE";
    }
}

export function EnumToWorkMode(enumdata: number): string {
    if (enumdata == 0)
    {
        return "混合模式";
    }
    else if (enumdata == 1)
    {
        return "客户机模式";
    }
    else
    {
        return "服务器模式";
    }
}

export function ArrayNumber(arraydata: any): string {
    let data:string = ""
    if(Array.isArray(arraydata))
    {
        for (let i = 0; i < arraydata.length; i++) {
            data += hexStringToNum(arraydata[i].long_unsigned)+ ","
        }
    }
    else
    {
        throw new Error('Invalid Array');
    }
    //去除data最后的,
    data = data.substring(0,data.length-1)
    return data
}

export function hexStringToNum(data: any): number {
    let num = parseInt(data, 16)
    return num
}

export function OctStringToMacString(octString: string): string {
    if (octString.length !== 12) {
        throw new Error('Invalid octet string length');
    }

    // 将每两个字符转换为一个字节（十六进制）
    const bytes = [];
    for (let i = 0; i < octString.length; i += 2) {
        const byte = octString.substring(i, i + 2);
        bytes.push(byte);
    }

    // 将字节数组转换为 MAC 地址字符串，字母大写
    const macAddress = bytes.map(byte => {
        const hexString = byte.toString().padStart(2, '0').toUpperCase();
        return hexString;
    }).join(':');
    return macAddress;
}

export function OctStringToDateTime(octString: string): string {
    if (octString.length !== 14) {
        throw new Error('Invalid octet string length')
    }

    // 将每两个字符转换为一个字节（十六进制）
    const bytes = [];
    for (let i = 0; i < octString.length; i += 2) {
        const byte = parseInt(octString.substring(i, i + 2), 16)
        bytes.push(byte)
    }

    // 将字节数组转换为日期时间字符串
    const year = bytes[0] * 256 + bytes[1]
    const month = bytes[2]
    const day = bytes[3]
    const hour = bytes[4]
    const minute = bytes[5]
    const second = bytes[6]

    const dateTimeString = `${year}-${month}-${day} ${hour}:${minute}:${second}`
    return dateTimeString
}
