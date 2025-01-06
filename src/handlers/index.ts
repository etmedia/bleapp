export interface FrameHandler {
    buildFrame(param: any): string
    parseFrame(response: string): any
}