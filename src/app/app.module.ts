import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AllHooksModule } from './all/all-hooks.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AllHooksModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
