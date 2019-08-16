import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
	gameplayKey: string;
  	user:Object;
	
	constructor(private route: ActivatedRoute,private router: Router, private alertController: AlertController, private http: HttpClient){}

	onSubmit(form)
	{
		const httpOptions = {
			headers: new HttpHeaders({
				'Content-Type':  'application/json',
				'Accept':  'application/json'
			})
		};
		
		console.log("Form value : ",form.form.value);
		this.http.patch('https://o-killer.herokuapp.com/user/5d54a0d24c99c61a8811d32f',form.form.value,httpOptions).subscribe(data => {
			this.editForm();
			//this.router.navigateByUrl('');
			console.log(data);
		})
		
		
	}

	async editForm()
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
	}

}
