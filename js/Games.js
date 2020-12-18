
class Game {
    constructor() {
        this.canvas = document.querySelector("#myCanvas");

        this.engine = new BABYLON.Engine(this.canvas,true);

        this.scene  ;

        window.addEventListener("resize", () => this.engine.resize() );
        
        // Run the game
        this.run();
    }

    buildGround(){
        //var groundMat = new BABYLON.StandardMaterial("groundMat");
        //groundMat.diffuseTexture = new BABYLON.Texture("assets/grass.jpg");
    
        var ground = BABYLON.MeshBuilder.CreateGround("ground", { width: 15, height: 16 });
        //ground.material = groundMat;
    
        return ground; 
    }
    
    createPlayer(){
        const player = BABYLON.MeshBuilder.CreateBox("box",{});//{ width: 2, height: 1.5, depth: 3 }
        player.position.y = 0.5;
        player.position.z = - this.ground._height/2;
        
        return player;
    }

    createScene(){
        var scene = new BABYLON.Scene(this.engine); //scene.clearColor = new BABYLON.Color3.White(); (the background)
        
        var camera = new BABYLON.ArcRotateCamera("camera", -Math.PI / 2, Math.PI / 2.5, 14, new BABYLON.Vector3(0, 0, 0));
        camera.attachControl(this.canvas, true);

        var light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(1, 1, 0));
        
        //this.ground = this.buildGround();
        //this.player = this.createPlayer();
        
        // background
        //new BABYLON.Layer("background", "assets/background.jpg", this.scene, true);

        return scene ;
    }

    run(){
        this.scene = this.createScene();
        
        /*this.engine.runRenderLoop(function(){// main game Loop (called by default 60 times/s)
            console.log("Scene " + this);
            this.scene.render();
        }); */

        this.engine.runRenderLoop( () => {
            console.log("Scene " + this.scene);
            this.scene.render();
        });
    }
    
}

var game = new Game();