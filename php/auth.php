<?php
session_start();
require_once 'database.php';

function registerUser($username, $email, $password)
{
    global $conn;

    try {
        // Hash the password
        $hashedPassword = password_hash($password, PASSWORD_DEFAULT);

        $stmt = $conn->prepare("INSERT INTO users (username, email, password) VALUES (:username, :email, :password)");
        $stmt->execute([
            ':username' => $username,
            ':email' => $email,
            ':password' => $hashedPassword
        ]);

        return true;
    } catch (PDOException $e) {
        return false;
    }
}

function loginUser($email, $password)
{
    global $conn;

    try {
        $stmt = $conn->prepare("SELECT * FROM users WHERE email = :email");
        $stmt->execute([':email' => $email]);
        $user = $stmt->fetch();

        if ($user && password_verify($password, $user['password'])) {
            $_SESSION['user_id'] = $user['id'];
            $_SESSION['username'] = $user['username'];
            return true;
        }

        return false;
    } catch (PDOException $e) {
        return false;
    }
}

function isLoggedIn()
{
    return isset($_SESSION['user_id']);
}

function logout()
{
    session_destroy();
    header('Location: ../login.html');
    exit();
}
?>

