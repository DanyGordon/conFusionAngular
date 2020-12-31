import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { LoginComponent } from '../login/login.component';
import { Subscription } from 'rxjs';
import { AuthService } from '../services/auth.service';

import { Params, ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  username: string = undefined;
  subscription: Subscription;

  constructor(public dialog: MatDialog,
    private router: Router,
    private authService: AuthService ) { }

    ngOnInit() {
      this.authService.loadUserCredentials();
      this.subscription = this.authService.getUsername()
        .subscribe(name => { console.log(name); this.username = name; });
    }

    ngOnDestroy() {
      this.subscription.unsubscribe();
    }

    openLoginForm() {
      const loginRef = this.dialog.open(LoginComponent, {width: '500px', height: '450px'});

      loginRef.afterClosed()
        .subscribe(result => {
          console.log(result);
        });
    }

    logOut() {
      this.username = undefined;
      this.authService.logOut();
      if (this.router.url === '/favorites') {
        this.router.navigate(['/home']);
      }
    }
}
