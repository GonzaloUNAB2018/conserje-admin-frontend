import { Component, ViewChild } from '@angular/core';
import { Platform, Nav, LoadingController, NavController, MenuController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { LoginPage } from '../pages/login/login';
import { AngularFireAuth } from '@angular/fire/auth';
import { HomePage } from '../pages/home/home';
import { DataBasesPage } from '../pages/data-bases/data-bases';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {

  @ViewChild(Nav) nav: Nav;
  uid : any;

  constructor(
    platform: Platform,
    statusBar: StatusBar,
    splashScreen: SplashScreen,
    private afAuth: AngularFireAuth,
    public loadingCtrl: LoadingController,
    public menuCtrl: MenuController,
    ) {
    platform.ready().then(() => {
      this.getUserState();
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }

  getUserState(){
    this.afAuth.auth.onAuthStateChanged(user=>{
      if(user){
        this.nav.setRoot(HomePage);
        this.uid = this.afAuth.auth.currentUser.uid;
      }else{
        this.nav.setRoot(LoginPage)
      }
    })
  }

  logout(){
    let load = this.loadingCtrl.create({
      content: 'Cerrando Aplicación'
    });
    load.present();
    this.afAuth.auth.signOut().then(()=>{
      this.nav.setRoot(LoginPage).then(()=>{
        load.dismiss();
      }).catch(e=>{
        load.dismiss();
        alert(e);
      })
    }).catch(e=>{
      alert(e);
      load.dismiss();
    })
  }

  toDataBasesPage(){
    this.nav.push(DataBasesPage);
    this.menuCtrl.close();
  }
}

