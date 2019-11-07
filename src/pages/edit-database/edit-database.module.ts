import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EditDatabasePage } from './edit-database';

@NgModule({
  declarations: [
    EditDatabasePage,
  ],
  imports: [
    IonicPageModule.forChild(EditDatabasePage),
  ],
})
export class EditDatabasePageModule {}
