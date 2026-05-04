import { AnswerType, PrismaClient } from '../generated/prisma/client';
import { PrismaMariaDb } from '@prisma/adapter-mariadb';
import 'dotenv/config';

const adapter = new PrismaMariaDb(process.env.DATABASE_URL!);
const prisma = new PrismaClient({ adapter });

async function createQuestion(
  prisma: PrismaClient,
  chipById: string,
  answerValue: string,
  answerType: AnswerType,
) {
  const media = await prisma.media.create({ data: { url: 'mediaurl.png' } });
  const answer = await prisma.answer.create({
    data: { value: answerValue, answerType },
  });
  await prisma.question.create({
    data: {
      mediaId: media.id,
      answerId: answer.id,
      answerType,
      chipsBy: { connect: { id: chipById } },
    },
  });
}

async function main() {
  console.log('🌱 Starting database seeding...');

  // Cleanup
  await prisma.selectedChip.deleteMany();
  await prisma.question.deleteMany();
  await prisma.answer.deleteMany();
  await prisma.media.deleteMany();
  await prisma.chipGuess.deleteMany();
  await prisma.chipBy.deleteMany();
  await prisma.player.deleteMany();
  await prisma.category.deleteMany();

  // Player
  await prisma.player.create({
    data: { lvl: 1, kp: 2, exp: 0 },
  });

  // ChipBy
  const mainMenu = await prisma.chipBy.create({ data: { name: 'mainMenu' } });
  const mods = await prisma.chipBy.create({ data: { name: 'mods' } });
  const image = await prisma.chipBy.create({ data: { name: 'image' } });
  const cosplay = await prisma.chipBy.create({ data: { name: 'cosplay' } });

  // ChipGuess
  await prisma.chipGuess.create({
    data: {
      name: 'game',
      compatibleChips: { connect: [{ id: mainMenu.id }, { id: mods.id }] },
    },
  });
  await prisma.chipGuess.create({
    data: {
      name: 'characterGame',
      compatibleChips: { connect: [{ id: image.id }, { id: cosplay.id }] },
    },
  });

  // Questions
  await createQuestion(
    prisma,
    mainMenu.id,
    'mainMenuAnswer1',
    AnswerType.GAMING,
  );
  await createQuestion(
    prisma,
    mainMenu.id,
    'mainMenuAnswer2',
    AnswerType.GAMING,
  );

  await createQuestion(prisma, mods.id, 'modsAnswer1', AnswerType.GAMING);
  await createQuestion(prisma, mods.id, 'modsAnswer2', AnswerType.GAMING);

  await createQuestion(prisma, image.id, 'imageAnswer1', AnswerType.CHARACTERS);
  await createQuestion(prisma, image.id, 'imageAnswer2', AnswerType.CHARACTERS);

  await createQuestion(
    prisma,
    cosplay.id,
    'cosplayAnswer1',
    AnswerType.CHARACTERS,
  );
  await createQuestion(
    prisma,
    cosplay.id,
    'cosplayAnswer2',
    AnswerType.CHARACTERS,
  );

  // Categories
  const categoryNames = [
    'gaming',
    'watching',
    'animations',
    'sounds',
    'twitch',
    'hearth',
    'characters',
    'various',
  ];
  for (const name of categoryNames) {
    await prisma.category.create({ data: { name } });
  }

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
