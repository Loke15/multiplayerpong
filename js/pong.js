
//Checks that the DOM is loaded
$(document).ready(function(){
    //Creates som canvas variables
  //Demonstrated in snake game at http://thecodeplayer.com/walkthrough/html5-game-tutorial-make-a-snake-game-using-html5-canvas-jquery
    var canvas = $("#canvas")[0];
    var ctx = canvas.getContext("2d");
    var w = $("#canvas").width();
    var h = $("#canvas").height();
    
    //
    
         

//Might be better to draw a javascript class diagram than thinking while coding? I'm not steady on that yet though.   
//Make the players
//How ? a player object? And then add various behaviours like draw() and attributes like color or points to the object?


//Lets create the snake now
	var player;//an array of cells to make up the snake
	var cw = 10;
        var d; //default direction
        
        function init()
	{
		d = "right"; //default direction
		create_player();
		
		//Lets move the snake now using a timer which will trigger the paint function
		//every 60ms
		if(typeof game_loop != "undefined") clearInterval(game_loop);
		game_loop = setInterval(paint, 60);
	}
	init();
        
        
	
	function create_player()
	{
		var length = 5; //Length of the snake
		player = []; //Empty array to start with
		for(var i = length-1; i>=0; i--)
		{
			//This will create a horizontal snake starting from the top left
			player.push({x:0, y:i});
		}
	}
	
	//Lets paint the snake now
	function paint()
	{
            
            //To avoid a player trail paint on every frame
    	ctx.fillStyle = "white";
	ctx.fillRect(0, 0, w, h);
	ctx.strokeStyle = "black";
	ctx.strokeRect(0, 0, w, h);
            
            var nx = player[0].x;
		var ny = player[0].y;
		//These were the position of the head cell.
		//We will increment it to get the new head position
		//Lets add proper direction based movement now
		if(d == "down") ny++;
		else if(d == "up") ny--;
            
            
            
            //
            var tail = player.pop(); 
		tail.x = nx; 
                tail.y = ny;
		player.unshift(tail); 
            
		for(var i = 0; i < player.length; i++)
		{
			var c = player[i];
			//Lets paint 10px wide cells
			ctx.fillStyle = "#4444ff";
			ctx.fillRect(c.x*10+100, c.y*10+100, 10, 10);
                       
		}
                
                
	}
	
        //Move pong player
     $(document).keydown(function(e){
		var key = e.which;
		if(key == "38") d = "up";
		else if(key == "40") d = "down";
		
	})
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
//Or 2 instances of a player object. Maybe with an isAIplayer boolean attribute?
var player2;




});