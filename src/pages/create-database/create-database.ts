import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, LoadingController } from 'ionic-angular';
import { DataBase } from '../../models/database';
import { AngularFireProvider } from '../../providers/angular-fire/angular-fire';

@IonicPage()
@Component({
  selector: 'page-create-database',
  templateUrl: 'create-database.html',
})
export class CreateDatabasePage {

  database = {} as DataBase;
  dataBases: any[];
  dataBasesNumber: number = 0;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private afProvider: AngularFireProvider,
    public toastCtrl: ToastController,
    public loadCtrl: LoadingController,
    ) {
      this.dataBasesNumber = this.navParams.get('dataBasesNumber');
      console.log(this.dataBasesNumber);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CreateDatabasePage');
  }

  saveDB(dataBasesNumber){
    if(dataBasesNumber>=10){
      this.database.id = '00'+dataBasesNumber
    }else{
      this.database.id = '000'+dataBasesNumber
    }
    this.afProvider.createDataBase(this.database);
  }

  createDatabase(){
    if (this.database.name&&this.database.type&&this.database.commit) {
      let load = this.loadCtrl.create({
        content: 'Creando Base de Datos',
        spinner: 'hide'
      });
      load.present().then(()=>{
        this.saveDB(this.dataBasesNumber);
        this.navCtrl.pop().then(()=>{
          load.dismiss();
        });
      });
    } else {
      let toast = this.toastCtrl.create({
        message: 'Faltan Datos',
        duration: 2000,
      });
      toast.present();
    }
  }

}
