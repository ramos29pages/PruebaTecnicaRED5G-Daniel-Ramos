import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginFormComponent } from './login-form/login-form.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { FechaPipe } from './fecha.pipe';
import { DocumentoPipe } from './documento.pipe';
import { HeadComponent } from './head/head.component';
import { TableComponent } from './table/table.component';
import { HttpClientModule } from '@angular/common/http';
import { NgHttpLoaderModule } from 'ng-http-loader';
import { CapitalizePipe } from './capitalize.pipe';
import { FilterComponent } from './filter/filter.component';
import { ShowUserComponent } from './show-user/show-user.component';
import { UploadComponent } from './upload/upload.component';
import { PreviewComponent } from './preview/preview.component';
import { PaymentComponent } from './payment/payment.component';



@NgModule({
  declarations: [
    AppComponent,
    LoginFormComponent,
    DashboardComponent,
    FechaPipe,
    DocumentoPipe,
    HeadComponent,
    TableComponent,
    CapitalizePipe,
    FilterComponent,
    ShowUserComponent,
    UploadComponent,
    PreviewComponent,
    PaymentComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    NgHttpLoaderModule.forRoot(), 
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
