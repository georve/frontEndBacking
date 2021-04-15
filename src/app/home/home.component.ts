import { Component, OnInit } from '@angular/core';
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
  public failAccount=false;
  public errorMessage = '';

  constructor(private token: TokenStorageService,
    private userService: UserService,) { }

  ngOnInit(): void {
    this.currentUser = this.token.getUser();
    this.userService.getAccountInfoByEmail(this.currentUser.email).subscribe(
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
