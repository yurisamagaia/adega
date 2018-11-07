import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, AlertController, LoadingController } from 'ionic-angular';

import { CategoriaTipoPage } from '../categoria-tipo/categoria-tipo';
import { CategoriaPaisPage } from '../categoria-pais/categoria-pais';
import { CategoriaUvaPage } from '../categoria-uva/categoria-uva';

import { ServicoProvider } from '../../providers/servico/servico';

@IonicPage()
@Component({
  selector: 'page-configuracao',
  templateUrl: 'configuracao.html',
})
export class ConfiguracaoPage {

  configuracoes =
  [
    {
      titulo: 'CADASTROS CATEGORIAS', itens: [
        { nome: 'Tipos de Vinho', icone: 'wine', componente: CategoriaTipoPage },
        { nome: 'Países', icone: 'globe', componente: CategoriaPaisPage },
        { nome: 'Uvas', icone: 'leaf', componente: CategoriaUvaPage }
      ]
    }
  ];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public modalCtrl: ModalController,
    public alertCtrl: AlertController,
    public loadingCtrl: LoadingController,
    private servicoProvider: ServicoProvider
  ) { }

  openPage(page) {
    const modal = this.modalCtrl.create(page);
    modal.present();
  }

  exportar() {
    let show = this.alertCtrl.create({
      title: 'Exportar registros',
      subTitle: 'Deseja exportar os registros cadastrados?',
      buttons: [{
        text: 'Cancelar',
      },{
        text: 'Exportar',
        handler: () => {
          let loading = this.loadingCtrl.create();
          loading.present();
          this.servicoProvider.exportar().then((result) => {
            let show = this.alertCtrl.create({
              title: 'Sucesso',
              subTitle: 'Registros exportados com sucesso',
              buttons: [{
                text: 'Concluir',
              }]
            });
            loading.dismiss();
            show.present();
          });
        }
      }]
    });
    show.present();
  }
}
