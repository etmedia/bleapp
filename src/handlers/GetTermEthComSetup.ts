import { BaseFrameHandler } from './BaseFrameHandler';
import { OctStringToIPString, EnumToWorkMode, ArrayNumber, hexStringToNum } from '../utils';

export class GetTermEthComSetup extends BaseFrameHandler {

    buildFrame(param: any): string {
        return this.buildFrame_option({
            client_address: "00",//客户机地址
            server_address: new String(param),//服务器地址
        },
        {
            time_tag: false,//时间标签，true代表有时间标签，false代表没有
            request_mode: 5,//请求类型，5代表Get-Request
            request: {
                index: 1 ,//1代表GetRequestNormal数据类型
                get_option: {
                    piid: "05",
                    oad:"45100200"
                }
            }
        })
    }

    handleResult(result: any): any {
        let retData : string = '解析异常'
        if(result)
        {
            console.log(result)
            if(result && result.structure && Array.isArray(result.structure) && result.structure.length == 8)
            {
                retData = ''                
                let mode : string = EnumToWorkMode(result.structure[0].enum)
                retData = ''
                retData += "工作模式        :" + mode + "\n"
                if(result.structure[1].enum == 0)
                {
                    retData += "连接方式        :TCP\n"
                }
                else
                {
                    retData += "连接方式        :UDP\n"
                }
                if(result.structure[2].enum == 0)
                {
                    retData += "连接应用        :主备\n"
                }
                else
                {
                    retData += "连接应用        :多连接\n"
                }
                retData += "侦听端口列表    :" + ArrayNumber(result.structure[3].array) + "\n"
                retData += "代理服务器地址  :" + OctStringToIPString(result.structure[4].octet_string) + "\n"
                retData += "代理端口        :" + hexStringToNum(result.structure[5].long_unsigned) + "\n"
                let tmpnum :number = hexStringToNum(result.structure[6].unsigned)
                console.log("tmpnum", tmpnum)
                retData += "重发和超时(秒)  : (" + tmpnum
                retData += ") 重发：" + (tmpnum & 0x03) + " | 超时：" + (tmpnum >> 2) + "\n"
                retData += "心跳周期(秒)    :" + hexStringToNum(result.structure[7].long_unsigned)
            }
        }
        return retData
    }
}

export default GetTermEthComSetup;