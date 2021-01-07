export default class Player{
    constructor(name){
        this.name = name;
        this.model ;
    }

    createPlayer(groundHeight){
        const player = BABYLON.MeshBuilder.CreateBox("box",{});//{ width: 2, height: 1.5, depth: 3 }
        player.position.y = 0.5;
        player.position.z = - groundHeight/2;
        
        this.model = player;
    }

    toString(){
        return this.name;
    }
}
