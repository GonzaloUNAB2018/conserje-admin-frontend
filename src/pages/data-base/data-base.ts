import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireProvider } from '../../providers/angular-fire/angular-fire';
import { Observable } from 'rxjs';
import { UsersPage } from '../users/users';

@IonicPage()
@Component({
  selector: 'page-data-base',
  templateUrl: 'data-base.html',
})
export class DataBasePage {

  id: any;
  dataBase: Observable<any>;
  showData: boolean = false;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private afProvider: AngularFireProvider
    ) {
      this.id = navParams.get('id');
      console.log(this.id);
      this.getDataBase();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DataBasePage');
  }

  getDataBase(){
    this.dataBase = this.afProvider.getDataBase(this.id).valueChanges();
    if(this.dataBase){
      this.showData = true;
      console.log(this.showData)
    }
  }

  toUsersPage(){
    this.navCtrl.push(UsersPage, {id:this.id})
  }

}
