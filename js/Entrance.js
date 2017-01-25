import { Splash } from 'splash-screen';
import React from 'react';
import ReactDOM from 'react-dom';
import Application from 'js/application';

class Entrance {
  constructor() {}

  beforeStart() {
//    let injectTapEventPlugin = require('react-tap-event-plugin');

//    injectTapEventPlugin();
  }

  _destroySplash() {
    let _this = this;
    Splash.destroy();
    require('splash-screen/dist/splash.min.css').unuse();
    setTimeout(function() {
      if (Splash.isRunning()) {
        _this.destroySplash();
      }
    }, 100);
  }

  launch() {
    ReactDOM.render(<Application />, document.querySelector('#view'));
  }

  run() {
    this.beforeStart();
    this._destroySplash();
    this.launch();
  }
}

export default Entrance;
