import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TokenStorageService } from '../_services/token-storage.service';
import { UserService } from '../_services/user.service';

@Component({
  selector: 'app-withdrawal',
  templateUrl: './withdrawal.component.html',
  styleUrls: ['./withdrawal.component.css']
})
export class WithdrawalComponent implements OnInit {
  currentUser: any;
  accountInfo:any;
  form: FormGroup;
  public errorMessage = '';
  public failWithdrawal=false;

  constructor(  private fb: FormBuilder,
                private token: TokenStorageService,
                private userService: UserService,
                private router: Router,) { 
                  this.form = this.fb.group({
                    accountNumber: ['', Validators.required],
                    email: ['', Validators.email],
                    value:['',Validators.required]
                  });
                }

  ngOnInit(): void {
    this.currentUser = this.token.getUser();
    this.userService.getAccountInfoByEmail(this.currentUser.email).subscribe(
      data => {
       this.accountInfo=data;
       this.failWithdrawal=false;
       this.form.controls.accountNumber.setValue(this.accountInfo.account);
       this.form.controls.email.setValue(this.accountInfo.email);
      },
      err=>{
        this.failWithdrawal=true;
        this.errorMessage=err.error.message||"Error";
        console.log('fail');
        console.log(err);

      }
    )
  }

  goHome(){
    this.router.navigate(['/home']);
  }

  onSubmit(): void {
    if (this.form.valid) {
      const aux: any = {
        accountNumber: this.form.value.accountNumber,
        email: this.form.value.email,
        value: this.form.value.value
      };
      this.userService.withdrawal(aux).subscribe(
        data => {
          console.log(data);
          this.goHome();
         },
         err=>{
           console.log('fail');
           console.log(err);
   
         }
      )
    }

  }

}
