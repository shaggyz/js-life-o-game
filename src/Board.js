
Board = function(){

	/**
	 * Board width
	 * @type {integer}
	 */	
	this.width = 30;

	/**
	 * Board height
	 * @type {integer}
	 */
	this.height = 30;

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

		for(x=0; x<=this.width; x++){

			html += "<tr>";

			for(y=0; y<=this.height; y++){

				var cssClass = "";
				if(this.matrix[x][y].state){
					cssClass = ' class="alive"';
				}

				html += "<td" + cssClass + "></td>";
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
	this.populate = function(){

		for(x=0; x<=this.width; x++){

			this.matrix[x] = [];

			for(y=0; y<=this.height; y++){

				this.matrix[x][y] = new Cell(x, y, this.seed());

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

		for(x=0; x<=this.width; x++){

			for(y=0; y<=this.height; y++){

				var cell = this.matrix[x][y];
				var cellValue = this.calculateCellValue(cell);

				if(cell.state){

					// Live cell
					if(cellValue < 2){
						
						// 1. dead
						this.matrix[cell.x][cell.y].state = false;

					} else if(cellValue == 2 || cellValue == 3){
						
						// 2. survival
						this.matrix[cell.x][cell.y].state = true;

					}else if(cellValue > 3){
						
						// 3. dead
						this.matrix[cell.x][cell.y].state = false;

					} 

				} else {
				
					// Dead cell
					if(cellValue == 3){
						
						// 4. born
						this.matrix[cell.x][cell.y].state = true;

					}

				}


			}

		}

	};

	/**
	 * Reads the matrix array to draw its contents on browser
	 * @return {void} 
	 */
	this.redraw = function(){

		$("#game").html('');
		this.generate();

	};

	/**
	 * Returns a pseudo-random boolean
	 * @return {[type]} [description]
	 */
	this.seed = function(){

		return Math.random() - .3 >= .5;

	};

	/**
	 * Calculates a value from cell neighbors
	 * @param  {[type]} cell [description]
	 * @return {[type]}      [description]
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

		return value;

	};

};