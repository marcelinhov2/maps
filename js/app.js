var AppView;

var app_view;
var mainMap;

AppView = Backbone.View.extend({
	el: 'body',

	initialize: function(){

		mainMap = new Map(
			{el: '#map_canvas'},
			options = {
				markers : [
					{
						text: 'Andy Goldworthy',
						lat: -22.896481,
						lng: -43.186872,
						callback: this.callback,
						pins : ['./visao/imagens/pins/default/btn003_pin_home.png', './visao/imagens/pins/over/btn003_pin_home.png', './visao/imagens/pins/hit/btn_pin000.png']
					},
					{
						text: 'Henrique Oliveira',
						lat: -22.872511,
						lng: -43.337249,
						callback: this.callback,
						pins : ['./visao/imagens/pins/default/btn004_pin_home.png', './visao/imagens/pins/over/btn004_pin_home.png', './visao/imagens/pins/hit/btn_pin001.png']
					},
					{
						text: 'Ryoiji Ikeda',
						lat: -22.989904,
						lng: -43.190861,
						callback: this.callback,
						pins : ['./visao/imagens/pins/default/btn000_pin_home.png', './visao/imagens/pins/over/btn000_pin_home.png', './visao/imagens/pins/hit/btn_pin000.png']
					},
					{
						text: 'Jaume Plensa',
						lat: -22.946316,
						lng: -43.179279,
						callback: this.callback,
						pins : ['./visao/imagens/pins/default/btn002_pin_home.png', './visao/imagens/pins/over/btn002_pin_home.png', './visao/imagens/pins/hit/btn_pin002.png']
					},
					{
						text: 'Robert Morris',
						lat: -22.909765,
						lng: -43.176248,
						callback: this.callback,
						pins : ['./visao/imagens/pins/default/btn001_pin_home.png', './visao/imagens/pins/over/btn001_pin_home.png', './visao/imagens/pins/hit/btn_pin001.png']
					},
					{
						text: 'Brian Eno',
						lat: -22.913376,
						lng: -43.181717,
						callback: this.callback,
						pins : ['./visao/imagens/pins/default/btn005_pin_home.png', './visao/imagens/pins/over/btn005_pin_home.png', './visao/imagens/pins/hit/btn_pin004.png']
					}
				],
				defaultLat : -22.930887,
				defaultLng: -43.254204,
				minZoom: 12,
				maxZoom: 16,
				interaction: (this.isMobile) ? 'click' : 'mouseover',
                interactionOut: (this.isMobile) ? 'click' : 'mouseout',
				
				
				
				
/*styles = []*/
				
				
			
				
				
				
				styles : [				
                    {
                        featureType: 'water',
                        elementType: 'all',
                        stylers: [{
                            hue: '#dedede'
                        }, {
                            saturation: -100
                        }, {
                            lightness: 46
                        }, {
                            visibility: 'on'
                        }]
                    }, {
                        featureType: 'landscape',
                        elementType: 'all',
                        stylers: [{
                            hue: '#f1f1f1'
                        }, {
                            saturation: -100
                        }, {
                            lightness: 50
                        }, {
                            visibility: 'on'
                        }]
                    }, {
                        featureType: 'landscape.man_made',
                        elementType: 'all',
                        stylers: [{
                            hue: '#f1f1f1'
                        }, {
                            saturation: -100
                        }, {
                            lightness: 50
                        }, {
                            visibility: 'on'
                        }]
                    }, {
                        featureType: 'landscape.natural',
                        elementType: 'all',
                        stylers: [{
                            hue: '#f1f1f1'
                        }, {
                            saturation: -100
                        }, {
                            lightness: -1
                        }, {
                            visibility: 'on'
                        }]
                    }, {
                        featureType: 'road',
                        elementType: 'all',
                        stylers: [{
                            visibility: 'off'
                        }]
                    }, {
                        featureType: 'poi',
                        elementType: 'all',
                        stylers: [{
                            hue: '#939393'
                        }, {
                            saturation: -100
                        }, {
                            lightness: -26
                        }, {
                            visibility: 'on'
                        }]
                    }, {
                        featureType: 'administrative',
                        elementType: 'all',
                        stylers: [{
                            visibility: 'off'
                        }]
                    }, {
                        featureType: 'administrative.country',
                        elementType: 'all',
                        stylers: [{
                            visibility: 'off'
                        }]
                    }, {
                        featureType: 'administrative.land_parcel',
                        elementType: 'all',
                        stylers: [{
                            visibility: 'off'
                        }]
                    }, {
                        featureType: 'administrative.neighborhood',
                        elementType: 'all',
                        stylers: [{
                            visibility: 'off'
                        }]
                    }, {
                        featureType: 'administrative.province',
                        elementType: 'all',
                        stylers: [{
                            visibility: 'off'
                        }]
                    }, {
                        featureType: 'transit',
                        elementType: 'all',
                        stylers: [{
                            visibility: 'off'
                        }]
                    }, {
                        featureType: 'administrative.locality',
                        elementType: 'all',
                        stylers: [{
                            visibility: 'on'
                        }]
                    }, {
                        featureType: 'water',
                        elementType: 'labels',
                        stylers: [{
                            hue: '#777777'
                        }, {
                            saturation: -100
                        }, {
                            lightness: -39
                        }, {
                            visibility: 'on'
                        }]
                    }, {
                        featureType: 'poi.school',
                        elementType: 'labels',
                        stylers: [{
                            hue: '#ff0000'
                        }, {
                            saturation: 100
                        }, {
                            lightness: -40
                        }, {
                            visibility: 'off'
                        }]
                    }, {
                        featureType: 'poi.business',
                        elementType: 'labels',
                        stylers: [{
                            hue: '#ff0000'
                        }, {
                            saturation: 100
                        }, {
                            lightness: -41
                        }, {
                            visibility: 'off'
                        }]
                    }
				
				]
			} 
		);
	}
})

$(document).ready(function(){
	app_view = new AppView();

    function resizeMap(){
        $('#map_canvas').css({width: $(window).width(), height: $(window).height()});
    } 

    $(window).resize(resizeMap);

    resizeMap();
   

})