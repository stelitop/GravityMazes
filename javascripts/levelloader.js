var levelList = new Array(0);

$.getJSON("levels/levelList.json", function(result) {
    for (let i = 0; i < result.urls.length; i++) {
        //alert(result.urls[i]);

        $.ajax({
            url: "levels/" + result.urls[i],
            dataType: 'json',
            async: false,
            success: function(levelObj) {
                //alert(JSON.stringify(levelObj));
                let lvl = Level.fromObject(levelObj);
                levelList.push(lvl);
    
                let button = document.createElement("div");
    
                button.className = "levelbutton";
                button.innerText = lvl.name + "\n" + lvl.superlvl + "-" + lvl.sublvl;
                const curLvl = levelList.length - 1;
                button.onclick = function() {
                    curGame = Level.fromObject(JSON.parse(JSON.stringify(levelList[curLvl])))
                    curGame.draw();
                }
    
                document.body.appendChild(button);
            }
        })
        // $.getJSON("levels/" + result.urls[i], function(levelObj) {
        //     //alert(JSON.stringify(levelObj));
        //     let lvl = Level.fromObject(levelObj);
        //     levelList.push(lvl);

        //     let button = document.createElement("div");

        //     button.className = "levelbutton";
        //     button.innerText = lvl.name + "\n" + lvl.superlvl + "-" + lvl.sublvl;
        //     const curLvl = levelList.length - 1;
        //     button.onclick = function() {
        //         curGame = Level.fromObject(JSON.parse(JSON.stringify(levelList[curLvl])))
        //         curGame.draw();
        //     }

        //     document.body.appendChild(button);
        // });
    }
})

//currently the levels are loaded as button asynchronically, can be a bit shuffled