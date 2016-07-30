
requirejs.config({
    baseUrl: 'js',
    paths: {
        'jquery': '../bower_components/jquery/dist/jquery.min'
    },
    shim: {
    }
});

var app = {
    initialize: function() {
        this.bindEvents();
    },
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    onDeviceReady: function() {
        requirejs(['game']);
    }
};

app.initialize();

