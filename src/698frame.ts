import {Ts698} from "ts698/dl698/index";

function gen_GetTermAddress() : string {
    let framedata : string = ''
    Ts698.buildFrame({
        link_option: {
            client_address: "00",//客户机地址
            server_address: "AAAAAAAAAAAA",//服务器地址
        },
        request_option: {
            time_tag: false,//时间标签，true代表有时间标签，false代表没有
            request_mode: 5,//请求类型，5代表Get-Request
            request: {
                index: 1 ,//1代表GetRequestNormal数据类型
                get_option: {
                    piid: "05",
                    oad:"40010200"
                }
            },
            isBroadCast: true   //广播地址
        },
        success(res){
            console.log(res.resultCode);
            console.log(res.msg);
            if(res.resultCode == 0)
            {
                framedata = res.msg.valueOf()
            }
        },
        error(res){
            console.log(res.resultCode);
            console.log(res.msg);
        }
    })
    return framedata
}

function gen_GetTermTime(addr : string) : string {
    let framedata : string = ''
    Ts698.buildFrame({
        link_option: {
            client_address: "00",//客户机地址
            server_address: addr,//服务器地址
        },
        request_option: {
            time_tag: false,//时间标签，true代表有时间标签，false代表没有
            request_mode: 5,//请求类型，5代表Get-Request
            request: {
                index: 1 ,//1代表GetRequestNormal数据类型
                get_option: {
                    piid: "05",
                    oad:"40000200"
                }
            }
        },
        success(res){
            console.log(res.resultCode);
            console.log(res.msg);
            if(res.resultCode == 0)
            {
                framedata = res.msg.valueOf()
            }
        },
        error(res){
            console.log(res.resultCode);
            console.log(res.msg);
        }
    })
    return framedata
}

function parser_GetTermAddress(framedata : string) : string {
    let retData : string = '解析异常'
    Ts698.parse({
        frame: framedata,
        result(res){
            console.log(res.msg);
            var jsonObject = JSON.parse(res.msg.toString());
            if(jsonObject.resultCode == 0)
            {
                if(jsonObject.result?.octet_string)
                {
                    retData = jsonObject.result.octet_string
                }
            }                    
        }
    })
    return retData
}

function gen_GetTermVersion(addr : string) : string {
    let framedata : string = ''
    Ts698.buildFrame({
        link_option: {
            client_address: "00",//客户机地址
            server_address: new String(addr),//服务器地址
        },
        request_option: {
            time_tag: false,//时间标签，true代表有时间标签，false代表没有
            request_mode: 5,//请求类型，5代表Get-Request
            request: {
                index: 1 ,//1代表GetRequestNormal数据类型
                get_option: {
                    piid: "05",
                    oad:"43000300"
                }
            }
        },
        success(res){
            console.log(res.resultCode);
            console.log(res.msg);
            if(res.resultCode == 0)
            {
                framedata = res.msg.valueOf()
            }
        },
        error(res){
            console.log(res.resultCode);
            console.log(res.msg);
        }
    })
    return framedata
}

function parser_GetTermTime(framedata : string) : string {
    let retData : string = '解析异常'
    Ts698.parse({
        frame: framedata,
        result(res){
            console.log(res.msg);
            var jsonObject = JSON.parse(res.msg.toString());
            if(jsonObject.resultCode == 0)
            {
                if(jsonObject.result?.octet_string)
                {
                    retData = jsonObject.result.octet_string
                }
            }                    
        }
    })
    return retData
}

function hexStringToVisibleString(hexString: string): string {
    // 检查输入是否为有效的十六进制字符串
    if (!/^[\da-fA-F]+$/.test(hexString) || hexString.length % 2 !== 0) {
        throw new Error("Invalid hex string");
    }

    let visibleString = '';
    for (let i = 0; i < hexString.length; i += 2) {
        // 将每两个字符的十六进制值转换为十进制
        const hexPair = hexString.substr(i, 2);
        const charCode = parseInt(hexPair, 16);
        // 将十进制值转换为对应的字符
        visibleString += String.fromCharCode(charCode);
    }
    return visibleString;
}

function parser_GetVersion(framedata : string) : string {
    let retData : string = '解析异常'
    Ts698.parse({
        frame: framedata,
        result(res){
            console.log(res.msg);
            var jsonObject = JSON.parse(res.msg.toString());
            if(jsonObject.resultCode == 0)
            {
                if(jsonObject.result && jsonObject.result.structure && Array.isArray(jsonObject.result.structure) && jsonObject.result.structure.length == 6)
                {
                    retData = ''
                    retData += "厂商代码：" + hexStringToVisibleString(jsonObject.result.structure[0].visible_string) + "\n"
                    retData += "软件版本号：" + hexStringToVisibleString(jsonObject.result.structure[1].visible_string) + "\n"
                    retData += "软件版本日期：" + hexStringToVisibleString(jsonObject.result.structure[2].visible_string) + "\n"
                    retData += "硬件版本号：" + hexStringToVisibleString(jsonObject.result.structure[3].visible_string) + "\n"
                    retData += "硬件版本日期：" + hexStringToVisibleString(jsonObject.result.structure[4].visible_string) + "\n"
                    retData += "厂商扩展信息：" + hexStringToVisibleString(jsonObject.result.structure[5].visible_string)
                }
            }                    
        }
    })
    return retData
}



export function buildFrame(action : string, data : string = '') : string {
    console.log(action)
    switch (action) {
        case 'address':
            return gen_GetTermAddress();
        case 'ip':
            return '查询终端IP'
        case 'ethernetMaster':
            return '查询以太网主站参数'
        case 'ethernetComm':
            return '查询以太网通信设置'
        case 'gprsMaster':
            return '查询GPRS主站参数'
        case 'gprsComm':
            return '查询GPRS通信参数'
        case 'time':
            return gen_GetTermTime(data)
        case 'version':
            return gen_GetTermVersion(data)
        case 'mac':
            return '查询终端MAC地址'
        default:
            return '查询'
    }
}


export function parseFrame(action : string, framedata : string) : string {
    
    switch (action) {
        case 'address':
            return parser_GetTermAddress(framedata)
        case 'ip':
            return '查询终端IP'
        case 'ethernetMaster':
            return '查询以太网主站参数'
        case 'ethernetComm':
            return '查询以太网通信设置'
        case 'gprsMaster':
            return '查询GPRS主站参数'
        case 'gprsComm':
            return '查询GPRS通信参数'
        case 'time':
            return '查询终端时间'
        case 'version':
            return parser_GetVersion(framedata)
        case 'mac':
            return '查询终端MAC地址'
        default:
            return '查询'
    }
} 


