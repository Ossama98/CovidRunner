export default class Virus{
    constructor(name){
        this.name = name;
        this.model ;
    }

    createVirus(){
        const virus = BABYLON.MeshBuilder.CreateSphere("virus",{});//{ width: 2, height: 1.5, depth: 3 }
        virus.position.y = 0.5;
        //virus.position.z = - this.ground._height/2;
        
        this.model =  virus;
    }

    toString(){
        return this.name;
    }
}
