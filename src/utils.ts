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