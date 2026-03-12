-- AlterTable
ALTER TABLE `player` ADD COLUMN `questionIndex` INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE `question` ADD COLUMN `used` BOOLEAN NOT NULL DEFAULT false;
