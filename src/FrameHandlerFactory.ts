import { FrameHandler } from './handlers';
import { GetTermAddress } from './handlers/GetTermAddress';
import { GetTermVersion } from './handlers/GetTermVersion';
import { InitFileTrans } from './handlers/InitFileTrans';

const handlers: { [key: string]: new () => FrameHandler } = {
    'address': GetTermAddress,
    'version': GetTermVersion,
    'initfiletrans': InitFileTrans,
};

export function createFrameHandler(type: string): FrameHandler {
    const handlerClass = handlers[type];
    if (!handlerClass) {
        throw new Error(`Unknown frame type: ${type}`);
    }
    return new handlerClass();
}