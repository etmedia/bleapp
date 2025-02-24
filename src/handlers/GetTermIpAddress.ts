import { BaseFrameHandler } from './BaseFrameHandler';
import { OctStringToIPString, EnumToIPMode } from '../utils';

export class GetTermIpAddress extends BaseFrameHandler {

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
                    oad:"45100400"
                }
            }
        })
    }

    handleResult(result: any): any {
        let retData : string = '解析异常'
        if(result)
        {
            if(result && result.structure && Array.isArray(result.structure) && result.structure.length == 6)
            {
                let mode : string = EnumToIPMode(result.structure[0].enum)
                retData = ''
                retData += "MODE:" + mode + "\n"
                retData += "IP:  " + OctStringToIPString(result.structure[1].octet_string) + "\n"
                retData += "MASK:" + OctStringToIPString(result.structure[2].octet_string) + "\n"
                retData += "GW  :" + OctStringToIPString(result.structure[3].octet_string)
            }
        }
        return retData
    }
}

export default GetTermIpAddress;