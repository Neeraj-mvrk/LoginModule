import { Component, OnInit,ViewEncapsulation } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { LoginModel } from './loginmodel';
import {FormControl,FormGroup, Validators,FormBuilder} from '@angular/forms';


//onst EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class LoginFormComponent implements OnInit {
  loginForm: FormGroup;
  model = new LoginModel('','');

  loginForm_validation_messages = {
    'email': [
      { type: 'required', message: 'Email is required' },
      { type: 'pattern', message: 'Enter a valid email' }
    ],
    'hash_password': [
      { type: 'required', message: 'Password is required' },
      { type: 'minlength', message: 'Password must be at least 5 characters long' },
      { type: 'pattern', message: 'Your password must contain at least one uppercase, one lowercase, and one number' }
    ]

    }
  constructor(
    private httpClient:HttpClient,
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    ) { }

  onSubmit = function (value) {
    this.httpClient.post('/auth/sign_in',value.value)
    .subscribe(data => {
            console.log("POST Request is successful ", data);
            if (data && data.token) {
                        // store username and jwt token in local storage to keep user logged in between page refreshes
                        localStorage.setItem('token',data.token);
                    }
             this.router.navigateByUrl('/first_page');
        },
        error => {
            console.log("Error", error);
        });
  }
  // googleSignin = function(){
  //   this.httpClient.get('/auth/google')
  //   .subscribe(data=>{
  //     console.log("successful",data);
  //     if (data && data.token) {
  //                 // store username and jwt token in local storage to keep user logged in between page refreshes
  //                 localStorage.setItem('token',data.token);
  //             }
  //      this.router.navigateByUrl('/first_page');
  // },
  // error => {
  //     console.log("Error", error);
  // });
  // }
  ngOnInit() {
   this.loginForm = this.fb.group({
    email: new FormControl('', Validators.compose([
      Validators.required,
      Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
    ])),
    hash_password:new FormControl('', Validators.compose([
      Validators.required,
      Validators.minLength(8),
      Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&.])[a-zA-Z0-9$@$!%*?&.]+$') //this is for the letters (both uppercase and lowercase) and numbers validation
    ]))
    // more form inputs
  });


  }
}
