import { BaseFrameHandler } from './BaseFrameHandler';
import { hexStringToVisibleString } from '../utils';

export class GetTermVersion extends BaseFrameHandler {

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
                    oad:"43000300"
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
                retData = ''
                retData += "厂商代码：" + hexStringToVisibleString(result.structure[0].visible_string) + "\n"
                retData += "软件版本号：" + hexStringToVisibleString(result.structure[1].visible_string) + "\n"
                retData += "软件版本日期：" + hexStringToVisibleString(result.structure[2].visible_string) + "\n"
                retData += "硬件版本号：" + hexStringToVisibleString(result.structure[3].visible_string) + "\n"
                retData += "硬件版本日期：" + hexStringToVisibleString(result.structure[4].visible_string) + "\n"
                retData += "厂商扩展信息：" + hexStringToVisibleString(result.structure[5].visible_string)
            }
        }
        return retData
    }
}

export default GetTermVersion;