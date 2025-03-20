<?php
    $servername = "localhost";
    $username = "root";
    $password = "";
    $dbname = "bestenliste";
    $tablename = "bestenlistelaborinth";

    $usernameToSafe = $_POST["username"];
    $difficultyToSafe = $_POST["difficulty"];
    $timeToSafe = (int)$_POST["time"];

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
        global $servername, $username, $password, $dbname, $tablename, $usernameToSafe, $difficultyToSafe, $timeToSafe;
        // ===========================================================
        // ========================== INSERT =========================
        // ===========================================================
        $conn = tryConnection($dbname);

        try {
            $sql = "INSERT INTO $tablename (Name, Schwierigkeit, Zeit) VALUES ('$usernameToSafe','$difficultyToSafe','$timeToSafe')";

            $conn->exec($sql);

            echo "Statement '$sql' successfully inserted<br><br>";
        } catch(PDOException $e) {
            echo $sql . "<br>" . $e->getMessage() . "<br><br>";
        }
    }

    header("Location: bestenliste.php");
?>