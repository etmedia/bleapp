import { FrameHandler } from './index';
import { Ts698 } from 'ts698';

export abstract class BaseFrameHandler implements FrameHandler {
    abstract handleResult(result: any): any;

    buildFrame(param: any): string {
        return ""
    }

    buildFrame_option(linkoption: any, requestoption: any): string {
        let framedata : string = ''
        console.log(linkoption)
        console.log(requestoption)
        Ts698.buildFrame({
            link_option: linkoption,
            request_option: requestoption,
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

    parseFrame(response: string): any {
        let result = null
        Ts698.parse({
            frame: response,
            result(res){
                // console.log(res.msg);
                var jsonObject = JSON.parse(res.msg.toString());
                if(jsonObject.resultCode == 0)
                {
                    if(jsonObject.result)
                    {
                        result = jsonObject.result
                    }
                }
            }
        })
        return this.handleResult(result);
    }
}