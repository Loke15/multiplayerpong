Instead of starting at the hardest part first we are gonna follow a worklist where we start with simpler things and 
try to learn how to use websockets together with javascript.

1. When a user connects, we want a different screen screen shown, this shall come different if there is 1 user or 3 users
  If Less than two users have connected the screen shown shall be a button with the text "Connect to play".
  If there is more than two players, then a screen that shows the actual game that has started shall be broadcasted to the user..
  

2. If two players has connected to the server, to begin with we just want to show a bouncing ball 
    within the borders of the screen.
    This means that the server will be the only one broadcasting and the players will not send out any information
    to the server other than that they are connected.

3. This step will be that a player shall control a paddle and the player client will send info to the server,
  telling the server that the paddle got moved up/down and the server will then respond with updating the players window.
  

  
