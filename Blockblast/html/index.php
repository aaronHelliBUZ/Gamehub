<? $time = time() ?>
<!DOCTYPE html>
<html lang="de">
   <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Blockblast</title>
      <link rel="stylesheet" href="../css/styles.css?v=<? echo $time; ?>"/>
      <script src="../js/JavaScript.js?v=<? echo $time; ?>" defer></script>
      <link rel="icon" href="../gfx/icon.jpg" />
   </head>
   <body id="body">
         <div id="block" onmousedown="bewegen(this)"></div>
   </body>
</html>
