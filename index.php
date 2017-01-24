<?php
   require_once("handle_Files.php");
   
   // phpinfo();

?>
<html>
   <head>
      <link href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous">

      <link rel="stylesheet" href="Interactive_Form/i-form.css">
      <script
           src="https://code.jquery.com/jquery-3.1.1.min.js"
           integrity="sha256-hVVnYaiADRTO2PzUGmuLJr8BLUSjGIZsDYGmIJLv2b8="
           crossorigin="anonymous">
              
      </script>
   </head>
   <body>
      <div class="container i-form">
         <div class="row">
            <div class="col-sm-12">
               <h1>Interactive content loader</h1>
               <form id="i-form" action="" method="POST" enctype="multipart/form-data">
               <div class="row">
                  <div class="col-xs-3" id='if-logo'> <!-- LOGO -->
                     <input type="file" name="image" />
                     
                  </div>
                  <div class="col-xs-9" id='if-header'> <!-- HEADER -->
                     <div id="if-header-title">
                        
                     </div>
                     <div id="if-header-address">
                        
                     </div>
                     <div id="if-header-web">
                        
                     </div>
                     <div id="if-header-mail">
                        
                     </div>
                     <div id="if-header-web">
                        
                     </div>
                     <div id="if-header-time">
                        
                     </div>       
                  </div>
               </div>

               <dir class="row">
                  <div class="col-xs-12" id='if-body'> <!-- BODY -->
                     <div id="if-body-langA">
                        
                     </div>
                     <div id="if-body-langB">
                        
                     </div>

                  </div>
               </dir>

                  <input type="submit"/>
               </form>
               
            </div>
         </div>
      </div>
      
   </body>
</html>

