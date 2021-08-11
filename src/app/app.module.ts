import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './modules/material/material.module'

import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { HttpClientModule } from '@angular/common/http';

import { NgxGaugeModule } from 'ngx-gauge';
import {ConnectionService} from 'ng-connection-service';

import { SevenSegModule } from 'ng-sevenseg';
import { DeviceDetectorModule } from 'ngx-device-detector';

//components
import { NavPageComponent } from './components/nav-page/nav-page.component';
import { DashboardPageComponent } from './components/dashboard-page/dashboard-page.component';
import { ClientsPageComponent, ClientDetailDialog, ClientAddDialog } from './components/clients-page/clients-page.component';


import { AsyncPipe, DatePipe } from '../../node_modules/@angular/common';
import { environment } from 'src/environments/environment';
import { MatPaginatorIntl } from '@angular/material';

@NgModule({
  declarations: [
    AppComponent,
    NavPageComponent,
    DashboardPageComponent,
    ClientsPageComponent,
    ClientDetailDialog,
    ClientAddDialog
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    NgxGaugeModule,
    SevenSegModule,
    ReactiveFormsModule,
    DeviceDetectorModule.forRoot(),
  ],
  providers: [
    AsyncPipe,
    DatePipe,
  ],
  bootstrap: [AppComponent],
  entryComponents: [ClientDetailDialog, ClientAddDialog]
})
export class AppModule { }
