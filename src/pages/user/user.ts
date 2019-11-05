import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';
import { AngularFireProvider } from '../../providers/angular-fire/angular-fire';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

@IonicPage()
@Component({
  selector: 'page-user',
  templateUrl: 'user.html',
})
export class UserPage {

  user : Observable<any>;
  id: any;
  uid: any;
  image: any;
  userDeletedData: any;
  usr : any;
  show : boolean = false;
  sex : any;
  profile : any;
  password: string;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public afProvider: AngularFireProvider,
    public alertCtrl: AlertController,
    public loadingCtrl: LoadingController,
    public http: HttpClient,
    ) {

      this.sex = navParams.get('sex');
      this.profile = navParams.get('profile');
      this.id = navParams.get('id');
      this.uid = navParams.get('uid');
      this.getUserData();
      
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UserPage');
  }

  getUserData(){
    this.user = this.afProvider.getUser(this.id, this.uid).valueChanges();
  }

  toDeleteUser(){
    const alert = this.alertCtrl.create({
      title: 'Confirmar eliminación de usuario',
      message: '¿Desea eliminarlo?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Ok',
          handler: () => {
          this.deleteUser(this.uid);
          }
        }
      ]
    });
    alert.present();
  }

  deleteUser(uid){
    console.log(uid);
    let loadingDeleteUser = this.loadingCtrl.create({
      content: 'Eliminando Usuario'
    });
    loadingDeleteUser.present();
    this.http.post('http://localhost:8080/deleteuser', {
      uid: uid,
    })
    .pipe(map(res=>res))
    .subscribe(userDeletedData=>{
      loadingDeleteUser.dismiss();
        this.userDeletedData = userDeletedData;
        console.log(this.id, this.uid)
        this.afProvider.deleteUser(this.id, this.uid);
        const alert = this.alertCtrl.create({
          title: 'Usuario Borrado',
          message: this.userDeletedData.message,
          buttons: [
            {
              text: 'Ok',
              handler: () => {
                this.navCtrl.pop();
              }
            }
          ]
        });
        alert.present();
    });
    
  }

  showPassword(){
    this.getUserData();
    this.http.post('http://localhost:8080/getpassword', {
      uid: this.uid,
    })
    .pipe(map(res=>res))
    .subscribe(userData=>{
      console.log(userData)
    });
    this.show = true;
    setTimeout(() => {
      this.show = false;
    }, 5000);
  }

}
