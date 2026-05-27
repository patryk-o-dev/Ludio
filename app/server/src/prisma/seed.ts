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
    data: {
      name: 'byAchievement',
      compatibleChipFilter: { connect: [{ id: onlyHorror.id }] },
    },
  });
  const byMod = await prisma.chipBy.create({
    data: { name: 'byMod' },
  });
  const byScreenshot = await prisma.chipBy.create({
    data: {
      name: 'byScreenshot',
      compatibleChipFilter: { connect: [{ id: onlyHorror.id }] },
    },
  });

  const byImage = await prisma.chipBy.create({
    data: {
      name: 'byImage',
      compatibleChipFilter: {
        connect: [
          { id: onlyMale.id },
          { id: onlyFemale.id },
          { id: onlyHorror.id },
        ],
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
  const byQuoteText = await prisma.chipBy.create({
    data: {
      name: 'byQuoteText',
    },
  });

  // ChipGuess
  const guessGame = await prisma.chipGuess.create({
    data: {
      name: 'guessGame',
      compatibleChipBy: {
        connect: [
          { id: byMainMenu.id },
          { id: byAchievement.id },
          { id: byMod.id },
          { id: byScreenshot.id },
          { id: byQuoteText.id },
        ],
      },
    },
  });
  const guessGameCharacter = await prisma.chipGuess.create({
    data: {
      name: 'guessGameCharacter',
      compatibleChipBy: {
        connect: [
          { id: byImage.id },
          { id: byCosplay.id },
          { id: byQuoteText.id },
        ],
      },
    },
  });

  // Questions — byMainMenu (guessGame, no filter)
  await createQuestion(
    '/static/questions/mainMenu/minecraft.png',
    'Minecraft',
    byMainMenu.id,
    [guessGame.id],
  );
  await createQuestion(
    '/static/questions/mainMenu/portal2.png',
    'Portal 2',
    byMainMenu.id,
    [guessGame.id],
  );
  await createQuestion(
    '/static/questions/mainMenu/hollowknight.png',
    'Hollow Knight',
    byMainMenu.id,
    [guessGame.id],
  );
  await createQuestion(
    '/static/questions/mainMenu/dispatch.png',
    'Dispatch',
    byMainMenu.id,
    [guessGame.id],
  );

  // Questions — byMainMenuHorror (guessGame + onlyHorror)
  await createQuestion(
    '/static/questions/mainMenu/dbd.png',
    'Dead by Daylight',
    byMainMenu.id,
    [guessGame.id],
    [onlyHorror.id],
  );
  await createQuestion(
    '/static/questions/mainMenu/limbo-menu.png',
    'Limbo',
    byMainMenu.id,
    [guessGame.id],
    [onlyHorror.id],
  );
  await createQuestion(
    '/static/questions/mainMenu/soma.png',
    'Soma',
    byMainMenu.id,
    [guessGame.id],
    [onlyHorror.id],
  );

  // Questions — byAchievement (guessGame, no filter)
  await createQuestion(
    '/static/questions/achivement/darksidersii.png',
    'Darksiders II',
    byAchievement.id,
    [guessGame.id],
  );

  await createQuestion(
    '/static/questions/achivement/detroit.png',
    'Detroit: Become Human',
    byAchievement.id,
    [guessGame.id],
  );

  await createQuestion(
    '/static/questions/achivement/raft.png',
    'Raft',
    byAchievement.id,
    [guessGame.id],
  );
  await createQuestion(
    '/static/questions/achivement/skyrim.png',
    'The Elder Scrolls V: Skyrim',
    byAchievement.id,
    [guessGame.id],
  );
  await createQuestion(
    '/static/questions/achivement/southpark.png',
    'South Park: The Stick of Truth',
    byAchievement.id,
    [guessGame.id],
  );
  await createQuestion(
    '/static/questions/achivement/stardew.png',
    'Stardew Valley',
    byAchievement.id,
    [guessGame.id],
  );
  await createQuestion(
    '/static/questions/achivement/surviving-mars.png',
    'Surviving Mars',
    byAchievement.id,
    [guessGame.id],
  );

  // Questions — byAchievementHorror (guessGame + onlyHorror)
  await createQuestion(
    '/static/questions/achivement/dbd1.png',
    'Dead by Daylight',
    byAchievement.id,
    [guessGame.id],
    [onlyHorror.id],
  );
  await createQuestion(
    '/static/questions/achivement/efbiohazard.png',
    'Resident Evil 7: Biohazard',
    byAchievement.id,
    [guessGame.id],
    [onlyHorror.id],
  );

  // Questions — byMod (guessGame, no filter)
  await createQuestion(
    '/static/questions/mods/civvi.png',
    "Sid Meier's Civilization VI",
    byMod.id,
    [guessGame.id],
  );
  await createQuestion(
    '/static/questions/mods/eldenring.png',
    'Elden Ring',
    byMod.id,
    [guessGame.id],
  );
  await createQuestion(
    '/static/questions/mods/skyrim.png',
    'The Elder Scrolls V: Skyrim',
    byMod.id,
    [guessGame.id],
  );

  // Questions — byScreenshot (guessGame, no filter)
  await createQuestion(
    '/static/questions/screenshot/civvi.png',
    "Sid Meier's Civilization VI",
    byScreenshot.id,
    [guessGame.id],
  );
  await createQuestion(
    '/static/questions/screenshot/ck3.png',
    'Crusader Kings III',
    byScreenshot.id,
    [guessGame.id],
  );
  await createQuestion(
    '/static/questions/screenshot/dontstarve.png',
    "Don't Starve",
    byScreenshot.id,
    [guessGame.id],
  );
  await createQuestion(
    '/static/questions/screenshot/raft.png',
    'Raft',
    byScreenshot.id,
    [guessGame.id],
  );
  await createQuestion(
    '/static/questions/screenshot/skyrim.png',
    'The Elder Scrolls V: Skyrim',
    byScreenshot.id,
    [guessGame.id],
  );
  await createQuestion(
    '/static/questions/screenshot/stardewvalley.png',
    'Stardew Valley',
    byScreenshot.id,
    [guessGame.id],
  );
  await createQuestion(
    '/static/questions/screenshot/totalwarwarhammer.png',
    'Total War: Warhammer',
    byScreenshot.id,
    [guessGame.id],
  );
  await createQuestion(
    '/static/questions/screenshot/vrising.png',
    'V Rising',
    byScreenshot.id,
    [guessGame.id],
  );
  await createQuestion(
    '/static/questions/screenshot/wolfenshteinneworder.png',
    'Wolfenstein: The New Order',
    byScreenshot.id,
    [guessGame.id],
  );

  // Questions — byScreenshot (guessGame + onlyHorror)
  await createQuestion(
    '/static/questions/screenshot/amongthesleep.png',
    'Among the Sleep',
    byScreenshot.id,
    [guessGame.id],
    [onlyHorror.id],
  );
  await createQuestion(
    '/static/questions/screenshot/inscryption.png',
    'Inscryption',
    byScreenshot.id,
    [guessGame.id],
    [onlyHorror.id],
  );

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
