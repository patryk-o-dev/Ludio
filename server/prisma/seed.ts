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
  await prisma.set.deleteMany();

  const tagsData = [
    {
      name: 'game',
      category: 'game',
    },
    {
      name: 'mainMenu',
      category: 'game',
    },
    {
      name: 'gameplay',
      category: 'game',
    },
    {
      name: 'skillDesc',
      category: 'game',
    },
    {
      name: 'skillImg',
      category: 'game',
    },
    {
      name: 'achievement',
      category: 'game',
    },
    {
      name: 'quote',
      category: 'game',
    },
    {
      name: 'character',
      category: 'character',
    },
    {
      name: 'female',
      category: 'character',
    },
    {
      name: 'male',
      category: 'character',
    },
    {
      name: 'silhouette',
      category: 'character',
    },
  ];

  const setsData = [
    { name: 'Zestaw 1', tags: ['game', 'mainMenu'] },
    { name: 'Zestaw 2', tags: ['game', 'gameplay'] },
    { name: 'Zestaw 3', tags: ['game', 'achievement'] },
    { name: 'Zestaw 4', tags: ['game', 'skillDesc'] },
    { name: 'Zestaw 5', tags: ['game', 'skillImg'] },
    { name: 'Zestaw 6', tags: ['game', 'quote'] },
    { name: 'Zestaw 7', tags: ['character', 'female'] },
    { name: 'Zestaw 8', tags: ['character', 'male'] },
    { name: 'Zestaw 9', tags: ['character', 'silhouette'] },
    { name: 'Zestaw 10', tags: ['character'] },
    { name: 'Zestaw 11', tags: ['character', 'male', 'silhouette'] },
    { name: 'Zestaw 12', tags: ['character', 'female', 'silhouette'] },
    { name: 'Zestaw 13', tags: ['game'] },
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
    },
    {
      media: 'https://i.imgur.com/haouzwo.jpeg',
      answer: 'Wiedźmin 3: Dziki Gon',
      tags: ['game', 'gameplay'],
    },
    {
      media: 'https://i.imgur.com/haouzwo.jpeg',
      answer: 'GTA V',
      tags: ['game', 'achievement'],
    },
    {
      media: 'https://i.imgur.com/haouzwo.jpeg',
      answer: 'Minecraft',
      tags: ['game', 'skillDesc'],
    },
    {
      media: 'https://i.imgur.com/haouzwo.jpeg',
      answer: 'Fortnite',
      tags: ['game', 'skillImg'],
    },
    {
      media: 'https://i.imgur.com/haouzwo.jpeg',
      answer: 'League of Legends',
      tags: ['game', 'quote'],
    },
    {
      media: 'https://i.imgur.com/haouzwo.jpeg',
      answer: 'Counter-Strike: Global Offensive',
      tags: ['game', 'mainMenu'],
    },
    {
      media: 'https://i.imgur.com/haouzwo.jpeg',
      answer: 'Call of Duty: Modern Warfare',
      tags: ['game', 'gameplay'],
    },
    {
      media: 'https://i.imgur.com/haouzwo.jpeg',
      answer: 'Red Dead Redemption 2',
      tags: ['game', 'achievement'],
    },
    {
      media: 'https://i.imgur.com/haouzwo.jpeg',
      answer: 'The Legend of Zelda: Breath of the Wild',
      tags: ['game', 'skillDesc'],
    },
    {
      media: 'https://i.imgur.com/haouzwo.jpeg',
      answer: 'Super Mario Odyssey',
      tags: ['game', 'skillImg'],
    },
    {
      media: 'https://i.imgur.com/haouzwo.jpeg',
      answer: 'Cyberpunk 2077',
      tags: ['game', 'quote'],
    },
    {
      media: 'https://i.imgur.com/haouzwo.jpeg',
      answer: 'Overwatch',
      tags: ['game', 'mainMenu'],
    },
    {
      media: 'https://i.imgur.com/haouzwo.jpeg',
      answer: 'Among Us',
      tags: ['game', 'gameplay'],
    },
    {
      media: 'https://i.imgur.com/haouzwo.jpeg',
      answer: 'FIFA 23',
      tags: ['game', 'achievement'],
    },
    {
      media: 'https://i.imgur.com/haouzwo.jpeg',
      answer: 'Pokémon GO',
      tags: ['game', 'skillDesc'],
    },
    {
      media: 'https://i.imgur.com/haouzwo.jpeg',
      answer: 'Dark Souls III',
      tags: ['game', 'skillImg'],
    },
    {
      media: 'https://i.imgur.com/haouzwo.jpeg',
      answer: 'Assassin’s Creed Valhalla',
      tags: ['game', 'quote'],
    },
    {
      media: 'https://i.imgur.com/haouzwo.jpeg',
      answer: 'Valorant',
      tags: ['game', 'mainMenu'],
    },
    {
      media: 'https://i.imgur.com/haouzwo.jpeg',
      answer: 'Animal Crossing: New Horizons',
      tags: ['game', 'gameplay'],
    },

    // Characters
    {
      media: 'https://i.imgur.com/haouzwo.jpeg',
      answer: 'Ada Wong',
      tags: ['game', 'character', 'female'],
    },
    {
      media: 'https://i.imgur.com/haouzwo.jpeg',
      answer: 'Ciri',
      tags: ['game', 'character', 'female'],
    },
    {
      media: 'https://i.imgur.com/haouzwo.jpeg',
      answer: 'Lara Croft',
      tags: ['game', 'character', 'female'],
    },
    {
      media: 'https://i.imgur.com/haouzwo.jpeg',
      answer: 'Samus Aran',
      tags: ['game', 'character', 'female'],
    },
    {
      media: 'https://i.imgur.com/haouzwo.jpeg',
      answer: 'Jill Valentine',
      tags: ['game', 'character', 'female'],
    },
    {
      media: 'https://i.imgur.com/haouzwo.jpeg',
      answer: 'Princess Peach',
      tags: ['game', 'character', 'female'],
    },
    {
      media: 'https://i.imgur.com/haouzwo.jpeg',
      answer: 'Zelda',
      tags: ['game', 'character', 'female'],
    },
    {
      media: 'https://i.imgur.com/haouzwo.jpeg',
      answer: 'Bayonetta',
      tags: ['game', 'character', 'female'],
    },
    {
      media: 'https://i.imgur.com/haouzwo.jpeg',
      answer: 'Ellie',
      tags: ['game', 'character', 'female'],
    },
    {
      media: 'https://i.imgur.com/haouzwo.jpeg',
      answer: 'Tifa Lockhart',
      tags: ['game', 'character', 'female'],
    },
    {
      media: 'https://i.imgur.com/haouzwo.jpeg',
      answer: 'Yennefer',
      tags: ['game', 'character', 'female'],
    },
    {
      media: 'https://i.imgur.com/haouzwo.jpeg',
      answer: 'Triss Merigold',
      tags: ['game', 'character', 'female'],
    },
    {
      media: 'https://i.imgur.com/haouzwo.jpeg',
      answer: 'Aloy',
      tags: ['game', 'character', 'female'],
    },
    {
      media: 'https://i.imgur.com/haouzwo.jpeg',
      answer: 'Chun-Li',
      tags: ['game', 'character', 'female'],
    },
    {
      media: 'https://i.imgur.com/haouzwo.jpeg',
      answer: 'D.Va',
      tags: ['game', 'character', 'female'],
    },
    {
      media: 'https://i.imgur.com/haouzwo.jpeg',
      answer: 'Leon Scott Kennedy',
      tags: ['game', 'character', 'male'],
    },
    {
      media: 'https://i.imgur.com/haouzwo.jpeg',
      answer: 'Geralt z Rivii',
      tags: ['game', 'character', 'male'],
    },
    {
      media: 'https://i.imgur.com/haouzwo.jpeg',
      answer: 'Mario',
      tags: ['game', 'character', 'male'],
    },
    {
      media: 'https://i.imgur.com/haouzwo.jpeg',
      answer: 'Link',
      tags: ['game', 'character', 'male'],
    },
    {
      media: 'https://i.imgur.com/haouzwo.jpeg',
      answer: 'Ezio Auditore',
      tags: ['game', 'character', 'male'],
    },
    {
      media: 'https://i.imgur.com/haouzwo.jpeg',
      answer: 'Lara Croft',
      tags: ['game', 'character', 'female', 'mainMenu'],
    },
    {
      media: 'https://i.imgur.com/haouzwo.jpeg',
      answer: 'Lara Croft',
      tags: ['game', 'character', 'female', 'achievement'],
    },
    {
      media: 'https://i.imgur.com/haouzwo.jpeg',
      answer: 'Lara Croft',
      tags: ['game', 'character', 'female', 'quote'],
    },

    {
      media: 'https://i.imgur.com/haouzwo.jpeg',
      answer: 'Ciri',
      tags: ['game', 'character', 'female', 'mainMenu'],
    },
    {
      media: 'https://i.imgur.com/haouzwo.jpeg',
      answer: 'Ciri',
      tags: ['game', 'character', 'female', 'achievement'],
    },
    {
      media: 'https://i.imgur.com/haouzwo.jpeg',
      answer: 'Ciri',
      tags: ['game', 'character', 'female', 'quote'],
    },

    {
      media: 'https://i.imgur.com/haouzwo.jpeg',
      answer: 'Geralt z Rivii',
      tags: ['game', 'character', 'male', 'mainMenu'],
    },
    {
      media: 'https://i.imgur.com/haouzwo.jpeg',
      answer: 'Geralt z Rivii',
      tags: ['game', 'character', 'male', 'achievement'],
    },
    {
      media: 'https://i.imgur.com/haouzwo.jpeg',
      answer: 'Geralt z Rivii',
      tags: ['game', 'character', 'male', 'quote'],
    },

    {
      media: 'https://i.imgur.com/haouzwo.jpeg',
      answer: 'Princess Peach',
      tags: ['game', 'character', 'female', 'mainMenu'],
    },
    {
      media: 'https://i.imgur.com/haouzwo.jpeg',
      answer: 'Princess Peach',
      tags: ['game', 'character', 'female', 'achievement'],
    },
    {
      media: 'https://i.imgur.com/haouzwo.jpeg',
      answer: 'Princess Peach',
      tags: ['game', 'character', 'female', 'quote'],
    },

    {
      media: 'https://i.imgur.com/haouzwo.jpeg',
      answer: 'Leon Scott Kennedy',
      tags: ['game', 'character', 'male', 'mainMenu'],
    },
    {
      media: 'https://i.imgur.com/haouzwo.jpeg',
      answer: 'Leon Scott Kennedy',
      tags: ['game', 'character', 'male', 'achievement'],
    },
    {
      media: 'https://i.imgur.com/haouzwo.jpeg',
      answer: 'Leon Scott Kennedy',
      tags: ['game', 'character', 'male', 'quote'],
    },
  ];

  await prisma.tag.createMany({
    data: tagsData.map((t) => ({
      name: t.name,
      category: t.category,
    })),
  });

  const tags = await prisma.tag.findMany();

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
