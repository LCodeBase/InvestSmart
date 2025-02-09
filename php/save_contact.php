<?php
// Habilita exibição de erros para debug
error_reporting(E_ALL);
ini_set('display_errors', 0);

header('Content-Type: application/json');
require_once 'database.php';

try {
    $input = file_get_contents('php://input');
    if (!$input) {
        throw new Exception('Dados não recebidos');
    }

    $data = json_decode($input, true);
    if (json_last_error() !== JSON_ERROR_NONE) {
        throw new Exception('Erro ao decodificar JSON: ' . json_last_error_msg());
    }

    // Validação dos dados
    if (empty($data['nome']) || empty($data['sobrenome']) || empty($data['email']) || empty($data['mensagem'])) {
        throw new Exception('Todos os campos são obrigatórios');
    }

    if (!filter_var($data['email'], FILTER_VALIDATE_EMAIL)) {
        throw new Exception('Email inválido');
    }

    if (strlen($data['nome']) > 10) {
        throw new Exception('Nome deve ter no máximo 10 caracteres');
    }

    if (strlen($data['sobrenome']) > 30) {
        throw new Exception('Sobrenome deve ter no máximo 30 caracteres');
    }

    $stmt = $conn->prepare("INSERT INTO contatos (nome, sobrenome, email, mensagem) VALUES (:nome, :sobrenome, :email, :mensagem)");

    $stmt->execute([
        ':nome' => trim($data['nome']),
        ':sobrenome' => trim($data['sobrenome']),
        ':email' => trim($data['email']),
        ':mensagem' => trim($data['mensagem'])
    ]);

    echo json_encode(['status' => 'success', 'message' => 'Mensagem enviada com sucesso!']);
} catch (Exception $e) {
    http_response_code(400);
    echo json_encode([
        'status' => 'error',
        'message' => $e->getMessage(),
        'debug' => error_get_last()
    ]);
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode([
        'status' => 'error',
        'message' => 'Erro ao salvar mensagem no banco de dados',
        'debug' => $e->getMessage()
    ]);
}
?>

