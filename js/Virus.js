export default class Virus{
    constructor(name){
        this.name = name;
        this.model ;
        this.models = []
    }

    createVirus(positionZ){
        const virus = BABYLON.MeshBuilder.CreateSphere("virus",{});//{ width: 2, height: 1.5, depth: 3 }
        virus.position.y = 0.5;
        virus.position.z = positionZ ;
        //virus.position.z = - this.ground._height/2;
        
        this.model =  virus;
        this.models.push(virus);
    }

    createMutipleViruses(nbVirus,groundHeight){
        for(var i=0 ; i<nbVirus ; i++){
            var randomPositionZ = this.getRandomArbitrary(- groundHeight/2,groundHeight/2);
            this.createVirus(randomPositionZ);
        }
    }

    getRandomArbitrary(min, max) {
        return Math.random() * (max - min) + min;
    }

    toString(){
        return this.name;
    }
}
