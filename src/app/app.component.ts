import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { TabsPage } from '../pages/tabs/tabs';
import { DatabaseProvider } from '../providers/database/database';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {

  rootPage:any = TabsPage;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, dbProvider: DatabaseProvider) {
    platform.ready().then(() => {

      statusBar.styleLightContent();
      statusBar.backgroundColorByHexString('#550331');

      dbProvider.createDatabase().then(() => {
        this.hideSplash(splashScreen);
      }).catch(() => {
        this.hideSplash(splashScreen);
      });
    });
  }

  private hideSplash(splashScreen: SplashScreen) {
    splashScreen.hide();
  }
}
