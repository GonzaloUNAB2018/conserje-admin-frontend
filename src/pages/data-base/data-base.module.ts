import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DataBasePage } from './data-base';

@NgModule({
  declarations: [
    DataBasePage,
  ],
  imports: [
    IonicPageModule.forChild(DataBasePage),
  ],
})
export class DataBasePageModule {}
