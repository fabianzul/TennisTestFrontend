import { Component, ViewChild, OnInit, ViewEncapsulation } from '@angular/core';
import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, filter, withLatestFrom } from 'rxjs/operators';
import { Router, NavigationEnd } from '@angular/router';
import { MatSnackBar, MatSidenav, MatMenuTrigger, MatMenu } from '@angular/material';
import * as _ from "lodash";

@Component({
  selector: 'app-components/nav-page',
  templateUrl: './nav-page.component.html',
  styleUrls: ['./nav-page.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class NavPageComponent implements OnInit {
  @ViewChild('drawer',{ read: MatSidenav, static: true }) drawer: MatSidenav;
  @ViewChild('notifyMenu',{ read: MatMenu, static: true }) noti: MatMenu;
  @ViewChild(MatMenuTrigger,{static:false}) menu: MatMenuTrigger; 
  

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches)
    );

  public quantityNotify: number;

  isLoading = true;

  userToken;

  constructor( private breakpointObserver: BreakpointObserver, private router: Router, private snackBar: MatSnackBar) {
  }

  ngOnInit() {
  }

  public route(page) {
    this.drawer.close();
    this.router.navigate([page]);
  }

  public snackNotify(msg: string, delay: number) {
    this.snackBar.open(msg, '', {
      duration: delay,
      panelClass: ['normal-snackbar'],
      horizontalPosition: 'center',
    });
  }
}