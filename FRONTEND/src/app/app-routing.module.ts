import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginFormComponent } from './login-form/login-form.component';
import { ShowUserComponent } from './show-user/show-user.component';
import { UploadComponent } from './upload/upload.component';
import { PreviewComponent } from './preview/preview.component';
import { PaymentComponent } from './payment/payment.component';


const routes: Routes = [
  { path: '', component: LoginFormComponent },
  { path: 'dash', component: DashboardComponent },
  { path: 'users', component: ShowUserComponent },
  { path: 'upload-file', component: UploadComponent },
  { path: 'preview', component: PreviewComponent },
  { path: 'payment', component: PaymentComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
