var cmdGeo = cmdGeo || {};

(function()){

	// Variable declaration
	cmdGeo.SANDBOX = "SANDBOX";
	cmdGeo.LINEAIR = "LINEAIR";
	cmdGeo.GPS_AVAILABLE = 'GPS_AVAILABLE';
	cmdGeo.GPS_UNAVAILABLE = 'GPS_UNAVAILABLE';
	cmdGeo.POSITION_UPDATED = 'POSITION_UPDATED';
	cmdGeo.REFRESH_RATE = 1000;
	cmdGeo.currentPosition = currentPositionMarker = customDebugging = debugId = map = interval = intervalCounter = updateMap = false;
	cmdGeo.locatieRij = markerRij = [];


	cmdGeo.controller = {
		init: function () {
			cmdGeo.gps.init();
			cmdGeo.map.init();
			cmdGeo.debug.init();
		}

	}

	cmdGeo.gps = {
		init: function () {
			
		},

		startInterval: function () {

		},

		updatePosition: function () {

		},

		setPosition: function () {

		},

		checkLocations: function () {

		},

		calculateDistance: function () {

		}

	}

	cmdGeo.map = {
		init: function () {

		},

		generate: function () {

		},

		updatePosition: function () {

		}

	}

	cmdGeo.debug = {
		init: function () {

		},

		geoErrorHandler: function () {

		},

		massage: function () {

		},

		setCostum: function () {

		}


	}

	cmdGeo.helper = {
		init: function () {

		},

		isNumber: function () {

		}

	}

})();