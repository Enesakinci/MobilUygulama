import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { GuncellePage } from './guncelle';

@NgModule({
  declarations: [
    GuncellePage,
  ],
  imports: [
    IonicPageModule.forChild(GuncellePage),
  ],
})
export class GuncellePageModule {}
