<?php
$servername = "localhost";
$username = "root"; // usuário padrão do XAMPP
$password = ""; // senha padrão do XAMPP (vazia)
$dbname = "investsavy";

try {
    $conn = new PDO("mysql:host=$servername;dbname=$dbname", $username, $password);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    $conn->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_ASSOC);
    $conn->exec("SET NAMES 'utf8'");
} catch (PDOException $e) {
    die("Conexão falhou: " . $e->getMessage());
}
?>

