define(function(require) {
        
    var config = require('config');
   
    if(AdMob && config.admobAdId) {
        AdMob.createBanner({
            adId: config.admobAdId,
            position: AdMob.AD_POSITION.TOP_CENTER,
            autoShow: true,
            isTesting: config.admobTesting 
        });
    }

    var basePath = ( 'Android' === device.platform || 'android' === device.platform ? '/android_asset/www/' : '' );
    var tapSound = new Media(basePath + 'audios/tap.wav');

    var players = [ 'dog', 'cat' ];

    var images = {};
    players.forEach(function(player) {
        var img = new Image();
        img.src = 'img/' + player + '.png';
        players[ player ] = img;
    });

    var $ = require('jquery');
    var $positions = $('td');
    $positions.on('click', function() {
        var occupied = this.getAttribute('occupied');
        if(occupied) {
            return;
        }
        tapSound.play();

        $( this ).html('<img src="img/dog.png" />');
        this.setAttribute('occupied', true);

        addOverlay();
        var randomDelay = getRandomInt(600, 2000);
        setTimeout(function() {
            addComputerMove();
            removeOverlay();
        }, randomDelay);
    });

    function addOverlay() {
        var div = document.createElement('div');
        div.setAttribute('id', 'overlay');
        div.className = 'overlay';
        document.body.appendChild(div);
    }

    function removeOverlay() {
        var overlayDiv = document.getElementById('overlay');
        document.body.removeChild(overlayDiv);
    }

    function getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    function addComputerMove() {
        var unoccupied = $positions.filter(function(index, pos) {
            return pos.getAttribute('occupied') === null;
        });
        if(unoccupied.length === 0) return;
        var index = getRandomInt(0, unoccupied.length - 1);
        unoccupied[index].innerHTML = '<img src="img/cat.png" />';
        unoccupied[index].setAttribute('occupied', true);
    }
});
