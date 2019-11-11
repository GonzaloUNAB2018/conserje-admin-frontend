import { Component } from '@angular/core';
import { NavController, LoadingController, ToastController, AlertController, NavParams } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { User } from '../../models/user';
import { AngularFireProvider } from '../../providers/angular-fire/angular-fire';
import { validate, format } from 'rut.js';


@Component({
  selector: 'page-create-user',
  templateUrl: 'create-user.html'
})
export class CreateUserPage {

  data: any;
  user = {} as User;
  date: number;
  month: number;
  year: number;
  password: string;
  vpassword: string;
  users: any;
  userData: any;
  userDeletedData: any;
  consulta = {
    message: 'Está conectado el servidor?'
  };
  id: any;
  //profilePhoto: string = ProfilePhoto.profilePhotoDefault;
  providerData:[ { 
    uid: undefined,//'a@a.cl',
    displayName: undefined,
    email: undefined,//'a@a.cl',
    photoURL: undefined,
    providerId: undefined//'password',
    phoneNumber: undefined
  } ];
  run: string;

  constructor(
    public navCtrl: NavController,
    public http: HttpClient,
    public loadingCtrl: LoadingController,
    public toastCtrl: ToastController,
    public alertCtrl: AlertController,
    private afProvider: AngularFireProvider,
    public navParams: NavParams
    ) {
       this.id = navParams.get('id');
  } 

  ionViewDidLoad(){
    this.consultaServidor();
    //this.setDate();
    //this.getUsers();
  }

  consultaServidor(){
    let loadingServer = this.loadingCtrl.create({
      content: 'Iniciando conexión con el servidor'
    });
    loadingServer.present();
    this.http.post('https://conserje-cl.appspot.com/contact', {
      message : this.consulta.message
    })
    .pipe(map(res=>res))
    .subscribe(data=>{
      this.data = data
      console.log(this.data.message);
      if(this.data){
        loadingServer.dismiss();
        //this.toast('Servidor Conectado')
      }else{
        setTimeout(()=>{
          loadingServer.dismiss();
          //this.toast('No se puede conectar al servidor')
        },10000)
      }
    });
  }

  setDate(){
    let date = new Date();
    let day;
    if(date.getDate()<10){
      day = '0'+date.getDate().toString();
    }else{
      day = date.getDate();
    };
    let month;
    if(date.getMonth()<10){
      month = '0'+date.getMonth().toString();
    }else{
      month = date.getMonth();
    };
    let year = date.getFullYear();
    let hr;
    if(date.getHours()<10){
      hr = '0'+date.getHours().toString();
    }else{
      hr = date.getHours()
    };
    let min;
    if(date.getMinutes()<10){
      min = '0'+date.getMinutes().toString();
    }else{
      min = date.getMinutes();
    }
    let seg;
    if(date.getSeconds()<10){
      seg = '0'+date.getSeconds().toString();
    }else{
      seg = date.getSeconds();
    }
    this.user.dateUserCreateResume = day+'-'+month+'-'+year+' '+hr+':'+min+':'+seg;
    console.log(this.user.dateUserCreateResume);
  }

  createUser(){
    console.log(format(this.run));
    if(!this.user.name||!this.user.surname||!this.run||!this.user.phoneNumber||!this.password||!this.vpassword||!this.month||!this.year){
      alert('Faltan datos!')
    }else{
      if(this.password===this.vpassword){
        if(validate(this.run)){
          this.user.run = format(this.run);
          this.user.dateBirth = this.date.toString()+'-'+this.month.toString()+'-'+this.year.toString();
          this.http.post('https://conserje-cl.appspot.com/createuser', {
            displayName: this.user.name+' '+this.user.surname,
            email: this.user.email,
            phoneNumber: '+56'+this.user.phoneNumber,
            password: this.password,
            disabled: false,
            /*providerData: [{
              uid: this.user.email,//'a@a.cl',
              displayName: this.user.name+' '+this.user.surname,
              email: this.user.email,//'a@a.cl',
              //photoURL: undefined,
              providerId: 'password',//'password',
              //phoneNumber: undefined
            }]*/
          })
          .pipe(map(res=>res))
          .subscribe(data=>{
            this.userData = data;
            console.log(this.userData);
            if(this.userData){
              this.setDate();
              this.user.uid = this.userData.uid;
              this.user.phone = '+56'+this.user.phoneNumber;
              //this.user.profilePhoto = 'null';
              this.user.dateUserCreate = new Date().toString();
              console.log(this.user);
              this.afProvider.createUser(this.id, this.user);
              const alert = this.alertCtrl.create({
                title: 'Nuevo Usuario Crado',
                message: 'Email: '+this.userData.email,
                buttons: [
                  {
                    text: 'Ok',
                    handler: () => {
                      //this.getUsers();
                      this.user.name = null;
                      this.user.surname = null;
                      this.user.password = null;
                      this.user.phoneNumber = null;
                      this.user.email = null;
                      this.navCtrl.pop();
                    }
                  }
                ]
              });
              alert.present();
              /*this.http.post('http://localhost:8080/sendemail',{
                email: this.user.email,
              })
              .pipe(map(res=>res))
              .subscribe(data=>{
                console.log(data)
              })*/
            }
          })
        }else{
          alert('Rut no válido')
        }
      }else{
        alert('Passwords no coinciden')
      }
    }
  }

  /*getUsers(){
    this.http.get('http://localhost:8080/getallusers').pipe(map(res=>res)).subscribe(users=>{
      this.users = users;
    })
  }*/

  

  toast(message){
    let toast = this.toastCtrl.create({
      message: message,
      duration: 1000
    });

    toast.present();
  }

  pop(){
    this.navCtrl.pop();
  }


}


