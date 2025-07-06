// JavaScript source code

var WHITE_ICON = 'https://paulltd.github.io/LTD/white_icon.png';
var BLACK_ICON = 'https://paulltd.github.io/LTD/black_icon.png';
var onBtnClick = function (t, opts) { console.log('Someone clicked the button') };


window.TrelloPowerUp.initialize({
    'board-buttons': function (t, opts) {
        return [

            {
                description: "Displays a view of recent activity for each card on the board.",
                icon: {
                    dark: WHITE_ICON,
                    light: DARK_ICON
                },
                text: "My Board Button",
                callback: "function(t)",
        { "console.log('clicked');" }
      }
    ]
})