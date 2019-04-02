import { Component, ViewChild } from '@angular/core';
import { AlertController, App, LoadingController, NavController, NavParams, MenuController } from 'ionic-angular';
import { Http, Headers, RequestOptions }  from "@angular/http";
import 'rxjs/add/operator/map';

/**
 * Generated class for the GuncellePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-guncelle',
  templateUrl: 'guncelle.html',
})
export class GuncellePage {
  @ViewChild("isim") isim;
	@ViewChild("email") email;
	@ViewChild("durum") durum;
  id_l:any;
  public  veri: any[];
  
  constructor(public navCtrl: NavController,
    public loadingCtrl: LoadingController,
		public alertCtrl: AlertController,
		public app: App,
		public menuCtrl: MenuController, 
    public navParams: NavParams,
    private http: Http) {

    this.id_l = navParams.get('g_id');
    console.log(this.id_l);
    var headers = new Headers();
			headers.append("Accept", 'application/json');
			headers.append('Content-Type', 'application/json' );
      let options = new RequestOptions({ headers: headers });
      let data = {
        id: this.id_l
      };
      let loader = this.loadingCtrl.create({
				content: 'Lütfen Bekleyin',
			});

			loader.present().then(() => {
				this.http.post('http://localhost:80/iondene/selectwhere.php', data, options)
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
  guncelle(){

    var headers = new Headers();
    headers.append("Accept", 'application/json');
    headers.append('Content-Type', 'application/json');
    let options = new RequestOptions({ headers: headers });
    let data = {
      isim: this.isim.value,
      email: this.email.value,
      durum: this.durum.value,
      id: this.id_l
    };
    let loader = this.loadingCtrl.create({
      content: 'Lütfen Bekleyin',
    });
    loader.present().then(() => {
      this.http.post('http://localhost:80/iondene/update.php', data, options)
        .map(res => res.json())
        .subscribe(res => {
          loader.dismiss()
          if (res['status'] == "true") {
            
            let alert = this.alertCtrl.create({
              title: "Güncellendi",
              subTitle: (res.message),
              buttons: ['OK']
            });
            alert.present();
            
          } else {
            let alert = this.alertCtrl.create({
              title: "Hata",
              subTitle: (res.message),
              buttons: ['OK']
            });
            alert.present();
          }
        });
    });
   
  }

  

}
