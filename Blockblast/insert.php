<?php
    $servername = "localhost";
    $username = "root";
    $password = "";
    $dbname = "bestenliste";
    $tablename = "bestenlisteblockblast";

    $usernameToSafe = $_POST["username"];
    $difficultyToSafe = $_POST["difficulty"];
    $pointsToSafe = (int)$_POST["points"];

    insert();

    function tryConnection($dbname){
        global $servername, $username, $password;
        // ===========================================================
        // ==================== Connection aufbauen ==================
        // ===========================================================

        try {
            $conn = new PDO("mysql:host=$servername;dbname=$dbname", $username, $password);

            $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            echo "Connected successfully<br><br>";

            return $conn;
        } catch(PDOException $e) {
            echo "Connection failed: " . $e->getMessage() . "<br><br>";
        }
    }

    function insert(){
        global $servername, $username, $password, $dbname, $tablename, $usernameToSafe, $difficultyToSafe, $pointsToSafe;
        // ===========================================================
        // ========================== INSERT =========================
        // ===========================================================
        $conn = tryConnection($dbname);

        try {
            $sql = "INSERT INTO $tablename (Name, Schwierigkeit, Punktzahl) VALUES ('$usernameToSafe','$difficultyToSafe','$pointsToSafe')";

            $conn->exec($sql);

            echo "Statement '$sql' successfully inserted<br><br>";
        } catch(PDOException $e) {
            echo $sql . "<br>" . $e->getMessage() . "<br><br>";
        }
    }

    header("Location: bestenliste.php");
?>