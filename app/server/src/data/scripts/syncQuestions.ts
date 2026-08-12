import fs from 'fs';
import { prisma } from './prisma';

async function syncQuestionsData(filePath: string, allKeys: string[]) {
  const questions = JSON.parse(fs.readFileSync(filePath, 'utf-8'));

  for (const question of questions) {
    allKeys.push(question.key);

    const mediaPl = question.mediaPl ?? question.media;

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

    const chipFilters = await prisma.chipFilter.findMany({
      where: {
        name: {
          in: question.filters ?? [],
        },
      },
    });

    if (!answer || !chipBy) {
      throw new Error(
        `Missing relation for question ${question.key}: answer=${question.answer}, category=${question.category}`,
      );
    }

    if ((question.filters?.length ?? 0) !== chipFilters.length) {
      throw new Error(
        `Missing chip filters for question ${question.key}: expected=${(
          question.filters ?? []
        ).join(',')}`,
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
        urlPl: `/static/${mediaPath}/media/${mediaPl}`,
        credits: question.credits ? question.credits : null,
        emoji: question.emoji ? question.emoji : null,
        answerId: answer.id,
        achievement: question.achievement
          ? {
              upsert: {
                create: {
                  achievementTitle: question.achievement.achievementTitle,
                  achievementDesc: question.achievement.achievementDesc,
                },
                update: {
                  achievementTitle: question.achievement.achievementTitle,
                  achievementDesc: question.achievement.achievementDesc,
                },
              },
            }
          : undefined,
        chipById: chipBy.id,
        chipGuesses: {
          set: chipGuess.map((chip) => ({
            id: chip.id,
          })),
        },
        chipFilters: {
          set: chipFilters.map((filter) => ({
            id: filter.id,
          })),
        },
      },
      create: {
        key: question.key,
        url: `/static/${mediaPath}/media/${question.media}`,
        urlPl: `/static/${mediaPath}/media/${mediaPl}`,
        credits: question.credits ? question.credits : null,
        emoji: question.emoji ? question.emoji : null,
        answerId: answer.id,
        achievement: question.achievement
          ? {
              create: {
                achievementTitle: question.achievement.achievementTitle,
                achievementDesc: question.achievement.achievementDesc,
              },
            }
          : undefined,
        chipById: chipBy.id,
        chipGuesses: {
          connect: chipGuess.map((chip) => ({
            id: chip.id,
          })),
        },
        chipFilters: {
          connect: chipFilters.map((filter) => ({
            id: filter.id,
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
  filePathTV: string,
  filePathLol: string,
  filePathDbd: string,
) {
  const allKeys: string[] = [];

  await syncQuestionsData(filePathGame, allKeys);
  await syncQuestionsData(filePathGameCharacter, allKeys);
  await syncQuestionsData(filePathMovie, allKeys);
  await syncQuestionsData(filePathTV, allKeys);
  await syncQuestionsData(filePathLol, allKeys);
  await syncQuestionsData(filePathDbd, allKeys);

  const questionsToDelete = await prisma.question.findMany({
    where: {
      key: {
        notIn: allKeys,
      },
    },
    select: {
      id: true,
    },
  });

  await prisma.questionAchievement.deleteMany({
    where: {
      questionId: {
        in: questionsToDelete.map((question) => question.id),
      },
    },
  });

  await prisma.question.deleteMany({
    where: {
      key: {
        notIn: allKeys,
      },
    },
  });
}

export default syncQuestions;
