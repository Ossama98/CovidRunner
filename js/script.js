window.addEventListener("DOMContentLoaded" , function(){
    var canvas = document.querySelector("#myCanvas");
    var engine = new BABYLON.Engine(canvas,true);

    var createScene = function(){
        var scene = new BABYLON.Scene(engine);
        //scene.clearColor = new BABYLON.Color3.White(); (the background)
        // Add a camera to the scene and attach it to the canvas
        var camera = new BABYLON.ArcRotateCamera("camera", -Math.PI / 2, Math.PI / 2.5, 14, new BABYLON.Vector3(0, 0, 0));
        camera.attachControl(canvas, true);

        // Add a lights to the scene
        var light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(1, 1, 0));
        
        buildGround();
        

        return scene ;
    }
    var scene = createScene();
    // main game Loop (called by default 60 times/s)
    engine.runRenderLoop(function(){
        scene.render();
    });
});



function buildGround(){
    var groundMat = new BABYLON.StandardMaterial("groundMat");
    groundMat.diffuseTexture = new BABYLON.Texture("assets/grass.jpg");

    var ground = BABYLON.MeshBuilder.CreateGround("ground", { width: 15, height: 16 });
    ground.material = groundMat;

    return ground; 
}