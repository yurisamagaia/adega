import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CategoriaPaisPage } from './categoria-pais';

@NgModule({
  declarations: [
    CategoriaPaisPage,
  ],
  imports: [
    IonicPageModule.forChild(CategoriaPaisPage),
  ],
})
export class CadastroPaisPageModule {}
