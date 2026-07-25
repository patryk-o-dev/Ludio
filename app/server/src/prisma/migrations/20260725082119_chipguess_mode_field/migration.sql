/*
  Warnings:

  - Added the required column `mode` to the `ChipGuess` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `chipguess` ADD COLUMN `mode` ENUM('CLASSIC', 'SOLO', 'LEAGUE_OF_LEGENDS', 'DEAD_BY_DAYLIGHT') NOT NULL;
