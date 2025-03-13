<? $time = time() ?>
<!DOCTYPE html>
<html lang="de">
    <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Blockblast</title>
        <link rel="stylesheet" href="../css/styles.css?v=<? echo $time; ?>" />
        <script src="../js/JavaScript.js?v=<? echo $time; ?>" defer></script>
        <link rel="icon" href="../gfx/icon.jpg" />
    </head>
    <body>
        <div id="content">
            <div id="gameField"></div>
            <br /><br />
            <div id="blockChoice"></div>
        </div>
    </body>
</html>
