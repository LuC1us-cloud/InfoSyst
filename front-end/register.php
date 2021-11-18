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
  <!-- a register form -->
  <!-- css style for a register form -->
  <style>
    form {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      width: 100%;
      height: 100%;
      background-color: #f2f2f2;
      border-radius: 10px;
      padding: 20px;
    }

    input {
      width: 100%;
      height: 40px;
      border-radius: 5px;
      border: 1px solid #ccc;
      padding: 0 10px;
      margin-bottom: 10px;
    }

    button {
      width: 100%;
      height: 40px;
      border-radius: 5px;
      border: 1px solid #ccc;
      background-color: #ccc;
      color: #fff;
      font-size: 16px;
      cursor: pointer;
    }

    button:hover {
      background-color: #fff;
      color: #000;
    }
  </style>
  <form action="login.php" method="post">
    <div class="form-group">
      <label for="username">Username</label>
      <input type="text" name="username" id="username" class="form-control" />
    </div>
    <div class="form-group">
      <label for="password">Password</label>
      <input type="password" name="password" id="password" class="form-control" />
    </div>
    <div class="form-group">
      <label for="email">Email</label>
      <input type="email" name="email" id="email" class="form-control" />
    </div>
    <div class="form-group">
      <label for="phone">Phone</label>
      <input type="text" name="phone" id="phone" class="form-control" />
    </div>
    <div class="form-group">
      <label for="address">Address</label>
      <input type="text" name="address" id="address" class="form-control" />
    </div>
    <div class="form-group">
      <label for="city">City</label>
      <input type="text" name="city" id="city" class="form-control" />
    </div>
    <div class="form-group">
      <label for="zip">Zip</label>
      <input type="text" name="zip" id="zip" class="form-control" />
    </div>
    <div class="form-group">
      <input type="submit" name="register" value="Register" class="btn btn-primary" />
    </div>
  </form>
</body>

</html>