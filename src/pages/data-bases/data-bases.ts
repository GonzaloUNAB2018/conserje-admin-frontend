import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController, ToastController } from 'ionic-angular';
import { AngularFireProvider } from '../../providers/angular-fire/angular-fire';
import { DataBase } from '../../models/database';
import { DataBasePage } from '../data-base/data-base';

@IonicPage()
@Component({
  selector: 'page-data-bases',
  templateUrl: 'data-bases.html',
})
export class DataBasesPage {

  database = {} as DataBase;
  dataBases: any[];
  dataBasesNumber: number = 0;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private afProvider : AngularFireProvider,
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController,
    public toastCtrl: ToastController
    ) {
      
  }

  ionViewDidLoad() {
    this.getDataBases();
  }

  getDataBases(){
    let load_one = this.loadingCtrl.create({
      content: 'Recuperando Datos.'
    });
    load_one.present();
    this.afProvider.getDataBases().valueChanges().subscribe(dataBases=>{
      this.dataBases = dataBases;
      if(this.dataBases){
        load_one.dismiss();
        this.dataBasesNumber = this.dataBases.length;
      };
    })
  }

  createDataBase(){
    let alert = this.alertCtrl.create({
      title: 'Crear Base de Datos',
      inputs: [
        {
          name: 'database_name',
          placeholder: 'Nombre BD',
          type: 'text'
        },
        {
          name: 'text',
          placeholder: 'Comentarios',
          type: 'text'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: data => {
            //console.log('Cancel clicked');
          }
        },
        {
          text: 'Create',
          handler: data => {
            if (data.database_name&&data.text) {
              this.database.name = data.database_name;
              this.database.type = data.text;
              this.saveDB(this.dataBasesNumber);
            } else {
              let toast = this.toastCtrl.create({
                message: 'Faltan Datos',
                duration: 1500,
              });
              toast.present();
              
            }
          }
        }
      ]
    });
    alert.present()
  }

  saveDB(dataBasesNumber){
    if(dataBasesNumber>=10){
      this.database.id = '00'+dataBasesNumber
    }else{
      this.database.id = '000'+dataBasesNumber
    }
    this.afProvider.createDataBase(this.database);
    this.getDataBases();
  }

  deleteDataDase(id, name){
    console.log(id, name);
    let alert = this.alertCtrl.create({
      title: 'Eliminar Base de Datos',
      message: '¿Realmente desea eliminar la base de datos de '+name+' ?',
      inputs: [
        {
          name: 'commit',
          placeholder: 'Comentario',
          type: 'text'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: data => {
            //console.log('Cancel clicked');
          }
        },
        {
          text: 'Delete',
          handler: data => {
            if(data.commit){
              this.deleteDB(name, id, data.commit);
            }else{
              let toast = this.toastCtrl.create({
                message: 'Comente por favor',
                duration: 2000
              });
              toast.present()
            }
            
          }
        }
      ]
    });
    alert.present()
  }

  deleteDB(name, id, type){
    this.afProvider.deleteDataBase(id, type);
    let toast = this.toastCtrl.create({
      message: 'Base de datos '+name+' borrada',
      duration: 2000
    });
    toast.present();
    this.getDataBases();
  }

  reUseDataBase(id){
    console.log(id)
    let alert = this.alertCtrl.create({
      title: 'Reutilizar Base de Datos Eliminada',
      inputs: [
        {
          name: 'database_rename',
          placeholder: 'Nombre BD',
          type: 'text'
        },
        {
          name: 'reuse_text',
          placeholder: 'Comentarios',
          type: 'text'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: data => {
            //console.log('Cancel clicked');
          }
        },
        {
          text: 'Create',
          handler: data => {
            if (data.database_rename&&data.reuse_text) {
              this.database.name = data.database_rename;
              this.database.type = data.reuse_text;
              this.database.id = id;
              this.afProvider.reUseDataBase(this.database)
              this.getDataBases();
            } else {
              let toast = this.toastCtrl.create({
                message: 'Faltan Datos',
                duration: 1500,
              });
              toast.present();
              
            }
          }
        }
      ]
    });
    alert.present()
  }

  goToDataBasePage(id){
    this.navCtrl.push(DataBasePage, {id:id});
  }

}
