-- AlterTable
ALTER TABLE `gamesession` ADD COLUMN `status` ENUM('NotStarted', 'InProgress', 'Completed') NOT NULL DEFAULT 'NotStarted';
