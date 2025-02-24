import { BaseFrameHandler } from './BaseFrameHandler';
import { OctStringToMacString } from '../utils';

export class GetTermMac extends BaseFrameHandler {

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
                    oad:"45100500"
                }
            }
        })
    }

    handleResult(result: any): any {
        let retData : string = '解析异常'
        if(result)
        {
            retData = "MAC:  " + OctStringToMacString(result.octet_string)
        }
        return retData
    }
}

export default GetTermMac;