
Cell = function(ax, ay, astate){

	/**
	 * X coordinate on matrix
	 * @type {integer}
	 */
	this.x = null;

	/**
	 * Y coordinate on matrix
	 * @type {integer}
	 */
	this.y = null;

	/**
	 * Cell state alive/dead
	 * @type {Boolean}
	 */
	this.state = false;

	/**
	 * Return adyacent cells coords
	 * @return {array} 
	 */
	this.getNeighbors = function(){

		var neighbors = [];

		neighbors.push({x: this.x - 1, y: this.y - 1 }); // a0
		neighbors.push({x: this.x, y: this.y - 1}); // a1
		neighbors.push({x: this.x + 1, y: this.y - 1}); // a2
		neighbors.push({x: this.x - 1, y: this.y}); // a3
		neighbors.push({x: this.x + 1, y: this.y}); // a4
		neighbors.push({x: this.x - 1, y: this.y + 1}); // a5
		neighbors.push({x: this.x, y: this.y + 1}); // a6
		neighbors.push({x: this.x + 1, y: this.y + 1}); // a7

		return neighbors;

	};

	this.x = ax;
	this.y = ay;

	if(typeof(astate) != "undefined"){
		this.state = astate;
	}

};