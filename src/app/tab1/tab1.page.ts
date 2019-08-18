import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';


@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {
  
  choice    : boolean = false; 
  new       : boolean = false;
  join : boolean = false;
  log     : boolean = false;

  constructor(private router: Router) {}

  ngOnInit() {

  }

  onSubmit(form) {
    console.log('formSubmit');
  }

  newGame() {
    console.log('new');
    this.choice = true;
    this.new    = true;
  }

  joinParty() {
    console.log('joinParty');
    this.choice = true;
    this.join    = true;
  }

  logIn() {
    console.log('logIn');
    this.choice = true;
    this.log    = true;
  }

  back() {
    this.choice = false;
    this.new = false;
    this.join = false;
    this.log = false;
  }

  /**
   * The goal here is to pass information from a page to another
   * Start point
   */
  // test() {
  //   let navigationExtras: NavigationExtras = {
  //     state: {
  //       gameplay: this.gameplay
  //     }
  //   };
  //   this.router.navigate(['where'], navigationExtras);
  // }

  /**
   *    The Other side
   */
  // data: any;
 
  // constructor(private route: ActivatedRoute, private router: Router) {
  //   this.route.queryParams.subscribe(params => {
  //     if (this.router.getCurrentNavigation().extras.state) {
  //       this.data = this.router.getCurrentNavigation().extras.state.user;
  //     }
  //   });
  // }
}
