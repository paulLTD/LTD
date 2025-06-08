```javascript
/* global TrelloPowerUp */
var Promise = TrelloPowerUp.Promise;

var WHITE_ICON = 'https://cdn.hyperdev.com/us-east-1%3A3d31b21c-01a0-4da2-8827-4bc6e88b7618%2Ficon-white.svg';
var BLACK_ICON = 'https://cdn.hyperdev.com/us-east-1%3A3d31b21c-01a0-4da2-8827-4bc6e88b7618%2Ficon-black.svg';

window.TrelloPowerUp.initialize({
  'board-buttons': function(t, opts) {
    return [{
      icon: {
        dark: WHITE_ICON,
        light: BLACK_ICON
      },
      text: 'Generate Card Table',
      callback: function(t) {
        return t.popup({
          title: 'Card Names Table',
          url: './table.html',
          height: 400
        });
      },
      condition: 'always'
    }];
  }
});
```