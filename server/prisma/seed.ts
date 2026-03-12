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
    {
      name: 'game',
      categoryName: 'game',
      lvl: 0,
      unlocked: true,
    },
    {
      name: 'mainMenu',
      categoryName: 'game',
      lvl: 1,
    },
    {
      name: 'gameplay',
      categoryName: 'game',
      lvl: 1,
    },
    {
      name: 'skillDesc',
      categoryName: 'game',
      lvl: 1,
    },
    {
      name: 'skillImg',
      categoryName: 'game',
      lvl: 1,
    },
    {
      name: 'achievement',
      categoryName: 'game',
      lvl: 1,
    },
    {
      name: 'quote',
      categoryName: 'game',
      lvl: 2,
    },
    {
      name: 'character',
      categoryName: 'character',
      lvl: 2,
    },
    {
      name: 'female',
      categoryName: 'character',
      lvl: 2,
    },
    {
      name: 'male',
      categoryName: 'character',
      lvl: 2,
    },
    {
      name: 'silhouette',
      categoryName: 'character',
      lvl: 3,
    },
  ];

  const setsData = [
    {
      name: 'Zestaw 1',
      tags: ['game', 'mainMenu'],
      option: { numberOfQuestions: 10, scoreNeeded: 7 },
    },
    {
      name: 'Zestaw 2',
      tags: ['game', 'gameplay'],
      option: { numberOfQuestions: 10, scoreNeeded: 7 },
    },
    {
      name: 'Zestaw 3',
      tags: ['game', 'achievement'],
      option: { numberOfQuestions: 5, scoreNeeded: 4 },
    },
    {
      name: 'Zestaw 4',
      tags: ['game', 'skillDesc'],
      option: { numberOfQuestions: 10, scoreNeeded: 7 },
    },
    {
      name: 'Zestaw 5',
      tags: ['game', 'skillImg'],
      option: { numberOfQuestions: 3, scoreNeeded: 1 },
    },
    {
      name: 'Zestaw 6',
      tags: ['game', 'quote'],
      option: { numberOfQuestions: 10, scoreNeeded: 7 },
    },
    {
      name: 'Zestaw 7',
      tags: ['character', 'female'],
      option: { numberOfQuestions: 5, scoreNeeded: 4 },
    },
    {
      name: 'Zestaw 8',
      tags: ['character', 'male'],
      option: { numberOfQuestions: 10, scoreNeeded: 7 },
    },
    {
      name: 'Zestaw 9',
      tags: ['character', 'silhouette'],
      option: { numberOfQuestions: 10, scoreNeeded: 7 },
    },
    {
      name: 'Zestaw 10',
      tags: ['character'],
      option: { numberOfQuestions: 10, scoreNeeded: 7 },
    },
    {
      name: 'Zestaw 11',
      tags: ['character', 'male', 'silhouette'],
      option: { numberOfQuestions: 10, scoreNeeded: 7 },
    },
    {
      name: 'Zestaw 12',
      tags: ['character', 'female', 'silhouette'],
      option: { numberOfQuestions: 5, scoreNeeded: 4 },
    },
    {
      name: 'Rozpoznaj grę',
      tags: ['game'],
      option: { numberOfQuestions: 3, scoreNeeded: 1 },
    },
  ];

  const answerTypesData = [{ name: 'title' }, { name: 'character' }];

  const answersData = [
    // Games
    { name: 'Skyrim', type: 'title' },
    { name: 'Wiedźmin 3: Dziki Gon', type: 'title' },
    { name: 'GTA V', type: 'title' },
    { name: 'Minecraft', type: 'title' },
    { name: 'Fortnite', type: 'title' },
    { name: 'League of Legends', type: 'title' },
    { name: 'Counter-Strike: Global Offensive', type: 'title' },
    { name: 'Call of Duty: Modern Warfare', type: 'title' },
    { name: 'Red Dead Redemption 2', type: 'title' },
    { name: 'The Legend of Zelda: Breath of the Wild', type: 'title' },
    { name: 'Super Mario Odyssey', type: 'title' },
    { name: 'Cyberpunk 2077', type: 'title' },
    { name: 'Overwatch', type: 'title' },
    { name: 'Among Us', type: 'title' },
    { name: 'FIFA 23', type: 'title' },
    { name: 'Pokémon GO', type: 'title' },
    { name: 'Dark Souls III', type: 'title' },
    { name: 'Assassin’s Creed Valhalla', type: 'title' },
    { name: 'Valorant', type: 'title' },
    { name: 'Animal Crossing: New Horizons', type: 'title' },

    // Characters (females)
    { name: 'Ada Wong', type: 'character' },
    { name: 'Ciri', type: 'character' },
    { name: 'Lara Croft', type: 'character' },
    { name: 'Samus Aran', type: 'character' },
    { name: 'Jill Valentine', type: 'character' },
    { name: 'Princess Peach', type: 'character' },
    { name: 'Zelda', type: 'character' },
    { name: 'Bayonetta', type: 'character' },
    { name: 'Ellie', type: 'character' },
    { name: 'Tifa Lockhart', type: 'character' },
    { name: 'Yennefer', type: 'character' },
    { name: 'Triss Merigold', type: 'character' },
    { name: 'Aloy', type: 'character' },
    { name: 'Chun-Li', type: 'character' },
    { name: 'D.Va', type: 'character' },

    // Characters (males)
    { name: 'Leon Scott Kennedy', type: 'character' },
    { name: 'Geralt z Rivii', type: 'character' },
    { name: 'Mario', type: 'character' },
    { name: 'Link', type: 'character' },
    { name: 'Ezio Auditore', type: 'character' },
  ];

  const questionsData = [
    // Games
    {
      media: 'https://i.imgur.com/haouzwo.jpeg',
      answer: 'Skyrim',
      tags: ['game', 'mainMenu'],
      answerType: 'title',
    },
    {
      media: 'https://i.imgur.com/haouzwo.jpeg',
      answer: 'Wiedźmin 3: Dziki Gon',
      tags: ['game', 'gameplay'],
      answerType: 'title',
    },
    {
      media: 'https://i.imgur.com/haouzwo.jpeg',
      answer: 'GTA V',
      tags: ['game', 'achievement'],
      answerType: 'title',
    },
    {
      media: 'https://i.imgur.com/haouzwo.jpeg',
      answer: 'Minecraft',
      tags: ['game', 'skillDesc'],
      answerType: 'title',
    },
    {
      media: 'https://i.imgur.com/haouzwo.jpeg',
      answer: 'Fortnite',
      tags: ['game', 'skillImg'],
      answerType: 'title',
    },
    {
      media: 'https://i.imgur.com/haouzwo.jpeg',
      answer: 'League of Legends',
      tags: ['game', 'quote'],
      answerType: 'title',
    },
    {
      media: 'https://i.imgur.com/haouzwo.jpeg',
      answer: 'Counter-Strike: Global Offensive',
      tags: ['game', 'mainMenu'],
      answerType: 'title',
    },
    {
      media: 'https://i.imgur.com/haouzwo.jpeg',
      answer: 'Call of Duty: Modern Warfare',
      tags: ['game', 'gameplay'],
      answerType: 'title',
    },
    {
      media: 'https://i.imgur.com/haouzwo.jpeg',
      answer: 'Red Dead Redemption 2',
      tags: ['game', 'achievement'],
      answerType: 'title',
    },
    {
      media: 'https://i.imgur.com/haouzwo.jpeg',
      answer: 'The Legend of Zelda: Breath of the Wild',
      tags: ['game', 'skillDesc'],
      answerType: 'title',
    },
    {
      media: 'https://i.imgur.com/haouzwo.jpeg',
      answer: 'Super Mario Odyssey',
      tags: ['game', 'skillImg'],
      answerType: 'title',
    },
    {
      media: 'https://i.imgur.com/haouzwo.jpeg',
      answer: 'Cyberpunk 2077',
      tags: ['game', 'quote'],
      answerType: 'title',
    },
    {
      media: 'https://i.imgur.com/haouzwo.jpeg',
      answer: 'Overwatch',
      tags: ['game', 'mainMenu'],
      answerType: 'title',
    },
    {
      media: 'https://i.imgur.com/haouzwo.jpeg',
      answer: 'Among Us',
      tags: ['game', 'gameplay'],
      answerType: 'title',
    },
    {
      media: 'https://i.imgur.com/haouzwo.jpeg',
      answer: 'FIFA 23',
      tags: ['game', 'achievement'],
      answerType: 'title',
    },
    {
      media: 'https://i.imgur.com/haouzwo.jpeg',
      answer: 'Pokémon GO',
      tags: ['game', 'skillDesc'],
      answerType: 'title',
    },
    {
      media: 'https://i.imgur.com/haouzwo.jpeg',
      answer: 'Dark Souls III',
      tags: ['game', 'skillImg'],
      answerType: 'title',
    },
    {
      media: 'https://i.imgur.com/haouzwo.jpeg',
      answer: 'Assassin’s Creed Valhalla',
      tags: ['game', 'quote'],
      answerType: 'title',
    },
    {
      media: 'https://i.imgur.com/haouzwo.jpeg',
      answer: 'Valorant',
      tags: ['game', 'mainMenu'],
      answerType: 'title',
    },
    {
      media: 'https://i.imgur.com/haouzwo.jpeg',
      answer: 'Animal Crossing: New Horizons',
      tags: ['game', 'gameplay'],
      answerType: 'title',
    },

    // Characters
    {
      media: 'https://i.imgur.com/haouzwo.jpeg',
      answer: 'Ada Wong',
      tags: ['game', 'character', 'female'],
      answerType: 'character',
    },
    {
      media: 'https://i.imgur.com/haouzwo.jpeg',
      answer: 'Ciri',
      tags: ['game', 'character', 'female'],
      answerType: 'character',
    },
    {
      media: 'https://i.imgur.com/haouzwo.jpeg',
      answer: 'Lara Croft',
      tags: ['game', 'character', 'female'],
      answerType: 'character',
    },
    {
      media: 'https://i.imgur.com/haouzwo.jpeg',
      answer: 'Samus Aran',
      tags: ['game', 'character', 'female'],
      answerType: 'character',
    },
    {
      media: 'https://i.imgur.com/haouzwo.jpeg',
      answer: 'Jill Valentine',
      tags: ['game', 'character', 'female'],
      answerType: 'character',
    },
    {
      media: 'https://i.imgur.com/haouzwo.jpeg',
      answer: 'Princess Peach',
      tags: ['game', 'character', 'female'],
      answerType: 'character',
    },
    {
      media: 'https://i.imgur.com/haouzwo.jpeg',
      answer: 'Zelda',
      tags: ['game', 'character', 'female'],
      answerType: 'character',
    },
    {
      media: 'https://i.imgur.com/haouzwo.jpeg',
      answer: 'Bayonetta',
      tags: ['game', 'character', 'female'],
      answerType: 'character',
    },
    {
      media: 'https://i.imgur.com/haouzwo.jpeg',
      answer: 'Ellie',
      tags: ['game', 'character', 'female'],
      answerType: 'character',
    },
    {
      media: 'https://i.imgur.com/haouzwo.jpeg',
      answer: 'Tifa Lockhart',
      tags: ['game', 'character', 'female'],
      answerType: 'character',
    },
    {
      media: 'https://i.imgur.com/haouzwo.jpeg',
      answer: 'Yennefer',
      tags: ['game', 'character', 'female'],
      answerType: 'character',
    },
    {
      media: 'https://i.imgur.com/haouzwo.jpeg',
      answer: 'Triss Merigold',
      tags: ['game', 'character', 'female'],
      answerType: 'character',
    },
    {
      media: 'https://i.imgur.com/haouzwo.jpeg',
      answer: 'Aloy',
      tags: ['game', 'character', 'female'],
      answerType: 'character',
    },
    {
      media: 'https://i.imgur.com/haouzwo.jpeg',
      answer: 'Chun-Li',
      tags: ['game', 'character', 'female'],
      answerType: 'character',
    },
    {
      media: 'https://i.imgur.com/haouzwo.jpeg',
      answer: 'D.Va',
      tags: ['game', 'character', 'female'],
      answerType: 'character',
    },
    {
      media: 'https://i.imgur.com/haouzwo.jpeg',
      answer: 'Leon Scott Kennedy',
      tags: ['game', 'character', 'male'],
      answerType: 'character',
    },
    {
      media: 'https://i.imgur.com/haouzwo.jpeg',
      answer: 'Geralt z Rivii',
      tags: ['game', 'character', 'male'],
      answerType: 'character',
    },
    {
      media: 'https://i.imgur.com/haouzwo.jpeg',
      answer: 'Mario',
      tags: ['game', 'character', 'male'],
      answerType: 'character',
    },
    {
      media: 'https://i.imgur.com/haouzwo.jpeg',
      answer: 'Link',
      tags: ['game', 'character', 'male'],
      answerType: 'character',
    },
    {
      media: 'https://i.imgur.com/haouzwo.jpeg',
      answer: 'Ezio Auditore',
      tags: ['game', 'character', 'male'],
      answerType: 'character',
    },
    {
      media: 'https://i.imgur.com/haouzwo.jpeg',
      answer: 'Lara Croft',
      tags: ['game', 'character', 'female', 'mainMenu'],
      answerType: 'character',
    },
    {
      media: 'https://i.imgur.com/haouzwo.jpeg',
      answer: 'Lara Croft',
      tags: ['game', 'character', 'female', 'achievement'],
      answerType: 'character',
    },
    {
      media: 'https://i.imgur.com/haouzwo.jpeg',
      answer: 'Lara Croft',
      tags: ['game', 'character', 'female', 'quote'],
      answerType: 'character',
    },

    {
      media: 'https://i.imgur.com/haouzwo.jpeg',
      answer: 'Ciri',
      tags: ['game', 'character', 'female', 'mainMenu'],
      answerType: 'character',
    },
    {
      media: 'https://i.imgur.com/haouzwo.jpeg',
      answer: 'Ciri',
      tags: ['game', 'character', 'female', 'achievement'],
      answerType: 'character',
    },
    {
      media: 'https://i.imgur.com/haouzwo.jpeg',
      answer: 'Ciri',
      tags: ['game', 'character', 'female', 'quote'],
      answerType: 'character',
    },

    {
      media: 'https://i.imgur.com/haouzwo.jpeg',
      answer: 'Geralt z Rivii',
      tags: ['game', 'character', 'male', 'mainMenu'],
      answerType: 'character',
    },
    {
      media: 'https://i.imgur.com/haouzwo.jpeg',
      answer: 'Geralt z Rivii',
      tags: ['game', 'character', 'male', 'achievement'],
      answerType: 'character',
    },
    {
      media: 'https://i.imgur.com/haouzwo.jpeg',
      answer: 'Geralt z Rivii',
      tags: ['game', 'character', 'male', 'quote'],
      answerType: 'character',
    },

    {
      media: 'https://i.imgur.com/haouzwo.jpeg',
      answer: 'Princess Peach',
      tags: ['game', 'character', 'female', 'mainMenu'],
      answerType: 'character',
    },
    {
      media: 'https://i.imgur.com/haouzwo.jpeg',
      answer: 'Princess Peach',
      tags: ['game', 'character', 'female', 'achievement'],
      answerType: 'character',
    },
    {
      media: 'https://i.imgur.com/haouzwo.jpeg',
      answer: 'Princess Peach',
      tags: ['game', 'character', 'female', 'quote'],
      answerType: 'character',
    },

    {
      media: 'https://i.imgur.com/haouzwo.jpeg',
      answer: 'Leon Scott Kennedy',
      tags: ['game', 'character', 'male', 'mainMenu'],
      answerType: 'character',
    },
    {
      media: 'https://i.imgur.com/haouzwo.jpeg',
      answer: 'Leon Scott Kennedy',
      tags: ['game', 'character', 'male', 'achievement'],
      answerType: 'character',
    },
    {
      media: 'https://i.imgur.com/haouzwo.jpeg',
      answer: 'Leon Scott Kennedy',
      tags: ['game', 'character', 'male', 'quote'],
      answerType: 'character',
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
      unlocked: t.unlocked || false,
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
        tags: {
          connect: s.tags.map((tagName) => ({
            id: tags.find((t) => t.name === tagName)!.id,
          })),
        },
        option: {
          create: {
            numberOfQuestions: s.option.numberOfQuestions,
            scoreNeeded: s.option.scoreNeeded,
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
      exp: 10,
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
