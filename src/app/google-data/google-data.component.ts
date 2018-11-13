import { Component, OnInit,ViewEncapsulation } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-google-data',
  templateUrl: './google-data.component.html',
  styleUrls: ['./google-data.component.css']
})
export class GoogleDataComponent implements OnInit {

  constructor() { }
  winonload = function(){
    this.httpClient.get('/auth/google/callback')
    .subscribe(data => {
            console.log("Get Request is successful ", data);
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
  ngOnInit() {
  this.winonload();
  }

}
