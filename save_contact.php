<?php
header('Content-Type: application/json');
require_once 'config/database.php';

try {
    $data = json_decode(file_get_contents('php://input'), true);

    $stmt = $conn->prepare("INSERT INTO contatos (nome, sobrenome, email, mensagem) VALUES (:nome, :sobrenome, :email, :mensagem)");

    $stmt->execute([
        ':nome' => $data['nome'],
        ':sobrenome' => $data['sobrenome'],
        ':email' => $data['email'],
        ':mensagem' => $data['mensagem']
    ]);

    echo json_encode(['status' => 'success', 'message' => 'Mensagem enviada com sucesso!']);
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(['status' => 'error', 'message' => 'Erro ao salvar mensagem']);
}
?>

