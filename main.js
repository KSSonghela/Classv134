img="";
modelstatus="";
objects =[];

function preload()
{
    img=loadImage("dog_cat.jpg");
}

function setup()
{
    canvas=createCanvas(380,380);
    canvas.center();
    video=createCapture(VIDEO);
    video.size(380,380);
    video.hide();
}

function draw()
{
    image(video,0,0,380,380);
    
    if(modelstatus !="")
    {
        r=random(255);
        b=random(255);
        g=random(255);
        object_detector.detect(video,gotResult);
        for(i=0;i<objects.length;i++)
        {
            document.getElementById("status").innerHTML="Status : Objects Detected ";
            document.getElementById("number_of_objects").innerHTML="Number of objects detected"+ object.length;
            fill(r,g,b);
            percent=floor(objects[i].confidence*100);
            text(objects[i].label + " " + percent + "%",objects[i].x+15,objects[i].y+15 );
            noFill()
            stroke(r,g,b);
           rect(objects[i].x,objects[i].y,objects[i].width,objects[i].height);
        }
    }
}

function modelloaded()
{
    console.log("Model Loaded ! ");
    modelstatus=true;
}

function gotResult(error,results)
{
    if(error)
    {
        console.log(error);
    }
    else
    {
        console.log(results);
        objects=results;
    }

}

function start()
{
    object_detector=ml5.objectDetector('cocossd',modelloaded);
    document.getElementById("status").innerHTML="Status : Detecting Objects ";
}
