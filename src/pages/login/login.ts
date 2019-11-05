import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, MenuController } from 'ionic-angular';
import { User } from '../../models/user';
import { AngularFireAuth } from '@angular/fire/auth';
import { HomePage } from '../home/home';



@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  user = {} as User;

  constructor(

    public navCtrl: NavController,
    public navParams: NavParams,
    private afAuth: AngularFireAuth,
    public loadingCtrl: LoadingController,
    public menuCtrl: MenuController

    ) {

      this.menuCtrl.enable(false);
      
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

login(){
  if(!this.user.email||!this.user.password){
    alert('Faltan Datos')
  }else{
    if(this.user.email==='admin@ztudy.cl'&&this.user.password==="qwerty"){
      let loadingLogin = this.loadingCtrl.create({
        content: 'Iniciando sesión'
      });
      loadingLogin.present();
      this.afAuth.auth.signInWithEmailAndPassword(this.user.email, this.user.password)
      .then(user=>{
        if(user){
          loadingLogin.dismiss();
          this.navCtrl.setRoot(HomePage);
        }
      }).catch(e=>{
        alert(e);
        loadingLogin.dismiss();
      })
    }else{
      alert('Su Usuario no cuenta con privilegios');
    }
  }
}

}
