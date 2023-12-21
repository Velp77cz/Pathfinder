class Pathfinder {
  currentSquare;

  constructor(start, end, currentSquare, path = []) {
    this.path = path;
    this.start = start;
    this.currentSquare = currentSquare;
    this.end = end;
  }

  find_path(myPathFinder) {
    const neighbours = this.currentSquare.getNeighbours();

    for (const neighbour of neighbours) {
      if (neighbour.type === 'end') {
        // If the neighbour is the end, create a copy of the path and add the end square
        const newPath = [...this.path, neighbour];
        myPathFinder.found(newPath);
      } else if (neighbour.type === 'empty' && !this.path.includes(neighbour)) {
        // If the neighbour is empty and not already in the path, explore it
        neighbour.type = 'visited';
        neighbour.positionInPath = this.path.length; // Update positionInPath here
        myPathFinder.pathfinders.push(new Pathfinder(this.start, this.end, neighbour, [...this.path, neighbour]));
      } else if (neighbour.type === 'visited' && neighbour.positionInPath > this.path.length) {
        // If the neighbour is visited and this path can get there earlier, update positionInPath
        neighbour.positionInPath = this.path.length;
        myPathFinder.pathfinders.push(new Pathfinder(this.start, this.end, neighbour, [...this.path, neighbour]));
      }
    }

    myPathFinder.remove(this);
  }
}
