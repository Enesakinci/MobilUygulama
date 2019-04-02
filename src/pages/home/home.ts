import { Component ,ViewChild} from '@angular/core';
import { NavController, App ,LoadingController, AlertController} from 'ionic-angular';
import { Http, Headers, RequestOptions } from "@angular/http";
import 'rxjs/add/operator/map';
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
	@ViewChild("isim") isim;
	@ViewChild("email") email;
	@ViewChild("durum") durum;

  constructor(	public navCtrl: NavController,
                public app: App,
                public loadingCtrl :LoadingController,
                public alertCtrl :AlertController,
		            private http: Http
    ) {
  }
  Ekle(){
    var headers = new Headers();
    headers.append("Accept", 'application/json');
    headers.append('Content-Type', 'application/json');
    let options = new RequestOptions({ headers: headers });
    let data = {
      isim: this.isim.value,
      email: this.email.value,
      durum: this.durum.value,
    };
    let loader = this.loadingCtrl.create({
      content: 'Lütfen Bekleyin',
    });
    loader.present().then(() => {
      this.http.post('http://localhost:80/iondene/ekle.php', data, options)
        .map(res => res.json())
        .subscribe(res => {
          loader.dismiss()
          if (res['status'] == "true") {
            let alert = this.alertCtrl.create({
              title: "Eklendi",
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
