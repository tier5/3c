import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {SharedModule, SpinnerService} from './core/shared';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    CoreModule, BrowserAnimationsModule,SharedModule
  ],
  providers: [SpinnerService],
  bootstrap: [AppComponent]
})
export class AppModule { }
