<?php
   require_once("handle_Files.php");
   
   // phpinfo();

?>

<html>
   <head>
      <link href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous">

      <script
           src="https://code.jquery.com/jquery-3.1.1.min.js"
           integrity="sha256-hVVnYaiADRTO2PzUGmuLJr8BLUSjGIZsDYGmIJLv2b8="
           crossorigin="anonymous">
              
      </script>
      <link rel="stylesheet" href="include/i-form.css">
      <script src="include/i-form.js"></script>
   </head>
   <body>
      <div class="container i-form">
         <div class="row">
            <div class="col-sm-12">
               <h1>Interactive content loader</h1>
               <form id="i-form" action="" method="POST" enctype="multipart/form-data">
               <div class="row">
                  <div class="col-xs-3 if-image-loader" id='if-logo' if-label="logo"> 
                  </div>
                  <div class="col-xs-9" id='if-header'> <!-- HEADER -->
                     <div id="if-header-title">
                        <input type="text" name="title" placeholder="Please enter a title"/>
                     </div>
                     <div id="if-header-address">
                        <input class="if-header-line" type="text" name="address" placeholder="Address" />                     
                     </div>
                     <div id="if-header-web">
                         <input class="if-header-line" type="text" name="web" placeholder="Website" /> 
                     </div>
                     <div id="if-header-mail">
                        <input class="if-header-line" type="text" name="mail" placeholder="e-Mail" /> 
                     </div>
                     <div id="if-header-time">
                        <input class="if-header-line" type="text" name="Time" placeholder="Time" /> 
                        
                     </div>       
                  </div>
               </div>

               <div class="row">
                  <div class="col-xs-12" id='if-body'> <!-- BODY -->
                     <div id="if-body-langA">
                         <input class="if-header-line" type="text" name="ContentES" placeholder="La descripcion de tu tienda" /> 
                     </div>
                     <div id="if-body-langB">
                        <input class="if-header-line" type="text" name="ContentES" placeholder="Your Stores Description" /> 
                        
                     </div>

                  </div>
               </div>
               <div class="col-xs-3 if-image-loader" id='if-imag01' if-label="img01"> 
                  </div>
                  <div class="col-xs-3 if-image-loader" id='if-imag02' if-label="img02"> 
                  </div>
                                   <!--  <img class="if-up-image" src="" alt="User uploaded Image">
                        <input class="if-image-loader" type="file" name="image" id="image01" />
                        <label for="image01"></label> -->

                  <input id='if-sumbit' type="submit"/>
               </form>
               
            </div>
         </div>
      </div>
      
   </body>
</html>

