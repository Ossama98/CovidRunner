export default class Virus{
    constructor(name){
        this.name = name;
        this.model ;
        this.models = [];
    }

    createVirus(positionZ,positionX){
        const virus = BABYLON.MeshBuilder.CreateSphere("virus",{});//{ width: 2, height: 1.5, depth: 3 }
        virus.position.y = 0.5;
        virus.position.z = positionZ ;
        virus.position.x = positionX;
        
        this.model =  virus;
        this.models.push(virus);
    }

    createMutipleViruses(nbVirus,groundHeight,groundWidth){
        for(var i=0 ; i<nbVirus ; i++){
            var randomPositionZ = this.getRandomIntInclusive(- groundHeight/2,groundHeight/2);
            var randomPositionX = this.getRandomIntInclusive(0,2);//0,1,or2
            if(randomPositionX === 0){//creates the virus at the left lane
                this.createVirus(randomPositionZ,- groundWidth/4);
            }
            else if(randomPositionX === 1){//creates the virus in the middle lane
                this.createVirus(randomPositionZ,0);
            }
            else{//randomPositionX === 2 (//creates the virus at the right lane)
                this.createVirus(randomPositionZ,groundWidth/4);
            }
        }
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

    toString(){
        return this.name;
    }
}
