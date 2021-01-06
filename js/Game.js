var ground;
var player;
var playerSpeed = 0.3;
var gameState = "start";
window.addEventListener("DOMContentLoaded" , function(){
    var canvas = document.querySelector("#myCanvas");
    var engine = new BABYLON.Engine(canvas,true);

    var createScene = function(){
        var scene = new BABYLON.Scene(engine); 
        
        ground = buildGround(15,200,0);
        player = createPlayer();

        /*var camera = new BABYLON.ArcRotateCamera("camera", -Math.PI / 2, Math.PI / 2.5, 10, new BABYLON.Vector3(0, 0, 0),scene);
        camera.setTarget(player)
        camera.radius = -5;*/
        

        var camera = new BABYLON.FollowCamera("followCamera",new BABYLON.Vector3.Zero(),scene);
        camera.lockedTarget = player;//the Camera follow the box
        camera.radius = -10 ; //distance away to stay from the target
        camera.heightOffset = 4; //position(height) relative to your target
        //camera.attachControl(canvas, true);

        var light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(1, 1, 0));
               
        // background
        new BABYLON.Layer("background", "assets/background.jpg", scene, true);

        return scene ;
    }
    var scene = createScene();
    
    engine.runRenderLoop(function(){// main game Loop (called by default 60 times/s)
        listen();
        if(gameState === "playing"){
            player.position.z  += playerSpeed;
            if(player.position.z >= 100){
                gameState = "end";
                player.position.z = - ground._height/2;
            }
        }       
        scene.render();
    });
});

/*
if(player.position.z >= ground._height/2 ){
            reachedEnd = true;
            //ground.dispose();
            //ground = buildGround(ground._width , ground._height , player.position.z / 2);
            ground.position.z = player.position.z /2;
        }
        */

function listen(){
    window.addEventListener("keydown",function(event){
        switch(event.key){
            case ' ':
                gameState = "playing";
                break;
            case 'q':
                if(player.position.x - 0.1 <= 0 ){
                    player.position.x = ground._width/4;
                }
                else{
                    player.position.x -= 0.1;
                }
                break;
            case 'd':
                player.position.x += 0.1;
                break;
            default:
                break;
        }
    })
}


function buildGround(width , height ,positionZ){
    var groundMat = new BABYLON.StandardMaterial("groundMat");
    groundMat.diffuseTexture = new BABYLON.Texture("assets/grass.jpg");
    groundMat.zOffset = 1;
    groundMat.specularColor = BABYLON.Color3.Black();
    groundMat.diffuseTexture.uScale = 10;
    groundMat.diffuseTexture.vScale = 30;


    var ground = BABYLON.MeshBuilder.CreateGround("ground", { width: width, height: height });
    ground.material = groundMat;

    ground.receiveShadows = true;

    ground.position.z = positionZ;

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