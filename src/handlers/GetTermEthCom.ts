import { BaseFrameHandler } from './BaseFrameHandler';
import { OctStringToIPString, hexStringToNum } from '../utils';

export class GetTermEthCom extends BaseFrameHandler {

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
                    oad:"45100300"
                }
            }
        })
    }

    handleResult(result: any): any {
        let retData : string = '解析异常'
        if(result)
        {
            console.log(result)
            if(result && result.array && Array.isArray(result.array))
            {
                retData = ''                
                for (let i = 0; i < result.array.length; i++) {
                    if(result.array[i].structure && Array.isArray(result.array[i].structure) && result.array[i].structure.length == 2)
                    {
                        retData += "主站(" + (i+1)
                        retData += ")IP:  " + OctStringToIPString(result.array[i].structure[0].octet_string) + "\n"
                        retData += "主站(" + (i+1)
                        retData += ")端口:" + hexStringToNum(result.array[i].structure[1].long_unsigned)
                        if(i < result.array.length - 1)
                        {
                            retData += "\n"
                        }
                    }
                }
            }
        }
        return retData
    }
}

export default GetTermEthCom;