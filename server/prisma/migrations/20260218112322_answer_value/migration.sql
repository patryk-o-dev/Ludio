/*
  Warnings:

  - A unique constraint covering the columns `[value]` on the table `Answer` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `value` to the `Answer` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `answer` ADD COLUMN `value` VARCHAR(191) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Answer_value_key` ON `Answer`(`value`);
