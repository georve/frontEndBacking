import { Component, OnInit } from '@angular/core';
import { EmailPayload } from '../model/EmailPayload.model';
import { TokenStorageService } from '../_services/token-storage.service';
import { UserService } from '../_services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  currentUser: any;
  accountInfo: any;
  emailObject: any;
  public failAccount=false;
  public errorMessage = '';

  constructor(private token: TokenStorageService,
    private userService: UserService,) { 
      
    }

  ngOnInit(): void {
    console.log("init");
    this.emailObject={};
    this.currentUser = this.token.getUser();
    console.log(this.currentUser);
    this.emailObject.email=this.currentUser.email;
    this.userService.getAccountInfoByEmail(this.emailObject).subscribe(
      data => {
        console.log(data);
       this.accountInfo=data;
       this.failAccount=false;
      },
      err=>{
        console.log('fail');
        console.log(err);
        this.failAccount=true;
        this.errorMessage = err.error.message;

      }
    )
  }

}
