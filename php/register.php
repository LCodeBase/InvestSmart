<?php
require_once 'auth.php';

header('Content-Type: application/json');

try {
    $data = json_decode(file_get_contents('php://input'), true);

    if (!isset($data['username']) || !isset($data['email']) || !isset($data['password'])) {
        throw new Exception('Todos os campos são obrigatórios');
    }

    // Validate email format
    if (!filter_var($data['email'], FILTER_VALIDATE_EMAIL)) {
        throw new Exception('Email inválido');
    }

    // Validate password strength
    if (strlen($data['password']) < 6) {
        throw new Exception('A senha deve ter pelo menos 6 caracteres');
    }

    if (registerUser($data['username'], $data['email'], $data['password'])) {
        echo json_encode(['success' => true]);
    } else {
        echo json_encode([
            'success' => false,
            'message' => 'Erro ao registrar usuário'
        ]);
    }
} catch (Exception $e) {
    echo json_encode([
        'success' => false,
        'message' => $e->getMessage()
    ]);
}
?>

