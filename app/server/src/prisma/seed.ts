import { PrismaClient } from '../generated/prisma/client';
import { PrismaMariaDb } from '@prisma/adapter-mariadb';
import 'dotenv/config';

const adapter = new PrismaMariaDb(process.env.DATABASE_URL!);
const prisma = new PrismaClient({ adapter });

async function createQuestion(
  url: string,
  answerId: string,
  chipById: string,
  chipGuessIds: string[],
  chipFilterIds: string[] = [],
) {
  await prisma.question.create({
    data: {
      url,
      chipById,
      answerId,
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

  // ── ChipFilter ─────────────────────────────────────────────────────────────
  const onlyHorror = await prisma.chipFilter.create({
    data: { name: 'onlyHorror' },
  });
  const onlyMale = await prisma.chipFilter.create({
    data: { name: 'onlyMale' },
  });
  const onlyFemale = await prisma.chipFilter.create({
    data: { name: 'onlyFemale' },
  });

  // ── ChipBy ─────────────────────────────────────────────────────────────────
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
  const byMod = await prisma.chipBy.create({ data: { name: 'byMod' } });
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
    data: { name: 'byQuoteText' },
  });

  // ── ChipGuess ──────────────────────────────────────────────────────────────
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

  // ── Answers — guessGame, no filter ────────────────────────────────────────
  const ansMinecraft = await prisma.answer.create({
    data: {
      value: 'Minecraft',
      chipGuesses: { connect: [{ id: guessGame.id }] },
    },
  });
  const ansPortal2 = await prisma.answer.create({
    data: {
      value: 'Portal 2',
      chipGuesses: { connect: [{ id: guessGame.id }] },
    },
  });
  const ansHollowKnight = await prisma.answer.create({
    data: {
      value: 'Hollow Knight',
      chipGuesses: { connect: [{ id: guessGame.id }] },
    },
  });
  const ansDispatch = await prisma.answer.create({
    data: {
      value: 'Dispatch',
      chipGuesses: { connect: [{ id: guessGame.id }] },
    },
  });
  const ansDarksiders2 = await prisma.answer.create({
    data: {
      value: 'Darksiders II',
      chipGuesses: { connect: [{ id: guessGame.id }] },
    },
  });
  const ansDetroit = await prisma.answer.create({
    data: {
      value: 'Detroit: Become Human',
      chipGuesses: { connect: [{ id: guessGame.id }] },
    },
  });
  // shared: byAchievement + byScreenshot
  const ansRaft = await prisma.answer.create({
    data: { value: 'Raft', chipGuesses: { connect: [{ id: guessGame.id }] } },
  });
  // shared: byAchievement + byMod + byScreenshot
  const ansSkyrim = await prisma.answer.create({
    data: {
      value: 'The Elder Scrolls V: Skyrim',
      chipGuesses: { connect: [{ id: guessGame.id }] },
    },
  });
  const ansSouthPark = await prisma.answer.create({
    data: {
      value: 'South Park: The Stick of Truth',
      chipGuesses: { connect: [{ id: guessGame.id }] },
    },
  });
  // shared: byAchievement + byScreenshot
  const ansStardew = await prisma.answer.create({
    data: {
      value: 'Stardew Valley',
      chipGuesses: { connect: [{ id: guessGame.id }] },
    },
  });
  const ansSurvivingMars = await prisma.answer.create({
    data: {
      value: 'Surviving Mars',
      chipGuesses: { connect: [{ id: guessGame.id }] },
    },
  });
  // shared: byMod + byScreenshot
  const ansCivVI = await prisma.answer.create({
    data: {
      value: "Sid Meier's Civilization VI",
      chipGuesses: { connect: [{ id: guessGame.id }] },
    },
  });
  const ansEldenRing = await prisma.answer.create({
    data: {
      value: 'Elden Ring',
      chipGuesses: { connect: [{ id: guessGame.id }] },
    },
  });
  const ansCK3 = await prisma.answer.create({
    data: {
      value: 'Crusader Kings III',
      chipGuesses: { connect: [{ id: guessGame.id }] },
    },
  });
  const ansDontStarve = await prisma.answer.create({
    data: {
      value: "Don't Starve",
      chipGuesses: { connect: [{ id: guessGame.id }] },
    },
  });
  const ansTotalWar = await prisma.answer.create({
    data: {
      value: 'Total War: Warhammer',
      chipGuesses: { connect: [{ id: guessGame.id }] },
    },
  });
  const ansVRising = await prisma.answer.create({
    data: {
      value: 'V Rising',
      chipGuesses: { connect: [{ id: guessGame.id }] },
    },
  });
  const ansWolfenstein = await prisma.answer.create({
    data: {
      value: 'Wolfenstein: The New Order',
      chipGuesses: { connect: [{ id: guessGame.id }] },
    },
  });

  // ── Answers — guessGame, onlyHorror ───────────────────────────────────────
  // shared: byMainMenu + byAchievement
  const ansDeadByDaylight = await prisma.answer.create({
    data: {
      value: 'Dead by Daylight',
      chipGuesses: { connect: [{ id: guessGame.id }] },
      chipFilters: { connect: [{ id: onlyHorror.id }] },
    },
  });
  const ansLimbo = await prisma.answer.create({
    data: {
      value: 'Limbo',
      chipGuesses: { connect: [{ id: guessGame.id }] },
      chipFilters: { connect: [{ id: onlyHorror.id }] },
    },
  });
  const ansSoma = await prisma.answer.create({
    data: {
      value: 'Soma',
      chipGuesses: { connect: [{ id: guessGame.id }] },
      chipFilters: { connect: [{ id: onlyHorror.id }] },
    },
  });
  const ansRE7 = await prisma.answer.create({
    data: {
      value: 'Resident Evil 7: Biohazard',
      chipGuesses: { connect: [{ id: guessGame.id }] },
      chipFilters: { connect: [{ id: onlyHorror.id }] },
    },
  });
  const ansAmongTheSleep = await prisma.answer.create({
    data: {
      value: 'Among the Sleep',
      chipGuesses: { connect: [{ id: guessGame.id }] },
      chipFilters: { connect: [{ id: onlyHorror.id }] },
    },
  });
  const ansInscryption = await prisma.answer.create({
    data: {
      value: 'Inscryption',
      chipGuesses: { connect: [{ id: guessGame.id }] },
      chipFilters: { connect: [{ id: onlyHorror.id }] },
    },
  });

  // ── Answers — guessGameCharacter, onlyFemale ──────────────────────────────
  const ansAhri = await prisma.answer.create({
    data: {
      value: 'Ahri',
      chipGuesses: { connect: [{ id: guessGameCharacter.id }] },
      chipFilters: { connect: [{ id: onlyFemale.id }] },
    },
  });
  const ansEve = await prisma.answer.create({
    data: {
      value: 'Eve',
      chipGuesses: { connect: [{ id: guessGameCharacter.id }] },
      chipFilters: { connect: [{ id: onlyFemale.id }] },
    },
  });
  const ansGrace = await prisma.answer.create({
    data: {
      value: 'Grace',
      chipGuesses: { connect: [{ id: guessGameCharacter.id }] },
      chipFilters: { connect: [{ id: onlyFemale.id }] },
    },
  });
  const ansHornet = await prisma.answer.create({
    data: {
      value: 'Hornet',
      chipGuesses: { connect: [{ id: guessGameCharacter.id }] },
      chipFilters: { connect: [{ id: onlyFemale.id }] },
    },
  });
  const ansJudeAlvarez = await prisma.answer.create({
    data: {
      value: 'Jude Alvarez',
      chipGuesses: { connect: [{ id: guessGameCharacter.id }] },
      chipFilters: { connect: [{ id: onlyFemale.id }] },
    },
  });
  const ansKena = await prisma.answer.create({
    data: {
      value: 'Kena',
      chipGuesses: { connect: [{ id: guessGameCharacter.id }] },
      chipFilters: { connect: [{ id: onlyFemale.id }] },
    },
  });

  // ── Answers — guessGameCharacter, onlyMale ────────────────────────────────
  const ansHanzo = await prisma.answer.create({
    data: {
      value: 'Hanzo',
      chipGuesses: { connect: [{ id: guessGameCharacter.id }] },
      chipFilters: { connect: [{ id: onlyMale.id }] },
    },
  });
  const ansKratos = await prisma.answer.create({
    data: {
      value: 'Kratos',
      chipGuesses: { connect: [{ id: guessGameCharacter.id }] },
      chipFilters: { connect: [{ id: onlyMale.id }] },
    },
  });
  const ansRobertRobertsonIII = await prisma.answer.create({
    data: {
      value: 'Robert Robertson III',
      chipGuesses: { connect: [{ id: guessGameCharacter.id }] },
      chipFilters: { connect: [{ id: onlyMale.id }] },
    },
  });
  const ansTheHunter = await prisma.answer.create({
    data: {
      value: 'The Hunter',
      chipGuesses: { connect: [{ id: guessGameCharacter.id }] },
      chipFilters: { connect: [{ id: onlyMale.id }] },
    },
  });
  const ansTrevorPhilips = await prisma.answer.create({
    data: {
      value: 'Trevor Philips',
      chipGuesses: { connect: [{ id: guessGameCharacter.id }] },
      chipFilters: { connect: [{ id: onlyMale.id }] },
    },
  });

  // ── Questions — byMainMenu ─────────────────────────────────────────────────
  await createQuestion(
    '/static/questions/mainMenu/minecraft.png',
    ansMinecraft.id,
    byMainMenu.id,
    [guessGame.id],
  );
  await createQuestion(
    '/static/questions/mainMenu/portal2.png',
    ansPortal2.id,
    byMainMenu.id,
    [guessGame.id],
  );
  await createQuestion(
    '/static/questions/mainMenu/hollowknight.png',
    ansHollowKnight.id,
    byMainMenu.id,
    [guessGame.id],
  );
  await createQuestion(
    '/static/questions/mainMenu/dispatch.png',
    ansDispatch.id,
    byMainMenu.id,
    [guessGame.id],
  );
  await createQuestion(
    '/static/questions/mainMenu/dbd.png',
    ansDeadByDaylight.id,
    byMainMenu.id,
    [guessGame.id],
    [onlyHorror.id],
  );
  await createQuestion(
    '/static/questions/mainMenu/limbo-menu.png',
    ansLimbo.id,
    byMainMenu.id,
    [guessGame.id],
    [onlyHorror.id],
  );
  await createQuestion(
    '/static/questions/mainMenu/soma.png',
    ansSoma.id,
    byMainMenu.id,
    [guessGame.id],
    [onlyHorror.id],
  );

  // ── Questions — byAchievement ──────────────────────────────────────────────
  await createQuestion(
    '/static/questions/achivement/darksidersii.png',
    ansDarksiders2.id,
    byAchievement.id,
    [guessGame.id],
  );
  await createQuestion(
    '/static/questions/achivement/detroit.png',
    ansDetroit.id,
    byAchievement.id,
    [guessGame.id],
  );
  await createQuestion(
    '/static/questions/achivement/raft.png',
    ansRaft.id,
    byAchievement.id,
    [guessGame.id],
  );
  await createQuestion(
    '/static/questions/achivement/skyrim.png',
    ansSkyrim.id,
    byAchievement.id,
    [guessGame.id],
  );
  await createQuestion(
    '/static/questions/achivement/southpark.png',
    ansSouthPark.id,
    byAchievement.id,
    [guessGame.id],
  );
  await createQuestion(
    '/static/questions/achivement/stardew.png',
    ansStardew.id,
    byAchievement.id,
    [guessGame.id],
  );
  await createQuestion(
    '/static/questions/achivement/surviving-mars.png',
    ansSurvivingMars.id,
    byAchievement.id,
    [guessGame.id],
  );
  await createQuestion(
    '/static/questions/achivement/dbd1.png',
    ansDeadByDaylight.id,
    byAchievement.id,
    [guessGame.id],
    [onlyHorror.id],
  );
  await createQuestion(
    '/static/questions/achivement/efbiohazard.png',
    ansRE7.id,
    byAchievement.id,
    [guessGame.id],
    [onlyHorror.id],
  );

  // ── Questions — byMod ──────────────────────────────────────────────────────
  await createQuestion(
    '/static/questions/mods/civvi.png',
    ansCivVI.id,
    byMod.id,
    [guessGame.id],
  );
  await createQuestion(
    '/static/questions/mods/eldenring.png',
    ansEldenRing.id,
    byMod.id,
    [guessGame.id],
  );
  await createQuestion(
    '/static/questions/mods/skyrim.png',
    ansSkyrim.id,
    byMod.id,
    [guessGame.id],
  );

  // ── Questions — byScreenshot ───────────────────────────────────────────────
  await createQuestion(
    '/static/questions/screenshot/civvi.png',
    ansCivVI.id,
    byScreenshot.id,
    [guessGame.id],
  );
  await createQuestion(
    '/static/questions/screenshot/ck3.png',
    ansCK3.id,
    byScreenshot.id,
    [guessGame.id],
  );
  await createQuestion(
    '/static/questions/screenshot/dontstarve.png',
    ansDontStarve.id,
    byScreenshot.id,
    [guessGame.id],
  );
  await createQuestion(
    '/static/questions/screenshot/raft.png',
    ansRaft.id,
    byScreenshot.id,
    [guessGame.id],
  );
  await createQuestion(
    '/static/questions/screenshot/skyrim.png',
    ansSkyrim.id,
    byScreenshot.id,
    [guessGame.id],
  );
  await createQuestion(
    '/static/questions/screenshot/stardewvalley.png',
    ansStardew.id,
    byScreenshot.id,
    [guessGame.id],
  );
  await createQuestion(
    '/static/questions/screenshot/totalwarwarhammer.png',
    ansTotalWar.id,
    byScreenshot.id,
    [guessGame.id],
  );
  await createQuestion(
    '/static/questions/screenshot/vrising.png',
    ansVRising.id,
    byScreenshot.id,
    [guessGame.id],
  );
  await createQuestion(
    '/static/questions/screenshot/wolfenshteinneworder.png',
    ansWolfenstein.id,
    byScreenshot.id,
    [guessGame.id],
  );
  await createQuestion(
    '/static/questions/screenshot/amongthesleep.png',
    ansAmongTheSleep.id,
    byScreenshot.id,
    [guessGame.id],
    [onlyHorror.id],
  );
  await createQuestion(
    '/static/questions/screenshot/inscryption.png',
    ansInscryption.id,
    byScreenshot.id,
    [guessGame.id],
    [onlyHorror.id],
  );

  // ── Questions — byImage, onlyFemale ───────────────────────────────────────
  await createQuestion(
    '/static/questions/gameCharacter/ahri.png',
    ansAhri.id,
    byImage.id,
    [guessGameCharacter.id],
    [onlyFemale.id],
  );
  await createQuestion(
    '/static/questions/gameCharacter/eve.png',
    ansEve.id,
    byImage.id,
    [guessGameCharacter.id],
    [onlyFemale.id],
  );
  await createQuestion(
    '/static/questions/gameCharacter/grace.png',
    ansGrace.id,
    byImage.id,
    [guessGameCharacter.id],
    [onlyFemale.id],
  );
  await createQuestion(
    '/static/questions/gameCharacter/hornet.png',
    ansHornet.id,
    byImage.id,
    [guessGameCharacter.id],
    [onlyFemale.id],
  );
  await createQuestion(
    '/static/questions/gameCharacter/judeAlvarez.png',
    ansJudeAlvarez.id,
    byImage.id,
    [guessGameCharacter.id],
    [onlyFemale.id],
  );
  await createQuestion(
    '/static/questions/gameCharacter/kena.png',
    ansKena.id,
    byImage.id,
    [guessGameCharacter.id],
    [onlyFemale.id],
  );

  // ── Questions — byImage, onlyMale ─────────────────────────────────────────
  await createQuestion(
    '/static/questions/gameCharacter/hanzo.png',
    ansHanzo.id,
    byImage.id,
    [guessGameCharacter.id],
    [onlyMale.id],
  );
  await createQuestion(
    '/static/questions/gameCharacter/kratos.png',
    ansKratos.id,
    byImage.id,
    [guessGameCharacter.id],
    [onlyMale.id],
  );
  await createQuestion(
    '/static/questions/gameCharacter/RobertRobertsonIII.png',
    ansRobertRobertsonIII.id,
    byImage.id,
    [guessGameCharacter.id],
    [onlyMale.id],
  );
  await createQuestion(
    '/static/questions/gameCharacter/thehunterbloodborn.png',
    ansTheHunter.id,
    byImage.id,
    [guessGameCharacter.id],
    [onlyMale.id],
  );
  await createQuestion(
    '/static/questions/gameCharacter/trevor.png',
    ansTrevorPhilips.id,
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
