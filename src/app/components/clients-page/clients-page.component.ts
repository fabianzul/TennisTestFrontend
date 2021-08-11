import { Component, OnInit, ViewChild, OnDestroy, AfterViewInit, Inject } from '@angular/core';
import { moveIn } from 'src/router.animations';
import { catchError, tap } from 'rxjs/internal/operators';
import { Router } from '@angular/router';
import { client } from '../../models/client'
import { MatSnackBar, MatTableDataSource, MatPaginator, MatSort, MatDialogRef, MAT_DIALOG_DATA, MatDialog, MatStepper } from '@angular/material';
import { ISubscription } from 'rxjs/Subscription';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders, HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, of } from 'rxjs';
import { Injectable } from '@angular/core';
import { ClientService } from 'src/app/services/client.service.service';

export interface DialogClientData {
  client: client;
}

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request)
      .pipe(
        tap(data => console.log(data)),
        catchError((error: HttpErrorResponse) => {
          if (error.error instanceof ErrorEvent) {
            // A client-side or network error occurred. Handle it accordingly.
            console.error('An error occurred:', error.error.message);
          } else {
            // The backend returned an unsuccessful response code.
            // The response body may contain clues as to what went wrong,
            console.error(
              `Backend returned code ${error.status}, ` +
              `body was: ${error.error}`);
          }
          // return an observable with a client-facing error message
          return throwError(
            'Something bad happened; please try again later.');
        })
      );
  }
}

@Component({
  selector: 'app-clients-page',
  templateUrl: './clients-page.component.html',
  styleUrls: ['./clients-page.component.scss'],
  animations: [moveIn()]
})
export class ClientsPageComponent implements OnInit {

  show = false;
  isLoading = true;
  displayedColumns: string[] = ['id', 'cc', 'firstName', 'lastName', 'birthday'];
  dataSource: MatTableDataSource<client> = null;

  @ViewChild(MatPaginator, { read: MatPaginator, static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { read: MatSort, static: true }) sort: MatSort;

  public clients: client[];

  constructor(private clientService: ClientService, private router: Router, public dialog: MatDialog, public snackBar: MatSnackBar) {
  }

  ngOnInit() {
    this.clientService.sendGetRequest().subscribe((data: any[]) => {
      console.log(data);
      this.clients = data;
      this.isLoading = false;
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })
  }

  ngOnDestroy() {
  }

  public route(page) {
    this.router.navigate([page]);
  }

  ngAfterViewInit() {

  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }


  getRecord(row: client) {
    this.openDialog(row);
  }

  openDialog(clientData): void {
    var client2tras: client;
    if (clientData) {
      client2tras = {
        id: clientData.id,
        cc: clientData.cc,
        firstName: clientData.firstName,
        lastName: clientData.lastName,
        birthday: clientData.birthday
      }

      const dialogRef = this.dialog.open(ClientDetailDialog, {
        width: '90%',
        data: { client: client2tras }
      });

      dialogRef.afterClosed().subscribe(result => {
        this.clientService.sendGetRequest().subscribe((data: any[]) => {
          console.log(data);
          this.clients = data;
          this.isLoading = false;
          this.dataSource = new MatTableDataSource(data);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        })
      });
    }
  }

  public addClient() {
    const dialogRef = this.dialog.open(ClientAddDialog, {
      width: '90%'
    });

    dialogRef.afterClosed().subscribe(result => {
      this.clientService.sendGetRequest().subscribe((data: any[]) => {
        console.log(data);
        this.clients = data;
        this.isLoading = false;
        this.dataSource = new MatTableDataSource(data);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      })
      //console.log('The dialog was closed');
      //this.animal = result;
    });
  }

}


@Component({
  selector: 'clients-dialog',
  templateUrl: 'clients-dialog.html',
  styleUrls: ['./clients-page.component.scss']
})
export class ClientDetailDialog {

  editing: boolean[] = [false];
  textVal: string[] = [];

  progress: boolean = false;

  constructor(
    public dialogRef: MatDialogRef<ClientDetailDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogClientData, private snackBar: MatSnackBar,
    private http: HttpClient, private clientService: ClientService) {

  }

