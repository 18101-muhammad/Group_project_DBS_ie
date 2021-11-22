import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

import { AuthService } from '~services/auth.service';
import { SnackbarComponent } from '~components/snackbar/snackbar.component';

@Component({
  selector: 'app-login',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  providers: []
})

export class RegisterComponent implements OnInit {
  public form: FormGroup;
  public isLogin = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    public snack: MatSnackBar,
  ) { }

  ngOnInit() {
    if (localStorage.getItem('token')) {
      this.router.navigate(['/']);
    }

    this.initLoginForm();
  }

  private initLoginForm(): void {
    this.form = this.fb.group({
      user_name: [
        null,
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(20)
        ]
      ],
      password: [
        null,
        [
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(12)
        ]
      ],
      type: [
        null,
        [
          Validators.required
        ]
      ],
      name: [
        null,
        [
          Validators.required
        ]
      ]
    });
  }

  public isFieldInvalid(field: string) {
    if (this.form.get(field).touched) {
      return !this.form.get(field).valid;
    }
  }

  public register() {
    if (this.form.valid) {
      this.isLogin = true;
      this.authService.register(this.form.value).subscribe(
        (data: any) => {
          this.isLogin = false;
          if (data.userName) {
            //this.authService.loggedIn.next(true);
            //localStorage.setItem('token', data.token);
            this.router.navigate(['/login']);
          } else {
            this.snack.openFromComponent(SnackbarComponent, {
              data: { data: data },
              duration: 3000
            });
          }
        },
        (error) => {
          console.log(error);
          this.isLogin = false;
        }
      );
    }
  }

}
