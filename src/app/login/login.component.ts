import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../_services/auth.service';
import { TokenStorageService } from '../_services/token-storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  public loginInvalid = false;
  public isLoggedIn=false;
  private formSubmitAttempt = false;
  private returnUrl: string;
  public errorMessage = '';
  public roles: string[] = [];

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private tokenStorage: TokenStorageService,
  ) {
    this.returnUrl = this.route.snapshot.queryParams.returnUrl || '/home';

    this.form = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn=true;
      this.roles=this.tokenStorage.getUser().roles;
      this.router.navigate([this.returnUrl]);
    }
  }

  goHome(){
    this.router.navigate(['/home']);
  }


  onSubmit(): void {
    this.loginInvalid = false;
    this.formSubmitAttempt = false;
    if (this.form.valid) {
      try {
        const username = this.form.get('username')?.value;
        const password = this.form.get('password')?.value;
        this.authService.login(username, password).subscribe(
          data=>{
            console.log('login');
            this.tokenStorage.saveToken(data.accessToken);
            this.tokenStorage.saveUser(data);
            this.loginInvalid=false;
            this.isLoggedIn=true;
            this.roles = this.tokenStorage.getUser().roles;
            this.goHome();
          },
          err=>{
            console.log('fail');
            this.errorMessage = err.error.message;
            this.loginInvalid = true;
          }
        );
      } catch (err) {
        this.loginInvalid = true;
      }
    } else {
      this.formSubmitAttempt = true;
    }
  }

  reloadPage(): void {
    window.location.reload();
  }

}
