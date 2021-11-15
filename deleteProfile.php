<!DOCTYPE html>
<html lang="en">
  <head>
    <link rel="stylesheet" href="styles.css" />
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <title>Document</title>
  </head>

  <body>
    <!-- button in the top left corner "back" returning you to the previous page -->
    <div class="back">
      <a href="<?php echo $_SERVER['HTTP_REFERER']; ?>">
        <button>Back</button>
      </a>
    </div>
    <!-- css style for class "centered" centered in a box with margin of 200px-->
    <!-- css style for buttons yes and no -->
    <style>
      .centered {
        margin: auto;
        width: 50%;
        border: 3px solid #73ad21;
        padding: 10px;
      }

      .yes {
        background-color: #4caf50;
        color: white;
        padding: 10px 20px;
        text-align: center;
        text-decoration: none;
        display: inline-block;
        font-size: 16px;
        margin: 4px 2px;
        cursor: pointer;
      }

      .no {
        background-color: #f44336;
        color: white;
        padding: 10px 20px;
        text-align: center;
        text-decoration: none;
        display: inline-block;
        font-size: 16px;
        margin: 4px 2px;
        cursor: pointer;
      }
    </style>
    <!-- div centered in the middle of the screen with margins of 200px -->
    <div class="centered">
      <!-- form with action="deleteProfile.php" method="post" -->
      <form action="deleteProfile.php" method="post">
        <!-- div with text "Are you sure you want to delete your profile?" -->
        <header>
          <h1>Do you really want to delete your profile?</h1>
        </header>
        <!-- div with text "Yes" and button with type="submit" and name="yes" -->
        <div class="yes">
          <button type="submit" name="yes">Yes</button>
        </div>
        <!-- div with text "No" and button with type="submit" and name="no" -->
        <div class="no">
          <button type="submit" name="no">No</button>
        </div>
      </form>
    </div>
  </body>
</html>
