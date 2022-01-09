document.onkeydown = function(key) {

    if (curGame == null) return;

    let canvas = document.getElementById("gameCanvas");

    if (key.keyCode == 37) { // left arrow
        curGame.move(Direction.Left);        
    } else if (key.keyCode == 39) { // right arrow
        curGame.move(Direction.Right);
    } else if (key.keyCode == 38) { // up arrow
        curGame.move(Direction.Up);
    } else if (key.keyCode == 40) { // down arrow
        curGame.move(Direction.Down);
    }

    curGame.draw();
}