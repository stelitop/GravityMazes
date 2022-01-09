class Direction {
    #direction;

    constructor(direction) {
        this.direction = direction;
    }

    static Up = new Direction("Up");
    static Down = new Direction("Down");
    static Left = new Direction("Left");
    static Right = new Direction("Right");
}

//export { Direction }