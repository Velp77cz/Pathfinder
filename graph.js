class Graph{

    static comboType = null;
    static comboStartSquare = null;
    static lines = [];
    static reloadable = false;

    constructor(canvas, xSize, ySize, squares = []) {
        this.squares = squares;
        this.xSize = xSize;
        this.ySize = ySize;
        this.canvas = canvas;
        const ctx = canvas.getContext("2d");
        const sizeOfSquare = canvas.width / xSize;
        this.ctx = ctx;
    
        console.log(squares);
    
        if (squares.length === 0) {
            // If squares array is empty, initialize it
            for (let i = 0; i < ySize; i++) {
                for (let j = 0; j < xSize; j++) {
                    const x = j * sizeOfSquare;
                    const y = i * sizeOfSquare;
                    const square = new Square(ctx, x, y, sizeOfSquare, 'empty');
                    squares.push(square);
                }
            }
        } else {
            Square.startDeclared = true;
            Square.endDeclared = true;
            let containsStart = false;
            let containsEnd = false;
            // Reassign the existing squares with updated information
            for(let i = 0; i < squares.length; i++){
                if(squares[i].type === 'start')
                    containsStart = true;
                if(squares[i].type === 'end')
                    containsEnd = true;
                squares[i] = new Square(ctx, squares[i].x, squares[i].y, squares[i].sizeOfSquare, squares[i].type);
            }
            if(!containsStart)
                Square.startDeclared = false;
            if(!containsEnd)
                Square.endDeclared = false;
        }
    
        console.log(this.squares);
        this.#addEventListeners(ctx);
    }



    
    #addEventListeners(ctx){
        this.canvas.addEventListener("mousedown", (e) => {
            this.#handleMouseDown(e, ctx);
        })
        this.canvas.addEventListener("contextmenu", (evt) => {
            evt.preventDefault();
        });
        this.canvas.addEventListener("mouseup", (e) => {
            Graph.comboType = null
            Graph.comboStartSquare = null
        })
        this.canvas.addEventListener("mousemove", (e) => {this.#handleMouseMove(e)})
    }
    


    save(){
        localStorage.setItem('graph', JSON.stringify(this.squares))
    }

    static Load(canvas, sizeX, sizeY, info){
        for(const square of info){
            if (square.type === 'visited')
                square.type = 'empty'
        }
        console.log('loading graph');
        console.log(info)
        return new Graph(canvas, sizeX, sizeY, info);
        
        
    }



    #handleMouseDown(e, ctx){
        const x = e.offsetX;
        const y = e.offsetY;
        console.log('x: ', x, 'y: ', y);
        for(const square of this.squares){
            if(x >= square.x && x <= square.x + square.sizeOfSquare && y >= square.y && y <= square.y + square.sizeOfSquare){
                if(e.button === 1){
                    
                    if(square.type === 'start')
                        Square.startDeclared = false;
                    if(square.type === 'end') 
                        Square.endDeclared = false;
                    square.type = 'empty'
                    break;
                }
                else if(e.button === 0){
                    square.changeType(ctx, square.type)
                    console.log('clicked on square ' + square.type + ' at ' + square.x + ', ' + square.y)
                    break;
                }
                else if(e.button === 2){
                    if(square.type === 'empty' || square.type === 'wall')
                        Graph.comboType = square.type;
                        Graph.comboStartSquare = square;

                    const neighbours =square.getNeighbours()
                    console.log(neighbours)
                    console.log(square.getCenter().x)
                   
                }
            }
        }
        this.save();
    }
    #handleMouseMove(e){
        if(Graph.comboType !== null){
            const square = Square.GetSquare(e.offsetX, e.offsetY);
            if(square !== Graph.comboStartSquare || Graph.comboType == square.type){
                if(square.type !== 'start' && square.type !== 'end')
                    square.changeType(this.ctx, Graph.comboType)
            }
        }
    }



    static makeWinningLine(path) {
        if (path.length > 1) {
            const line = path.map(square => ({ x: square.getCenter().x, y: square.getCenter().y }));
    
            // Clear existing lines
            this.lines = [];
    
            // Push the new line
            this.lines.push(line);
            
        }
    }
    

    drawLines(myPathfinder) {
        if (myPathfinder.pathfinders && myPathfinder.pathfinders.length === 0) {
            
            for (const line of Graph.lines) {
                if (line.length > 1) {
                    this.ctx.beginPath();
                    const startCenter = line[0];
                    this.ctx.moveTo(startCenter.x, startCenter.y);
                    this.ctx.lineWidth = 10;
                    this.ctx.strokeStyle = "black";
    
                    for (let i = 1; i < line.length; i++) {
                        const center = line[i];
                        this.ctx.lineTo(center.x, center.y);
                    }
                    console.log(line.length)
    
                    this.ctx.stroke();
                }
            }
        }
    }
    
    
    

    

    draw(myPathfinder) {
        for (const square of this.squares) {
            square.draw(this.ctx);
        }
        this.drawLines(myPathfinder);
    }
    
    
    

    clear() {
        for (const square of this.squares) {
            square.type = 'empty';
        }
        
        Square.startDeclared = false;
        Square.endDeclared = false;
    
        
    }
    

}

