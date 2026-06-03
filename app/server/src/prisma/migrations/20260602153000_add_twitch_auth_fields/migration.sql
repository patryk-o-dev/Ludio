ALTER TABLE `User`
    ADD COLUMN `twitchId` VARCHAR(64) NULL,
    ADD COLUMN `displayName` VARCHAR(64) NULL,
    ADD COLUMN `avatarUrl` VARCHAR(512) NULL;

CREATE UNIQUE INDEX `User_twitchId_key` ON `User`(`twitchId`);