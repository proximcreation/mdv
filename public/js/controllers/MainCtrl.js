vol2dApp.controller('MainCtrl',[
	'$scope',
	'$http',
	'$sce',
	'$timeout',
	'filterFilter',	
	'localStorageService',
	function($scope, $http, $sce, $timeout, filterFilter,localStorageService) {

	// config load
	$scope.enums = enums;
	$scope.config = config;

	var w = window, d = document, e = d.documentElement, g = d.getElementsByTagName('body')[0];
	$scope.screen = {
	    width : /*w.innerWidth || e.clientWidth || */g.clientWidth,
	    height : /*w.innerHeight|| e.clientHeight|| */g.clientHeight
	};

	$scope.cursor = {x:0, y:0};

	var getCrossBrowserElementCoords = function (mouseEvent){
		var result = {
			x: 0,
			y: 0
		};

		if (!mouseEvent){
			mouseEvent = window.event;
		}

		if (mouseEvent.pageX || mouseEvent.pageY){
			$scope.cursor.x = mouseEvent.pageX;
			$scope.cursor.y = mouseEvent.pageY;
		}
		else if (mouseEvent.clientX || mouseEvent.clientY){
			$scope.cursor.x = mouseEvent.clientX + document.body.scrollLeft +
			document.documentElement.scrollLeft;
			$scope.cursor.y = mouseEvent.clientY + document.body.scrollTop +
			document.documentElement.scrollTop;
		}

		if (mouseEvent.target){
			var offEl = mouseEvent.target;
			var offX = 0;
			var offY = 0;

			if (typeof(offEl.offsetParent) != "undefined"){
				while (offEl){
					offX += offEl.offsetLeft;
					offY += offEl.offsetTop;

					offEl = offEl.offsetParent;
				}
			}
			else{
				offX = offEl.x;
				offY = offEl.y;
			}

			console.log(offX + " " + offY);

			// $scope.cursor.x -= offX;
			// $scope.cursor.y -= offY;
		}
	};

	$scope.onMouseMove = function ($event) {
     	getCrossBrowserElementCoords($event);
    };

	var lineData = [
		{
			x: 0,
			y: 5
		},
		{
			x: 50,
			y: 10
		}
	];


	$scope.loadGraph = function(id) {

		var vis = d3.select('#'+id),
	    WIDTH = $scope.screen.width - 90,
	    HEIGHT = $scope.config.graph.height,
	    MARGINS = {
	      top: 20,
	      right: 20,
	      bottom: 20,
	      left: 50
	    },
	    xRange = d3.scale.linear().range([MARGINS.left, WIDTH - MARGINS.right]).domain([d3.min(lineData, function(d) {
	      return d.x;
	    }), d3.max(lineData, function(d) {
	      return d.x;
	    })]),
	    yRange = d3.scale.linear().range([HEIGHT - MARGINS.top, MARGINS.bottom]).domain([d3.min(lineData, function(d) {
	      return d.y;
	    }), d3.max(lineData, function(d) {
	      return d.y;
	    })]),
	    xAxis = d3.svg.axis()
	      .scale(xRange)
	      .tickSize($scope.config.graph.axis.width)
	      .tickSubdivide(true),
	    yAxis = d3.svg.axis()
	      .scale(yRange)
	      .tickSize($scope.config.graph.axis.width)
	      .orient('left')
	      .tickSubdivide(true);
	 
		vis.append('svg:g')
		  .attr('class', 'x axis')
		  .attr('transform', 'translate(0,' + (HEIGHT - MARGINS.bottom) + ')')
		  .call(xAxis);
		 
		vis.append('svg:g')
		  .attr('class', 'y axis')
		  .attr('transform', 'translate(' + (MARGINS.left) + ',0)')
		  .call(yAxis);

		var lineFunc = d3.svg.line()
		.x(function(d) {
	    	return xRange(d.x);
	  	})
	  	.y(function(d) {
	    	return yRange(d.y);
	  	})
	  	.interpolate('linear');

		vis.append('svg:path')
		.attr('d', lineFunc(lineData))
		.attr('stroke', 'blue')
		.attr('stroke-width', 2)
		.attr('fill', 'none');
	};
}]);