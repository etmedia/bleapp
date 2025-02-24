import { BaseFrameHandler } from './BaseFrameHandler';
import { OctStringToDateTime } from '../utils';

export class GetTermDateTime extends BaseFrameHandler {

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
                    oad:"40000200"
                }
            }
        })
    }

    handleResult(result: any): any {
        let retData : string = '解析异常'
        if(result)
        {
            retData = "终端时间:  " + OctStringToDateTime(result.date_time_s)
        }
        return retData
    }
}

export default GetTermDateTime;