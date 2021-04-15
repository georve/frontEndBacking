import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TokenStorageService } from '../_services/token-storage.service';
import { UserService } from '../_services/user.service';
import {Router} from '@angular/router'; 

@Component({
  selector: 'app-deposit',
  templateUrl: './deposit.component.html',
  styleUrls: ['./deposit.component.css']
})
export class DepositComponent implements OnInit {
  form: FormGroup;
  currentUser: any;
  accountInfo: any;

  constructor(private fb: FormBuilder,
    private token: TokenStorageService,
    private userService: UserService,
    private route:Router,) {
    this.form = this.fb.group({
      accountNumber: ['', Validators.required],
      email: ['', Validators.email],
      value: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.currentUser = this.token.getUser();
    this.userService.getAccountInfoByEmail(this.currentUser.email).subscribe(
      data => {
        this.accountInfo = data;
        this.form.controls.accountNumber.setValue(this.accountInfo.account);
        this.form.controls.email.setValue(this.accountInfo.email);
      },
      err => {
        console.log('fail');
        console.log(err);

      }
    )
  }
  
  goHome(){
    this.route.navigate(['/home']);
  }

  onSubmit(): void {
    if (this.form.valid) {
      const aux: any = {
        accountNumber: this.form.value.accountNumber,
        email: this.form.value.email,
        value: this.form.value.value
      };
      this.userService.deposit(aux).subscribe(
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
