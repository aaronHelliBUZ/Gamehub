<? $time = time() ?>
<?
    session_start();
    $loesung = array(
        array(0, 0, 0, 0, 0, 0, 0, 0, 0),
        array(0, 0, 0, 0, 0, 0, 0, 0, 0),
        array(0, 0, 0, 0, 0, 0, 0, 0, 0),
        array(0, 0, 0, 0, 0, 0, 0, 0, 0),
        array(0, 0, 0, 0, 0, 0, 0, 0, 0),
        array(0, 0, 0, 0, 0, 0, 0, 0, 0),
        array(0, 0, 0, 0, 0, 0, 0, 0, 0),
        array(0, 0, 0, 0, 0, 0, 0, 0, 0),
        array(0, 0, 0, 0, 0, 0, 0, 0, 0)
    );

    for($i = 0; $i < 9; $i++){
        $feld = array();
        for($j = 0; $j < 9; $j++){
            $randPosition = (int) random_int(1, 9);
            if($loesung[$i][$randPosition] == 0){
                if(reihe($i, $randPosition, $j)){
                    if(spalte($i, $randPosition, $j)){
                        $loesung[$i][$randPosition] = $j;
                    }
                }else{
                    $j--;
                    continue;
                }
            }
        }
    }

    function reihe($spielfeldIndex, $feldIndex, $zahl){
        $spielfeldReihe = null;
        $feldReihe = null;
        switch($spielfeldIndex){
            case 0:
            case 1:
            case 2:
                $spielfeldReihe = 3;
                break;
            case 3:
            case 4:
            case 5:
                $spielfeldReihe = 6;
                break;
            case 6:
            case 7:
            case 8:
                $spielfeldReihe = 9;
                break;
        }
        switch($feldIndex){
            case 0:
            case 1:
            case 2:
                $feldReihe = 3;
                break;
            case 3:
            case 4:
            case 5:
                $feldReihe = 6;
                break;
            case 6:
            case 7:
            case 8:
                $feldReihe = 9;
                break;
        }

        for($i = ($spielfeldReihe - 3); $i < $spielfeldReihe; $i++){
            for($j = ($feldReihe - 3); $j < $feldReihe; $j++){
                if($_SESSION['loesung'][$i][$j] == $zahl){
                    return false;
                }
            }
        }
        return true;
    }

    function spalte($spielfeldIndex, $feldIndex, $zahl){
        $spielfeldReihe = null;
        $feldReihe = null;
        switch($spielfeldIndex % 3){
            case 0:
                $spielfeldReihe = 0;
                break;
            case 1:
                $spielfeldReihe = 1;
                break;
            case 2:
                $spielfeldReihe = 2;
                break;
        }
        switch($feldIndex % 3){
            case 0:
                $feldReihe = 0;
                break;
            case 1:
                $feldReihe = 1;
                break;
            case 2:
                $feldReihe = 2;
                break;
        }
        for($i = $spielfeldReihe; $i < 9; $i += 3){
            for($j = $feldReihe; $j < 9; $j += 3){
                if($_SESSION['loesung'][$i][$j] == $zahl){
                    return false;
                }
            }
        }
        return true;
    }
?>
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link rel="stylesheet" href="styles/styles.css?v=<? echo $time; ?>">
        <title>Document</title>
    </head>

    <body>
        <form method="POST" action="index.php">
            <div id="spielfeld">
                <?

                    $feld = $loesung;
                    for($i = 0; $i < 9; $i++){
                        echo "<div id='feld_$i' class='innereFelder'>";
                        for($j = 0; $j < 9; $j++){
                            if($feld[$i][$j] == 0){
                                echo "<input class='zahlen' type='number' name='feld$i" . "/" . "$j' min='1' max='9'>";
                            }else{
                                $zahl = $feld[$i][$j];
                                echo "<div class='zahlen'>$zahl</div>";
                            }
                        }
                        echo "</div>";
                    }
                    $feldString = serialize($feld);
                    echo "<input type='hidden' name='feldString' value=$feldString>";
                    echo "<input type='hidden' name='submitted' value=1>";
                ?>
            </div>
            <input type="submit">
        </form>
    </body>
</html>