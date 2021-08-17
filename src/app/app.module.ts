import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { DataViewComponent } from './components/data-view/data-view.component';
import { ActionFormComponent } from './components/action-form/action-form.component';

@NgModule({
  declarations: [AppComponent, HeaderComponent, DataViewComponent, ActionFormComponent],
  imports: [BrowserModule, FormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
