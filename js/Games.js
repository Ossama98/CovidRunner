
window.onload = init;
function init() {
    // called when the DOM is ready
    var game = new Game();
}

class Game {
    constructor() {
        this.canvas = document.querySelector("#myCanvas");

        this.engine = new BABYLON.Engine(this.canvas,true);

        this.scene ;
        this.ground;
        this.player;

        window.addEventListener("resize", () => this.engine.resize() );
        
        Game.gameState = ""
        Game.playerSpeed = 1
        
        // Run the game
        this.run();

        Game.speedX = 0;
        this.groundW = this.ground._width;
        this.groundH = this.ground._height;
    }

    buildGround(width , height ,positionZ){
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
    
    createPlayer(){
        const player = BABYLON.MeshBuilder.CreateBox("box",{});//{ width: 2, height: 1.5, depth: 3 }
        player.position.y = 0.5;
        player.position.z = - this.ground._height/2;
        
        return player;
    }

    listen(){
        window.addEventListener("keydown",(event) => {
            switch(event.key){
                case ' ':
                    Game.gameState = "playing";
                    break;
                case 'q':
                    if(Game.speedX === this.groundW/4){
                        console.log("q if")
                        Game.speedX = 0;
                    }
                    else{
                        console.log("q else")
                        Game.speedX = - this.groundW/4;
                    }
                    break;
                case 'd':
                    if(Game.speedX === - this.groundW/4){
                        console.log("d if")
                        Game.speedX = 0;
                    }
                    else{
                        console.log("d else")
                        Game.speedX = this.groundW/4;
                    }
                    break;
                default:
                    break;
            }
        })
    }
    
    createScene(){
        let scene = new BABYLON.Scene(this.engine); //scene.clearColor = new BABYLON.Color3.White(); (the background)
        
        this.ground = this.buildGround(10,200,0);
        this.player = this.createPlayer();

        var camera = new BABYLON.FollowCamera("followCamera",new BABYLON.Vector3(this.player.position.x , this.player.position.y , this.player.position.z),scene);
        //var camera = new BABYLON.ArcRotateCamera("camera", -Math.PI / 2, Math.PI / 2.5, 10, new BABYLON.Vector3(this.player.position.x , this.player.position.y , this.player.position.z),scene);
        camera.lockedTarget = this.player;//the Camera follow the box
        camera.radius = -10 ; //distance away to stay from the target
        camera.heightOffset = 4; //position(height) relative to your target
        //camera.attachControl(this.canvas, true);

        //light
        var light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(1, 1, 0));
        
        // background
        new BABYLON.Layer("background", "assets/background.jpg", this.scene, true);

        return scene ;
    }

    run(){
        this.scene = this.createScene();

        this.listen();

        this.engine.runRenderLoop( () => {
            this.player.position.x = Game.speedX; 
            if(Game.gameState === "playing"){
                this.player.position.z  += Game.playerSpeed;
                if(this.player.position.z >= 100){
                    Game.gameState = "end";
                    this.player.position.z = - this.ground._height/2;
                }
            }    
            this.scene.render();
        });
    }
    
}

Game.gameState = "";
Game.playerSpeed = 0;
Game.speedX = 0;

/*
this.engine.runRenderLoop( () => {
            this.listen();
            if(Game.gameState === "playing"){
                this.player.position.z  += Game.playerSpeed;
                if(this.player.position.z >= 100){
                    Game.gameState = "end";
                    this.player.position.z = - this.ground._height/2;
                }
            }    
            this.scene.render();
        });
*/