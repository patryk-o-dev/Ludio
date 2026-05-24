import { PrismaClient } from '../generated/prisma/client';
import { PrismaMariaDb } from '@prisma/adapter-mariadb';
import 'dotenv/config';

const adapter = new PrismaMariaDb(process.env.DATABASE_URL!);
const prisma = new PrismaClient({ adapter });

async function createQuestion(
  url: string,
  answerValue: string,
  chipById: string,
  chipGuessIds: string[],
  chipFilterIds: string[] = [],
) {
  const answer = await prisma.answer.create({
    data: {
      value: answerValue,
      chipGuesses: { connect: chipGuessIds.map((id) => ({ id })) },
      ...(chipFilterIds.length > 0 && {
        chipFilters: { connect: chipFilterIds.map((id) => ({ id })) },
      }),
    },
  });
  await prisma.question.create({
    data: {
      url,
      chipById,
      answerId: answer.id,
      chipGuesses: { connect: chipGuessIds.map((id) => ({ id })) },
      ...(chipFilterIds.length > 0 && {
        chipFilters: { connect: chipFilterIds.map((id) => ({ id })) },
      }),
    },
  });
}

async function main() {
  console.log('🌱 Starting database seeding...');

  // Cleanup
  await prisma.question.deleteMany();
  await prisma.answer.deleteMany();
  await prisma.rule.deleteMany();
  await prisma.chipGuess.deleteMany();
  await prisma.chipBy.deleteMany();
  await prisma.chipFilter.deleteMany();

  // ChipFilter
  const onlyHorror = await prisma.chipFilter.create({
    data: { name: 'onlyHorror' },
  });
  const onlyMale = await prisma.chipFilter.create({
    data: { name: 'onlyMale' },
  });
  const onlyFemale = await prisma.chipFilter.create({
    data: { name: 'onlyFemale' },
  });

  // ChipBy
  const byMainMenu = await prisma.chipBy.create({
    data: {
      name: 'byMainMenu',
      compatibleChipFilter: { connect: [{ id: onlyHorror.id }] },
    },
  });
  const byAchievement = await prisma.chipBy.create({
    data: { name: 'byAchievement' },
  });
  const byImage = await prisma.chipBy.create({
    data: {
      name: 'byImage',
      compatibleChipFilter: {
        connect: [{ id: onlyMale.id }, { id: onlyFemale.id }],
      },
    },
  });
  const byCosplay = await prisma.chipBy.create({
    data: {
      name: 'byCosplay',
      compatibleChipFilter: {
        connect: [{ id: onlyMale.id }, { id: onlyFemale.id }],
      },
    },
  });

  // ChipGuess
  const guessGame = await prisma.chipGuess.create({
    data: {
      name: 'guessGame',
      compatibleChipBy: {
        connect: [{ id: byMainMenu.id }, { id: byAchievement.id }],
      },
    },
  });
  const guessGameCharacter = await prisma.chipGuess.create({
    data: {
      name: 'guessGameCharacter',
      compatibleChipBy: {
        connect: [{ id: byImage.id }, { id: byCosplay.id }],
      },
    },
  });

  // Questions — byMainMenu (guessGame, no filter)
  await createQuestion('byMainMenu.png', 'Game1', byMainMenu.id, [
    guessGame.id,
  ]);
  await createQuestion('byMainMenu2.png', 'Game2', byMainMenu.id, [
    guessGame.id,
  ]);
  await createQuestion('byMainMenu3.png', 'Game3', byMainMenu.id, [
    guessGame.id,
  ]);

  // Questions — byMainMenuHorror (guessGame + onlyHorror)
  await createQuestion(
    'byMainMenuHorror.png',
    'HorrorGame1',
    byMainMenu.id,
    [guessGame.id],
    [onlyHorror.id],
  );
  await createQuestion(
    'byMainMenuHorro2.png',
    'HorrorGame2',
    byMainMenu.id,
    [guessGame.id],
    [onlyHorror.id],
  );

  // Questions — byAchievement (guessGame, no filter)
  await createQuestion('byAchivement.png', 'AchGame1', byAchievement.id, [
    guessGame.id,
  ]);
  await createQuestion('byAchivement2.png', 'AchGame2', byAchievement.id, [
    guessGame.id,
  ]);
  await createQuestion('byAchivement3.png', 'AchGame3', byAchievement.id, [
    guessGame.id,
  ]);

  // Questions — byImageFemale (guessGameCharacter + onlyFemale)
  await createQuestion(
    'byImageFemale.png',
    'FemaleChar1',
    byImage.id,
    [guessGameCharacter.id],
    [onlyFemale.id],
  );
  await createQuestion(
    'byImageFemale1.png',
    'FemaleChar2',
    byImage.id,
    [guessGameCharacter.id],
    [onlyFemale.id],
  );
  await createQuestion(
    'byImageFemale2.png',
    'FemaleChar3',
    byImage.id,
    [guessGameCharacter.id],
    [onlyFemale.id],
  );
  await createQuestion(
    'byImageFemale3.png',
    'FemaleChar4',
    byImage.id,
    [guessGameCharacter.id],
    [onlyFemale.id],
  );
  await createQuestion(
    'byImageFemale4.png',
    'FemaleChar5',
    byImage.id,
    [guessGameCharacter.id],
    [onlyFemale.id],
  );
  await createQuestion(
    'byImageFemale5.png',
    'FemaleChar6',
    byImage.id,
    [guessGameCharacter.id],
    [onlyFemale.id],
  );

  // Questions — byImageMale (guessGameCharacter + onlyMale)
  await createQuestion(
    'byImageMale1.png',
    'MaleChar1',
    byImage.id,
    [guessGameCharacter.id],
    [onlyMale.id],
  );
  await createQuestion(
    'byImageMale2.png',
    'MaleChar2',
    byImage.id,
    [guessGameCharacter.id],
    [onlyMale.id],
  );
  await createQuestion(
    'byImageMale3.png',
    'MaleChar3',
    byImage.id,
    [guessGameCharacter.id],
    [onlyMale.id],
  );

  console.log('Seeded done 🌳');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
