```javascript
/* global TrelloPowerUp */
var Promise = TrelloPowerUp.Promise;

var WHITE_ICON = 'https://cdn.hyperdev.com/us-east-1%3A3d31b21c-01a0-4da2-8827-4bc6e88b7618%2Ficon-white.svg';
var BLACK_ICON = 'https://cdn.hyperdev.com/us-east-1%3A3d31b21c-01a0-4da2-8827-4bc6e88b7618%2Ficon-black.svg';

window.TrelloPowerUp.initialize({
  'board-buttons': function(t, options) {
    return [{
      icon: 'https://cdn.glitch.com/1b42d7fe-bda8-4af8-a6c8-eff0cea9e08a%2Frocket-ship.png?1494946700421',
      text: 'Generate Report',
      callback: function(t) {
        return t.popup({
          title: 'Job Report',
          url: './table.html',
          height: 600
          width: 600
        });
      },
      condition: 'always'
    }];
  }
});
```