-- CreateTable
CREATE TABLE `tbl_usuario` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `login` VARCHAR(45) NOT NULL,
    `senha` VARCHAR(45) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tbl_livro` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `titulo` VARCHAR(100) NOT NULL,
    `data_publicacao` DATE NOT NULL,
    `quantidade` INTEGER NOT NULL,
    `isbn` VARCHAR(45) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tipo_movimentacao` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `tipo` VARCHAR(45) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tbl_movimentacao` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `id_movimentacao` INTEGER NOT NULL,
    `id_usuario` INTEGER NOT NULL,
    `quantidade` INTEGER NOT NULL,
    `data_movimentacao` DATE NOT NULL,
    `id_livro` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `tbl_movimentacao` ADD CONSTRAINT `tbl_movimentacao_id_usuario_fkey` FOREIGN KEY (`id_usuario`) REFERENCES `tbl_usuario`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tbl_movimentacao` ADD CONSTRAINT `tbl_movimentacao_id_livro_fkey` FOREIGN KEY (`id_livro`) REFERENCES `tbl_livro`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tbl_movimentacao` ADD CONSTRAINT `tbl_movimentacao_id_movimentacao_fkey` FOREIGN KEY (`id_movimentacao`) REFERENCES `tipo_movimentacao`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
