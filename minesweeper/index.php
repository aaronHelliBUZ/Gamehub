<? $time = time() ?>
<?
    $hoehe = $_POST['hoehe'];
    $breite = $_POST['breite'];
    $anzahlBomben = $_POST['bomben'];
    $submitted = $_POST['submitted'];
    if($submitted == 1){
        if($hoehe < 6 || $hoehe > 26 || $breite < 6 || $breite > 26){
            $_POST['fehlerCode'] = 0;
        }elseif($anzahlBomben > ($hoehe * $breite / 3) || $anzahlBomben < ($hoehe * $breite) / 100 * 8){
            $_POST['fehlerCode'] = 1;
        }else{
            include('feld.php');
            exit;
        }
    }
?>
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Minesweeper</title>
        <link rel="stylesheet" href="./styles/stylesIndex.css?v=<? echo $time; ?>">
        <script src="./scripts/scriptPlacement.js?v=<? echo $time; ?>" defer></script>
        <link rel="stylesheet" href="./styles/stylesResponsive.css?v=<?php echo $time; ?>">
        <link rel="icon" href="./img/icon.jpg" />
    </head>

    <body>
        <div id="content">
                <h2>Bitte wähle Höhe, Breite und Anzahl Bomben</h2>
                <form method="POST" action="index.php">
                    <span><p>Höhe:</p><input type="number" min="6" max="25" name="hoehe"></span>
                    <span><p>Breite:</p><input type="number" min="6" max="25" name="breite"></span>
                    <span><p>Anzahl Bomben:</p><input type="number" name="bomben"></span>
                    <input type="hidden" name="submitted" value=1>
                    <input id="submit" type="submit">
                </form>
                <?
                    $fehlerCode = $_POST['fehlerCode'];
                    if($fehlerCode === 1){
                        echo "<div class='fehler'>Die Anzahl Bomben muss zwischen 8 % und 33.33% des Spielfelds liegen</div>";
                    }
                ?>
        </div>
    </body>
</html>