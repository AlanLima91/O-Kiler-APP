import { Component } from '@angular/core';
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
export class Tab1Page {

  choice: boolean = false;
  new: boolean = false;
  join: boolean = false;
  log: boolean = false;
  gameplay: any;
  user: any;

  constructor(private router: Router, private gameplayService: GameplayService, private userService: UserService) { }

  onSubmitNew(form) {
    let gameplay: Gameplay = new Gameplay(
      form.form.value.name,
      form.form.value.level,
      form.form.value.nbJoueur
    );
    this.gameplayService.postGameplay(gameplay).subscribe(data => {
      // Main Goal : Try to send the response to the next page.
      console.log(data);
      console.log(gameplay);
      this.router.navigate(['/tab3']);
    });
  }

  onSubmitJoin(form) {
    // this.getGameplay(form.form.value._id).then(gameplay => {
    this.getGameplay("5d5d062103c1042ab384a135").then(gameplay => {
      this.gameplay = gameplay;
      if (this.gameplay) {
        let _id = this.gameplay.gamers[0];
        this.user = new User(_id, form.form.value.username, null, form.form.value.password);
        this.userService.updateUser(_id, this.user).subscribe(data => {
          this.user = data.user;
          this.router.navigate(['/question']);
        });
      }
    });
  }

  getGameplay(key: string) {
    return new Promise((resolve, reject) => {
      let gameplay;
      this.gameplayService.getGameplay(key).subscribe(data => {
        gameplay = data.gameplay;
        console.log(gameplay);
        gameplay ? resolve(gameplay): reject();
      });
    })
  }

  onSubmitLogIn(form) {
    let user: User = new User(null, form.form.value.username, null, form.form.value.password);

    console.log('formSubmit');
  }

  newGame() {
    console.log('new');
    this.choice = true;
    this.new = true;
  }

  joinParty() {
    console.log('joinParty');
    this.choice = true;
    this.join = true;
  }

  logIn() {
    console.log('logIn');
    this.choice = true;
    this.log = true;
  }

  back() {
    this.choice = false;
    this.new = false;
    this.join = false;
    this.log = false;
  }
}
