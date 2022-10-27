import { ArgumentsHost, ExceptionFilter } from '@nestjs/common';
export declare class HttpExceptionFilter implements ExceptionFilter {
    DEFAULT_TIMEZONE: string;
    catch(exception: any, host: ArgumentsHost): any;
}
