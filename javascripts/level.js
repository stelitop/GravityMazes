//import { Tile } from "./tile.js"

class Level {
    backTiles;
    frontTiles;
    #x;
    #y;
    //level name
    name;
    // superlvl-sublvl aka something like 3-2
    superlvl;
    sublvl;

    constructor(x, y) {
        this.backTiles = new Array(x);
        this.frontTiles = new Array(x);

        for (let i = 0; i < x; i++) {
            this.backTiles[i] = new Array(y);
            this.frontTiles[i] = new Array(y);

            for (let j = 0; j < y; j++) {
                this.backTiles[i][j] = Tile.Empty();
                this.frontTiles[i][j] = null;
            }
        }

        this.x = x;
        this.y = y;
    }

    static fromObject(levelObj) {
        let ret = new Level(levelObj.x, levelObj.y);

        for (let prop in levelObj) {
            ret[prop] = levelObj[prop];
        }

        return ret;
    }

    getX() {
        return this.x;
    }
    getY() {
        return this.y;
    }

    /**
     * Moves all tiles in a given direction and interactions happen;
     * @param {Direction} direction 
     * @return {Boolean} If any changes occured in the level
     */
    moveOnce(direction) {
        let ret = false;
        
        let dx = 0, dy = 0;

        if (direction == Direction.Up) {
            dy = -1;
        } else if (direction == Direction.Down) {
            dy = 1;
        } else if (direction == Direction.Left) {
            dx = -1;
        } else if (direction == Direction.Right) {
            dx = 1;
        } else return false;

        let startx = 0, starty = 0, endx = this.x - 1, endy = this.y - 1;
        if (dx > 0 || dy > 0) {
            startx = endx;
            starty = endy;
            endx = endy = 0;
        }

        //alert(startx + " " + starty + " " + endx + " " + endy);
        //alert(dx + " " + dy)

        for (let x = startx-dx, y = starty-dy; x != endx-dy || y != endy-dx; x -= dy, y -= dx) {

            if ((x < startx) && (x < endx)) {
                x = startx;
                y--;
            } else if ((x > startx) && (x > endx)) {
                x = startx;
                y++;
            } else if ((y < starty) && (y < endy)) {
                y = starty;
                x--;
            } else if ((y > starty) && (y > endy)) {
                y = starty;
                x++;
            }

            if (this.frontTiles[x][y] != null && this.frontTiles[x][y].movable) {

                if (this.frontTiles[x+dx][y+dy] == null) {
                    this.frontTiles[x+dx][y+dy] = this.frontTiles[x][y];
                    this.frontTiles[x][y] = null;
                    ret = true;
                    Tile.interactionPass(this, x+dx, y+dy);
                } else {
                    Tile.interactionBump(this, x, y, dx, dy);
                }
            }
            //alert(x + " " + y);
            //document.body.innerText += x + " " + y + "\n";
        }

        return ret;
    }

    move(direction) {
        while (this.moveOnce(direction));    
    }

    textDraw() {
        document.body.innerText = "";
        for (let i = 0; i < this.getY(); i++) {
            for (let j = 0; j < this.getX(); j++) {
                let tile = this.frontTiles[j][i];
                if (tile == null) {
                    document.body.innerText += "-";
                } else if (tile instanceof Player) {
                    document.body.innerText += "P";
                } else if (tile instanceof Wall) {
                    document.body.innerText += "W";
                } else if (tile instanceof Spikes) {
                    document.body.innerText += "S";
                } else if (tile instanceof Crate) {
                    document.body.innerText += "C";
                }
            }
            document.body.innerText += "\n";
        }
    }

    /**
     * Draws the level on a canvas
     * @param {Canvas} canvas 
     * @param {Number} tileSz 
     */
    draw(canvas = document.getElementById("gameCanvas"), tileSz = defaultTileSize) {

        //if (!(canvas instanceof Canvas) ) return;

        canvas.width = this.getX()*tileSz;
        canvas.height = this.getY()*tileSz;

        let ctx = canvas.getContext("2d");

        ctx.clearRect(0, 0, canvas.width, canvas.height)

        for (let i = 0; i < this.getX(); i++) {
            for (let j = 0; j < this.getY(); j++) {
                let texture = getTexture(this.backTiles[i][j]);
                if (texture != null) ctx.drawImage(texture, i*tileSz, j*tileSz, tileSz, tileSz);
                texture = getTexture(this.frontTiles[i][j]);
                if (texture != null) ctx.drawImage(texture, i*tileSz, j*tileSz, tileSz, tileSz);
            }
        }
    }
}



var curGame;



curGame = new Level(9, 9);

curGame.frontTiles[7][1] = Tile.Wall();
curGame.frontTiles[6][2] = Tile.Player();

curGame.frontTiles[1][7] = Tile.Crate();
curGame.frontTiles[2][7] = Tile.Crate();
curGame.frontTiles[1][6] = Tile.Crate();
curGame.frontTiles[2][6] = Tile.Crate();

curGame.backTiles[4][4] = Tile.Door();

curGame.name = "Name";
curGame.superlvl = 2;
curGame.sublvl = 5;
console.log(JSON.stringify(curGame))
curGame.draw(); 