import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-loader',
  templateUrl: './loader.page.html',
  styleUrls: ['./loader.page.scss'],
})
export class LoaderPage implements OnInit {

  constructor( private router: Router) { }


  load() {
    setTimeout(() => {
      this.router.navigateByUrl('/home');
    }, 2500)
  }

  ngOnInit() {
   this.load();
  }

}
