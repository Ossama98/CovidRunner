export default class Player{
    constructor(name,groundHeight,speed){
        this.name = name;
        this.model = BABYLON.MeshBuilder.CreateBox("box",{});
        this.model.position.y = 0.5;
        this.model.position.z = - groundHeight/2;
        this.speed = speed;

        this.initialPosX = this.model.position.x;//initial player positions , initialized after a call to createPlayer
        this.initialPosY = this.model.position.y;
        this.initialPosZ = this.model.position.z;
        this.infected = false;
    }

    toString(){
        return this.name;
    }
}
