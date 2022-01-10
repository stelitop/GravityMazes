var editorLevel = new Level(7, 7);

const canvas = document.getElementById("editorcanvas");
const tileSizeEditor = 50;
var curSelectedTile = Tile.Wall();
var curLayer = true; //true for front layer, false for back layer


function temp() {
    editorLevel.draw(canvas, tileSizeEditor)
}
setTimeout(temp, 5);

document.getElementById("editorSubmit").onclick = function() {
    let x = document.querySelector("#editorX").value;
    let y = document.querySelector("#editorY").value;
    let name = document.querySelector("#editorName").value;
    let superlvl = document.querySelector("#editorSuper").value;
    let sublvl = document.querySelector("#editorSub").value;
    
    editorLevel = new Level(x, y);
    editorLevel.name = name;
    editorLevel.superlvl = superlvl;
    editorLevel.sublvl = sublvl

    editorLevel.draw(canvas, tileSizeEditor);   
}

document.getElementById("editorLog").onclick = function() {
    console.log(JSON.stringify(editorLevel));
}

let layerButton = document.getElementById("editorLayer");
layerButton.onclick = function() {
    curLayer = !curLayer;
    if (curLayer) layerButton.value = "Current Layer: Front";
    else layerButton.value = "Current Layer: Back";
}

canvas.addEventListener("mousedown", function(event) {
    const rect = canvas.getBoundingClientRect();
    const x = Math.floor((event.clientX - rect.left)/tileSizeEditor);
    const y = Math.floor((event.clientY - rect.top)/tileSizeEditor);

    if (curSelectedTile.type == "Empty" && curLayer) editorLevel.frontTiles[x][y] = null;
    else if (curLayer) editorLevel.frontTiles[x][y] = JSON.parse(JSON.stringify(curSelectedTile));
    else editorLevel.backTiles[x][y] = JSON.parse(JSON.stringify(curSelectedTile));
    editorLevel.draw(canvas, tileSizeEditor);   
    //alert(x + " " + y);
})

let textureElements = document.getElementsByClassName("texture");
for (let i in textureElements) {
    const el = textureElements[i];
    if (el.id != "imgplayerwin" && el.id != "imgplayerloss") el.style = true;
    el.width = tileSizeEditor;
    el.height = tileSizeEditor;
    el.onclick = function() {
        if (el.id == "imgplayer") curSelectedTile = Tile.Player();
        else if (el.id == "imgcrate") curSelectedTile = Tile.Crate();
        else if (el.id == "imgwall") curSelectedTile = Tile.Wall();
        else if (el.id == "imgspikes") curSelectedTile = Tile.Spikes();
        else if (el.id == "imgempty") curSelectedTile = Tile.Empty();
        else if (el.id == "imgdoor") curSelectedTile = Tile.Door();
    }
}