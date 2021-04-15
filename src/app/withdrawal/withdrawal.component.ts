import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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

  constructor(  private fb: FormBuilder,
                private token: TokenStorageService,
                private userService: UserService) { 
                  this.form = this.fb.group({
                    account: ['', Validators.required],
                    email: ['', Validators.email],
                    amount:['',Validators.required]
                  });
                }

  ngOnInit(): void {
    this.currentUser = this.token.getUser();
    this.userService.getAccountInfoByEmail(this.currentUser.email).subscribe(
      data => {
       this.accountInfo=data;
       this.form.controls.account.setValue(this.accountInfo.account);
       this.form.controls.email.setValue(this.accountInfo.email);
      },
      err=>{
        console.log('fail');
        console.log(err);

      }
    )
  }

  onSubmit(): void {

  }

}
