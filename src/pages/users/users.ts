import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { AngularFireProvider } from '../../providers/angular-fire/angular-fire';
import { CreateUserPage } from '../create-user/create-user';
import { UserPage } from '../user/user';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@IonicPage()
@Component({
  selector: 'page-users',
  templateUrl: 'users.html',
})
export class UsersPage {

  id: any;
  users: any;
  usrs: any;
  conserjes: any[];
  vecinos: any[];
  user : Observable<any>;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private afProvider: AngularFireProvider,
    public loadingCtrl: LoadingController,
    public http: HttpClient
    ) {
      
      this.id = navParams.get('id');
      console.log(this.id);
      this.getUsers(this.id);
      this.getAllServerUsers();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UsersPage');
  }

  getUsers(id){
    let load = this.loadingCtrl.create({
      content: 'Cargando Usuarios'
    });
    load.present();
    this.afProvider.getUsers(id).valueChanges().subscribe(users=>{
      this.users = users;
      this.conserjes = this.users.filter(user=>user.profile==='conserje');
      this.vecinos = this.users.filter(user=>user.profile==='vecino');
      if(users){
        load.dismiss();
      }
    });
    //this.user = this.afProvider.getUser(this.id, this.uid).valueChanges();
  }

  getAllServerUsers(){
    let load = this.loadingCtrl.create({
      content: 'Cargando Usuarios'
    });
    load.present();
    this.http.post('http://localhost:8080/getAllUsers', {
      message:'Solicitando Usuarios'
    })
    .pipe(map(res=>res))
    .subscribe(users=>{
      load.dismiss();
        this.usrs = users;
        console.log(this.usrs);
    });
  }

  createUser(){
    this.navCtrl.push(CreateUserPage, {id:this.id});
  }

  goToUserPage(uid, sex, profile){
    this.navCtrl.push(UserPage, {id:this.id, uid:uid, sex:sex, profile:profile});
  }

  filterUsersOfType(profile: string){
    return this.users.filter(user => user.profile === profile)
  }
  


}
