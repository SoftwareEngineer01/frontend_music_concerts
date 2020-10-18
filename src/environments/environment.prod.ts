import { NgxLoggerLevel } from 'ngx-logger';

export const environment = {
  urlApi: 'https://music-concerts.herokuapp.com/api/',
  production: true,
  logLevel: NgxLoggerLevel.OFF,
  serverLogLevel: NgxLoggerLevel.ERROR
};
