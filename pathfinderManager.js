class PathFinderManager {
    startSquare = null;
    endSquare = null;
    pathfinders = [];
    interval = null;
    bestPath = [];
    constructor(squares, myGraph) {
        this.myGraph = myGraph;
        this.squares = squares;
        const ctx = canvas.getContext("2d");
        this.ctx = ctx;

        for (const square of this.squares) {
            if (square.type == "start") {
                this.startSquare = square;
            } else if (square.type == "end") {
                this.endSquare = square;
            }
        }
    }

    start() {
        this.pathfinders.push(new Pathfinder(this.startSquare, this.endSquare, this.startSquare, [this.startSquare]));
        this.interval = setInterval(() => this.update(), 1);
    }

    found(path) {
        if (path.length < this.bestPath.length || this.bestPath.length === 0) {
            this.bestPath = path;
            Graph.makeWinningLine(this.bestPath);
        }
        this.remove(path);
    }

    update() {
        for (const pathfinder of this.pathfinders) {
            pathfinder.find_path(this);       
        }
        if(this.pathfinders.length == 0){
            //for(const path of this.bestPath){this.makeWinningLine(this.ctx, path);}
            clearInterval(this.interval);
        }
        console.log(this.pathfinders.length);
        //console.log(this.pathfinders)
    }
    remove(path){
        for(const pathfinder of this.pathfinders){
            if(pathfinder == path){this.pathfinders.splice(this.pathfinders.indexOf(path), 1);
            //console.log('removed')
        }
        }
        
    }
    



    
    
    



}
