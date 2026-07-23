-- AlterTable
ALTER TABLE `gamesession` ADD COLUMN `communityId` VARCHAR(191) NULL;

-- AddForeignKey
ALTER TABLE `GameSession` ADD CONSTRAINT `GameSession_communityId_fkey` FOREIGN KEY (`communityId`) REFERENCES `Community`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
