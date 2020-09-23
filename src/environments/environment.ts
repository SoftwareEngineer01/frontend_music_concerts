import { NgxLoggerLevel } from 'ngx-logger';

export const environment = {
  urlApi: 'http://127.0.0.1:8000/api/',
  production: false,
  logLevel: NgxLoggerLevel.TRACE,
  serverLogLevel: NgxLoggerLevel.OFF
};
