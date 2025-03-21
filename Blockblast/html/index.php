<?php $time = time() ?>
<!DOCTYPE html>
<html lang="de">
    <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Blockblast</title>
        <link rel="stylesheet" href="../css/styles.css?v=<?php echo $time; ?>" />
        <script src="../js/JavaScript.js?v=<?php echo $time; ?>" defer></script>
        <link rel="icon" href="../gfx/icon.jpg" />
    </head>
    <body id="body">
        <a id="home" href="../../">Zurück</a>
        <div id="content">
            <div id="pointCounter">0</div>
            <div id="gameField"></div>
            <div id="blockChoice"></div>
        </div>
    </body>
</html>
