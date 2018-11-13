import { Component, OnInit,ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-first-page',
  templateUrl: './first-page.component.html',
  styleUrls: ['./first-page.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class FirstPageComponent implements OnInit {

  constructor(private router: Router) { }
  onLogout= function(){
    localStorage.removeItem('token');
    this.router.navigate(['/login-form']);
  }
  ngOnInit() {
  var audio = new Audio();
  audio.src = "assets/Dzeko - The Chainsmokers & Coldplay - Something Just Like.mp3";
  audio.load();
  audio.play();
  }

  }
