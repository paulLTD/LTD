/* global TrelloPowerUp */
var t = TrelloPowerUp.initialize({
    'board-buttons': function (t, options) {
        return [{
            icon: 'https://paulltd.github.io/LTD/white_icon.png', // Optional: Add an icon file at this path if desired
            text: 'LTD Button',
            callback: function (t) {
                // No action performed for now
                return t.popup({
                    title: 'LTD Report',
                    url: './index.html',
                    height: 200
                });
            }
        }];
    }
});