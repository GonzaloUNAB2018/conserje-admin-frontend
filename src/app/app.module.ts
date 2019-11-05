import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';


//FIREBASE
import {firebase} from './firebase.module';
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireProvider } from '../providers/angular-fire/angular-fire';
import { AngularFireStorageModule, StorageBucket } from '@angular/fire/storage';

import { MyApp } from './app.component';
import { CreateUserPage } from '../pages/create-user/create-user';
import { HttpClientModule } from '@angular/common/http';
import { HomePage } from '../pages/home/home'
import { LoginPage } from '../pages/login/login';
import { DataBasesPage } from '../pages/data-bases/data-bases';
import { DataBasePage } from '../pages/data-base/data-base';
import { UsersPage } from '../pages/users/users';
import { UserPage } from '../pages/user/user';


@NgModule({
  declarations: [
    MyApp,
    CreateUserPage,
    HomePage,
    LoginPage,
    DataBasesPage,
    DataBasePage,
    UsersPage,
    UserPage
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebase),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    AngularFireStorageModule,
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    CreateUserPage,
    HomePage,
    LoginPage,
    DataBasesPage,
    DataBasePage,
    UsersPage,
    UserPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AngularFireProvider
  ]
})
export class AppModule {}
