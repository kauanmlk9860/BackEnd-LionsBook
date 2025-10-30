-- =====================================================
-- BANCO DE DADOS: db_biblioteca
-- =====================================================
CREATE DATABASE db_biblioteca;
USE db_biblioteca;

-- =====================================================
-- TABELA: tbl_usuario
-- =====================================================
CREATE TABLE tbl_usuario (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(250) NOT NULL,
    login VARCHAR(45) NOT NULL,
    senha VARCHAR(45) NOT NULL
);

-- Inserindo usuários
INSERT INTO tbl_usuario (login, senha) VALUES
('joao.silva', '123456'),
('maria.santos', 'abc123'),
('pedro.almeida', 'senha123'),
('ana.lima', '1234'),
('lucas.rocha', 'senha789'),
('carla.mendes', 'pass123'),
('fernando.torres', 'lib2024'),
('juliana.oliveira', 'livro321'),
('rafael.pereira', 'admin123'),
('isabela.costa', 'senha456');

-- =====================================================
-- TABELA: tipo_movimentacao
-- =====================================================
CREATE TABLE tipo_movimentacao (
    id INT AUTO_INCREMENT PRIMARY KEY,
    tipo VARCHAR(45) NOT NULL
);

-- Inserindo tipos de movimentação
INSERT INTO tipo_movimentacao (tipo) VALUES
('Empréstimo'),
('Devolução'),
('Doação'),
('Descarte');

-- =====================================================
-- TABELA: tbl_livro
-- =====================================================
CREATE TABLE tbl_livro (
    id INT AUTO_INCREMENT PRIMARY KEY,
    titulo VARCHAR(100) NOT NULL,
    data_publicacao DATE,
    quantidade INT,
    isbn VARCHAR(45)
);

-- Inserindo livros
INSERT INTO tbl_livro (titulo, data_publicacao, quantidade, isbn) VALUES
('Dom Casmurro', '1899-01-01', 12, '9788533613379'),
('O Cortiço', '1890-03-01', 8, '9788526013657'),
('Memórias Póstumas de Brás Cubas', '1881-03-01', 15, '9788535908947'),
('Vidas Secas', '1938-06-15', 10, '9788503013134'),
('Capitães da Areia', '1937-08-15', 9, '9788520923709'),
('A Moreninha', '1844-04-01', 6, '9788503013394'),
('Iracema', '1865-01-01', 14, '9788520923365'),
('Senhora', '1875-09-15', 7, '9788520923839'),
('O Alienista', '1882-05-01', 11, '9788535908237'),
('A Hora da Estrela', '1977-10-01', 5, '9788520926106'),
('Grande Sertão: Veredas', '1956-07-01', 13, '9788535914849'),
('O Primo Basílio', '1878-01-01', 8, '9788520923839'),
('Dom Quixote', '1605-01-16', 10, '9788535909623'),
('1984', '1949-06-08', 20, '9780451524935'),
('O Pequeno Príncipe', '1943-04-06', 25, '9780156012195');

-- =====================================================
-- TABELA: tbl_movimentacao
-- =====================================================
CREATE TABLE tbl_movimentacao (
    id INT AUTO_INCREMENT PRIMARY KEY,
    id_movimentacao INT NOT NULL,
    id_usuario INT NOT NULL,
    quantidade INT,
    data_movimentacao DATE,
    id_livro INT NOT NULL,
    FOREIGN KEY (id_movimentacao) REFERENCES tipo_movimentacao(id),
    FOREIGN KEY (id_usuario) REFERENCES tbl_usuario(id),
    FOREIGN KEY (id_livro) REFERENCES tbl_livro(id)
);

-- Inserindo movimentações
INSERT INTO tbl_movimentacao (id_movimentacao, id_usuario, quantidade, data_movimentacao, id_livro) VALUES
(1, 1, 1, '2025-01-15', 1),  -- João emprestou Dom Casmurro
(1, 2, 1, '2025-01-18', 3),  -- Maria emprestou Memórias Póstumas
(2, 1, 1, '2025-02-10', 1),  -- João devolveu Dom Casmurro
(1, 3, 2, '2025-02-12', 4),  -- Pedro emprestou 2x Vidas Secas
(1, 4, 1, '2025-03-01', 2),  -- Ana emprestou O Cortiço
(2, 3, 2, '2025-03-20', 4),  -- Pedro devolveu Vidas Secas
(1, 5, 1, '2025-03-25', 5),  -- Lucas emprestou Capitães da Areia
(3, 6, 3, '2025-04-02', 6),  -- Carla doou 3x A Moreninha
(4, 7, 1, '2025-04-10', 9),  -- Fernando descartou 1x O Alienista
(1, 8, 1, '2025-04-12', 10), -- Juliana emprestou A Hora da Estrela
(1, 9, 1, '2025-04-18', 13), -- Rafael emprestou Dom Quixote
(2, 9, 1, '2025-05-03', 13), -- Rafael devolveu Dom Quixote
(3, 10, 5, '2025-05-20', 15),-- Isabela doou 5x O Pequeno Príncipe
(1, 2, 1, '2025-06-01', 14), -- Maria emprestou 1984
(2, 2, 1, '2025-06-20', 14), -- Maria devolveu 1984
(1, 5, 1, '2025-07-10', 11), -- Lucas emprestou Grande Sertão
(1, 6, 1, '2025-07-15', 7),  -- Carla emprestou Iracema
(2, 6, 1, '2025-08-01', 7),  -- Carla devolveu Iracema
(4, 7, 2, '2025-08-05', 12), -- Fernando descartou 2x O Primo Basílio
(3, 8, 2, '2025-09-01', 8);  -- Juliana doou 2x Senhora

-- =====================================================
-- CONSULTAS EXEMPLO
-- =====================================================
-- 1. Ver movimentações detalhadas com JOINs
SELECT 
    m.id AS id_mov,
    u.login AS usuario,
    l.titulo AS livro,
    t.tipo AS tipo_movimentacao,
    m.quantidade,
    m.data_movimentacao
FROM tbl_movimentacao m
JOIN tbl_usuario u ON m.id_usuario = u.id
JOIN tbl_livro l ON m.id_livro = l.id
JOIN tipo_movimentacao t ON m.id_movimentacao = t.id
ORDER BY m.data_movimentacao DESC;

-- 2. Ver total de livros emprestados
SELECT COUNT(*) AS total_emprestimos
FROM tbl_movimentacao
WHERE id_movimentacao = 1;

-- 3. Ver doações por usuário
SELECT u.login, SUM(m.quantidade) AS total_doado
FROM tbl_movimentacao m
JOIN tbl_usuario u ON m.id_usuario = u.id
WHERE id_movimentacao = 3
GROUP BY u.login;
