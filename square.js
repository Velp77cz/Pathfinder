class Square{
    constructor(ctx, x, y, sizeOfSquare, type = "empty" ){
        this.type = type;
        this.ctx = ctx;
        this.x = x;
        this.y = y;
        this.sizeOfSquare = sizeOfSquare;
    }
    positionInPath;
    //make a class var startDeclared and endDeclared
    static startDeclared = false;
    static endDeclared = false;
    changeType(ctx, type){
        if(type == "empty"){
            if(Square.startDeclared == false){
                this.type = "start";
                Square.startDeclared = true;
            }
            else if(Square.endDeclared == false){
                this.type = "end";
                Square.endDeclared = true;
            }
            else{
                this.type = "wall";
            }
        }
        else if(type == "wall"){
            this.type = "empty";
        }
        console.log(this.type);
        
        
    }



    getCenter(){return {x: this.x + this.sizeOfSquare/2, y: this.y + this.sizeOfSquare/2}}
    //getNeighbours returns empty and visited squares or end square
    getNeighbours() {
        let center = {
            x: this.x + this.sizeOfSquare / 2,
            y: this.y + this.sizeOfSquare / 2
        };
    
        let neighbours = [];
        
        // Function to add a neighbour if it satisfies the conditions
        const addNeighbour = (xOffset, yOffset) => {
            let neighbour = Square.GetSquare(center.x + xOffset, center.y + yOffset);
            if (neighbour != null && neighbour.type !== "wall" && neighbour.type !== "start") {
                neighbours.push(neighbour);
            }
        };
    
        addNeighbour(this.sizeOfSquare, 0);
        addNeighbour(-this.sizeOfSquare, 0);
        addNeighbour(0, this.sizeOfSquare);
        addNeighbour(0, -this.sizeOfSquare);
    
        // Check for 'end' type and return only that square if found
        const endNeighbour = neighbours.find(neighbour => neighbour.type === 'end');
        return endNeighbour ? [endNeighbour] : neighbours;
    }
    

    static GetSquare(x, y){
        for(const square of myGraph.squares){
            if(x >= square.x && x <= square.x + square.sizeOfSquare && y >= square.y && y <= square.y + square.sizeOfSquare)
                return square;
        }
        return null;
    }



    draw(ctx){
        ctx.lineWidth = 1; // Set the line width to a default value
        ctx.strokeStyle = "black";
        ctx.strokeRect(this.x, this.y, this.sizeOfSquare, this.sizeOfSquare);
        
        switch(this.type){
            case "start":
                ctx.fillStyle = "yellow";
                ctx.fillRect(this.x, this.y, this.sizeOfSquare, this.sizeOfSquare);
                break;
            case "wall":
                ctx.fillStyle = "grey"
                ctx.fillRect(this.x, this.y, this.sizeOfSquare, this.sizeOfSquare);
                break;
            case "end":
                ctx.fillStyle = "blue"
                ctx.fillRect(this.x, this.y, this.sizeOfSquare, this.sizeOfSquare);
                break;
            case "empty":
                ctx.fillStyle = "green"
                ctx.fillRect(this.x, this.y, this.sizeOfSquare, this.sizeOfSquare);
                break;
            case "visited":
                ctx.fillStyle = "#164e0e"
                ctx.fillRect(this.x, this.y, this.sizeOfSquare, this.sizeOfSquare)
                break
            case "path":
                ctx.fillStyle =  "red"
                ctx.fillRect(this.x, this.y, this.sizeOfSquare, this.sizeOfSquare)
                break;
            default: break;
        }
    }
}