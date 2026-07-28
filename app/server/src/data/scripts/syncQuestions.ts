import fs from 'fs';
import { prisma } from './prisma';

async function syncQuestionsData(filePath: string) {
  const questions = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
  const keys: string[] = [];

  for (const question of questions) {
    keys.push(question.key);

    const answer = await prisma.answer.findUnique({
      where: {
        key: question.answer,
      },
    });

    const chipBy = await prisma.chipBy.findFirst({
      where: {
        name: question.category,
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

    await prisma.question.upsert({
      where: {
        key: question.key,
      },
      update: {
        url: question.image,
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
        url: question.image,
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

  await prisma.question.deleteMany({
    where: {
      key: {
        notIn: keys,
      },
    },
  });
}

async function syncQuestions(
  filePathGame: string,
  filePathGameCharacter: string,
  filePathMovie: string,
  filePathLol: string,
  filePathDbd: string,
) {
  await syncQuestionsData(filePathGame);
  await syncQuestionsData(filePathGameCharacter);
  await syncQuestionsData(filePathMovie);
  await syncQuestionsData(filePathLol);
  await syncQuestionsData(filePathDbd);
}

export default syncQuestions;
