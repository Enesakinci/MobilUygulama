import { Component } from '@angular/core';
import { AlertController, App, LoadingController, NavController, NavParams, MenuController } from 'ionic-angular';
import { Http, Headers, RequestOptions }  from "@angular/http";
import { GuncellePage } from '../guncelle/guncelle';


@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html'
})
export class ContactPage {
  //public id: any;
  public  veri: any[];
  constructor(public navCtrl: NavController,
    public loadingCtrl: LoadingController,
		public alertCtrl: AlertController,
		public app: App,
		public menuCtrl: MenuController, 
    public navParams: NavParams,
    private http: Http) {

      var headers = new Headers();
			headers.append("Accept", 'application/json');
			headers.append('Content-Type', 'application/json' );
      let options = new RequestOptions({ headers: headers });
      let loader = this.loadingCtrl.create({
				content: 'Lütfen Bekleyin',
			});

			loader.present().then(() => {
				this.http.post('http://localhost:80/iondene/getir.php', options)
				.map(res => res.json())
				.subscribe(res => {
					loader.dismiss()
					if(res['status']=="true"){
             console.log(res.userdata);
             			this.veri=res.userdata;	
          }
					}); 
						
					
				
			});

  }
  sil(id:any){
      
      //console.log(id);
      var headers = new Headers();
			headers.append("Accept", 'application/json');
			headers.append('Content-Type', 'application/json' );
			let options = new RequestOptions({ headers: headers });
			let data = JSON.stringify({
				id: id,
				
			});

			let loader = this.loadingCtrl.create({
				content: 'Lütfen Bekleyin',
			});

			loader.present().then(() => {
				this.http.post('http://localhost:80/iondene/sil.php',data, options)
				.map(res => res.json())
				.subscribe(res => {
					loader.dismiss()
					if(res['status']=="true"){
						// console.log(res.userdata[0]);
						let alert = this.alertCtrl.create({
							title:"Bilgi",
							subTitle:('Silindi!'),
							buttons: ['OK']
						});
						// create variable to store userdata into localstorage

						
					} else {
						let alert = this.alertCtrl.create({
							title:"Hata",
							subTitle:(res.message),
							buttons: ['OK']
						});
						alert.present();
					}
				});
			});

	}
	guncelle(id:any){
		console.log(id);
			this.navCtrl.push(GuncellePage,{
				g_id: id 
			});


	}

}
