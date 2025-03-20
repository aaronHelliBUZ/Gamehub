<?php $time = time() ?>
<?php
    $servername = "localhost";
    $username = "root";
    $password = "";
    $dbname = "bestenliste";
    $tablename = "bestenlistelaborinth";
?>

<!DOCTYPE html>
<html lang="de">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Laborinth</title>
        <link rel="stylesheet" href="css/stylesBestenliste.css?v=<? echo $time; ?>">
        <link rel="icon" href="../gfx/iconLaborinth.jpg">
    </head>
    <body id="body">
        <div id="content">
            <section>
                <h1>Bestenliste</h1>
                <?php
                    useDatabase();

                    selectAndPrintAsHTMLTable();
                ?>
            </section>
            <div id="links">
                <a href="../index.php">Startseite</a>
            </div>
        </div>
    </body>
</html>

<?php
    function tryConnection($dbname){
        global $servername, $username, $password;
        // ===========================================================
        // ==================== Connection aufbauen ==================
        // ===========================================================

        try {
            $conn = new PDO("mysql:host=$servername;dbname=$dbname", $username, $password);

            $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            //echo "Connected successfully<br><br>";

            return $conn;
        } catch(PDOException $e) {
            echo "Connection failed: " . $e->getMessage() . "<br><br>";
        }
    }

    function useDatabase(){
        global $servername, $username, $password, $dbname;
        // ===========================================================
        // =========================== USE ===========================
        // ===========================================================
        $conn = tryConnection($dbname);

        try {
            $sql = "USE $dbname";

            $conn->exec($sql);

            //echo "Database '$dbname' successfully used<br><br>";
        } catch(PDOException $e) {
            echo $sql . "<br>" . $e->getMessage() . "<br><br>";
        }
    }

    function selectAndPrintAsHTMLTable(){
        global $servername, $username, $password, $dbname, $tablename;
        // ===========================================================
        // ========================== SELECT =========================
        // ===========================================================
        $conn = tryConnection($dbname);

        echo "<table>";
        echo "<tr><th>Name</th><th>Schwierigkeit</th><th>Zeit</th></tr>";

        class TableRows extends RecursiveIteratorIterator {
            function __construct($it) {
                parent::__construct($it, self::LEAVES_ONLY);
            }

            function current() {
                return "<td>" . parent::current(). "</td>";
            }

            function beginChildren() {
                echo "<tr>";
            }

            function endChildren() {
                echo "</tr>" . "\n";
            }
        }

        try {
            $stmt = $conn->prepare("SELECT Name, Schwierigkeit, Zeit FROM $tablename ORDER BY Schwierigkeit DESC, Zeit ASC");
            $stmt->execute();

            // set the resulting array to associative
            $result = $stmt->setFetchMode(PDO::FETCH_ASSOC);
            foreach(new TableRows(new RecursiveArrayIterator($stmt->fetchAll())) as $k=>$v) {
                echo $v;
            }
        } catch(PDOException $e) {
            echo "Error: " . $e->getMessage();
        }
        echo "</table>";

        $conn = NULL;
    }
?>