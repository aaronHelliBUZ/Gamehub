<?php $time = time() ?>
<!DOCTYPE html>
<html lang="en">
   <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Gamehub</title>
      <link rel="icon" href="./gfx/iconHub.png" />
      <link rel="stylesheet" href="./styles/styles.css?v=<?php  echo $time; ?>" />
      <script src="./script/script.js?v=<?php echo $time; ?>" defer></script>
   </head>
   <body>
      <div id="content">
         <header>
            <h1>Gamehub</h1>
         </header>
         <section id="games">
            <section class="gameOption">
               <a href="Minesweeper/index.php"><img class="game" src="./gfx/minesweeper.webp" alt="Minesweeper" /></a>
               <p class="description">Minesweeper</p>
            </section>
            <section class="gameOption">
               <a href="Blockblast/html/index.php"><img class="game" src="./gfx/blockblast.png" alt="Blockblast" /></a>
               <p class="description">Blockblast</p>
            </section>
            <section class="gameOption">
               <a href="Snake/index.php"><img class="game" src="./gfx/snake.jpg" alt="Blockblast" /></a>
               <p class="description">Snake</p>
            </section>
            <section class="gameOption">
               <a href="Sudoku/index.php"><img class="game" src="./gfx/sudoku.png" alt="Sudoku" /></a>
               <p class="description">Sudoku</p>
            </section>
            <section class="gameOption">
               <a href="Laborinth/index.php"><img class="game" src="./gfx/laborinth.jpg" alt="Laborinth" /></a>
               <p class="description">Laborinth</p>
            </section>
         </section>
      </div>
   </body>
</html>
