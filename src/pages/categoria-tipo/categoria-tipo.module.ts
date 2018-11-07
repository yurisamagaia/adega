import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CategoriaTipoPage } from './categoria-tipo';

@NgModule({
  declarations: [
    CategoriaTipoPage,
  ],
  imports: [
    IonicPageModule.forChild(CategoriaTipoPage),
  ],
})
export class CadastroTipoPageModule {}
