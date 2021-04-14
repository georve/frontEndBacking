import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  form: FormGroup;
  private formSubmitAttempt = false;
  public isSuccessful = false;
  public isSignUpFailed = false;
  public errorMessage = '';
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
  ) { 
    this.form = this.fb.group({
      username: ['', Validators.required],
      name: ['', Validators.required],
      email:['',Validators.email],
      password: ['', Validators.required]
    });
  }

  ngOnInit(): void {
  }

  onSubmit(): void {
    this.formSubmitAttempt = false;
    if (this.form.valid) {
      const username = this.form.get('username')?.value;
      const name=this.form.get('name')?.value;
      const email=this.form.get('email')?.value;
      const password = this.form.get('password')?.value;
      this.authService.register(username, name,email,password).subscribe(
        data => {
          console.log(data);
          this.isSuccessful = true;
          this.isSignUpFailed = false;
        },
        err => {
          this.errorMessage = err.error.message;
          this.isSignUpFailed = true;
        }
      )

    }else {
      this.formSubmitAttempt = true;
    }

  }

}
