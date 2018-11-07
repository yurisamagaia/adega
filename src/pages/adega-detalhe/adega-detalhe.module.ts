import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AdegaDetalhePage } from './adega-detalhe';

@NgModule({
  declarations: [
    AdegaDetalhePage,
  ],
  imports: [
    IonicPageModule.forChild(AdegaDetalhePage),
  ],
})
export class AdegaDetalhePageModule {}
