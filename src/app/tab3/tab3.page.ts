import { Component } from '@angular/core';
import { User } from '../class/user';
import { UserService } from '../service/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {
  // On essaye de recevoir l'id du gameplay pour avoir accès à la liste des utilisateurs.
  constructor(private router: Router, private userService: UserService) {}

  onSubmitNew(form) {
    console.log('new submit');
    let user: User = new User(null, form.form.value.username, null, form.form.value.password);

    this.userService.updateUser('null', user).subscribe(data => { // Replace le null par l'id de l'user
      console.log(data);
    });
  }
}
