import { NgModule } from '@angular/core';
import { SharedModule } from '~utils/shared.module';
import { RouterModule } from '@angular/router';
import { UserComponent } from './user.component';
// import { UserFormComponent } from './user-form/user-form.component';

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild([{path: '', component: UserComponent}]),
  ],
  declarations: [
    UserComponent
  ],
  providers: [],
  entryComponents: [

  ],
  exports: [
    RouterModule,
  ]
})
export class UserModule { }
