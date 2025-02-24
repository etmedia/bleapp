import { FrameHandler } from './handlers';
import { GetTermAddress } from './handlers/GetTermAddress';
import { GetTermIpAddress } from './handlers/GetTermIpAddress';
import { GetTermEthCom } from './handlers/GetTermEthCom';
import { GetTermEthComSetup } from './handlers/GetTermEthComSetup';
import { GetTermVersion } from './handlers/GetTermVersion';
import { InitFileTrans } from './handlers/InitFileTrans';
import { GetTermMac } from './handlers/GetTermMac';
import { GetTermDateTime } from './handlers/GetTermDateTime';
import { GetTermGPRSCom } from './handlers/GetTermGPRSCom';
import { GetTermGPRSComSetup } from './handlers/GetTermGPRSComSetup';

const handlers: { [key: string]: new () => FrameHandler } = {
    'address': GetTermAddress,
    'version': GetTermVersion,
    'initfiletrans': InitFileTrans,
    'ipaddress': GetTermIpAddress,
    'termethcom': GetTermEthCom,
    'termethcomsetup':GetTermEthComSetup,
    'termmac': GetTermMac,
    'termdatetime': GetTermDateTime,
    'termgprscom': GetTermGPRSCom,
    'termgprscomsetup': GetTermGPRSComSetup,
};

export function createFrameHandler(type: string): FrameHandler {
    const handlerClass = handlers[type];
    if (!handlerClass) {
        throw new Error(`Unknown frame type: ${type}`);
    }
    return new handlerClass();
}
