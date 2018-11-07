import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, LoadingController, Events } from 'ionic-angular';
import { DomSanitizer } from '@angular/platform-browser';
import { Camera, CameraOptions } from '@ionic-native/camera';

import { ProdutoProvider, Produto } from '../../providers/produto/produto';
import { CategoriaTipoProvider } from '../../providers/categoria-tipo/categoria-tipo';
import { CategoriaPaisProvider } from '../../providers/categoria-pais/categoria-pais';
import { CategoriaUvaProvider } from '../../providers/categoria-uva/categoria-uva';
import { AvatarProvider } from '../../providers/avatar/avatar';

@IonicPage()
@Component({
  selector: 'page-produto-editar',
  templateUrl: 'produto-editar.html',
})
export class ProdutoEditarPage {

  model: Produto;
  produtos: any[] = [];
  categoriasTipo: any[] = [];
  categoriasPais: any[] = [];
  categoriasUva: any[] = [];
  /* tslint:disable:no-unused-variable */
  private avatar: string = AvatarProvider.avatarGrande();

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private toast: ToastController,
    public loadingCtrl: LoadingController,
    public events: Events,
    private produtoProvider: ProdutoProvider,
    private categoriaTipoProvider: CategoriaTipoProvider,
    private categoriaPaisProvider: CategoriaPaisProvider,
    private categoriaUvaProvider: CategoriaUvaProvider,
    private sanitizer: DomSanitizer,
    private camera: Camera
  ) {
    this.model = new Produto();
    if (this.navParams.data.id) {
      let loading = this.loadingCtrl.create();
      loading.present();
      this.produtoProvider.get(this.navParams.data.id).then((result: any) => {
        this.model = result;
        loading.dismiss();
      });
    }
  }

  ionViewDidLoad() {
    this.categoriaTipo();
    this.categoriaPais();
    this.categoriaUva();
  }

  adicionarQuantidade() {
    this.model.estoque += 1;
  }

  removerQuantidade() {
    if(this.model.estoque > 0) {
      this.model.estoque -= 1;
    }
  }

  categoriaTipo() {
    this.categoriaTipoProvider.getAll().then((result: any[]) => {
      this.categoriasTipo = result;
    }).catch(() => {
      this.toast.create({ message: 'Erro ao carregar os tipos', duration: 3000, position: 'top' }).present();
    });
  }

  categoriaPais() {
    this.categoriaPaisProvider.getAll().then((result: any[]) => {
      this.categoriasPais = result;
    }).catch(() => {
      this.toast.create({ message: 'Erro ao carregar os paises', duration: 3000, position: 'top' }).present();
    });
  }

  categoriaUva() {
    this.categoriaUvaProvider.getAll().then((result: any[]) => {
      this.categoriasUva = result;
    }).catch(() => {
      this.toast.create({ message: 'Erro ao carregar as uvas', duration: 3000, position: 'top' }).present();
    });
  }

  salvar() {
    this.salvarProduto().then(() => {
      this.toast.create({ message: 'Produto salvo com sucesso', duration: 3000, position: 'top' }).present();
      this.events.publish('adega');
      this.navCtrl.pop();
    }).catch(() => {
      this.toast.create({ message: 'Erro ao salvar produto', duration: 3000, position: 'top' }).present();
    });
  }

  private salvarProduto() {
    if (this.model.id) {
      return this.produtoProvider.update(this.model);
    } else {
      return this.produtoProvider.insert(this.model);
    }
  }

  fotoGaleria() {
    this.escolherImagem(this.camera.PictureSourceType.PHOTOLIBRARY);
  }

  fotoCamera() {
    this.escolherImagem(this.camera.PictureSourceType.CAMERA);
  }

  fotoRemover() {
    this.model.foto = '';
  }

  escolherImagem(sourceType) {
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      allowEdit: true,
      sourceType: sourceType,
      correctOrientation: true,
      targetWidth: 200,
		  targetHeight: 350
    }
    this.camera.getPicture(options).then((imageData) => {
      this.model.foto = 'data:image/jpeg;base64,' + imageData;
    }, () => {
      this.toast.create({ message: 'Nenhuma imagem selecionada, tente novamente', duration: 3000, position: 'top' }).present();
    });
  }

  converteImagem(imagem) {
    return this.sanitizer.bypassSecurityTrustUrl(imagem);
  }
}
