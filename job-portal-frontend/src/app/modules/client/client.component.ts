import { Component, AfterViewInit, ViewChild, ChangeDetectorRef, OnInit } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

import { merge, of as observableOf } from 'rxjs';
import { catchError, map, startWith, switchMap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

import { Client } from '~models/client';
import { ClientService } from '~services/client.service';
import { AuthService } from '~services/auth.service';
import { ConfirmComponent } from '~components/confirm/confirm.component';
import { FormsComponent } from '~modules/client/forms/forms.component';
import { SnackbarComponent } from '~components/snackbar/snackbar.component';

import { Controller } from '~base/controller';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.scss'],
  providers: [ClientService]
})
export class ClientComponent implements AfterViewInit, OnInit, Controller {
  public displayedColumns = ['company', 'decription', 'experience', 'location', 'profile', 'skill','_id'];
  public pageSizeOptions = [5, 10, 20, 40, 100];
  public pageSize = 20;
  public dataSource = new MatTableDataSource();
  public pageEvent: PageEvent;
  public resultsLength = 0;
  public page = 1;
  public isLoading = false;
  public isTotalReached = false;
  public totalItems = 0;
  public search = '';
  public showApplybutton = false;


  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;

  constructor(
    private changeDetectorRef: ChangeDetectorRef,
    private clientService: ClientService,
    private authService: AuthService,
    private router: Router,
    public dialog: MatDialog,
    public snack: MatSnackBar
  ) { }

  ngOnInit() {
    if (!this.authService.loggedIn.getValue()) {
      this.router.navigate(['/login']);
    }
    this.showApplybutton = localStorage.getItem('type') == '2' ? true:  false
    console.log(this.showApplybutton)
  }

  ngAfterViewInit() {
    this.getData();
  }

  ngAfterViewChecked() {
    this.changeDetectorRef.detectChanges();
  }

  private openSnack(data: any): void {
    this.snack.openFromComponent(SnackbarComponent, {
      data: { data: data },
      duration: 3000
    });
  }

  public onPaginateChange(event: any): void {
    this.page = event.pageIndex + 1;
    this.pageSize = event.pageSize;
    this.getData();
  }

  public applyFilter(filterValue: string): void {
    filterValue = filterValue.trim().toLowerCase();
    this.getData();
  }

  getData(): void {
    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);
    console.log("get data");

    merge(this.sort.sortChange, this.paginator.page)
      .pipe(
        startWith({}),
        switchMap(() => {
          this.isLoading = true;
          return this.clientService.getList(
            this.sort.active,
            this.sort.direction,
            this.pageSize,
            this.page,
            this.search
          );
        }),
        map(data => {
          this.isLoading = false;
          this.isTotalReached = false;
          console.log("**********"+JSON.stringify(data))

          this.totalItems = (<any>data).length;
          return data;
        }),
        catchError(() => {
          this.isLoading = false;
          this.isTotalReached = true;
          return observableOf([]);
        })
      ).subscribe(data => this.dataSource.data = (<any>data));
  }

  edit(client: Client): void {
    if(this.showApplybutton){
    this.clientService.getOne(client._id).subscribe((data: any) => {
      if (data) {
        this.snack.openFromComponent(SnackbarComponent, {
              data: { message: 'Applied' },
              duration: 3000
            });
      }
    });
    }else{
      this.snack.openFromComponent(SnackbarComponent, {
              data: { message: 'Invalid operation' },
              duration: 3000
            });
    }
  }

  save(): void {
    const dialogRef = this.dialog.open(FormsComponent, {
      width: '400px',
      data: { title: 'Add person', action: 'save' }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.paginator._changePageSize(this.paginator.pageSize);
      }
    });
  }
 getAppliedList(): void {
    throw new Error("Method not implemented.");
  }
  /* delete(client: Client): void {
    const dialogRef = this.dialog.open(ConfirmComponent, {
      width: '250px',
      data: {
        title: 'Delete record',
        message: 'Are you sure you want to delete this record?'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.clientService.delete(client.id).subscribe((data: any) => {
          this.openSnack(data);
          if (data.success) {
            this.paginator._changePageSize(this.paginator.pageSize);
          }
        });
      }
    });
  } */

}
