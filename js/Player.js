export default class Player{
    constructor(name){
        this.name = name;
        this.model ;
        this.initialPosX;//initial player positions , initialized after a call to createPlayer
        this.initialPosY;
        this.initialPosZ;
        this.infected = false;
    }

    createPlayer(groundHeight){
        const player = BABYLON.MeshBuilder.CreateBox("box",{});//{ width: 2, height: 1.5, depth: 3 }
        player.position.y = 0.5;
        player.position.z = - groundHeight/2;
        
        this.initialPosY = player.position.y;
        this.initialPosZ = player.position.z;

        this.model = player;
    }

    toString(){
        return this.name;
    }
}
