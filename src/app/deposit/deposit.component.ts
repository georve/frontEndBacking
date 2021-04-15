import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../_services/user.service';

@Component({
  selector: 'app-deposit',
  templateUrl: './deposit.component.html',
  styleUrls: ['./deposit.component.css']
})
export class DepositComponent implements OnInit {
  form: FormGroup;

  constructor(  private fb: FormBuilder,
                private userService: UserService) { 
                  this.form = this.fb.group({
                    account: ['', Validators.required],
                    email: ['', Validators.email],
                    amount:['',Validators.required]
                  });
                }

  ngOnInit(): void {
  }

  onSubmit(): void {

  }

}
