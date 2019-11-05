import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DataBasesPage } from './data-bases';

@NgModule({
  declarations: [
    DataBasesPage,
  ],
  imports: [
    IonicPageModule.forChild(DataBasesPage),
  ],
})
export class DataBasesPageModule {}
