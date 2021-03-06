//let img = new Image();
//img.src = "images/Crate.png";

// img = document.getElementById("imgplayer");

// let canvas = document.getElementById("gameCanvas");
// let ctx = canvas.getContext("2d");

// ctx.drawImage(img, 0, 0, 40, 40,);
// img = document.getElementById("imgcrate");
// ctx.drawImage(img, 40, 0, 40, 40);

document.body.innerHTML += 
"<img class='texture' src='images/Player.png' id='imgplayer' style='display: none;'>" +
"<img class='texture' src='images/PlayerWin.png' id='imgplayerwin' style='display: none;'>" +
"<img class='texture' src='images/PlayerLoss.png' id='imgplayerloss' style='display: none;'>" +
"<img class='texture' src='images/Crate.png' id='imgcrate' style='display: none;'>" +
"<img class='texture' src='images/Wall.png' id='imgwall' style='display: none;'>" +
"<img class='texture' src='images/Empty.png' id='imgempty' style='display: none;'>" +
"<img class='texture' src='images/Spikes.png' id='imgspikes' style='display: none;'>" +
"<img class='texture' src='images/End.png' id='imgdoor' style='display: none;'>"


const defaultTileSize = 50;

var textureLoader = {
    "Player": document.getElementById("imgplayer"),
    "PlayerWin": document.getElementById("imgplayerwin"),
    "PlayerLoss": document.getElementById("imgplayerloss"),
    "Crate": document.getElementById("imgcrate"),
    "Wall": document.getElementById("imgwall"),
    "Spikes": document.getElementById("imgspikes"),
    "Empty": document.getElementById("imgempty"),
    "Door": document.getElementById("imgdoor"),
}

/**
 * Checks the tile type and returns a corresponding texture, or null if it couldn't be found.
 * @param {Tile} tile
 * @return {Texture}
 */
function getTexture(tile) {
    if (tile == null) return;
    
    if (tile.type == "Player") {
        if (tile.state == 0) return textureLoader["Player"];
        if (tile.state > 0) return textureLoader["PlayerWin"];
        if (tile.state < 0) return textureLoader["PlayerLoss"];
    }
    else if (tile.type == "Crate") return textureLoader["Crate"];
    else if (tile.type == "Spikes") return textureLoader["Spikes"];
    else if (tile.type == "Wall") return textureLoader["Wall"];
    else if (tile.type == "Door") return textureLoader["Door"];
    else if (tile.type == "Empty") return textureLoader["Empty"];

    return null;
}
