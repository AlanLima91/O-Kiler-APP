import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { HTTP } from '@ionic-native/http/ngx';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
	gameplayKey: string;
  	user:Object;
	
	/*  constructor(private router: Router, private alertController: AlertController,private http: HTTP)
 		{}

	/*onSubmit(form)
	{

		console.log("Form value : ",form.form.value);
		/*this.http.patch('https://o-killer.herokuapp.com/user/'+this.gameplayKey,form.form.value,{}).then(data => {
			/*this.editForm();
			this.router.navigateByUrl('');*/
			//console.log(data);
		//})
		
		
	//}


	/*async editForm()
	{
		const edit = await this.alertController.create({
			header: 'User updated',
			message: 'Your are join the party',
			buttons:[
			{
				text: 'OK',
				handler: () => { }
			}
			]
		});
		await edit.present();
	}*/

}
