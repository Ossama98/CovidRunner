
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
        
        // Run the game
        this.run();
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

    createScene(){
        let scene = new BABYLON.Scene(this.engine); //scene.clearColor = new BABYLON.Color3.White(); (the background)
        
        this.ground = this.buildGround(15,200,0);
        this.player = this.createPlayer();

        var camera = new BABYLON.FollowCamera("followCamera",new BABYLON.Vector3(this.player.position.x , this.player.position.y , this.player.position.z),scene);
        camera.lockedTarget = this.player;//the Camera follow the box
        camera.radius = -10 ; //distance away to stay from the target
        camera.heightOffset = 4; //position(height) relative to your target
        //camera.attachControl(canvas, true);

        var light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(1, 1, 0));
        
        // background
        new BABYLON.Layer("background", "assets/background.jpg", this.scene, true);

        return scene ;
    }

    run(){
        this.scene = this.createScene();

        this.engine.runRenderLoop( () => {
            console.log("Scene " + this.scene);
            this.scene.render();
        });
    }
    
}