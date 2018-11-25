$(document).ready(function(){
    


    //declare variables
        //paintingerasing or not
        var paint = false;
        //painting or erasing
        var paint_erase="paint";
    
        //get canvas and context
        var canvas = document.getElementById('paint');
        var context = canvas.getContext('2d');
    
   
        //get the canvas container
        var container = $("#container");
    
        //mouse position
        var mouse= {x:0, y:0};
        
        //on load load saved work from localstorage
        if(localStorage.getItem("imgCanvas") != null){
            var img = new Image();
            img.onload = function(){
                context.drawImage(img,0 ,0)
            }
            img.src = localStorage.getItem("imgCanvas");
        }
    //set drawing parameters (lineWidth, lineJoin, lineCap)
        context.lineWidth = 3;
        context.lineJoin = "round";
        context.lineCap ="round";
    
    //click inside container
        container.mousedown(function(e){
            paint = "true";
            context.beginPath();
            mouse.x = e.pageX - this.offsetLeft;
            mouse.y = e.pageY - this.offsetTop;
            context.moveTo(mouse.x,mouse.y);
            
        });
    
    //move the mouse while holding mouse key
        container.mousemove(function(e){
            mouse.x = e.pageX - this.offsetLeft;
            mouse.y = e.pageY - this.offsetTop;
            if(paint){
                if(paint_erase == "paint"){
                    //get color input
                    context.strokeStyle = $("#paintColor").val();;
                }else{
                    //White color
                    context.strokeStyle = "white";
                }
                context.lineTo(mouse.x,mouse.y);
                context.stroke();
            }
            
        });
    //mouse up = we are not paintingerasing anymore
    container.mouseup(function(){
        paint = false;
    });
    //if we leave the container we are not paintingerasing anymore
    container.mouseleave(function(){
        paint = false;
    });
   
    //click on the reset button
    $("#reset").click(function(){
        context.clearRect(0,0,canvas.width,canvas.height);
        paint_erase = "paint";
        $("#erase").removeClass("eraseMode");
    });
    //click on save button
    /*We are going to make use of the html5 local storage for this purpose there are two main types of browser storage... local storage and session storage..
    
    The local storage can be used to store data without expiration date while session storage will store your data for a particular amount of time.. Here we are going to make use of the local storage*/
     
    $("#save").click(function(){
        if(typeof(localStorage) != null){
        localStorage.setItem("imgCanvas", canvas.toDataURL());
            
 window.alert(/*localStorage.getItem("imgCanvas")*/"your picture has been saved");
    }else{
        window.alert("Your device browser does not support Local Storage");
    }
    });
    
    //click on the erase button
    $("#erase").click(function(){
        if(paint_erase == "paint"){
        paint_erase="erase";
    }else{
        paint_erase="paint";
    }
    $(this).toggleClass("eraseMode");
    });
    
    //change color input
    $("#paintColor").change(function(){
        $("#circle").css("background-color",$(this).val());
        
    });
    
    //change lineWidth using slider
        $('#slider').slider({
        min: 3, 
        max: 30,
        slide: function(event,ui){
            $("#circle").height(ui.value);
            $("#circle").width(ui.value);
            context.lineWidth = ui.value;
        }
    });
    
    
});