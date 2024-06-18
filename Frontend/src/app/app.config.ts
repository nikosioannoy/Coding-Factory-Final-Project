import { ApplicationConfig } from '@angular/core';
import { Routes, provideRouter, withComponentInputBinding } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';



export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes, withComponentInputBinding()),
     provideAnimationsAsync(), 
    provideHttpClient(withInterceptorsFromDi())]
};
