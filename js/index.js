require.ensure(['splash-screen/dist/splash.min.css', 'splash-screen'], function(require) {
  require('splash-screen/dist/splash.min.css').use();
  require('splash-screen').Splash.enable('circular');
});

require.ensure([
  'less/main.less',
  'splash-screen',
  './Entrance',
  './storage',
], function(require) {
  require('less/main.less');

  const Entrance = require('./Entrance').default;
  (new Entrance()).run();

  const { checkVersion } = require('./storage');
  const script = document.querySelector('script[src*="index.bundle.js?"]');
  if (script) checkVersion(script.src.match(/js\?([a-z0-9]+)$/)[1]);
});
