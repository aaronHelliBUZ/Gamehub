<? $time = time() ?>
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Sudoku</title>
        <link rel="stylesheet" href="./styles/stylesGewonnen.css?v=<? echo $time; ?>">
        <link rel="icon" href="../gfx/iconSudoku.png">
    </head>

    <body>
        <div id="content">
            <div id="winMsg">Gewonnen</div>
            <div id="submit">
                <a href="./index.php">Nochmal</a>
                <a href="../index.php">Zurück</a>
            </div>
        </div>
    </body>
</html>