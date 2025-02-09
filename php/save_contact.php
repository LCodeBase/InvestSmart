<?php
header('Content-Type: application/json');
error_reporting(E_ALL);
ini_set('display_errors', 0);

try {
    // Check if database.php exists and include it
    if (!file_exists('database.php')) {
        throw new Exception('Arquivo de configuração do banco de dados não encontrado');
    }

    require_once 'database.php';

    // Verify database connection
    if (!isset($conn)) {
        throw new Exception('Conexão com banco de dados não estabelecida');
    }

    $input = file_get_contents('php://input');
    if (!$input) {
        throw new Exception('Dados não recebidos');
    }

    $data = json_decode($input, true);
    if (json_last_error() !== JSON_ERROR_NONE) {
        throw new Exception('Erro ao decodificar JSON: ' . json_last_error_msg());
    }

    // Data validation
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

    // Prepare and execute query
    $stmt = $conn->prepare("INSERT INTO contatos (nome, sobrenome, email, mensagem) VALUES (:nome, :sobrenome, :email, :mensagem)");

    $result = $stmt->execute([
        ':nome' => trim($data['nome']),
        ':sobrenome' => trim($data['sobrenome']),
        ':email' => trim($data['email']),
        ':mensagem' => trim($data['mensagem'])
    ]);

    if (!$result) {
        throw new Exception('Erro ao inserir dados no banco');
    }

    echo json_encode([
        'status' => 'success',
        'message' => 'Mensagem enviada com sucesso!'
    ]);

} catch (Exception $e) {
    http_response_code(400);
    echo json_encode([
        'status' => 'error',
        'message' => $e->getMessage()
    ]);
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode([
        'status' => 'error',
        'message' => 'Erro ao conectar com banco de dados'
    ]);
}
?>

