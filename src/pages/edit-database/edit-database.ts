import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ToastController } from 'ionic-angular';
import { DataBase } from '../../models/database';
import { AngularFireProvider } from '../../providers/angular-fire/angular-fire';

@IonicPage()
@Component({
  selector: 'page-edit-database',
  templateUrl: 'edit-database.html',
})
export class EditDatabasePage {

  database = {} as DataBase;
  db: any;
  id: any;
  edit: string = 'no';
  editButton: boolean = false;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private afProvider: AngularFireProvider,
    public loadCtrl: LoadingController,
    public toastCtrl: ToastController
    ) {
      this.id = this.navParams.get('id');
      this.edit = this.navParams.get('edit');
      if(this.edit === 'yes'){
        this.editButton = true;
      }else{
        this.editButton = false;
      }
      this.afProvider.getDataBase(this.id).valueChanges().subscribe(db=>{
        if(db){
          this.db = db;
          if(this.db){
            this.database.name = this.db.name;
            this.database.type = this.db.type;
            this.database.commit = this.db.commit;
            this.database.address = this.db.address;
            this.database.city = this.db.city;
          }
        }
      })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditDatabasePage');
  }

  createDatabase(){
    if (this.database.name&&this.database.type&&this.database.commit) {
      let load = this.loadCtrl.create({
        content: 'Creando Base de Datos',
        spinner: 'hide'
      });
      load.present().then(()=>{
        this.afProvider.reUseDataBase(this.id, this.database);
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
