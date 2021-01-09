export default class Virus{
    constructor(name,positionZ,positionX){
        this.name = name;
        this.model = BABYLON.MeshBuilder.CreateSphere("virus",{});
        this.model.position.y = 0.5;
        this.model.position.z = positionZ ;
        this.model.position.x = positionX;

        this.models = [];
    }
    
    toString(){
        return this.name;
    }
}
