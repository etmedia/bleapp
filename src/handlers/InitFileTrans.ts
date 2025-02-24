import { BaseFrameHandler } from './BaseFrameHandler';
import { hexStringToVisibleString } from '../utils';

export class InitFileTrans extends BaseFrameHandler {

    buildFrame(param: any): string {
        return this.buildFrame_option({
            client_address: "00",//客户机地址
            server_address: new String(param.server_address),//服务器地址
        },
        {
            time_tag: false,//时间标签，true代表有时间标签，false代表没有
            request_mode: 7,//请求类型，7代表Action-Request
            request: {
                index: 1 ,//1代表Action-Request操作一个对象方法请求
                get_option: {
                    piid: "01",
                    oad:"F0010700",  //F001文件分块传输管理 方法7启动传输
                    data : {
                        dataIndex : 2,
                        structure : [
                            {
                                dataIndex : 10,
                                visible_string : ""
                            },
                            {
                                dataIndex : 10,
                                visible_string : ""
                            },
                            {
                                dataIndex : 6,
                                double_long_unsigned: new String(param.file_size)
                            },
                            {
                                dataIndex : 4,
                                bit_string: "111" //bit0：读  bit1：写  bit2：执行
                            },
                            {
                                dataIndex : 10,
                                visible_string : ""
                            },
                            {
                                dataIndex : 22,
                                enumdata : "00"
                            },
                            {
                                dataIndex : 12,
                                long_unsigned: "0200"
                            },
                            {
                                dataIndex : 2,
                                structure : [
                                    {
                                        dataIndex : 22,
                                        enumdata : "00"
                                    },
                                    {
                                        dataIndex : 9,
                                        octet_string : ""
                                    }
                                ]
                            }                            
                        ]
                    }
                }
            }
        })
    }

    handleResult(result: any): any {
        let retData = null
        if(result)
        {
            if(result && result.structure)
            {
                retData = result.structure
            }
        }
        return retData
    }
}

export default InitFileTrans;