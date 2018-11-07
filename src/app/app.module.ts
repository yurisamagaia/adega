import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { SQLite } from '@ionic-native/sqlite';
import { HttpModule } from '@angular/http';
import { Camera } from '@ionic-native/camera';

import { MyApp } from './app.component';
import { TabsPage } from '../pages/tabs/tabs';
import { AdegaPage } from '../pages/adega/adega';
import { AdegaDetalhePage } from '../pages/adega-detalhe/adega-detalhe';
import { ProdutoPage } from '../pages/produto/produto';
import { ProdutoEditarPage } from '../pages/produto-editar/produto-editar';
import { ConfiguracaoPage } from '../pages/configuracao/configuracao';
import { CategoriaTipoPage } from '../pages/categoria-tipo/categoria-tipo';
import { CategoriaPaisPage } from '../pages/categoria-pais/categoria-pais';
import { CategoriaUvaPage } from '../pages/categoria-uva/categoria-uva';
import { DatabaseProvider } from '../providers/database/database';
import { ProdutoProvider } from '../providers/produto/produto';
import { CategoriaTipoProvider } from '../providers/categoria-tipo/categoria-tipo';
import { CategoriaPaisProvider } from '../providers/categoria-pais/categoria-pais';
import { CategoriaUvaProvider } from '../providers/categoria-uva/categoria-uva';
import { ServicoProvider } from '../providers/servico/servico';
import { AvatarProvider } from '../providers/avatar/avatar';

@NgModule({
  declarations: [
    MyApp,
    TabsPage,
    AdegaPage,
    AdegaDetalhePage,
    ProdutoPage,
    ConfiguracaoPage,
    ProdutoEditarPage,
    CategoriaTipoPage,
    CategoriaPaisPage,
    CategoriaUvaPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    TabsPage,
    AdegaPage,
    AdegaDetalhePage,
    ProdutoPage,
    ConfiguracaoPage,
    ProdutoEditarPage,
    CategoriaTipoPage,
    CategoriaPaisPage,
    CategoriaUvaPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    SQLite,
    Camera,
    DatabaseProvider,
    ProdutoProvider,
    CategoriaTipoProvider,
    CategoriaPaisProvider,
    CategoriaUvaProvider,
    ServicoProvider,
    AvatarProvider
  ]
})
export class AppModule {}
