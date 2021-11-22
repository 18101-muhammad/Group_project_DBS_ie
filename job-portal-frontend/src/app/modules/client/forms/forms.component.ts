import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

import { ClientService } from '~services/client.service';
import { SnackbarComponent } from '~components/snackbar/snackbar.component';
import { Client } from '~app/models/client';

@Component({
  selector: 'app-forms',
  templateUrl: './forms.component.html',
  styleUrls: ['./forms.component.scss']
})

export class FormsComponent implements OnInit {
  public frm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<FormsComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: any,
    private fb: FormBuilder,
    private clientService: ClientService,
    public snack: MatSnackBar
  ) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit() {
    this.initializeForm();
  }

  openSnack(data: any) {
    this.snack.openFromComponent(SnackbarComponent, {
      data: { data: data },
      duration: 3000
    });
  }

  private initializeForm() {
    const IS_EDITING = this.data.action === 'edit';
    const data = this.data.data;

    this.frm = this.fb.group({
      company: new FormControl(IS_EDITING ? data.company : null, [Validators.required, Validators.minLength(3)]),
      description: new FormControl(IS_EDITING ? data.description : null, [Validators.required, Validators.minLength(3)]),
      experience: new FormControl(IS_EDITING ? data.experience : null, [Validators.required, Validators.minLength(3)]),
      location: new FormControl(IS_EDITING ? data.location : null, [Validators.required, Validators.minLength(3)]),
      profile: new FormControl(IS_EDITING ? data.profile : null, [Validators.required, Validators.minLength(3)]),
      skill: new FormControl(IS_EDITING ? data.skill : null, [Validators.required, Validators.minLength(1)]),
    });
  }

  public save(form: FormGroup) {
    this.clientService.save(form.value).subscribe((data: any) => {
      this.openSnack(data);

      if (data.company) {
        this.dialogRef.close(true);
      }
    });
  }



}
