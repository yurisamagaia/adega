import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';

import { AdegaPage } from '../adega/adega';
import { ProdutoPage } from '../produto/produto';
import { ConfiguracaoPage } from '../configuracao/configuracao';

@IonicPage()
@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html'
})
export class TabsPage {

  adegaRoot = AdegaPage;
  produtoRoot = ProdutoPage;
  configuracaoRoot = ConfiguracaoPage;

  constructor(public navCtrl: NavController) { }

}