  notify(msg, type) {
    if (type) {
      this.snackBar.open('Bien! ' + msg, '', {
        duration: 4000,
        panelClass: ['green-snackbar'],
        horizontalPosition: 'center',
      });
    } else {
      this.snackBar.open('Error! ' + msg, '', {
        duration: 4000,
        panelClass: ['red-snackbar'],
        horizontalPosition: 'center',
      });
    }
  }

  onDeleteClick(clientId) {
    if (window.confirm('Estás seguro de eliminar el cliente?')) {
      this.progress = true;
      this.clientService.sendDeleteRequest(clientId).subscribe((data: any[]) => {
        this.dialogRef.close()
        this.notify("Eliminado correctamente", true)
      })
    }
  }

  updateClient(client) {
    if (window.confirm('Estás seguro de actualizar los datos del cliente?')) {
      this.clientService.sendPutRequest(client).subscribe((data: any[]) => {
        this.progress = true;
        this.dialogRef.close()
        this.notify("Actualizado correctamente", true)
      })
    }
  }
}

@Component({
  selector: 'clients-add-dialog',
  templateUrl: 'clients-add-dialog.html',
  styleUrls: ['./clients-page.component.scss']
})
export class ClientAddDialog {

  steeper: MatStepper;
  allow: boolean = true;
  public targetInput = 'input0';

  progress: boolean = false;

  client: any = {
    cc: '',
    firstName: '',
    lastName: '',
    birthday: '',
  };

  isLinear = true;

  ccFormGroup: FormGroup;
  firstNameFormGroup: FormGroup;
  lastNameFormGroup: FormGroup;
  birthdayFormGroup: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<ClientAddDialog>,
    //@Inject(MAT_DIALOG_DATA) public data: DialogAddMaterialData,
    private _formBuilder: FormBuilder,
    private snackBar: MatSnackBar,
    private clientService: ClientService) { }

  ngOnInit() {

    //this.birthday = new Date();

    this.ccFormGroup = this._formBuilder.group({
      ccCtrl: ['', Validators.compose([Validators.required, Validators.pattern('^[0-9]+$')])]
    });
    this.firstNameFormGroup = this._formBuilder.group({
      firstNameCtrl: ['', Validators.compose([Validators.required])]
    })
    this.lastNameFormGroup = this._formBuilder.group({
      lastNameCtrl: ['', Validators.compose([Validators.required])]
    })
    this.birthdayFormGroup = this._formBuilder.group({
      birthdayCtrl: ['', Validators.compose([Validators.required])]
    });
  }

  displayWith(obj?: any): string | undefined {
    return obj ? obj.firstName : undefined;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnDestroy() {
  }

  private setFocus() {
    let targetElem = document.getElementById(this.targetInput);
    setTimeout(function waitTargetElem() {
      if (document.body.contains(targetElem)) {
        targetElem.focus();
      } else {
        setTimeout(waitTargetElem, 100);
      }
    }, 100);
  }

  onChange(event: any) {
    let index = String(event.selectedIndex);
    this.targetInput = 'input' + index;
    console.log(index)
    if (index === "4") {
      document.getElementById('divider').scrollIntoView(false);
      this.allow = false;
      this.targetInput = 'add';
    } else {
      this.allow = true;
    }
    this.setFocus();
  }

  onClickAdd() {

    this.progress = true;
    console.log(this.client)
    this.clientService.sendPostRequest(this.client).subscribe(data => {
      if ((data as any).id) {
        this.dialogRef.close();
        this.notify("Añadido correctamente", true);
      }
    })

  }

  notify(msg, type) {
    if (type) {
      this.snackBar.open('Bien! ' + msg, '', {
        duration: 4000,
        panelClass: ['green-snackbar'],
        horizontalPosition: 'center',
      });
    } else {
      this.snackBar.open('Error! ' + msg, '', {
        duration: 4000,
        panelClass: ['red-snackbar'],
        horizontalPosition: 'center',
      });
    }
  }
}
