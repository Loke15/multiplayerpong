<!DOCTYPE html>
<html>
    <head>
        <meta charset="UTF-8">
        <title>Tetris</title>       
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        
        
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/2.1.4/jquery.min.js"></script>
        <script src="js/javascript.js"></script>
        <link rel="stylesheet" href="bootstrap/css/bootstrap.min.css">
    </head>
    <body>
        <header></header>
        <nav>
            <a href="index.php">Home</a>
            <a href="Game.php">JQuery Examples</a>
            <a href="about.php">About</a>
        </nav>
        <h1>JQuery examples</h1>
        <div id="wrapper">
            <div>
                <h2>Example 1:</h2>
                <p>Consider the following example of code from W3Schools.com:</p>
                <p>
                    <?php 
                    ob_start();                      // start capturing output
                        $code = ob_get_contents();    // get the contents from the buffer
                           
                      
                 highlight_string("The code: " . $code);
                 ob_end_clean();   
                    highlight_string('$(document).ready(function(){<br />
                        $("p").click(function(){<br />
                            $(this).hide();<br />
                        });<br />
                });' ); ?>     
                   
                </p>
                
                <p>In this case we'd hide the element clicked which is of tag "p". </p>
                
            </div>
        </div>
        <div>
                <h2>Example 2:</h2>
                
                <p>In this case we'd hide the element clicked which is of tag "p". </p>
                
        </div>
        </div>
        <footer>Copyright© Stian Asplund</footer>
    </body>
    <!-- Loads javascript tests.js at the end in order to have the body loaded before trying Testing the code and printing errors 
    on it.-->
    <script src="js/tests.js"></script>
</html>

