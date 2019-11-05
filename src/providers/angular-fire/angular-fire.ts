import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';

@Injectable()
export class AngularFireProvider {

  constructor(
    public http: HttpClient,
    public afDb: AngularFireDatabase
    ) {
    console.log('Hello AngularFireProvider Provider');
  }

  getDataBases(){
    return this.afDb.list('/');
  }

  getDataBase(id){
    return this.afDb.object(id+'/Data');
  }

  createDataBase(db){
    this.afDb.database.ref(db.id+'/Data').set(db);
  }

  reUseDataBase(db){
    this.afDb.database.ref(db.id+'/Data').update(db);
  }

  deleteDataBase(id, type){
    this.afDb.database.ref(id).remove();
    setTimeout(() => {
      let db = {
        name: null,
        type: type,
        id: id,
      }
      db.name = 'Eliminado';
      //db.type = 'Eliminado';
      this.afDb.database.ref(db.id+'/Data').set(db);
    }, 1000);
  }

  getUsers(id){
    return this.afDb.list(id+'/Users');
  }

  getUser(id, uid){
    return this.afDb.object(id+'/Users/'+uid);
  }

  createUser(id, user){
    this.afDb.database.ref(id+'/Users/'+user.uid).set(user);
  }

  deleteUser(id, uid){
    this.afDb.database.ref(id+'/Users/'+uid).remove();
  }

}
