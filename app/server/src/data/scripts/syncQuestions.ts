import fs from 'fs';
import { prisma } from './prisma';

async function syncQuestionsData(filePath: string, allKeys: string[]) {
  const questions = JSON.parse(fs.readFileSync(filePath, 'utf-8'));

  for (const question of questions) {
    allKeys.push(question.key);

    const answer = await prisma.answer.findUnique({
      where: {
        key: question.answer,
      },
    });

    const chipBy = await prisma.chipBy.findUnique({
      where: {
        key: question.category,
      },
    });

    const chipGuess = await prisma.chipGuess.findMany({
      where: {
        key: {
          in: question.gameTypes,
        },
      },
    });

    if (!answer || !chipBy) {
      throw new Error(
        `Missing relation for question ${question.key}: answer=${question.answer}, category=${question.category}`,
      );
    }

    const mediaPath = filePath.includes('/standard/')
      ? 'standard'
      : filePath.includes('/games/lol/')
        ? 'games/lol'
        : filePath.includes('/games/dbd/')
          ? 'games/dbd'
          : '';

    await prisma.question.upsert({
      where: {
        key: question.key,
      },
      update: {
        url: `/static/${mediaPath}/media/${question.media}`,
        answerId: answer.id,
        chipById: chipBy.id,
        chipGuesses: {
          set: chipGuess.map((chip) => ({
            id: chip.id,
          })),
        },
      },
      create: {
        key: question.key,
        url: `/static/${mediaPath}/media/${question.media}`,
        answerId: answer.id,
        chipById: chipBy.id,
        chipGuesses: {
          connect: chipGuess.map((chip) => ({
            id: chip.id,
          })),
        },
      },
    });
  }
}

async function syncQuestions(
  filePathGame: string,
  filePathGameCharacter: string,
  filePathMovie: string,
  filePathLol: string,
  filePathDbd: string,
) {
  const allKeys: string[] = [];

  await syncQuestionsData(filePathGame, allKeys);
  await syncQuestionsData(filePathGameCharacter, allKeys);
  await syncQuestionsData(filePathMovie, allKeys);
  await syncQuestionsData(filePathLol, allKeys);
  await syncQuestionsData(filePathDbd, allKeys);

  await prisma.question.deleteMany({
    where: {
      key: {
        notIn: allKeys,
      },
    },
  });
}

export default syncQuestions;
