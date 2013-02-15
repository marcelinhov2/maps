var Map;

Map = Backbone.View.extend({
	initialize: function(el, options){
		this.elID = $(this.el).attr('id');
		this.markers = options.markers;
		this.defaultLat = options.defaultLat;
		this.defaultLng = options.defaultLng;
		this.minZoom = options.minZoom;
		this.maxZoom = options.maxZoom;
		this.interaction = options.interaction;
		this.interactionOut = options.interactionOut;
		this.styles = options.styles;

		this.mapsInit();
	},

	

	mapsInit: function(){
	    var self = this;
	    this.defaultCoordinate = new google.maps.LatLng(this.defaultLat, this.defaultLng),

	    this.myOptions = {
			mapTypeControlOptions: {
				mapTypeIds: [ 'Styled']
			},
			zoom: this.minZoom,
			minZoom : this.minZoom,
			maxZoom : this.maxZoom,
			center: this.defaultCoordinate,
			mapTypeId: 'Styled',
			zoomControl : true,
			zoomControlOptions : {
				style: google.maps.ZoomControlStyle.LARGE,
				position: google.maps.ControlPosition.RIGHT_BOTTOM
			},
			disableDefaultUI: true
	    };

	    this.map = new google.maps.Map(document.getElementById(this.elID),
	        this.myOptions);  

	    this.styledMapType = new google.maps.StyledMapType(this.styles, { name: 'Styled' });
		this.map.mapTypes.set('Styled', this.styledMapType);

		if(this.markers)
			this.mapMarkers();

		this.mapEvents();
	},

	mapEvents: function(){
		var self = this;

		this.map.fitBounds(this.bounds);

        google.maps.event.addDomListener(window, 'resize', function(){
        	self.map.setCenter(self.bounds.getCenter());
        });
	},

	mapMarkers: function(){
		var self = this;
		var infowindow = new google.maps.InfoWindow(); 
		var marker; 
		var elMarkers = [];
		
		this.bounds = new google.maps.LatLngBounds();
		this.customMarkers = [];
		
		function resetMarkers(){
			for(var i = 0, t = elMarkers.length; i < t; i++){
				var pinDefault = self.markers[i].pins[0];
				elMarkers[i].setIcon(pinDefault);
			}	
		}
		
		for (var i = 0; i < this.markers.length; i++) { 
			var pos = new google.maps.LatLng(this.markers[i].lat, this.markers[i].lng);
			
			this.bounds.extend(pos);
			
			var image = new google.maps.MarkerImage(this.markers[i].pins[0],
				new google.maps.Size(110, 114)
				/*new google.maps.Point(0,0),
				new google.maps.Point(180, 86)*/
			);

			marker = new google.maps.Marker({
	            position: new google.maps.LatLng(this.markers[i].lat, this.markers[i].lng),
	            map: this.map,
	            icon: image
	        });

	        this.customMarkers.push(marker);

	        //Marker Interaction
			elMarkers.push(marker);
	        google.maps.event.addListener(marker, this.interaction, (function(marker, i) {
	            return function() {
	                
	                var callback = self.markers[i].callback;
					var pinOver = self.markers[i].pins[1];

					resetMarkers();
					marker.setIcon(pinOver);

	                //Zoom no mapa
	                if(self.zoom < self.maxZoom ){
	                	self.map.setZoom(self.maxZoom);
    					self.map.setCenter(marker.getPosition());
	                }

	                if(callback)
	                	callback();
	            }
	        })(marker, i));
	        
	        if(this.interactionOut !== 'click'){
		        google.maps.event.addListener(marker, this.interactionOut, (function(marker, i) {
		            return function() {
		          
						resetMarkers();

		            }
		        })(marker, i));	
	        }
	    }

	},

	zoomChangedIcon: function(){

	}
});