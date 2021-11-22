import { NgModule } from '@angular/core';
import { SharedModule } from '~utils/shared.module';
import { RouterModule } from '@angular/router';
import { RegisterComponent } from './register.component';

@NgModule({
  declarations: [
    RegisterComponent,
  ],
  imports: [
    SharedModule,
    RouterModule.forChild([{path: '', component: RegisterComponent}]),
  ]
})
export class RegisterModule { }
