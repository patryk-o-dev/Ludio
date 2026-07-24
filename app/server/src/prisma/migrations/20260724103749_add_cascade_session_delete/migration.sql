-- DropForeignKey
ALTER TABLE `gamesession` DROP FOREIGN KEY `GameSession_gameConfigId_fkey`;

-- DropForeignKey
ALTER TABLE `gamesessionplayer` DROP FOREIGN KEY `GameSessionPlayer_gameSessionId_fkey`;

-- DropForeignKey
ALTER TABLE `options` DROP FOREIGN KEY `Options_gameConfigId_fkey`;

-- DropForeignKey
ALTER TABLE `rule` DROP FOREIGN KEY `Rule_gameConfigId_fkey`;

-- DropIndex
DROP INDEX `Rule_gameConfigId_fkey` ON `rule`;

-- AddForeignKey
ALTER TABLE `GameSession` ADD CONSTRAINT `GameSession_gameConfigId_fkey` FOREIGN KEY (`gameConfigId`) REFERENCES `GameConfig`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `GameSessionPlayer` ADD CONSTRAINT `GameSessionPlayer_gameSessionId_fkey` FOREIGN KEY (`gameSessionId`) REFERENCES `GameSession`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Options` ADD CONSTRAINT `Options_gameConfigId_fkey` FOREIGN KEY (`gameConfigId`) REFERENCES `GameConfig`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Rule` ADD CONSTRAINT `Rule_gameConfigId_fkey` FOREIGN KEY (`gameConfigId`) REFERENCES `GameConfig`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
