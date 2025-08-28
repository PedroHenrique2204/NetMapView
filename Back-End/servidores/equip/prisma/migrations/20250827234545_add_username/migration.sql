/*
  Warnings:

  - You are about to drop the column `userAgent` on the `loginevent` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[username]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Made the column `userId` on table `loginevent` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE `loginevent` DROP FOREIGN KEY `LoginEvent_userId_fkey`;

-- DropIndex
DROP INDEX `LoginEvent_userId_createdAt_idx` ON `loginevent`;

-- AlterTable
ALTER TABLE `loginevent` DROP COLUMN `userAgent`,
    MODIFY `userId` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `user` ADD COLUMN `username` VARCHAR(191) NULL;

-- CreateIndex
CREATE INDEX `LoginEvent_userId_idx` ON `LoginEvent`(`userId`);

-- CreateIndex
CREATE UNIQUE INDEX `User_username_key` ON `User`(`username`);

-- AddForeignKey
ALTER TABLE `LoginEvent` ADD CONSTRAINT `LoginEvent_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
