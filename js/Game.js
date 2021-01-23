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

        this.divFps = document.getElementById("fps");//fps

        this.divScore = document.getElementById("score");//fps

        this.scene ;
        this.ground;
        this.player ;
        this.virus ;

        this.nbVirusToCreate = 10 ;

        window.addEventListener("resize", () => this.engine.resize() );
        
        this.groundW = 20;//ground width
        this.groundH = 400;//ground height

        this.playerSpeed = 1;
        
        // Run the game
        this.run();

        this.music;
        this.musicPlaying = true;
        //play a background music
        this.playMusic();

        this.playerMoveSound = new Howl({
            urls: ['https://mainline.i3s.unice.fr/mooc/SkywardBound/assets/sounds/plop.mp3'],
            onload: function () {

            }
        });

        this.displayedMessage;
    }

    /**
     * This method builds a ground
     * @param {*} width the width of the ground
     * @param {*} height the height of the ground
     * @param {*} positionZ the position on the Z axis of the ground
     */
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

    /**
     * This method plays a music in the background
     */
    playMusic() {// Load the sound and play it automatically once ready
        // Adding a Continous Sound (we can play it only once with setInterval(() => sound.play(), 3000);)
        this.music = new BABYLON.Sound("sound", "https://mainline.i3s.unice.fr/mooc/SkywardBound/assets/sounds/humbug.mp3", 
        this.scene,null, { loop: true, autoplay: true });
        
    }

    /**
     * This method display a text on the screen
     * @param {*} message the message to display
     */
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

    /**
     * This method contains a listener for different keyboard input keys
     */
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
                      this.divScore.innerHTML = Game.scorePoints + " pts";
                    }
                    else if(Game.gameState === "end"){
                        Game.gameState = "playing";
                    }
                    break;
                case 'q':
                    if(Game.speedX === this.groundW/4){
                        Game.speedX = 0;
                        this.playerMoveSound.play();
                    }
                    else{
                        Game.speedX = - this.groundW/4;
                        this.playerMoveSound.play();
                    }
                    break;
                case 'd':
                    if(Game.speedX === - this.groundW/4){
                        Game.speedX = 0;
                        this.playerMoveSound.play();
                    }
                    else{
                        Game.speedX = this.groundW/4;
                        this.playerMoveSound.play();
                    }
                    break;
                case 'p':
                    if(this.musicPlaying){
                        this.music.stop();
                        this.musicPlaying = false;
                    }
                    else{
                        this.music.play();
                        this.musicPlaying = true;
                    }
                default:
                    break;
            }
        })
    }

    /**
     * This method gives a random integer between min and max
     * @param {*} min 
     * @param {*} max 
     */
    getRandomIntInclusive(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min +1)) + min;
    }

    /**
     * This method creates viruses in random positions on the ground
     * @param {*} nbVirus is the number of viruses to create
     */
    createMutipleViruses(nbVirus){
        var virus;
        for(var i=0 ; i<nbVirus ; i++){
            var randomPositionZ = this.getRandomIntInclusive(- this.groundH/2,this.groundH/2);
            var randomPositionX = this.getRandomIntInclusive(0,2);//0,1,or2
            if(randomPositionX === 0){//creates the virus at the left lane
                virus = new Virus(this.virus , randomPositionZ , - this.groundW/4);
                this.virus.models.push(virus);
            }
            else if(randomPositionX === 1){//creates the virus in the middle lane
                virus = new Virus(this.virus , randomPositionZ , 0);
                this.virus.models.push(virus);
            }
            else{//randomPositionX === 2 (//creates the virus at the right lane)
                virus = new Virus(this.virus , randomPositionZ , this.groundW/4);
                this.virus.models.push(virus);
            }
        }
    }
    
    /**
     * This method creates the scene of the game
     */
    createScene(){
        this.scene = new BABYLON.Scene(this.engine); 
        
        this.ground = this.buildGround(this.groundW ,this.groundH,0);

        //this.player.createPlayer(this.groundH);
        this.player = new Player("Ossama",this.groundH,this.playerSpeed);

        this.virus = new Virus("Covid");
        this.createMutipleViruses(this.nbVirusToCreate);

        var camera = new BABYLON.ArcRotateCamera("camera", -Math.PI / 2, Math.PI / 2.5, 15, new BABYLON.Vector3(this.player.initialPosX , this.player.initialPosY , this.player.initialPosZ),this.scene);
        //camera.attachControl(this.canvas, true);

        //light
        var light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(1, 1, 0));
        
        // background
        new BABYLON.Layer("background", "assets/background.jpg", this.scene, true);

        return this.scene ;
    }

    /**
     * This method checks if the player get in contact with a virus
     */
    checkInfection(){
        this.virus.models.forEach((virus) => {
            if(Math.trunc(this.player.model.position.z) === virus.model.position.z && Math.trunc(this.player.model.position.x) === virus.model.position.x){
                this.player.infected = true;
            }
        });
        return this.player.infected;
    }

    /**
     * Render loop
     */
    run(){
        this.scene = this.createScene();

        this.listen();
        
        this.engine.runRenderLoop( () => {
            this.divFps.innerHTML = this.engine.getFps().toFixed() + " fps";
            this.scene.activeCamera.target.z = this.player.model.position.z ;//to make the camera follow the player
            this.player.model.position.x = Game.speedX; 
            if(Game.gameState === "playing"){
                Game.scorePoints += 1;
                this.divScore.innerHTML = Game.scorePoints + " pts";
                if(this.checkInfection()){
                    Game.gameState = "gameOver";
                    this.addText("Game Over .\n   You got infected by a virus . \n Press space to play again.");
                    this.player.infected = false;
                    Game.scorePoints = 0;
                }
                this.player.model.position.z  += this.player.speed;
                if(this.player.model.position.z >= this.groundH/2){//was >=100
                    Game.gameState = "end";
                    this.player.model.position.z = - this.groundH/2;
                }
            }    
            this.scene.render();
        });
    }
    
}

Game.gameState = "";//"" or "playing" or "gameOver" or "end"
Game.speedX = 0;
Game.scorePoints = 0;