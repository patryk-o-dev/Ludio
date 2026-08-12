import fs from 'fs';
import { prisma } from './prisma';

async function syncAnswersData(filePath: string) {
  const answers = JSON.parse(fs.readFileSync(filePath, 'utf-8'));

  const keys: string[] = [];

  for (const answer of answers) {
    keys.push(answer.key);

    await prisma.answer.upsert({
      where: {
        key: answer.key,
      },
      update: {
        value: answer.value,
        valuePl: answer.valuePl ?? null,
        chipGuesses: {
          set: answer.chipGuess.map((key: string) => ({
            key,
          })),
        },
      },
      create: {
        key: answer.key,
        value: answer.value,
        valuePl: answer.valuePl ?? null,
        chipGuesses: {
          connect: answer.chipGuess.map((key: string) => ({
            key,
          })),
        },
      },
    });
  }
}

async function syncAnswers(
  filePathGame: string,
  filePathGameCharacter: string,
  filePathLeagueChampion: string,
  filePathMovie: string,
  filePathTv: string,
  filePathDbd: string,
) {
  await syncAnswersData(filePathGame);
  await syncAnswersData(filePathGameCharacter);
  await syncAnswersData(filePathLeagueChampion);
  await syncAnswersData(filePathMovie);
  await syncAnswersData(filePathTv);
  await syncAnswersData(filePathDbd);
}

export default syncAnswers;
