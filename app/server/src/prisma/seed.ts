import { AnswerType, PrismaClient } from '../generated/prisma/client';
import { PrismaMariaDb } from '@prisma/adapter-mariadb';
import 'dotenv/config';

const adapter = new PrismaMariaDb(process.env.DATABASE_URL!);
const prisma = new PrismaClient({ adapter });

async function createQuestion(
  prisma: PrismaClient,
  chipGuessId: string,
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
      chipsGuess: { connect: { id: chipGuessId } },
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
  const menu = await prisma.chipBy.create({ data: { name: 'menu' } });
  const screenshot = await prisma.chipBy.create({
    data: { name: 'screenshot' },
  });
  const achivement = await prisma.chipBy.create({
    data: { name: 'achivement' },
  });
  const skillDesc = await prisma.chipBy.create({ data: { name: 'skillDesc' } });
  const gameOver = await prisma.chipBy.create({ data: { name: 'gameOver' } });
  const item = await prisma.chipBy.create({ data: { name: 'item' } });
  const weapon = await prisma.chipBy.create({ data: { name: 'weapon' } });
  const frame = await prisma.chipBy.create({ data: { name: 'frame' } });
  const trailer = await prisma.chipBy.create({ data: { name: 'trailer' } });
  const location = await prisma.chipBy.create({ data: { name: 'location' } });
  const cast = await prisma.chipBy.create({ data: { name: 'cast' } });
  const poster = await prisma.chipBy.create({ data: { name: 'poster' } });
  const set = await prisma.chipBy.create({ data: { name: 'set' } });
  const review = await prisma.chipBy.create({ data: { name: 'review' } });
  const quote = await prisma.chipBy.create({ data: { name: 'quote' } });
  const creature = await prisma.chipBy.create({ data: { name: 'creature' } });
  const song = await prisma.chipBy.create({ data: { name: 'song' } });
  const vocal = await prisma.chipBy.create({ data: { name: 'vocal' } });
  const ost = await prisma.chipBy.create({ data: { name: 'ost' } });
  const sfx = await prisma.chipBy.create({ data: { name: 'sfx' } });
  const voiceActing = await prisma.chipBy.create({
    data: { name: 'voiceActing' },
  });
  const clip = await prisma.chipBy.create({ data: { name: 'clip' } });
  const drama = await prisma.chipBy.create({ data: { name: 'drama' } });
  const chatMessage = await prisma.chipBy.create({
    data: { name: 'chatMessage' },
  });
  const loveIntrest = await prisma.chipBy.create({
    data: { name: 'loveIntrest' },
  });
  const characterImage = await prisma.chipBy.create({
    data: { name: 'characterImage' },
  });
  const personPhoto = await prisma.chipBy.create({
    data: { name: 'personPhoto' },
  });
  const hair = await prisma.chipBy.create({ data: { name: 'hair' } });
  const silhouette = await prisma.chipBy.create({
    data: { name: 'silhouette' },
  });
  const cosplay = await prisma.chipBy.create({ data: { name: 'cosplay' } });

  // ChipGuess
  const guessGame = await prisma.chipGuess.create({
    data: {
      name: 'guessGame',
      compatibleChips: { connect: [{ id: menu.id }, { id: screenshot.id }] },
    },
  });
  const guessMovie = await prisma.chipGuess.create({
    data: {
      name: 'guessMovie',
      compatibleChips: { connect: [{ id: menu.id }, { id: screenshot.id }] },
    },
  });
  const guessTv = await prisma.chipGuess.create({
    data: {
      name: 'guessTv',
      compatibleChips: { connect: [{ id: menu.id }, { id: screenshot.id }] },
    },
  });
  const guessAnimation = await prisma.chipGuess.create({
    data: {
      name: 'guessAnimation',
      compatibleChips: { connect: [{ id: menu.id }, { id: screenshot.id }] },
    },
  });
  const guessAnime = await prisma.chipGuess.create({
    data: {
      name: 'guessAnime',
      compatibleChips: { connect: [{ id: menu.id }, { id: screenshot.id }] },
    },
  });
  const guessSong = await prisma.chipGuess.create({
    data: {
      name: 'guessSong',
      compatibleChips: { connect: [{ id: menu.id }, { id: screenshot.id }] },
    },
  });
  const guessViewer = await prisma.chipGuess.create({
    data: {
      name: 'guessViewer',
      compatibleChips: { connect: [{ id: menu.id }, { id: screenshot.id }] },
    },
  });
  const guessRandomNumber = await prisma.chipGuess.create({
    data: {
      name: 'guessRandomNumber',
      compatibleChips: { connect: [{ id: menu.id }, { id: screenshot.id }] },
    },
  });
  const guessDate = await prisma.chipGuess.create({
    data: {
      name: 'guessDate',
      compatibleChips: { connect: [{ id: menu.id }, { id: screenshot.id }] },
    },
  });
  const guessForeignWord = await prisma.chipGuess.create({
    data: {
      name: 'guessForeignWord',
      compatibleChips: { connect: [{ id: menu.id }, { id: screenshot.id }] },
    },
  });
  const guessAnimal = await prisma.chipGuess.create({
    data: {
      name: 'guessAnimal',
      compatibleChips: { connect: [{ id: menu.id }, { id: screenshot.id }] },
    },
  });
  const guessCharacter = await prisma.chipGuess.create({
    data: {
      name: 'guessCharacter',
      compatibleChips: {
        connect: [{ id: characterImage.id }, { id: cosplay.id }],
      },
    },
  });
  const guessPerson = await prisma.chipGuess.create({
    data: {
      name: 'guessPerson',
      compatibleChips: {
        connect: [{ id: personPhoto.id }, { id: cosplay.id }],
      },
    },
  });

  // Questions
  await createQuestion(
    prisma,
    guessGame.id,
    menu.id,
    'mainMenuAnswer1',
    AnswerType.GAMING,
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
