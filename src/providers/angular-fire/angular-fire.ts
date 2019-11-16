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
    return this.afDb.list('Databases/');
  }

  getDataBase(id){
    return this.afDb.object('Databases/'+id+'/Data');
  }

  createDataBase(db){
    this.afDb.database.ref('Databases/'+db.id+'/Data').set(db);
  }

  reUseDataBase(id, db){
    this.afDb.database.ref('Databases/'+id+'/Data').update(db);
  }

  deleteDataBase(id, commit){
    this.afDb.database.ref(id).remove();
    setTimeout(() => {
      let db = {
        name: null,
        commit: commit,
        id: id,
      }
      db.name = 'Eliminado';
      //db.type = 'Eliminado';
      this.afDb.database.ref('Databases/'+db.id+'/Data').set(db);
    }, 1000);
  }

  getUsers(id){
    return this.afDb.list('Databases/'+id+'/Users');
  }

  getUser(id, uid){
    return this.afDb.object('Databases/'+id+'/Users/'+uid);
  }

  createUser(id, user){
    let user_id = {
      id: id
    };
    this.afDb.database.ref('Databases/'+id+'/Users/'+user.uid).set(user);
    this.afDb.database.ref('Users/'+user.uid).set(user_id);
  }

  deleteUser(id, uid){
    this.afDb.database.ref('Databases/'+id+'/Users/'+uid).remove();
    this.afDb.database.ref('Users/'+uid);
  }

}
