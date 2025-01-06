import { BaseFrameHandler } from './BaseFrameHandler';
import { Ts698 } from 'ts698';

export class GetTermAddress extends BaseFrameHandler {

    buildFrame(param: any): string {
        return this.buildFrame_option({
            client_address: "00",//客户机地址
            server_address: "AAAAAAAAAAAA",//服务器地址
        },
        {
            time_tag: false,//时间标签，true代表有时间标签，false代表没有
            request_mode: 5,//请求类型，5代表Get-Request
            request: {
                index: 1 ,//1代表GetRequestNormal数据类型
                get_option: {
                    piid: "05",
                    oad:"40010200"
                }
            }
        })
    }

    handleResult(result: any): any {
        let retData : string = '解析异常'
        if(result?.octet_string)
        {
            retData = result.octet_string
        }
        return retData
    }
}

export default GetTermAddress;