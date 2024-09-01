import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { AccessService } from '../../../services/access.service';
import { AppUserData } from '../../../model/access.model';
import { HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { SsoService } from '../../../sso/sso.service';
import { TranslateModule } from '@ngx-translate/core';
import { ApiResponse } from '../../../model/common.model';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [InputTextModule, ButtonModule, FormsModule, ReactiveFormsModule, TranslateModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  providers: [ AccessService, SsoService ]
})
export class LoginComponent implements OnInit {
  constructor(private as: AccessService,
    private router: Router,
    private actRoute: ActivatedRoute) {
    this.loginForm.valueChanges.subscribe({
      next: (res: any) => {
        this.resetMessage();
      }
    });
    this.actRoute.params.subscribe((p: any) => {
      this.companyName = p.company;
    });
  }
  loginForm = new FormGroup({
    loginid: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)
  });
  errormsg: string | undefined;
  loginSuccess: boolean = false;

  companyName: string | undefined;

  redirectUrl: string | null = null;

  ngOnInit(): void {      
      this.redirectUrl = this.actRoute.snapshot.queryParamMap.get('redirect');
      console.log('Redirect is ', this.redirectUrl);
  }
  login() {
    this.errormsg = undefined;
    if (this.loginForm.valid) {
      let loginid = this.loginForm.get('loginid')?.value;
      let password = this.loginForm.get('password')?.value;
      this.as.login(loginid || '', password || '', this.companyName || '')
      .subscribe({
        next: (res: any) => {
          this.handleLoginResponse(res as ApiResponse<AppUserData>);
        },
        error: (err: any) => {
          this.handleLoginError(err);
        }
      });
    }
  }

  handleLoginResponse(res: ApiResponse<AppUserData>) {
    console.log('************');
    console.log(res);
    if (res.data.accessToken != null && 
      res.data.roles != null && 
      res.data.roles.length > 0) {
        this.loginSuccess = true;
        if (this.redirectUrl) {
          window.location.href = this.redirectUrl;
        }
    } else {
      console.error('Something is not right Here...');
    }
  }

  handleLoginError(err: HttpErrorResponse) {
    console.log(err);
    this.errormsg = "Invalid username or password";
    this.loginSuccess = false;
  }

  resetMessage() {
    this.errormsg = undefined;
    this.loginSuccess = false;
  }
}
