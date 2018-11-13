import { Component, OnInit,ViewEncapsulation } from '@angular/core';
import { Signup } from '../signup';
import { HttpClient } from '@angular/common/http';
import {FormControl,FormGroup, Validators,FormBuilder} from '@angular/forms';

@Component({
  selector: 'app-signup-form',
  templateUrl: './signup-form.component.html',
  styleUrls: ['./signup-form.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class SignupFormComponent implements OnInit {
   signUpForm: FormGroup;

   countries = [{value: 'steak-0', viewValue: 'India'},
   {value: '1', viewValue: 'USA'},
   {value: '2', viewValue: 'UK'},
   {value: '3', viewValue: 'France'},
   {value: '4', viewValue: 'Germany'},
   {value: '5', viewValue: 'Mexico'}
   ];

   model = new Signup('','','','','','');

  submitted = false;
  signUpForm_validation_messages = {
    'email': [
      { type: 'required', message: 'Email is required' },
      { type: 'pattern', message: 'Enter a valid email' }
    ],
    'hash_password': [
      { type: 'required', message: 'Password is required' },
      { type: 'minlength', message: 'Password must be at least 5 characters long' },
      { type: 'pattern', message: 'Your password must contain at least one uppercase, one lowercase,one special character and one number' }
    ],
    'firstname':[
      { type: 'required', message: 'First Name is required' }
    ],
    'lastname':[
      {type: 'required', message: 'Last Name is required'}
    ],
    'dob':[
      {type: 'required', message: 'Date of birth is required'}
    ],
    'country':[
      {type: 'required', message: 'Country is required'}
    ]
        }
  //onSubmit() { this.submitted = true; }

  // Remove this when we're done
 // get diagnostic() { return JSON.stringify(this.model); }
// resetForm = function(){
//
// }
  constructor(
    private httpClient:HttpClient,
    private fb: FormBuilder,
  ){ }

  onSubmit = function (value) {
    //alert("hello");
    //console.log(user);
    this.httpClient.post('/auth/register',value.value)
    .subscribe(data => {
            console.log("POST Request is successful ", data);
            this.router.navigateByUrl('/login-form');
        },
        error => {
            console.log("Error", error);
        });
  }
  getAge=function(dateString) {
    var today = new Date();
    var birthDate = new Date(dateString);
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return age;
}

  ngOnInit() {
    this.signUpForm = this.fb.group({
      email: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])),
      hash_password:new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(8),
        Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&.])[a-zA-Z0-9$@$!%*?&.]+$') //this is for the letters (both uppercase and lowercase) and numbers validation
      ])),
            firstname: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z]*$')
      ])),
      lastname: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z]*$')
      ])),
      dob: new FormControl('', Validators.compose([
        Validators.required
      ])),
      country: new FormControl('', Validators.compose([
        Validators.required
      ])),
      // more form inputs
    });
  }

}
