import { PrismaClient } from '../src/generated/prisma/client';
import { PrismaMariaDb } from '@prisma/adapter-mariadb';
import 'dotenv/config';

const adapter = new PrismaMariaDb(process.env.DATABASE_URL!);
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log('🌱 Starting database seeding...');
  await prisma.question.deleteMany();
  await prisma.tag.deleteMany();
  await prisma.answer.deleteMany();
  await prisma.answerType.deleteMany();
  await prisma.option.deleteMany();
  await prisma.set.deleteMany();
  await prisma.category.deleteMany();
  await prisma.player.deleteMany();

  const tagsData = [
    // Game tags
    {
      name: 'game',
      categoryName: 'game',
      lvl: 1,
    },
    {
      name: 'guessGame',
      categoryName: 'game',
      lvl: 1,
    },
    {
      name: 'mainMenu',
      categoryName: 'game',
      lvl: 1,
    },
    {
      name: 'screenshot',
      categoryName: 'game',
      lvl: 3,
    },
    {
      name: 'mods',
      categoryName: 'game',
      lvl: 5,
    },
    // Character tags
    {
      name: 'character',
      categoryName: 'character',
      lvl: 1,
    },
    {
      name: 'guessCharacter',
      categoryName: 'character',
      lvl: 1,
    },
    {
      name: 'characterImage',
      categoryName: 'character',
      lvl: 1,
    },
    {
      name: 'male',
      categoryName: 'character',
      lvl: 2,
    },
    {
      name: 'female',
      categoryName: 'character',
      lvl: 3,
    },
    {
      name: 'cosplay',
      categoryName: 'character',
      lvl: 5,
    },
  ];

  const setsData = [
    {
      name: 'Gra #1',
      guess: ['guessGame'], // Find questions with one of these tags
      by: ['mainMenu'], // And with at least one of these tags
      only: [], // And with all of these tags
      without: [], // And without any of these tags
      option: { numberOfQuestions: 3, scoreNeeded: 2 },
    },
    {
      name: 'Gra #2',
      guess: ['guessGame'],
      by: ['characterImage'],
      only: ['male'],
      without: [],
      option: { numberOfQuestions: 3, scoreNeeded: 2 },
    },
    {
      name: 'Gra #3',
      guess: ['guessGame'],
      by: ['screenshot'],
      only: [],
      without: [],
      option: { numberOfQuestions: 3, scoreNeeded: 2 },
    },
    {
      name: 'Gra #4',
      guess: ['guessGame'],
      by: ['characterImage'],
      only: [],
      without: [],
      option: { numberOfQuestions: 5, scoreNeeded: 4 },
    },
    {
      name: 'Gra #5',
      guess: ['guessGame'],
      by: ['mods'],
      only: [],
      without: [],
      option: { numberOfQuestions: 5, scoreNeeded: 4 },
    },
    {
      name: 'Postać #1',
      guess: ['guessCharacter'],
      by: ['characterImage'],
      only: ['game', 'female'],
      without: [],
      option: { numberOfQuestions: 3, scoreNeeded: 2 },
    },
    {
      name: 'Postać #2',
      guess: ['guessCharacter'],
      by: ['characterImage'],
      only: ['game', 'male'],
      without: [],
      option: { numberOfQuestions: 3, scoreNeeded: 2 },
    },
    {
      name: 'Postać #3',
      guess: ['guessCharacter'],
      by: ['characterImage'],
      only: ['game'],
      without: [],
      option: { numberOfQuestions: 3, scoreNeeded: 2 },
    },
    {
      name: 'Postać #4',
      guess: ['guessCharacter'],
      by: ['cosplay'],
      only: ['female', 'game'],
      without: [],
      option: { numberOfQuestions: 5, scoreNeeded: 4 },
    },
    {
      name: 'Postać #5',
      guess: ['guessCharacter'],
      by: ['cosplay'],
      only: ['game'],
      without: [],
      option: { numberOfQuestions: 5, scoreNeeded: 4 },
    },

    {
      name: 'Gra + Postać #1',
      guess: ['guessGame', 'guessCharacter'],
      by: ['mainMenu', 'characterImage'],
      only: ['game'],
      without: [],
      option: { numberOfQuestions: 5, scoreNeeded: 4 },
    },
    {
      name: 'Gra + Postać #2',
      guess: ['guessGame', 'guessCharacter'],
      by: ['mainMenu', 'screenshot', 'characterImage'],
      only: ['game'],
      without: [],
      option: { numberOfQuestions: 7, scoreNeeded: 5 },
    },
    {
      name: 'Gra + Postać #3',
      guess: ['guessGame', 'guessCharacter'],
      by: ['mainMenu', 'screenshot', 'mods', 'characterImage', 'cosplay'],
      only: ['game'],
      without: [],
      option: { numberOfQuestions: 10, scoreNeeded: 8 },
    },
  ];

  const answerTypesData = [{ name: 'guessGame' }, { name: 'guessCharacter' }];

  const answersData = [
    // Games
    { name: 'Dead by Daylight', type: 'guessGame' },
    { name: 'Dead Space', type: 'guessGame' },
    { name: 'Dispatch', type: 'guessGame' },
    { name: 'Hollow Knight', type: 'guessGame' },
    { name: 'Limbo', type: 'guessGame' },
    { name: 'Minecraft', type: 'guessGame' },
    { name: 'Portal 2', type: 'guessGame' },
    { name: 'Psychonauts 2', type: 'guessGame' },
    { name: 'StarCraft 2', type: 'guessGame' },
    { name: 'Soma', type: 'guessGame' },
    { name: 'Nier: Automata', type: 'guessGame' },
    { name: 'League of Legends', type: 'guessGame' },
    { name: 'Cyberpunk 2077', type: 'guessGame' },
    { name: 'Kena: Bridge of Spirits', type: 'guessGame' },
    { name: 'Grand Theft Auto V', type: 'guessGame' },
    { name: 'Overwatch', type: 'guessGame' },
    { name: 'Blair Witch', type: 'guessGame' },
    { name: 'Life is Strange: Before the Storm', type: 'guessGame' },
    { name: 'Spider-Man: Miles Morales', type: 'guessGame' },
    { name: 'Civilization V', type: 'guessGame' },
    { name: 'The Elder Scrolls V: Skyrim', type: 'guessGame' },
    { name: 'Elden Ring', type: 'guessGame' },

    // Characters (females)
    { name: 'Ada Wong', type: 'guessCharacter' },
    { name: '2B', type: 'guessCharacter' },
    { name: 'Kena', type: 'guessCharacter' },
    { name: 'Hornet', type: 'guessCharacter' },
    { name: 'Cappie', type: 'guessCharacter' },
    { name: 'Bella Dimitrescu', type: 'guessCharacter' },
    { name: 'Huntress', type: 'guessCharacter' },
    { name: 'Artystka', type: 'guessCharacter' },

    // Characters (males)
    { name: 'Shepard', type: 'guessCharacter' },
    { name: 'Hanzo Shimada', type: 'guessCharacter' },
    { name: 'Teemo', type: 'guessCharacter' },
    { name: 'Springtrap', type: 'guessCharacter' },
    { name: 'Mario', type: 'guessCharacter' },
    { name: 'Cole Cassidy', type: 'guessCharacter' },
  ];

  const questionsData = [
    // Games
    {
      media: 'dbd.png',
      answer: 'Dead by Daylight',
      tags: ['game', 'mainMenu', 'guessGame'],
      answerType: 'guessGame',
    },
    {
      media: 'deadspace.jpg',
      answer: 'Dead Space',
      tags: ['game', 'mainMenu', 'guessGame'],
      answerType: 'guessGame',
    },
    {
      media: 'dispatch.png',
      answer: 'Dispatch',
      tags: ['game', 'mainMenu', 'guessGame'],
      answerType: 'guessGame',
    },
    {
      media: 'hollowknight.png',
      answer: 'Hollow Knight',
      tags: ['game', 'mainMenu', 'guessGame'],
      answerType: 'guessGame',
    },
    {
      media: 'limbo.jpg',
      answer: 'Limbo',
      tags: ['game', 'mainMenu', 'guessGame'],
      answerType: 'guessGame',
    },
    {
      media: 'minecraft.png',
      answer: 'Minecraft',
      tags: ['game', 'mainMenu', 'guessGame'],
      answerType: 'guessGame',
    },
    {
      media: 'portal2.png',
      answer: 'Portal 2',
      tags: ['game', 'mainMenu', 'guessGame'],
      answerType: 'guessGame',
    },
    {
      media: 'psychonauts2.png',
      answer: 'Psychonauts 2',
      tags: ['game', 'mainMenu', 'guessGame'],
      answerType: 'guessGame',
    },
    {
      media: 'sc2.png',
      answer: 'StarCraft 2',
      tags: ['game', 'mainMenu', 'guessGame'],
      answerType: 'guessGame',
    },
    {
      media: 'soma.png',
      answer: 'Soma',
      tags: ['game', 'mainMenu', 'guessGame'],
      answerType: 'guessGame',
    },
    {
      media: '2b.jpg',
      answer: 'Nier: Automata',
      tags: ['game', 'characterImage', 'female', 'guessGame'],
      answerType: 'guessGame',
    },
    {
      media: 'ahri.jpg',
      answer: 'League of Legends',
      tags: ['game', 'characterImage', 'female', 'guessGame'],
      answerType: 'guessGame',
    },
    {
      media: 'judyalvarez.png',
      answer: 'Cyberpunk 2077',
      tags: ['game', 'characterImage', 'female', 'guessGame'],
      answerType: 'guessGame',
    },
    {
      media: 'kena.jpg',
      answer: 'Kena: Bridge of Spirits',
      tags: ['game', 'characterImage', 'female', 'guessGame'],
      answerType: 'guessGame',
    },
    {
      media: 'teemo.jpg',
      answer: 'League of Legends',
      tags: ['game', 'characterImage', 'male', 'guessGame'],
      answerType: 'guessGame',
    },
    {
      media: 'trevorphilips.jpg',
      answer: 'Grand Theft Auto V',
      tags: ['game', 'characterImage', 'male', 'guessGame'],
      answerType: 'guessGame',
    },
    {
      media: 'hanzo.jpg',
      answer: 'Overwatch',
      tags: ['game', 'characterImage', 'male', 'guessGame'],
      answerType: 'guessGame',
    },
    {
      media: 'blairwitch.png',
      answer: 'Blair Witch',
      tags: ['game', 'screenshot', 'guessGame'],
      answerType: 'guessGame',
    },
    {
      media: 'lifeisstrange.jpg',
      answer: 'Life is Strange: Before the Storm',
      tags: ['game', 'screenshot', 'guessGame'],
      answerType: 'guessGame',
    },
    {
      media: 'spidermanmilesmorales.png',
      answer: 'Spider-Man: Miles Morales',
      tags: ['game', 'screenshot', 'guessGame'],
      answerType: 'guessGame',
    },
    {
      media: 'civv.jpg',
      answer: 'Civilization V',
      tags: ['game', 'mods', 'guessGame'],
      answerType: 'guessGame',
    },
    {
      media: 'skyrim.png',
      answer: 'The Elder Scrolls V: Skyrim',
      tags: ['game', 'mods', 'guessGame'],
      answerType: 'guessGame',
    },
    {
      media: 'eldenring.png',
      answer: 'Elden Ring',
      tags: ['game', 'mods', 'guessGame'],
      answerType: 'guessGame',
    },
    // Characters
    {
      media: 'ada.jpg',
      answer: 'Ada Wong',
      tags: ['characterImage', 'game', 'female', 'guessCharacter'],
      answerType: 'guessCharacter',
    },
    {
      media: '2b.jpg',
      answer: '2B',
      tags: ['characterImage', 'game', 'female', 'guessCharacter'],
      answerType: 'guessCharacter',
    },
    {
      media: 'kena.jpg',
      answer: 'Kena',
      tags: ['characterImage', 'game', 'female', 'guessCharacter'],
      answerType: 'guessCharacter',
    },
    {
      media: 'shepard.jpg',
      answer: 'Shepard',
      tags: ['characterImage', 'game', 'male', 'guessCharacter'],
      answerType: 'guessCharacter',
    },
    {
      media: 'hanzo.jpg',
      answer: 'Hanzo Shimada',
      tags: ['characterImage', 'game', 'male', 'guessCharacter'],
      answerType: 'guessCharacter',
    },
    {
      media: 'teemo.jpg',
      answer: 'Teemo',
      tags: ['characterImage', 'game', 'male', 'guessCharacter'],
      answerType: 'guessCharacter',
    },
    {
      media: 'hornet.jpg',
      answer: 'Hornet',
      tags: ['game', 'character', 'female', 'cosplay', 'guessCharacter'],
      answerType: 'guessCharacter',
    },
    {
      media: 'cappie.jpg',
      answer: 'Cappie',
      tags: ['game', 'character', 'female', 'cosplay', 'guessCharacter'],
      answerType: 'guessCharacter',
    },
    {
      media: 'bella.jpg',
      answer: 'Bella Dimitrescu',
      tags: ['game', 'character', 'female', 'cosplay', 'guessCharacter'],
      answerType: 'guessCharacter',
    },
    {
      media: 'huntress.jpg',
      answer: 'Huntress',
      tags: ['game', 'character', 'female', 'cosplay', 'guessCharacter'],
      answerType: 'guessCharacter',
    },
    {
      media: 'artystka.jpg',
      answer: 'Artystka',
      tags: ['game', 'character', 'female', 'cosplay', 'guessCharacter'],
      answerType: 'guessCharacter',
    },
    {
      media: 'springtrap.jpg',
      answer: 'Springtrap',
      tags: ['game', 'character', 'male', 'cosplay', 'guessCharacter'],
      answerType: 'guessCharacter',
    },
    {
      media: 'mario.jpg',
      answer: 'Mario',
      tags: ['game', 'character', 'male', 'cosplay', 'guessCharacter'],
      answerType: 'guessCharacter',
    },
    {
      media: 'colecassidy.jpg',
      answer: 'Cole Cassidy',
      tags: ['game', 'character', 'male', 'cosplay', 'guessCharacter'],
      answerType: 'guessCharacter',
    },
  ];

  const categoryData = [{ name: 'game' }, { name: 'character' }];

  await prisma.category.createMany({
    data: categoryData.map((c) => ({
      name: c.name,
    })),
  });

  const categories = await prisma.category.findMany();

  await prisma.tag.createMany({
    data: tagsData.map((t) => ({
      name: t.name,
      categoryId: categories.find((c) => c.name === t.categoryName)!.id,
      unlocked: false,
      lvl: t.lvl,
    })),
  });

  const tags = await prisma.tag.findMany();

  for (const category of categories) {
    await prisma.category.update({
      where: { id: category.id },
      data: {
        tags: {
          connect: tags
            .filter((t) => t.categoryId === category.id)
            .map((t) => ({ id: t.id })),
        },
      },
    });
  }

  await prisma.set.createMany({
    data: setsData.map((s) => ({
      name: s.name,
    })),
  });

  const sets = await prisma.set.findMany();

  for (const s of setsData) {
    const set = sets.find((set) => set.name === s.name)!;
    await prisma.set.update({
      where: { id: set.id },
      data: {
        guess: {
          connect: s.guess.map((tagName) => ({
            id: tags.find((t) => t.name === tagName)!.id,
          })),
        },
        by: {
          connect: s.by.map((tagName) => ({
            id: tags.find((t) => t.name === tagName)!.id,
          })),
        },
        only: {
          connect: s.only.map((tagName) => ({
            id: tags.find((t) => t.name === tagName)!.id,
          })),
        },
        without: {
          connect: s.without.map((tagName) => ({
            id: tags.find((t) => t.name === tagName)!.id,
          })),
        },
        option: {
          create: {
            numberOfQuestions: s.option.numberOfQuestions,
            scoreNeeded: s.option.scoreNeeded,
            expEarned: 8,
          },
        },
      },
    });
  }

  await prisma.answerType.createMany({
    data: answerTypesData.map((at) => ({
      name: at.name,
    })),
  });

  const answerTypes = await prisma.answerType.findMany();

  await prisma.answer.createMany({
    data: answersData.map((av) => ({
      value: av.name,
      answerTypeId: answerTypes.find((at) => at.name === av.type)!.id,
    })),
  });

  const answers = await prisma.answer.findMany();

  await prisma.question.createMany({
    data: questionsData.map((q) => ({
      media: q.media,
      answerId: answers.find((a) => a.value === q.answer)!.id,
      answerTypeId: answerTypes.find((at) => at.name === q.answerType)!.id,
    })),
  });

  const questions = await prisma.question.findMany();

  for (const q of questionsData) {
    const question = questions.find(
      (qq) =>
        qq.media === q.media &&
        qq.answerId === answers.find((a) => a.value === q.answer)!.id,
    )!;
    await prisma.question.update({
      where: { id: question.id },
      data: {
        tags: {
          connect: q.tags.map((tagName) => ({
            id: tags.find((t) => t.name === tagName)!.id,
          })),
        },
      },
    });
  }

  await prisma.player.create({
    data: {
      exp: 1,
    },
  });

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
