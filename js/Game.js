var ground;
var player;
window.addEventListener("DOMContentLoaded" , function(){
    var canvas = document.querySelector("#myCanvas");
    var engine = new BABYLON.Engine(canvas,true);

    var createScene = function(){
        var scene = new BABYLON.Scene(engine); //scene.clearColor = new BABYLON.Color3.White(); (the background)
        
        var camera = new BABYLON.ArcRotateCamera("camera", -Math.PI / 2, Math.PI / 2.5, 14, new BABYLON.Vector3(0, 0, 0));
        camera.attachControl(canvas, true);

        var light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(1, 1, 0));
        
        ground = buildGround();
        player = createPlayer();
        
        // background
        new BABYLON.Layer("background", "assets/background.jpg", scene, true);

        return scene ;
    }
    var scene = createScene();
    engine.runRenderLoop(function(){// main game Loop (called by default 60 times/s)
        scene.render();
    });
});



function buildGround(){
    var groundMat = new BABYLON.StandardMaterial("groundMat");
    groundMat.diffuseTexture = new BABYLON.Texture("assets/grass.jpg");

    var ground = BABYLON.MeshBuilder.CreateGround("ground", { width: 15, height: 16 });
    ground.material = groundMat;

    return ground; 
}

function createPlayer(){
    const player = BABYLON.MeshBuilder.CreateBox("box",{});//{ width: 2, height: 1.5, depth: 3 }
    player.position.y = 0.5;
    player.position.z = - ground._height/2;
    
    
    return player;
}


/*
if(reachedEnd){
            player.position.z -= 0.1;
            if(player.position.z <= - ground._height/2){
                reachedEnd = false;
            }
        }
        else{
            player.position.z += 0.1;
            if(player.position.z >= ground._height/2 ){
                reachedEnd = true;
            }
        }
*/