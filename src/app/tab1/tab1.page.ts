import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GameplayService } from '../service/gameplay.service';
import { UserService } from '../service/user.service';
import { Gameplay } from '../class/gameplay';
import { User } from '../class/user';


@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {

  choice  : boolean = false;
  new     : boolean = false;
  join    : boolean = false;
  log     : boolean = false;

  constructor(private router: Router, private gameplayService: GameplayService, private userService: UserService) {}

  ngOnInit() {

  }

  onSubmitNew(form) {
    let gameplay : Gameplay = new Gameplay(
      form.form.value.name,
      form.form.value.level,
      form.form.value.nbJoueur
    );
    this.gameplayService.postGameplay(gameplay).subscribe(data => {
      // Main Goal : Try to send the response to the next page.
      console.log(data);
      console.log(gameplay);
    });
  }

  onSubmitJoin(form) {
    let gameplay = form.form.value._id;
    this.gameplayService.getGameplay(gameplay).subscribe(data => {
      // MAIN GOAL : Recup an ID of User not set already to update it
    })
    console.log('formSubmit');
  }

  onSubmitLogIn(form) {
    let user : User = new User(null, form.form.value.username, null, form.form.value.password);

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
}
