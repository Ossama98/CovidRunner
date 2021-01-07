import Player from "/js/Player.js" 
import Virus from "/js/Virus.js"
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
        this.player = new Player("Ossama");
        this.virus = new Virus("Covid");

        window.addEventListener("resize", () => this.engine.resize() );
        
        Game.gameState = ""; //"" or "playing" or "gameOver" or "end"
        Game.playerSpeed ;
        
        // Run the game
        this.run();

        this.displayedMessage;

        Game.speedX = 0;
        this.groundW ;//ground width
        this.groundH ;//ground height
    }

    buildGround(width , height ,positionZ){
        var groundMat = new BABYLON.StandardMaterial("groundMat");
        groundMat.diffuseTexture = new BABYLON.Texture("assets/grass.jpg");
        groundMat.diffuseColor = new BABYLON.Color3.Green();
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

    addText(message){
      // GUI
      var advancedTexture = BABYLON.GUI.AdvancedDynamicTexture.CreateFullscreenUI("UI");

      var text1 = new BABYLON.GUI.TextBlock();
      text1.text = message;
      text1.color = "red";
      text1.fontSize = 24;
      advancedTexture.addControl(text1);    

      this.displayedMessage = text1;
    }

    listen(){
        window.addEventListener("keydown",(event) => {
            switch(event.key){
                case ' ':
                    if(Game.gameState === ""){
                      Game.gameState = "playing";
                    }
                    else if(Game.gameState === "gameOver" ){
                      this.displayedMessage.text = "";
                      Game.gameState = "";
                      this.player.model.position.y = this.player.initialPosY;
                      this.player.model.position.z = this.player.initialPosZ;
                    }
                    else if(Game.gameState === "end"){
                        Game.gameState = "playing";
                    }
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
        
        this.ground = this.buildGround(20,200,0);
        this.groundW = this.ground._width;
        this.groundH = this.ground._height;

        this.player.createPlayer(this.groundH);

        this.virus.createVirus(0);
        //this.virus.createMutipleViruses(10,this.groundH);

        //var camera = new BABYLON.FollowCamera("followCamera",new BABYLON.Vector3(this.player.position.x , this.player.position.y , this.player.position.z),scene);
        var camera = new BABYLON.ArcRotateCamera("camera", -Math.PI / 2, Math.PI / 2.5, 15, new BABYLON.Vector3(this.player.model.position.x , this.player.model.position.y , this.player.model.position.z),scene);
        //camera.lockedTarget = this.player;//the Camera follow the box
        //camera.radius = -10 ; //distance away to stay from the target
        //camera.heightOffset = 4; //position(height) relative to your target
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
          console.log("GameState : " + Game.gameState)
            this.scene.activeCamera.target.z = this.player.model.position.z ;//to make the camera follow the player
            this.player.model.position.x = Game.speedX; 
            if(Game.gameState === "playing"){
                if(this.player.model.position.z === this.virus.model.position.z && this.player.model.position.x === this.virus.model.position.x){//check collision
                    console.log("RIPPPP")
                    Game.gameState = "gameOver";
                    this.addText("Game Over . Press space to play again");
                }
                this.player.model.position.z  += Game.playerSpeed;
                if(this.player.model.position.z >= this.groundH/2){//was >=100
                    Game.gameState = "end";
                    this.player.model.position.z = - this.groundH/2;
                }
            }    
            this.scene.render();
        });
    }
    
}

Game.gameState = "";
Game.playerSpeed = 1;
Game.speedX = 0;