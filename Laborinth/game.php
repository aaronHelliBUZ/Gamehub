<?php $time=time(); ?>

<!DOCTYPE html>
<html lang="de">
   <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Laobrinth</title>
      <link rel="stylesheet" href="./css/style.css?v=<?php echo $time; ?>" />
      <link rel="icon" href="../gfx/iconLaborinth.jpg">
      <script src="js/javascript.js?v=<?php echo $time; ?>" defer></script>
   </head>
   <body id="body">
      <div id="timer">0</div>
      <div id="playingField"></div>
      <br />
      <a href="insert.php">Bestenliste</a>
   </body>
</html>