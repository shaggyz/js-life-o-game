
Board = function(){

	/**
	 * Board width
	 * @type {integer}
	 */	
	this.width = 3;

	/**
	 * Board height
	 * @type {integer}
	 */
	this.height = 3;

	/**
	 * Matrix
	 * @type {Array}
	 */
	this.matrix = [];

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
				if(this.matrix[x][y].state){
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

		for(x=0; x<=this.width; x++){

			this.matrix[x] = [];

			for(y=0; y<=this.height; y++){

				if(typeof(fill) != "undefined" && fill){
					this.matrix[x][y] = new Cell(x, y, this.seed());
				} else {
					this.matrix[x][y] = new Cell(x, y);
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
    	
    	var newMatrix = this.matrix;

		for(x=0; x<this.width; x++){

			for(y=0; y<this.height; y++){

				var cell = this.matrix[x][y];
				var cellValue = this.calculateCellValue(cell);

				if(cell.state && (cellValue < 2 || cellValue > 3)){

					newMatrix[x][y].state = false;

				} else if(!cell.state && cellValue == 3){
				
					// Dead cell
					newMatrix[x][y].state = true;

				} 				
			}

		}

		alert("listo");

		this.matrix = newMatrix;

	};

	/**
	 * Reads the matrix array to draw its contents on browser
	 * @return {void} 
	 */
	this.redraw = function(){

		for(var x in this.matrix){

			var row = this.matrix[x];

			for(var y in row){

				var cell = row[y];
				$("#cell-" + x + "-" + y).toggleClass('alive', cell.state);

			}

		}

	};

	/**
	 * Returns a pseudo-random boolean
	 * @return {[integer]} 
	 */
	this.seed = function(){

		return Math.random() - .4 >= .5;

	};

	/**
	 * Calculates a value from cell neighbors
	 * @param  {Cell} cell 
	 * @return {integer}      
	 */
	this.calculateCellValue = function(cell){
		
		var neighbors = cell.getNeighbors();
		var value = 0;

		for (var x in neighbors){

			var neighbor = neighbors[x];

			// skips coords out of bounds 
			if(neighbor.x < 0 || 
			   neighbor.y < 0 ||
			   neighbor.x >= this.width ||
			   neighbor.y >= this.height
			   ){
				continue;
			}

			var neighborCell = this.matrix[neighbor.x][neighbor.y];

			// if adyacent cell is alive, 
			// increases the cell value
			if(neighborCell.state){
				value++;
			}

		}

		console.log("X: " + cell.x + ", Y: " + cell.y + " = " + value);

		return value;

	};

	/**
	 * Toggles cell state
	 * @param  {integer} x
	 * @param  {integer} y 
	 * @return {void}
	 */
	this.toggleCell = function(x, y){
		this.matrix[x][y].state = !this.matrix[x][y].state;
	};

};