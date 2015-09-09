<!DOCTYPE html>
<!--
To change this license header, choose License Headers in Project Properties.
To change this template file, choose Tools | Templates
and open the template in the editor.
-->
<html>
    <head>
        <meta charset="UTF-8">
        <title>Multiplayerpong</title>       
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/2.1.4/jquery.min.js"></script>
        <script src="/js/scripts.js" type="text/javascript"></script>
        <script type="text/javascript" src="js/Chart.min.js"></script>
        <!-- Latest compiled and minified CSS -->
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/css/bootstrap.min.css">
        <!-- Optional theme -->
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/css/bootstrap-theme.min.css">
        
        <!-- custom css -->
        <link rel="stylesheet" href="css/styles.css">
        <!-- Latest compiled and minified JavaScript -->
        <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/js/bootstrap.min.js"></script>
        <!-- custom js -->
        <script src="js/pong.js"></script>
    </head>
    <body>

        <div class="container-fluid">
            <nav class="navbar navbar-default" role="navigation">
   <div class="navbar-header">
      <button type="button" class="navbar-toggle" data-toggle="collapse" data-target=".navbar-ex1-collapse">
         <span class="sr-only">Toggle navigation</span>
         <span class="icon-bar"></span>
         <span class="icon-bar"></span>
         <span class="icon-bar"></span>
      </button>
   </div>
   <div class="collapse navbar-collapse  navbar-ex1-collapse">
      <ul class="nav navbar-nav">
         <li class="text-center"><a href="index.php">Pong</a></li>
         <li><a class="text-center" href="about.php">About</a></li>   
      </ul>
  </div>
            </nav>
            <!-- This can't possibly be how you are meant to design with columns in bootstrap ? ?? !! ?? -->
            <div class="row">
                <div class="col-sm-4">
                    
                </div>
                <div class="col-sm-4">
                    <p>Pong</p>
                </div>
                <div class="col-sm-4">
                    
                </div>
                
            </div>   
            <div class="row">
                <div class="col-sm-4">
                   
                </div>
                <div class="col-sm-4">
                    <!-- Draw the pong game in this canvas -->
                    <canvas id="canvas" width="450" height="450"></canvas>
                </div>
                <div class="col-sm-4">
                
                </div>
                
            </div>
        </div>

    </body>
</html>
