ALTER TABLE `GameSession`
    ADD COLUMN `hostId` VARCHAR(191) NULL;

UPDATE `GameSession`
SET `hostId` = '1'
WHERE `hostId` IS NULL;

ALTER TABLE `GameSession`
    MODIFY `hostId` VARCHAR(191) NOT NULL;