class Tile {
    type;
    movable;

    /**
     * 
     * @param {String} type 
     * @param {Boolean} movable 
     */
    constructor(type, movable) {
        this.type = type;
        this.movable = movable;
    }

    /**
     * 
     * @param {Level} level 
     * @param {Number} x 
     * @param {Number} y 
     */
    static interactionPass(level, x, y) {
        if (level.frontTiles[x][y] == null || level.backTiles[x][y] == null) return;

        if (level.frontTiles[x][y].type == "Player" && level.backTiles[x][y].type == "Door") {
            level.frontTiles[x][y].state = 1;
            level.frontTiles[x][y].movable = false;
        }
    }

    static interactionBump(level, x, y, dx, dy) {
        if (level.frontTiles[x][y] == null || level.frontTiles[x+dx][y+dy] == null) return;

        if (level.frontTiles[x][y].type == "Player" && level.frontTiles[x][y].state == 0 && level.frontTiles[x+dx][y+dy].type == "Spikes") {
            level.frontTiles[x][y].state = -1;
            level.frontTiles[x][y].movable = false;
        } else if (level.frontTiles[x][y].type == "Spikes" && level.frontTiles[x+dx][y+dy].type == "Player" && level.frontTiles[x+dx][y+dy].state == 0) {
            level.frontTiles[x+dx][y+dy].state = -1;
            level.frontTiles[x+dx][y+dy].movable = false;
        }
    }

    static Player() {
        let tile = new Tile("Player", true);
        tile.state = 0;
        return tile;
    }
    static Wall() {
        return new Tile("Wall", false);
    }
    static Crate() {
        return new Tile("Crate", true);
    }
    static Spikes() {
        return new Tile("Spikes", true);
    }
    static Empty() {
        return new Tile("Empty", false);
    }
    static Door() {
        return new Tile("Door", false);
    }

    /**
     * 
     * @param {Object} object Object with the tile's data, but without a class. The passed object is changed.
     */
    // static assignObject(object) {

    //     //if (!object.type) return null;

    //     switch(object.type) {
    //         case "Player":
    //             Object.assign(object, Player);
    //             break;
    //         case "Wall":
    //             Object.assign(object, Wall);
    //             break;
    //         case "Crate":
    //             Object.assign(object, Crate);
    //             break;
    //         case "Spikes":
    //             Object.assign(object, Spikes);
    //             break;
    //         case "Empty":
    //             Object.assign(object, Empty);
    //             break;
    //         case "Door":
    //             Object.assign(object, Door);
    //             break;
    //         default:
    //             return;
    //     }
    // }

}

// class Player extends Tile {

//     /**
//      * 0 = default
//      * + = win
//      * - = loss
//      */
//     state;

//     constructor() {
//         super("Player", true);
//         this.state = 0;
//     }
// }

// class Wall extends Tile {
//     constructor() {
//         super("Wall", false);
//     }
// }

// class Crate extends Tile {
//     constructor() {
//         super("Crate", true);
//     }
// }

// class Spikes extends Tile {
//     constructor() {
//         super("Spikes", true);
//     }
// }

// class Empty extends Tile {
//     constructor() {
//         super("Empty", false);
//     }
// }

// class Door extends Tile {
//     constructor() {
//         super("Door", false);
//     }
// }


//export { Tile }