Multiplayer pong.

When the game starts the game window shall show a button where the player can press Connect to play, 

the window shall also show number of players that are on the server. 

If two players are connected the screen that shall be shown to the user is a button with the text Spectate.

The game client needs:

A method to send user input to the server( up, down on the pong board).

A method to tell the server that the player is ready for a game.

A method to tell the server that it wants to spectate a game.

A method to recieve input from the server that comes from the other player

To begin with the name of the player will be the IP adress the player is connected from.


The server needs:

A method to recieve input from user and transmit it back to the users(movement of paddle)

A method that moves ball position in the game and controls it within the borders of the game WIDTH/HEIGHT.

A method that decides which screen that shall be shown to the user ( Connect to play, Spectate game).




