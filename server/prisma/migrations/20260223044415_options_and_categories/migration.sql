-- AlterTable
ALTER TABLE `set` ADD COLUMN `done` BOOLEAN NOT NULL DEFAULT false;

-- CreateTable
CREATE TABLE `Option` (
    `id` VARCHAR(191) NOT NULL,
    `numberOfQuestions` INTEGER NOT NULL,
    `scoreNeeded` INTEGER NOT NULL,
    `setId` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Option_setId_key`(`setId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Category` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `lvl` INTEGER NOT NULL DEFAULT 0,
    `lvlMax` INTEGER NOT NULL DEFAULT 10,
    `expNeeded` INTEGER NOT NULL DEFAULT 1,
    `expAdded` INTEGER NOT NULL DEFAULT 0,

    UNIQUE INDEX `Category_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Player` (
    `id` VARCHAR(191) NOT NULL,
    `exp` INTEGER NOT NULL DEFAULT 0,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Option` ADD CONSTRAINT `Option_setId_fkey` FOREIGN KEY (`setId`) REFERENCES `Set`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
