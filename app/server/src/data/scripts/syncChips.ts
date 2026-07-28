import fs from 'fs';
import { prisma } from './prisma';

async function syncChipFilters(filePath: string) {
  const filters = JSON.parse(fs.readFileSync(filePath, 'utf-8'));

  const keys: string[] = [];

  for (const filter of filters) {
    keys.push(filter.key);

    await prisma.chipFilter.upsert({
      where: {
        key: filter.key,
      },
      update: {
        name: filter.name,
      },
      create: {
        key: filter.key,
        name: filter.name,
      },
    });
  }

  await prisma.chipFilter.deleteMany({
    where: {
      key: {
        notIn: keys,
      },
    },
  });
}

async function syncChipBy(filePath: string) {
  const bys = JSON.parse(fs.readFileSync(filePath, 'utf-8'));

  const keys: string[] = [];

  for (const by of bys) {
    keys.push(by.key);

    await prisma.chipBy.upsert({
      where: {
        key: by.key,
      },
      update: {
        name: by.name,
        compatibleChipFilter: {
          set: by.compatibleChipFilters.map((key) => ({
            key,
          })),
        },
      },
      create: {
        key: by.key,
        name: by.name,
        compatibleChipFilter: {
          connect: by.compatibleChipFilters.map((key) => ({
            key,
          })),
        },
      },
    });
  }

  await prisma.chipBy.deleteMany({
    where: {
      key: {
        notIn: keys,
      },
    },
  });
}
async function syncChipGuess(filePath: string) {
  const chipgs = JSON.parse(fs.readFileSync(filePath, 'utf-8'));

  const keys: string[] = [];

  for (const chipg of chipgs) {
    keys.push(chipg.key);

    await prisma.chipGuess.upsert({
      where: {
        key: chipg.key,
      },
      update: {
        name: chipg.name,
        mode: chipg.mode,
        compatibleChipBy: {
          set: chipg.compatibleChipBy.map((key) => ({
            key,
          })),
        },
      },
      create: {
        key: chipg.key,
        name: chipg.name,
        mode: chipg.mode,
        compatibleChipBy: {
          connect: chipg.compatibleChipBy.map((key) => ({
            key,
          })),
        },
      },
    });
  }

  await prisma.chipGuess.deleteMany({
    where: {
      key: {
        notIn: keys,
      },
    },
  });
}

async function syncChips(
  filePathFilters: string,
  filePathBy: string,
  filePathGuess: string,
) {
  await syncChipFilters(filePathFilters);
  await syncChipBy(filePathBy);
  await syncChipGuess(filePathGuess);
}

export default syncChips;
