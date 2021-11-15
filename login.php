<?php
if (isset($_SESSION['role'])) {
  header("Location: index.php");
}
?>
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
  <style>
    .login-box {
      width: 300px;
      height: 300px;
      background: #fff;
      border-radius: 10px;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      box-sizing: border-box;
      padding: 70px 30px;
    }
  </style>

  <div class="login-box">
    <h1>Login Here</h1>
    <form action="login.php" method="post">
      <div class="textbox">
        <input type="text" placeholder="Username" name="username" required />
      </div>
      <div class="textbox">
        <input type="password" placeholder="Password" name="password" required />
      </div>
      <input type="submit" class="btn" name="login" value="Sign in" />
    </form>
    <a href="register.php">Register</a>
  </div>
</body>

</html>