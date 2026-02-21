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
  await prisma.type.deleteMany();

  await prisma.tag.createMany({
    data: [
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
    ],
  });

  await prisma.type.createMany({
    data: [
      {
        name: 'title',
      },
      {
        name: 'character',
      },
    ],
  });

  const answerValues = [
    { name: 'Skyrim', type: 'title' },
    { name: 'Wiedźmin 3: Dziki Gon', type: 'title' },
    { name: 'GTA V', type: 'title' },
    { name: 'Ada Wong', type: 'character' },
    { name: 'Ciri', type: 'character' },
    { name: 'Leon Scott Kennedy', type: 'character' },
  ];

  async function createAnswers() {
    const titleTypeId = await prisma.type
      .findFirst({
        where: { name: 'title' },
      })
      .then((type) => type?.id);
    const characterTypeId = await prisma.type
      .findFirst({
        where: { name: 'character' },
      })
      .then((type) => type?.id);

    for (let i = 0; i < answerValues.length; i++) {
      if (answerValues[i].type === 'title') {
        await prisma.answer.create({
          data: {
            value: answerValues[i].name,
            typeId: titleTypeId,
          },
        });
      } else if (answerValues[i].type === 'character') {
        await prisma.answer.create({
          data: {
            value: answerValues[i].name,
            typeId: characterTypeId,
          },
        });
      }
    }
  }

  await createAnswers();

  const answers = await prisma.answer.findMany();
  const tags = await prisma.tag.findMany();
  await prisma.question.create({
    data: {
      media: 'https://i.imgur.com/haouzwo.jpeg',
      answerId: answers.find((a) => a.value === 'Skyrim').id,
      tags: {
        connect: [
          { id: tags.find((t) => t.name === 'game')!.id },
          { id: tags.find((t) => t.name === 'mainMenu')!.id },
        ],
      },
    },
  });
  await prisma.question.create({
    data: {
      media: 'https://i.imgur.com/haouzwo.jpeg',
      answerId: answers.find((a) => a.value === 'Skyrim').id,
      tags: {
        connect: [
          { id: tags.find((t) => t.name === 'game')!.id },
          { id: tags.find((t) => t.name === 'achievement')!.id },
        ],
      },
    },
  });
  await prisma.question.create({
    data: {
      media: 'https://i.imgur.com/haouzwo.jpeg',
      answerId: answers.find((a) => a.value === 'Wiedźmin 3: Dziki Gon').id,
      tags: {
        connect: [
          { id: tags.find((t) => t.name === 'game')!.id },
          { id: tags.find((t) => t.name === 'mainMenu')!.id },
        ],
      },
    },
  });
  await prisma.question.create({
    data: {
      media: 'https://i.imgur.com/haouzwo.jpeg',
      answerId: answers.find((a) => a.value === 'Wiedźmin 3: Dziki Gon').id,
      tags: {
        connect: [
          { id: tags.find((t) => t.name === 'game')!.id },
          { id: tags.find((t) => t.name === 'gameplay')!.id },
        ],
      },
    },
  });
  await prisma.question.create({
    data: {
      media: 'https://i.imgur.com/haouzwo.jpeg',
      answerId: answers.find((a) => a.value === 'Wiedźmin 3: Dziki Gon').id,
      tags: {
        connect: [
          { id: tags.find((t) => t.name === 'game')!.id },
          { id: tags.find((t) => t.name === 'achievement')!.id },
        ],
      },
    },
  });
  await prisma.question.create({
    data: {
      media: 'https://i.imgur.com/haouzwo.jpeg',
      answerId: answers.find((a) => a.value === 'GTA V').id,
      tags: {
        connect: [
          { id: tags.find((t) => t.name === 'game')!.id },
          { id: tags.find((t) => t.name === 'mainMenu')!.id },
        ],
      },
    },
  });
  await prisma.question.create({
    data: {
      media: 'https://i.imgur.com/haouzwo.jpeg',
      answerId: answers.find((a) => a.value === 'GTA V').id,
      tags: {
        connect: [
          { id: tags.find((t) => t.name === 'game')!.id },
          { id: tags.find((t) => t.name === 'gameplay')!.id },
        ],
      },
    },
  });
  await prisma.question.create({
    data: {
      media: 'https://i.imgur.com/haouzwo.jpeg',
      answerId: answers.find((a) => a.value === 'Ada Wong').id,
      tags: {
        connect: [
          { id: tags.find((t) => t.name === 'game')!.id },
          { id: tags.find((t) => t.name === 'female')!.id },
          { id: tags.find((t) => t.name === 'character')!.id },
          { id: tags.find((t) => t.name === 'silhouette')!.id },
        ],
      },
    },
  });
  await prisma.question.create({
    data: {
      media: 'https://i.imgur.com/haouzwo.jpeg',
      answerId: answers.find((a) => a.value === 'Ada Wong').id,
      tags: {
        connect: [
          { id: tags.find((t) => t.name === 'game')!.id },
          { id: tags.find((t) => t.name === 'female')!.id },
        ],
      },
    },
  });
  await prisma.question.create({
    data: {
      media: 'https://i.imgur.com/haouzwo.jpeg',
      answerId: answers.find((a) => a.value === 'Ciri').id,
      tags: {
        connect: [
          { id: tags.find((t) => t.name === 'game')!.id },
          { id: tags.find((t) => t.name === 'female')!.id },
          { id: tags.find((t) => t.name === 'character')!.id },
        ],
      },
    },
  });
  await prisma.question.create({
    data: {
      media: 'https://i.imgur.com/haouzwo.jpeg',
      answerId: answers.find((a) => a.value === 'Leon Scott Kennedy').id,
      tags: {
        connect: [
          { id: tags.find((t) => t.name === 'game')!.id },
          { id: tags.find((t) => t.name === 'male')!.id },
          { id: tags.find((t) => t.name === 'character')!.id },
        ],
      },
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
