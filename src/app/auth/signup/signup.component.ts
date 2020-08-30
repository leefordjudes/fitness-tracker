import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import * as moment from 'moment';
import {AuthService} from '../auth.service';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  maxDate;
  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    const today = new Date();
    this.maxDate = new Date(Date.UTC(today.getFullYear() - 18,today.getMonth(),today.getDate(),0,0,0,0));
  }

  onSubmit(form: NgForm){
    const dob = form.value.dob;
    // console.log(form);
    // console.log(moment(dob).format('DD-MM-YYYY'));
    // console.log(moment(dob).format('DD-MMM-YYYY'));
    this.authService.registerUser({
      email: form.value.email,
      password: form.value.password
    });
  }

}
