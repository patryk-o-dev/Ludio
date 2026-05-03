-- AlterTable
ALTER TABLE `chipby` ADD COLUMN `unlocked` BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE `chipguess` ADD COLUMN `unlocked` BOOLEAN NOT NULL DEFAULT false;
