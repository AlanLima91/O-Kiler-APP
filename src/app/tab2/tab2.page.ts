import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from '../service/user.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
	gameplayKey: string;
  	user:Object;
	
	constructor(private route: ActivatedRoute,private router: Router, private alertController: AlertController, private userService: UserService){}

	onSubmit(form)
	{		
		console.log("Form value : ",form.form.value);

		this.userService.updateUser('5d54a0d24c99c61a8811d32f', form.form.value).subscribe(data => {
			this.editForm();
		})
	}

	async editForm()
	{
		const edit = await this.alertController.create({
			header: 'User updated',
			message: 'Your have join the party',
			buttons:[
				{
					text: 'OK',
					handler: () => { }
				}
			]
		});
		await edit.present();
	}
}
