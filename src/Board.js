
Board = function(){

	/**
	 * Board width
	 * @type {integer}
	 */	
	this.width = 140;

	/**
	 * Board height
	 * @type {integer}
	 */
	this.height = 70;

	/**
	 * Matrix
	 * @type {Array}
	 */
	this.matrix = [];

	/**
	 * Cells counter
	 * @type {Number}
	 */
	this.cells = 0;

	/**
	 * Generates the main board 
	 * @param  {integer} width  
	 * @param  {integer} height 
	 * @return {void}        
	 */
	this.generate = function(w, h){

		if(typeof(w) != "undefined"){
			this.width = w;
		}
		
		if(typeof(h) != "undefined"){
			this.height = h;
		}

		$("#game").html(this.getMatrix());

	};

	/**
	 * Generates the html matrix
	 * @return {string} 
	 */
	this.getMatrix = function(){

		var html = "<table><tbody>";

		for(y=0; y<this.height; y++){

			html += "<tr>";

			for(x=0; x<this.width; x++){

				var cssClass = "";
				if(this.matrix[y][x]){
					cssClass = ' class="alive"';
				}

				var id = "cell-" + x + "-" + y;
				var data = ' data-x="' + x + '" data-y="' + y + '" ';

				html += '<td' + cssClass + ' id="' + id + '"' + data + '></td>';
			}

			html += "</tr>";

		}

		html += "</tbody></table>";

		return html;

	};

	/**
	 * Populates the matrix with cells
	 * @return {void} 
	 */
	this.populate = function(fill){

		for(y=0; y<this.height; y++){

			this.matrix[y] = [];

			for(x=0; x<this.width; x++){
				
				if(typeof(fill) != "undefined" && fill){
					this.matrix[y][x] = this.seed();
				} else {
					this.matrix[y][x] = false;
				}

			}

		}

	};

	/**
	 * Process cell states and redraw the board
	 * @return {[type]} [description]
	 */
	this.nextGeneration = function(){

		/* Rules */

    	// 1. Any live cell with fewer than two live neighbours dies, as if caused by under-population.
    	// 2. Any live cell with two or three live neighbours lives on to the next generation.
    	// 3. Any live cell with more than three live neighbours dies, as if by overcrowding.
    	// 4. Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction.
    	
    	var newMatrix = [];

		for(y=0; y<this.height; y++){

			newMatrix[y] = [];
		
			for(x=0; x<this.width; x++){

				var cellValue = this.calculateCellValue(x, y);

				if(this.matrix[y][x] && (cellValue < 2 || cellValue > 3)){

					// Cell dies
					newMatrix[y][x] = false;

				} else if(!this.matrix[y][x] && cellValue == 3){
				
					// Cell birth/survival
					newMatrix[y][x] = true;

				} else {

					// Without changes
					newMatrix[y][x] = this.matrix[y][x];

				} 				
			}

		}

		this.matrix = newMatrix;

	};

	/**
	 * Reads the matrix array to draw its contents on browser
	 * @return {void} 
	 */
	this.redraw = function(){

		for(var y in this.matrix){

			var row = this.matrix[y];
			for(var x in row){

				$("#cell-" + x + "-" + y).toggleClass('alive', row[x]);

			}

		}

	};

	/**
	 * Returns a pseudo-random boolean
	 * @return {[integer]} 
	 */
	this.seed = function(){

		return Math.random() - .3 >= .5;

	};

	/**
	 * Calculates a value from cell neighbors
	 * @param  {Cell} cell 
	 * @return {integer}      
	 */
	this.calculateCellValue = function(x,y){
		
		var neighbors = [];
		var value = 0;

		neighbors.push({x: x - 1, y: y - 1 }); // a0
		neighbors.push({x: x, y: y - 1}); // a1
		neighbors.push({x: x + 1, y: y - 1}); // a2
		neighbors.push({x: x - 1, y: y}); // a3
		neighbors.push({x: x + 1, y: y}); // a4
		neighbors.push({x: x - 1, y: y + 1}); // a5
		neighbors.push({x: x, y: y + 1}); // a6
		neighbors.push({x: x + 1, y: y + 1}); // a7

		for (var n in neighbors){

			var neighbor = neighbors[n];

			// skips coords out of bounds 
			if(neighbor.x < 0 || 
			   neighbor.y < 0 ||
			   neighbor.x >= this.width ||
			   neighbor.y >= this.height
			   ){
				continue;
			}

			// if adyacent cell is alive, 
			// increases the cell value
			if(this.matrix[neighbor.y][neighbor.x] == true){
				value++;
			}

		}

		return value;

	};

	/**
	 * Toggles cell state
	 * @param  {integer} x
	 * @param  {integer} y 
	 * @return {void}
	 */
	this.toggleCell = function(x, y, state){
		this.matrix[y][x] = state;
	};

	/**
	 * [debugMatrix description]
	 * @return {[type]} [description]
	 */
	this.debugMatrix = function(){

		var debug = "";

		for(y=0; y<this.height; y++){

			for(x=0; x<this.width; x++){

				if(this.matrix[y][x]){
					debug += "1";
				} else {
					debug += "0";
				}

			}
			
			debug += "<br>";

		}

		console.log(debug);

	}


	/**
	 * [debugMatrix description]
	 * @return {[type]} [description]
	 */
	this.debugCell = function(x, y){

		var strState = "0";
		if(this.matrix[y][x]){
			strState = "1";
		}

		console.log("-" + x + "," + y + ": " + strState);
	}

};