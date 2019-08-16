import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';


@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {
  gameplay: any = null; 

  constructor(private router: Router) {}

  ngOnInit() {

  }

  newGame() {
  }

  joinParty() {
  }

  logIn() {
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
