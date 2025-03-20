<? $time = time() ?>
<?
    session_start();
    if($_POST['submitted'] == 0){
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
    
        for ($i = 0; $i < 9; $i++) {
            if ($i % 3 == 0) {
                $nummerFeld = array();
            }
            
            switch ($i) {
                case 0:
                case 1:
                case 2:
                    $feld = 3;
                    break;
                case 3:
                case 4:
                case 5:
                    $feld = 6;
                    break;
                case 6:
                case 7:
                case 8:
                    $feld = 9;
                    break;
            }
            
            for ($j = 0; $j < 9; $j += 3) {
                if ($i == $j || $i == $j+1 || $i == $j+2) {
                    for ($k = $j; $k < ($j + 3); $k++) {
                        $randNumb = random_int(1, 9);
                        while (in_array($randNumb, $nummerFeld)) {
                            $randNumb = random_int(1, 9);
                        }
                        $loesung[$i][$k] = $randNumb;
                        array_push($nummerFeld, $randNumb);
                    }
                }
            }
        }
        
        // Überprüfen, ob die Platzierung einer Zahl sicher ist
        function isSafe($loesung, $row, $col, $num) {
            // Überprüfe die Zeile
            for ($x = 0; $x < 9; $x++) {
                if ($loesung[$row][$x] == $num) {
                    return false;
                }
            }
            // Überprüfe die Spalte
            for ($x = 0; $x < 9; $x++) {
                if ($loesung[$x][$col] == $num) {
                    return false;
                }
            }
            // Überprüfe das 3x3 Feld
            $startRow = $row - $row % 3;
            $startCol = $col - $col % 3;
            for ($i = 0; $i < 3; $i++) {
                for ($j = 0; $j < 3; $j++) {
                    if ($loesung[$i + $startRow][$j + $startCol] == $num) {
                        return false;
                    }
                }
            }
            return true;
        }
        
        // Der Hauptalgorithmus zum Lösen des Sudoku
        function solveSudoku(&$loesung) {
            for ($row = 0; $row < 9; $row++) {
                for ($col = 0; $col < 9; $col++) {
                    // Suche nach einer leeren Zelle
                    if ($loesung[$row][$col] == 0) {
                        // Probiere alle Zahlen von 1 bis 9
                        for ($num = 1; $num <= 9; $num++) {
                            if (isSafe($loesung, $row, $col, $num)) {
                                // Setze die Zahl, wenn sie sicher ist
                                $loesung[$row][$col] = $num;
                                if (solveSudoku($loesung)) {
                                    return true;
                                }
                                // Rückgängig machen
                                $loesung[$row][$col] = 0;
                            }
                        }
                        return false;
                    }
                }
            }
            return true;
        }
    
        solveSudoku($loesung);
        
        $feld = $GLOBALS['loesung'];

        for($i = 0; $i < 9;$i++){
            for($j = 1; $j <= 4; $j++){
                $randX = random_int(0, 8);

                if($feld[$i][$randX] == 0){
                    $j--;
                    continue;
                }else{
                    $feld[$i][$randX] = 0;
                }
            }
        }
    }else{
        $feld = unserialize($_POST['feldString']);
        $loesung = unserialize(($_POST['loesungString']));
        $geschafft = true;

        for($i = 0; $i < 9; $i++){
            for($j = 0; $j < 9; $j++){
                if($feld[$i][$j] == 0){
                    $zahl = $_POST["feld$i/$j"];
                    if($zahl == null){
                        $feld[$i][$j] = 0;
                    }else{
                        $feld[$i][$j] = $zahl;
                    }
                }
            }
        }

        for($i = 0; $i < 9; $i++){
            for($j = 0; $j <9; $j++){
                if($feld[$i][$j] != $loesung[$i][$j]){
                    $feld[$i][$j] = 0;
                    $geschafft = false;
                }
            }
        }

        if($geschafft){
            include("gewinn.php");
            exit;
        }
    }
?>
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link rel="stylesheet" href="styles/styles.css?v=<? echo $time; ?>">
        <script src="./script/script.js?v=<? echo $time; ?>" defer></script>
        <title>Sudoku</title>
    </head>

    <body id="body">
        <div id="content">
            <form method="POST" action="index.php">
                <div id="spielfeld">
                    <?
                        $feldString = serialize($feld);
                        $loesungString = serialize($GLOBALS['loesung']);
                        for($i = 0; $i < 9; $i++){
                            echo "<div id='feld_$i' class='innereFelder'>";
                            $spalte = 0;
                            $reihe = 0;

                            switch($i){
                                case 0:
                                case 1:
                                case 2:
                                    $reihe = 3;
                                    break;
                                case 3:
                                case 4:
                                case 5:
                                    $reihe = 6;
                                    break;
                                case 6:
                                case 7:
                                case 8:
                                    $reihe = 9;
                                    break;
                            }

                            switch($i){
                                case 0:
                                case 3:
                                case 6:
                                    $spalte = 3;
                                    break;
                                case 1:
                                case 4:
                                case 7:
                                    $spalte = 6;
                                    break;
                                case 2:
                                case 5:
                                case 8:
                                    $spalte = 9;
                                    break;
                            }

                            for($j = $reihe - 3; $j < $reihe; $j++){
                                for($k = $spalte - 3; $k < $spalte; $k++){
                                    if($feld[$j][$k] !== 0){
                                        $zahl = $feld[$j][$k];
                                        echo "<div class='zahlen'>$zahl</div>";
                                    }else{
                                        echo "<input class='zahlen' type='number' name='feld$j" . "/" . "$k' min='1' max='9'>";
                                    }
                                }
                            }
                            echo "</div>";
                        }
                        echo "<input type='hidden' name='feldString' value=$feldString>";
                        echo "<input type='hidden' name='loesungString' value=$loesungString>";
                        echo "<input type='hidden' name='submitted' value=1>";
                    ?>
                </div>
                <div id="submit">
                    <input type="submit" value="Überprüfen">
                    <a href="../index.php">Zurück</a>
                </div>
            </form>
        </div>
    </body>
</html>