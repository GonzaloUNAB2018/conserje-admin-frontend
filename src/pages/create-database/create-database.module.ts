import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CreateDatabasePage } from './create-database';

@NgModule({
  declarations: [
    CreateDatabasePage,
  ],
  imports: [
    IonicPageModule.forChild(CreateDatabasePage),
  ],
})
export class CreateDatabasePageModule {}
