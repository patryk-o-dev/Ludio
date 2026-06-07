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
  const onlyDeath = await prisma.chipFilter.create({
    data: { name: 'onlyDeath' },
  });
  const onlyPick = await prisma.chipFilter.create({
    data: { name: 'onlyPick' },
  });

  // ── ChipBy ─────────────────────────────────────────────────────────────────
  const byAchievement = await prisma.chipBy.create({
    data: {
      name: 'byAchievement',
    },
  });
  const byGameOver = await prisma.chipBy.create({
    data: {
      name: 'byGameOver',
    },
  });
  const byInventory = await prisma.chipBy.create({
    data: {
      name: 'byInventory',
    },
  });
  const byMod = await prisma.chipBy.create({ data: { name: 'byMod' } });
  const byScreenshot = await prisma.chipBy.create({
    data: {
      name: 'byScreenshot',
      compatibleChipFilter: { connect: [{ id: onlyHorror.id }] },
    },
  });
  const byTitleScreen = await prisma.chipBy.create({
    data: { name: 'byTitleScreen' },
  });
  const byCosplay = await prisma.chipBy.create({
    data: {
      name: 'byCosplay',
      compatibleChipFilter: {
        connect: [{ id: onlyFemale.id }],
      },
    },
  });
  const byImage = await prisma.chipBy.create({
    data: {
      name: 'byImage',
      compatibleChipFilter: {
        connect: [{ id: onlyMale.id }, { id: onlyFemale.id }],
      },
    },
  });
  const byDeath = await prisma.chipBy.create({
    data: {
      name: 'byDeath',
      compatibleChipFilter: {
        connect: [{ id: onlyDeath.id }],
      },
    },
  });
  const byPick = await prisma.chipBy.create({
    data: {
      name: 'byPick',
      compatibleChipFilter: {
        connect: [{ id: onlyPick.id }],
      },
    },
  });
  const byFrame = await prisma.chipBy.create({
    data: {
      name: 'byFrame',
    },
  });
  const byTrailer = await prisma.chipBy.create({
    data: {
      name: 'byTrailer',
    },
  });

  // ── ChipGuess ──────────────────────────────────────────────────────────────
  const guessGame = await prisma.chipGuess.create({
    data: {
      name: 'guessGame',
      compatibleChipBy: {
        connect: [
          { id: byAchievement.id },
          { id: byGameOver.id },
          { id: byInventory.id },
          { id: byMod.id },
          { id: byScreenshot.id },
          { id: byTitleScreen.id },
        ],
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
  const guessLeagueChampion = await prisma.chipGuess.create({
    data: {
      name: 'guessLeagueChampion',
      compatibleChipBy: {
        connect: [{ id: byDeath.id }, { id: byPick.id }],
      },
    },
  });
  const guessMovie = await prisma.chipGuess.create({
    data: {
      name: 'guessMovie',
      compatibleChipBy: {
        connect: [{ id: byFrame.id }, { id: byTrailer.id }],
      },
    },
  });

  // ── Answers — guessGame, no filter ────────────────────────────────────────
  const ansStardew = await prisma.answer.create({
    data: {
      value: 'Stardew Valley',
      chipGuesses: { connect: [{ id: guessGame.id }] },
    },
  });
  const ansSkyrim = await prisma.answer.create({
    data: {
      value: 'The Elder Scrolls V: Skyrim',
      chipGuesses: { connect: [{ id: guessGame.id }] },
    },
  });
  const ansDarksiders2 = await prisma.answer.create({
    data: {
      value: 'Darksiders II',
      chipGuesses: { connect: [{ id: guessGame.id }] },
    },
  });
  const ansVanishingEC = await prisma.answer.create({
    data: {
      value: 'The Vanishing of Ethan Carter',
      chipGuesses: { connect: [{ id: guessGame.id }] },
    },
  });
  const ansREBiohazard = await prisma.answer.create({
    data: {
      value: 'Resident Evil: Biohazard',
      chipGuesses: { connect: [{ id: guessGame.id }] },
    },
  });
  const ansSurvivingMars = await prisma.answer.create({
    data: {
      value: 'Surviving Mars',
      chipGuesses: { connect: [{ id: guessGame.id }] },
    },
  });
  const ansDetroit = await prisma.answer.create({
    data: {
      value: 'Detroit: Become Human',
      chipGuesses: { connect: [{ id: guessGame.id }] },
    },
  });
  const ansSouthParkSoT = await prisma.answer.create({
    data: {
      value: 'South Park: The Stick of Truth',
      chipGuesses: { connect: [{ id: guessGame.id }] },
    },
  });
  const ansDeadByDaylight = await prisma.answer.create({
    data: {
      value: 'Dead by Daylight',
      chipGuesses: { connect: [{ id: guessGame.id }] },
    },
  });
  const ansDishonored2 = await prisma.answer.create({
    data: {
      value: 'Dishonored 2',
      chipGuesses: { connect: [{ id: guessGame.id }] },
    },
  });
  const ansWitcher3 = await prisma.answer.create({
    data: {
      value: 'Witcher 3: Wild Hunt',
      chipGuesses: { connect: [{ id: guessGame.id }] },
    },
  });
  const ansFallGuys = await prisma.answer.create({
    data: {
      value: 'Fall Guys',
      chipGuesses: { connect: [{ id: guessGame.id }] },
    },
  });
  const ansMetroLastLight = await prisma.answer.create({
    data: {
      value: 'Metro Last Light',
      chipGuesses: { connect: [{ id: guessGame.id }] },
    },
  });
  const ansOverwatch = await prisma.answer.create({
    data: {
      value: 'Overwatch',
      chipGuesses: { connect: [{ id: guessGame.id }] },
    },
  });
  const ansBindingOfIsaac = await prisma.answer.create({
    data: {
      value: 'The Binding of Isaac',
      chipGuesses: { connect: [{ id: guessGame.id }] },
    },
  });
  const ansHogwartsLegacy = await prisma.answer.create({
    data: {
      value: 'Hogwarts Legacy',
      chipGuesses: { connect: [{ id: guessGame.id }] },
    },
  });
  const ansGwent = await prisma.answer.create({
    data: {
      value: 'Gwent: The Witcher Card Game',
      chipGuesses: { connect: [{ id: guessGame.id }] },
    },
  });
  const ansSlayTheSpire = await prisma.answer.create({
    data: {
      value: 'Slay the Spire',
      chipGuesses: { connect: [{ id: guessGame.id }] },
    },
  });
  const ansMiniMetro = await prisma.answer.create({
    data: {
      value: 'Mini Metro',
      chipGuesses: { connect: [{ id: guessGame.id }] },
    },
  });
  const ansPotionCraft = await prisma.answer.create({
    data: {
      value: 'Potion Craft',
      chipGuesses: { connect: [{ id: guessGame.id }] },
    },
  });
  const ansAmnesia = await prisma.answer.create({
    data: {
      value: 'Amnesia: The Dark Descent',
      chipGuesses: { connect: [{ id: guessGame.id }] },
    },
  });
  const ansAnimalCrossing = await prisma.answer.create({
    data: {
      value: 'Animal Crossing: New Horizons',
      chipGuesses: { connect: [{ id: guessGame.id }] },
    },
  });
  const ansCyberpunk2077 = await prisma.answer.create({
    data: {
      value: 'Cyberpunk 2077',
      chipGuesses: { connect: [{ id: guessGame.id }] },
    },
  });
  const ansDiabloII = await prisma.answer.create({
    data: {
      value: 'Diablo II',
      chipGuesses: { connect: [{ id: guessGame.id }] },
    },
  });
  const ansDiabloIV = await prisma.answer.create({
    data: {
      value: 'Diablo IV',
      chipGuesses: { connect: [{ id: guessGame.id }] },
    },
  });
  const ansDontStarve = await prisma.answer.create({
    data: {
      value: 'Dont Starve',
      chipGuesses: { connect: [{ id: guessGame.id }] },
    },
  });
  const ansNierAutomata = await prisma.answer.create({
    data: {
      value: 'Nier: Automata',
      chipGuesses: { connect: [{ id: guessGame.id }] },
    },
  });
  const ansHollowKnight = await prisma.answer.create({
    data: {
      value: 'Hollow Knight',
      chipGuesses: { connect: [{ id: guessGame.id }] },
    },
  });
  const ansStalker2 = await prisma.answer.create({
    data: {
      value: 'S.T.A.L.K.E.R. 2: Heart of Chernobyl',
      chipGuesses: { connect: [{ id: guessGame.id }] },
    },
  });
  const ansThisWar = await prisma.answer.create({
    data: {
      value: 'This War of Mine',
      chipGuesses: { connect: [{ id: guessGame.id }] },
    },
  });
  const ansSubnautica = await prisma.answer.create({
    data: {
      value: 'Subnautica',
      chipGuesses: { connect: [{ id: guessGame.id }] },
    },
  });
  const ansDragonAgeInquisition = await prisma.answer.create({
    data: {
      value: 'Dragon Age: Inquisition',
      chipGuesses: { connect: [{ id: guessGame.id }] },
    },
  });
  const ansTheSims4 = await prisma.answer.create({
    data: {
      value: 'The Sims 4',
      chipGuesses: { connect: [{ id: guessGame.id }] },
    },
  });
  const ansRedDeadRedemption2 = await prisma.answer.create({
    data: {
      value: 'Red Dead Redemption 2',
      chipGuesses: { connect: [{ id: guessGame.id }] },
    },
  });
  const ansFallout4 = await prisma.answer.create({
    data: {
      value: 'Fallout 4',
      chipGuesses: { connect: [{ id: guessGame.id }] },
    },
  });
  const ansEldenRing = await prisma.answer.create({
    data: {
      value: 'Elden Ring',
      chipGuesses: { connect: [{ id: guessGame.id }] },
    },
  });
  const ansTerraria = await prisma.answer.create({
    data: {
      value: 'Terraria',
      chipGuesses: { connect: [{ id: guessGame.id }] },
    },
  });
  const ansARK = await prisma.answer.create({
    data: {
      value: 'ARK: Survival Evolved',
      chipGuesses: { connect: [{ id: guessGame.id }] },
    },
  });
  const ansMySummerCar = await prisma.answer.create({
    data: {
      value: 'My Summer Car',
      chipGuesses: { connect: [{ id: guessGame.id }] },
    },
  });
  const ansCivilizationVI = await prisma.answer.create({
    data: {
      value: 'Civilization VI',
      chipGuesses: { connect: [{ id: guessGame.id }] },
    },
  });
  const ansResidentEvil2 = await prisma.answer.create({
    data: {
      value: 'Resident Evil 2',
      chipGuesses: { connect: [{ id: guessGame.id }] },
    },
  });
  const ansAmongTheSleep = await prisma.answer.create({
    data: {
      value: 'Among The Sleep',
      chipGuesses: { connect: [{ id: guessGame.id }] },
    },
  });
  const ansDeadSpace = await prisma.answer.create({
    data: {
      value: 'Dead Space',
      chipGuesses: { connect: [{ id: guessGame.id }] },
    },
  });
  const ansInscryption = await prisma.answer.create({
    data: {
      value: 'Inscryption',
      chipGuesses: { connect: [{ id: guessGame.id }] },
    },
  });
  const ansLayersOfFear = await prisma.answer.create({
    data: {
      value: 'Layers of Fear',
      chipGuesses: { connect: [{ id: guessGame.id }] },
    },
  });
  const ansOutlast = await prisma.answer.create({
    data: {
      value: 'Outlast',
      chipGuesses: { connect: [{ id: guessGame.id }] },
    },
  });
  const ansPhasmophobia = await prisma.answer.create({
    data: {
      value: 'Phasmophobia',
      chipGuesses: { connect: [{ id: guessGame.id }] },
    },
  });
  const ansSilentHill2 = await prisma.answer.create({
    data: {
      value: 'Silent Hill 2',
      chipGuesses: { connect: [{ id: guessGame.id }] },
    },
  });
  const ansTheEvilWithin = await prisma.answer.create({
    data: {
      value: 'The Evil Within',
      chipGuesses: { connect: [{ id: guessGame.id }] },
    },
  });
  const ansUntilDawn = await prisma.answer.create({
    data: {
      value: 'Until Dawn',
      chipGuesses: { connect: [{ id: guessGame.id }] },
    },
  });
  const ansBlairWitch = await prisma.answer.create({
    data: {
      value: 'Blair Witch',
      chipGuesses: { connect: [{ id: guessGame.id }] },
    },
  });
  const ansCrusaderKingsIII = await prisma.answer.create({
    data: {
      value: 'Crusader Kings III',
      chipGuesses: { connect: [{ id: guessGame.id }] },
    },
  });
  const ansRaft = await prisma.answer.create({
    data: {
      value: 'Raft',
      chipGuesses: { connect: [{ id: guessGame.id }] },
    },
  });
  const ansOriAndTheBlindForest = await prisma.answer.create({
    data: {
      value: 'Ori and the Blind Forest',
      chipGuesses: { connect: [{ id: guessGame.id }] },
    },
  });
  const ansVRising = await prisma.answer.create({
    data: {
      value: 'V Rising',
      chipGuesses: { connect: [{ id: guessGame.id }] },
    },
  });
  const ansTotalWarWarhammer = await prisma.answer.create({
    data: {
      value: 'Total War: Warhammer',
      chipGuesses: { connect: [{ id: guessGame.id }] },
    },
  });
  const ansTheEscapists2 = await prisma.answer.create({
    data: {
      value: 'The Escapists 2',
      chipGuesses: { connect: [{ id: guessGame.id }] },
    },
  });
  const ansWolfensteinTheNewOrder = await prisma.answer.create({
    data: {
      value: 'Wolfenstein: The New Order',
      chipGuesses: { connect: [{ id: guessGame.id }] },
    },
  });
  const ansLifeIsStrangeBeforeTheStorm = await prisma.answer.create({
    data: {
      value: 'Life Is Strange: Before the Storm',
      chipGuesses: { connect: [{ id: guessGame.id }] },
    },
  });
  const ansSpiderManMilesMorales = await prisma.answer.create({
    data: {
      value: 'SpiderMan Miles Morales',
      chipGuesses: { connect: [{ id: guessGame.id }] },
    },
  });
  const ansDispatch = await prisma.answer.create({
    data: {
      value: 'Dispatch',
      chipGuesses: { connect: [{ id: guessGame.id }] },
    },
  });
  const ansHades = await prisma.answer.create({
    data: {
      value: 'Hades',
      chipGuesses: { connect: [{ id: guessGame.id }] },
    },
  });
  const ansHitman2 = await prisma.answer.create({
    data: {
      value: 'Hitman 2',
      chipGuesses: { connect: [{ id: guessGame.id }] },
    },
  });
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
  const ansPsychonauts2 = await prisma.answer.create({
    data: {
      value: 'Psychonauts 2',
      chipGuesses: { connect: [{ id: guessGame.id }] },
    },
  });

  const ansStarCraftII = await prisma.answer.create({
    data: {
      value: 'StarCraft II',
      chipGuesses: { connect: [{ id: guessGame.id }] },
    },
  });
  const ansSoma = await prisma.answer.create({
    data: {
      value: 'Soma',
      chipGuesses: { connect: [{ id: guessGame.id }] },
    },
  });
  const ansSuperMarioParty = await prisma.answer.create({
    data: {
      value: 'Super Mario Party',
      chipGuesses: { connect: [{ id: guessGame.id }] },
    },
  });

  // GuessGameCharacter
  const ansHornet = await prisma.answer.create({
    data: {
      value: 'Hornet',
      chipGuesses: { connect: [{ id: guessGameCharacter.id }] },
    },
  });
  const ansCarminaMora = await prisma.answer.create({
    data: {
      value: 'Carmina Mora — The Artist',
      chipGuesses: { connect: [{ id: guessGameCharacter.id }] },
    },
  });
  const ansJudeAlvarez = await prisma.answer.create({
    data: {
      value: 'Jude Alvarez',
      chipGuesses: { connect: [{ id: guessGameCharacter.id }] },
    },
  });
  const ansBellaDimitrescu = await prisma.answer.create({
    data: {
      value: 'Bella Dimitrescu',
      chipGuesses: { connect: [{ id: guessGameCharacter.id }] },
    },
  });
  const ansCappie = await prisma.answer.create({
    data: {
      value: 'Cappie',
      chipGuesses: { connect: [{ id: guessGameCharacter.id }] },
    },
  });
  const ansAnnaTheHuntress = await prisma.answer.create({
    data: {
      value: 'Anna — The Huntress',
      chipGuesses: { connect: [{ id: guessGameCharacter.id }] },
    },
  });
  const ansAhri = await prisma.answer.create({
    data: {
      value: 'Ahri',
      chipGuesses: {
        connect: [
          { id: guessGameCharacter.id },
          { id: guessLeagueChampion.id },
        ],
      },
    },
  });
  const ansAshe = await prisma.answer.create({
    data: {
      value: 'Ashe',
      chipGuesses: {
        connect: [
          { id: guessGameCharacter.id },
          { id: guessLeagueChampion.id },
        ],
      },
    },
  });
  const ansLisaMinci = await prisma.answer.create({
    data: {
      value: 'Lisa Minci',
      chipGuesses: { connect: [{ id: guessGameCharacter.id }] },
    },
  });
  const ansMadMoxxi = await prisma.answer.create({
    data: {
      value: 'Mad Moxxi',
      chipGuesses: { connect: [{ id: guessGameCharacter.id }] },
    },
  });
  const ansTrissMerigold = await prisma.answer.create({
    data: {
      value: 'Triss Merigold',
      chipGuesses: { connect: [{ id: guessGameCharacter.id }] },
    },
  });
  const ansKimPossible = await prisma.answer.create({
    data: {
      value: 'Kim Possible',
      chipGuesses: { connect: [{ id: guessGameCharacter.id }] },
    },
  });
  const ansColeCassidy = await prisma.answer.create({
    data: {
      value: 'Cole Cassidy',
      chipGuesses: { connect: [{ id: guessGameCharacter.id }] },
    },
  });
  const ansSpringtrap = await prisma.answer.create({
    data: {
      value: 'Springtrap',
      chipGuesses: { connect: [{ id: guessGameCharacter.id }] },
    },
  });
  const ansMario = await prisma.answer.create({
    data: {
      value: 'Mario',
      chipGuesses: { connect: [{ id: guessGameCharacter.id }] },
    },
  });
  const ansCiri = await prisma.answer.create({
    data: {
      value: 'Ciri',
      chipGuesses: { connect: [{ id: guessGameCharacter.id }] },
    },
  });
  const ansEve = await prisma.answer.create({
    data: {
      value: 'Eve',
      chipGuesses: { connect: [{ id: guessGameCharacter.id }] },
    },
  });
  const ansGraceAshcroft = await prisma.answer.create({
    data: {
      value: 'Grace Ashcroft',
      chipGuesses: { connect: [{ id: guessGameCharacter.id }] },
    },
  });
  const ansKena = await prisma.answer.create({
    data: {
      value: 'Kena',
      chipGuesses: { connect: [{ id: guessGameCharacter.id }] },
    },
  });
  const ans2B = await prisma.answer.create({
    data: {
      value: '2B',
      chipGuesses: { connect: [{ id: guessGameCharacter.id }] },
    },
  });
  const ansRobertRobertsonIII = await prisma.answer.create({
    data: {
      value: 'Robert Robertson III',
      chipGuesses: { connect: [{ id: guessGameCharacter.id }] },
    },
  });
  const ansKenKaneki = await prisma.answer.create({
    data: {
      value: 'Ken Kaneki',
      chipGuesses: { connect: [{ id: guessGameCharacter.id }] },
    },
  });
  const ansKratos = await prisma.answer.create({
    data: {
      value: 'Kratos',
      chipGuesses: { connect: [{ id: guessGameCharacter.id }] },
    },
  });
  const ansMaxPayne = await prisma.answer.create({
    data: {
      value: 'Max Payne',
      chipGuesses: { connect: [{ id: guessGameCharacter.id }] },
    },
  });
  const ansSebastian = await prisma.answer.create({
    data: {
      value: 'Sebastian',
      chipGuesses: { connect: [{ id: guessGameCharacter.id }] },
    },
  });
  const ansTeemo = await prisma.answer.create({
    data: {
      value: 'Teemo',
      chipGuesses: {
        connect: [
          { id: guessGameCharacter.id },
          { id: guessLeagueChampion.id },
        ],
      },
    },
  });
  const ansTheHunter = await prisma.answer.create({
    data: {
      value: 'The Hunter',
      chipGuesses: { connect: [{ id: guessGameCharacter.id }] },
    },
  });
  const ansTrevorPhilips = await prisma.answer.create({
    data: {
      value: 'Trevor Philips',
      chipGuesses: { connect: [{ id: guessGameCharacter.id }] },
    },
  });
  const ansHanzo = await prisma.answer.create({
    data: {
      value: 'Hanzo',
      chipGuesses: { connect: [{ id: guessGameCharacter.id }] },
    },
  });
  const ansCommandorShepard = await prisma.answer.create({
    data: {
      value: 'Commandor Shepard',
      chipGuesses: { connect: [{ id: guessGameCharacter.id }] },
    },
  });
  const ansGeraltOfRivia = await prisma.answer.create({
    data: {
      value: 'Geralt of Rivia',
      chipGuesses: { connect: [{ id: guessGameCharacter.id }] },
    },
  });
  const ansAatrox = await prisma.answer.create({
    data: {
      value: 'Aatrox',
      chipGuesses: { connect: [{ id: guessLeagueChampion.id }] },
    },
  });
  const ansAmumu = await prisma.answer.create({
    data: {
      value: 'Amumu',
      chipGuesses: { connect: [{ id: guessLeagueChampion.id }] },
    },
  });
  const ansAurelionSol = await prisma.answer.create({
    data: {
      value: 'Aurelion Sol',
      chipGuesses: { connect: [{ id: guessLeagueChampion.id }] },
    },
  });
  const ansBelVeth = await prisma.answer.create({
    data: {
      value: "Bel'Veth",
      chipGuesses: { connect: [{ id: guessLeagueChampion.id }] },
    },
  });
  const ansBlitzcrank = await prisma.answer.create({
    data: {
      value: 'Blitzcrank',
      chipGuesses: { connect: [{ id: guessLeagueChampion.id }] },
    },
  });
  const ansChoGath = await prisma.answer.create({
    data: {
      value: "Cho'Gath",
      chipGuesses: { connect: [{ id: guessLeagueChampion.id }] },
    },
  });
  const ansDrMundo = await prisma.answer.create({
    data: {
      value: 'Dr. Mundo',
      chipGuesses: { connect: [{ id: guessLeagueChampion.id }] },
    },
  });
  const ansFizz = await prisma.answer.create({
    data: {
      value: 'Fizz',
      chipGuesses: { connect: [{ id: guessLeagueChampion.id }] },
    },
  });
  const ansGragas = await prisma.answer.create({
    data: {
      value: 'Gragas',
      chipGuesses: { connect: [{ id: guessLeagueChampion.id }] },
    },
  });
  const ansIrelia = await prisma.answer.create({
    data: {
      value: 'Irelia',
      chipGuesses: { connect: [{ id: guessLeagueChampion.id }] },
    },
  });
  const ansKennen = await prisma.answer.create({
    data: {
      value: 'Kennen',
      chipGuesses: { connect: [{ id: guessLeagueChampion.id }] },
    },
  });
  const ansMalphite = await prisma.answer.create({
    data: {
      value: 'Malphite',
      chipGuesses: { connect: [{ id: guessLeagueChampion.id }] },
    },
  });
  const ansNasus = await prisma.answer.create({
    data: {
      value: 'Nasus',
      chipGuesses: { connect: [{ id: guessLeagueChampion.id }] },
    },
  });
  const ansSoraka = await prisma.answer.create({
    data: {
      value: 'Soraka',
      chipGuesses: { connect: [{ id: guessLeagueChampion.id }] },
    },
  });
  const ansTahm = await prisma.answer.create({
    data: {
      value: 'Tahm Kench',
      chipGuesses: { connect: [{ id: guessLeagueChampion.id }] },
    },
  });
  const ansVex = await prisma.answer.create({
    data: {
      value: 'Vex',
      chipGuesses: { connect: [{ id: guessLeagueChampion.id }] },
    },
  });
  const ansYunara = await prisma.answer.create({
    data: {
      value: 'Yunara',
      chipGuesses: { connect: [{ id: guessLeagueChampion.id }] },
    },
  });
  const ans1408 = await prisma.answer.create({
    data: {
      value: '1408',
      chipGuesses: { connect: [{ id: guessMovie.id }] },
    },
  });
  const ansFightClub = await prisma.answer.create({
    data: {
      value: 'Fight Club',
      chipGuesses: { connect: [{ id: guessMovie.id }] },
    },
  });
  const ansSpotlight = await prisma.answer.create({
    data: {
      value: 'Spotlight',
      chipGuesses: { connect: [{ id: guessMovie.id }] },
    },
  });
  const ansDjangoUnchained = await prisma.answer.create({
    data: {
      value: 'Django Unchained',
      chipGuesses: { connect: [{ id: guessMovie.id }] },
    },
  });
  const ansTheHandmaiden = await prisma.answer.create({
    data: {
      value: 'The Handmaiden',
      chipGuesses: { connect: [{ id: guessMovie.id }] },
    },
  });
  const ansShawshankRedemption = await prisma.answer.create({
    data: {
      value: 'Shawshank Redemption',
      chipGuesses: { connect: [{ id: guessMovie.id }] },
    },
  });
  const ansForestGump = await prisma.answer.create({
    data: {
      value: 'Forest Gump',
      chipGuesses: { connect: [{ id: guessMovie.id }] },
    },
  });
  const ansElCamino = await prisma.answer.create({
    data: {
      value: 'El Camino',
      chipGuesses: { connect: [{ id: guessMovie.id }] },
    },
  });
  const ansWhiplash = await prisma.answer.create({
    data: {
      value: 'Whiplash',
      chipGuesses: { connect: [{ id: guessMovie.id }] },
    },
  });
  const ansNoCountryForOldMen = await prisma.answer.create({
    data: {
      value: 'No Country for Old Men',
      chipGuesses: { connect: [{ id: guessMovie.id }] },
    },
  });
  const ansSmile = await prisma.answer.create({
    data: {
      value: 'Smile',
      chipGuesses: { connect: [{ id: guessMovie.id }] },
    },
  });
  const ansAmericanPsycho = await prisma.answer.create({
    data: {
      value: 'American Psycho',
      chipGuesses: { connect: [{ id: guessMovie.id }] },
    },
  });
  const ansHacksawRidge = await prisma.answer.create({
    data: {
      value: 'Hacksaw Ridge',
      chipGuesses: { connect: [{ id: guessMovie.id }] },
    },
  });
  const ansPlatform = await prisma.answer.create({
    data: {
      value: 'Platform',
      chipGuesses: { connect: [{ id: guessMovie.id }] },
    },
  });
  const ansBlackSwan = await prisma.answer.create({
    data: {
      value: 'Black Swan',
      chipGuesses: { connect: [{ id: guessMovie.id }] },
    },
  });
  const ansHachi = await prisma.answer.create({
    data: {
      value: "Hachi: A Dog's Tale",
      chipGuesses: { connect: [{ id: guessMovie.id }] },
    },
  });
  const ans12 = await prisma.answer.create({
    data: {
      value: '12',
      chipGuesses: { connect: [{ id: guessMovie.id }] },
    },
  });
  const ansSubstance = await prisma.answer.create({
    data: {
      value: 'Substance',
      chipGuesses: { connect: [{ id: guessMovie.id }] },
    },
  });
  const ansZodiac = await prisma.answer.create({
    data: {
      value: 'Zodiac',
      chipGuesses: { connect: [{ id: guessMovie.id }] },
    },
  });

  // ── Questions — generated from public ──────────────────────────────────────
  await createQuestion(
    '/static/guessGame/byAchivement/gga006saswkop.png',
    ansSurvivingMars.id,
    byAchievement.id,
    [guessGame.id],
  );

  await createQuestion(
    '/static/guessGame/byAchivement/gga018ylmvgbp.png',
    ansREBiohazard.id,
    byAchievement.id,
    [guessGame.id],
  );

  await createQuestion(
    '/static/guessGame/byAchivement/gga019jrkcraf.png',
    ansVanishingEC.id,
    byAchievement.id,
    [guessGame.id],
  );

  await createQuestion(
    '/static/guessGame/byAchivement/gga030qbapdac.png',
    ansRaft.id,
    byAchievement.id,
    [guessGame.id],
  );

  await createQuestion(
    '/static/guessGame/byAchivement/gga036frpllei.png',
    ansDarksiders2.id,
    byAchievement.id,
    [guessGame.id],
  );

  await createQuestion(
    '/static/guessGame/byAchivement/gga051fkkodph.png',
    ansSkyrim.id,
    byAchievement.id,
    [guessGame.id],
  );

  await createQuestion(
    '/static/guessGame/byAchivement/gga056gmhcnvq.png',
    ansDeadByDaylight.id,
    byAchievement.id,
    [guessGame.id],
  );

  await createQuestion(
    '/static/guessGame/byAchivement/gga063ljomlwn.png',
    ansDetroit.id,
    byAchievement.id,
    [guessGame.id],
  );

  await createQuestion(
    '/static/guessGame/byAchivement/gga079gpjethf.png',
    ansSouthParkSoT.id,
    byAchievement.id,
    [guessGame.id],
  );

  await createQuestion(
    '/static/guessGame/byAchivement/gga090kdyhgia.png',
    ansStardew.id,
    byAchievement.id,
    [guessGame.id],
  );

  await createQuestion(
    '/static/guessGame/byGameOver/gggo002soygtug.png',
    ansFallGuys.id,
    byGameOver.id,
    [guessGame.id],
  );

  await createQuestion(
    '/static/guessGame/byGameOver/gggo005vrqbgtx.jpg',
    ansWitcher3.id,
    byGameOver.id,
    [guessGame.id],
  );

  await createQuestion(
    '/static/guessGame/byGameOver/gggo009apuygxx.jpg',
    ansMiniMetro.id,
    byGameOver.id,
    [guessGame.id],
  );

  await createQuestion(
    '/static/guessGame/byGameOver/gggo012wqarjvu.jpg',
    ansMetroLastLight.id,
    byGameOver.id,
    [guessGame.id],
  );

  await createQuestion(
    '/static/guessGame/byGameOver/gggo036jjccqyp.png',
    ansHogwartsLegacy.id,
    byGameOver.id,
    [guessGame.id],
  );

  await createQuestion(
    '/static/guessGame/byGameOver/gggo043ejxivbs.jpg',
    ansOverwatch.id,
    byGameOver.id,
    [guessGame.id],
  );

  await createQuestion(
    '/static/guessGame/byGameOver/gggo063brbsxgq.jpg',
    ansSlayTheSpire.id,
    byGameOver.id,
    [guessGame.id],
  );

  await createQuestion(
    '/static/guessGame/byGameOver/gggo078chvprqd.jpg',
    ansBindingOfIsaac.id,
    byGameOver.id,
    [guessGame.id],
  );

  await createQuestion(
    '/static/guessGame/byGameOver/gggo083djbwkjv.jpg',
    ansDishonored2.id,
    byGameOver.id,
    [guessGame.id],
  );

  await createQuestion(
    '/static/guessGame/byGameOver/gggo087chsiinr.jpg',
    ansGwent.id,
    byGameOver.id,
    [guessGame.id],
  );

  await createQuestion(
    '/static/guessGame/byInventory/ggi030jcjyfxk.png',
    ansStalker2.id,
    byInventory.id,
    [guessGame.id],
  );

  await createQuestion(
    '/static/guessGame/byInventory/ggi031mtfkqpk.png',
    ansPotionCraft.id,
    byInventory.id,
    [guessGame.id],
  );

  await createQuestion(
    '/static/guessGame/byInventory/ggi035ucrdupo.png',
    ansCyberpunk2077.id,
    byInventory.id,
    [guessGame.id],
  );

  await createQuestion(
    '/static/guessGame/byInventory/ggi036ybikikb.jpg',
    ansDontStarve.id,
    byInventory.id,
    [guessGame.id],
  );

  await createQuestion(
    '/static/guessGame/byInventory/ggi040pueqora.png',
    ansThisWar.id,
    byInventory.id,
    [guessGame.id],
  );

  await createQuestion(
    '/static/guessGame/byInventory/ggi043fpokuvh.jpg',
    ansAnimalCrossing.id,
    byInventory.id,
    [guessGame.id],
  );

  await createQuestion(
    '/static/guessGame/byInventory/ggi049ngyuvdh.png',
    ansStardew.id,
    byInventory.id,
    [guessGame.id],
  );

  await createQuestion(
    '/static/guessGame/byInventory/ggi062mqdoqax.jpg',
    ansWitcher3.id,
    byInventory.id,
    [guessGame.id],
  );

  await createQuestion(
    '/static/guessGame/byInventory/ggi063cbyjbaw.png',
    ansAmnesia.id,
    byInventory.id,
    [guessGame.id],
  );

  await createQuestion(
    '/static/guessGame/byInventory/ggi069omaqsuq.png',
    ansDiabloII.id,
    byInventory.id,
    [guessGame.id],
  );

  await createQuestion(
    '/static/guessGame/byInventory/ggi074bmixjqh.jpg',
    ansHollowKnight.id,
    byInventory.id,
    [guessGame.id],
  );

  await createQuestion(
    '/static/guessGame/byInventory/ggi078deqhqbw.png',
    ansDiabloIV.id,
    byInventory.id,
    [guessGame.id],
  );

  await createQuestion(
    '/static/guessGame/byInventory/ggi093kvcdssn.jpg',
    ansNierAutomata.id,
    byInventory.id,
    [guessGame.id],
  );

  await createQuestion(
    '/static/guessGame/byMod/ggm005racmtno.png',
    ansFallout4.id,
    byMod.id,
    [guessGame.id],
  );

  await createQuestion(
    '/static/guessGame/byMod/ggm012yvnogil.png',
    ansResidentEvil2.id,
    byMod.id,
    [guessGame.id],
  );

  await createQuestion(
    '/static/guessGame/byMod/ggm014mdciewk.png',
    ansResidentEvil2.id,
    byMod.id,
    [guessGame.id],
  );

  await createQuestion(
    '/static/guessGame/byMod/ggm015udurdaf.png',
    ansTheSims4.id,
    byMod.id,
    [guessGame.id],
  );

  await createQuestion(
    '/static/guessGame/byMod/ggm020bdusqyy.png',
    ansStardew.id,
    byMod.id,
    [guessGame.id],
  );

  await createQuestion(
    '/static/guessGame/byMod/ggm021kuodscq.png',
    ansARK.id,
    byMod.id,
    [guessGame.id],
  );

  await createQuestion(
    '/static/guessGame/byMod/ggm023uphvpao.png',
    ansRedDeadRedemption2.id,
    byMod.id,
    [guessGame.id],
  );

  await createQuestion(
    '/static/guessGame/byMod/ggm024vkllulk.png',
    ansRedDeadRedemption2.id,
    byMod.id,
    [guessGame.id],
  );

  await createQuestion(
    '/static/guessGame/byMod/ggm062tvebwfx.png',
    ansFallout4.id,
    byMod.id,
    [guessGame.id],
  );

  await createQuestion(
    '/static/guessGame/byMod/ggm063ipfkjxm.png',
    ansTerraria.id,
    byMod.id,
    [guessGame.id],
  );

  await createQuestion(
    '/static/guessGame/byMod/ggm069emtvxub.png',
    ansSubnautica.id,
    byMod.id,
    [guessGame.id],
  );

  await createQuestion(
    '/static/guessGame/byMod/ggm070rhehuyc.png',
    ansSubnautica.id,
    byMod.id,
    [guessGame.id],
  );

  await createQuestion(
    '/static/guessGame/byMod/ggm071hhpdome.png',
    ansTheSims4.id,
    byMod.id,
    [guessGame.id],
  );

  await createQuestion(
    '/static/guessGame/byMod/ggm072ijidjbj.png',
    ansResidentEvil2.id,
    byMod.id,
    [guessGame.id],
  );

  await createQuestion(
    '/static/guessGame/byMod/ggm073hfjlhdh.png',
    ansSkyrim.id,
    byMod.id,
    [guessGame.id],
  );

  await createQuestion(
    '/static/guessGame/byMod/ggm079tminqbg.png',
    ansRedDeadRedemption2.id,
    byMod.id,
    [guessGame.id],
  );

  await createQuestion(
    '/static/guessGame/byMod/ggm081knhlnot.png',
    ansWitcher3.id,
    byMod.id,
    [guessGame.id],
  );

  await createQuestion(
    '/static/guessGame/byMod/ggm089uxrfgpf.png',
    ansDragonAgeInquisition.id,
    byMod.id,
    [guessGame.id],
  );

  await createQuestion(
    '/static/guessGame/byMod/ggm090xjoxgsm.png',
    ansEldenRing.id,
    byMod.id,
    [guessGame.id],
  );

  await createQuestion(
    '/static/guessGame/byMod/ggm091wunhxfs.jpg',
    ansCivilizationVI.id,
    byMod.id,
    [guessGame.id],
  );

  await createQuestion(
    '/static/guessGame/byMod/ggm097famjwjt.png',
    ansMySummerCar.id,
    byMod.id,
    [guessGame.id],
  );

  await createQuestion(
    '/static/guessGame/byMod/ggm099gjicibw.png',
    ansSubnautica.id,
    byMod.id,
    [guessGame.id],
  );

  await createQuestion(
    '/static/guessGame/byScreenshot/ggs002bbohbnw.jpg',
    ansSpiderManMilesMorales.id,
    byScreenshot.id,
    [guessGame.id],
  );

  await createQuestion(
    '/static/guessGame/byScreenshot/ggs006tkrhacb.png',
    ansOutlast.id,
    byScreenshot.id,
    [guessGame.id],
  );

  await createQuestion(
    '/static/guessGame/byScreenshot/ggs011npwuitn.jpg',
    ansLifeIsStrangeBeforeTheStorm.id,
    byScreenshot.id,
    [guessGame.id],
  );

  await createQuestion(
    '/static/guessGame/byScreenshot/ggs013wrbbbsw.png',
    ansTotalWarWarhammer.id,
    byScreenshot.id,
    [guessGame.id],
  );

  await createQuestion(
    '/static/guessGame/byScreenshot/ggs023vchufhh.png',
    ansInscryption.id,
    byScreenshot.id,
    [guessGame.id],
  );

  await createQuestion(
    '/static/guessGame/byScreenshot/ggs024jfgqxdd.png',
    ansRaft.id,
    byScreenshot.id,
    [guessGame.id],
  );

  await createQuestion(
    '/static/guessGame/byScreenshot/ggs028yevwyfw.png',
    ansTheEvilWithin.id,
    byScreenshot.id,
    [guessGame.id],
  );

  await createQuestion(
    '/static/guessGame/byScreenshot/ggs030nddnrcm.png',
    ansAmongTheSleep.id,
    byScreenshot.id,
    [guessGame.id],
  );

  await createQuestion(
    '/static/guessGame/byScreenshot/ggs034fcjruhb.png',
    ansSkyrim.id,
    byScreenshot.id,
    [guessGame.id],
  );

  await createQuestion(
    '/static/guessGame/byScreenshot/ggs035welxfqd.png',
    ansWolfensteinTheNewOrder.id,
    byScreenshot.id,
    [guessGame.id],
  );

  await createQuestion(
    '/static/guessGame/byScreenshot/ggs036spfycxh.png',
    ansPotionCraft.id,
    byScreenshot.id,
    [guessGame.id],
  );

  await createQuestion(
    '/static/guessGame/byScreenshot/ggs040uqitygh.png',
    ansDeadSpace.id,
    byScreenshot.id,
    [guessGame.id],
  );

  await createQuestion(
    '/static/guessGame/byScreenshot/ggs041hfoupbg.png',
    ansDontStarve.id,
    byScreenshot.id,
    [guessGame.id],
  );

  await createQuestion(
    '/static/guessGame/byScreenshot/ggs042kvcgfev.png',
    ansBlairWitch.id,
    byScreenshot.id,
    [guessGame.id],
  );

  await createQuestion(
    '/static/guessGame/byScreenshot/ggs045hxmvjuf.png',
    ansLayersOfFear.id,
    byScreenshot.id,
    [guessGame.id],
  );

  await createQuestion(
    '/static/guessGame/byScreenshot/ggs046djgcuhd.png',
    ansOriAndTheBlindForest.id,
    byScreenshot.id,
    [guessGame.id],
  );

  await createQuestion(
    '/static/guessGame/byScreenshot/ggs047cxqogmp.png',
    ansTheEscapists2.id,
    byScreenshot.id,
    [guessGame.id],
  );

  await createQuestion(
    '/static/guessGame/byScreenshot/ggs055lcpoijd.png',
    ansCivilizationVI.id,
    byScreenshot.id,
    [guessGame.id],
  );

  await createQuestion(
    '/static/guessGame/byScreenshot/ggs057wtpxlrm.png',
    ansCrusaderKingsIII.id,
    byScreenshot.id,
    [guessGame.id],
  );

  await createQuestion(
    '/static/guessGame/byScreenshot/ggs062wnqahdp.png',
    ansVRising.id,
    byScreenshot.id,
    [guessGame.id],
  );

  await createQuestion(
    '/static/guessGame/byScreenshot/ggs063nrkxqdq.png',
    ansPhasmophobia.id,
    byScreenshot.id,
    [guessGame.id],
  );

  await createQuestion(
    '/static/guessGame/byScreenshot/ggs064adnwwfa.png',
    ansSilentHill2.id,
    byScreenshot.id,
    [guessGame.id],
  );

  await createQuestion(
    '/static/guessGame/byScreenshot/ggs082fdajrpd.png',
    ansUntilDawn.id,
    byScreenshot.id,
    [guessGame.id],
  );

  await createQuestion(
    '/static/guessGame/byScreenshot/ggs083imgwsya.png',
    ansStardew.id,
    byScreenshot.id,
    [guessGame.id],
  );

  await createQuestion(
    '/static/guessGame/byScreenshot/ggs097tfsqhsx.png',
    ansAmnesia.id,
    byScreenshot.id,
    [guessGame.id],
  );

  await createQuestion(
    '/static/guessGame/byTitleScreen/ggts002fkkpjgm.jpg',
    ansHitman2.id,
    byTitleScreen.id,
    [guessGame.id],
  );

  await createQuestion(
    '/static/guessGame/byTitleScreen/ggts003aevlkpx.jpg',
    ansHades.id,
    byTitleScreen.id,
    [guessGame.id],
  );

  await createQuestion(
    '/static/guessGame/byTitleScreen/ggts010dfwpanc.png',
    ansDispatch.id,
    byTitleScreen.id,
    [guessGame.id],
  );

  await createQuestion(
    '/static/guessGame/byTitleScreen/ggts016ctsvmaa.jpg',
    ansSuperMarioParty.id,
    byTitleScreen.id,
    [guessGame.id],
  );

  await createQuestion(
    '/static/guessGame/byTitleScreen/ggts023sllntqm.png',
    ansSoma.id,
    byTitleScreen.id,
    [guessGame.id],
  );

  await createQuestion(
    '/static/guessGame/byTitleScreen/ggts040nkyapdr.png',
    ansPsychonauts2.id,
    byTitleScreen.id,
    [guessGame.id],
  );

  await createQuestion(
    '/static/guessGame/byTitleScreen/ggts043ggpduio.jpg',
    ansLifeIsStrangeBeforeTheStorm.id,
    byTitleScreen.id,
    [guessGame.id],
  );

  await createQuestion(
    '/static/guessGame/byTitleScreen/ggts046xikmogh.png',
    ansDeadByDaylight.id,
    byTitleScreen.id,
    [guessGame.id],
  );

  await createQuestion(
    '/static/guessGame/byTitleScreen/ggts062qrkamcl.png',
    ansMinecraft.id,
    byTitleScreen.id,
    [guessGame.id],
  );

  await createQuestion(
    '/static/guessGame/byTitleScreen/ggts073wjvqdby.png',
    ansPortal2.id,
    byTitleScreen.id,
    [guessGame.id],
  );

  await createQuestion(
    '/static/guessGame/byTitleScreen/ggts076destcwm.png',
    ansHollowKnight.id,
    byTitleScreen.id,
    [guessGame.id],
  );

  await createQuestion(
    '/static/guessGame/byTitleScreen/ggts089bulhfkx.png',
    ansStarCraftII.id,
    byTitleScreen.id,
    [guessGame.id],
  );

  await createQuestion(
    '/static/guessGameCharacter/byCosplay/ggcc004bmquweo.jpg',
    ansCarminaMora.id,
    byCosplay.id,
    [guessGameCharacter.id],
  );

  await createQuestion(
    '/static/guessGameCharacter/byCosplay/ggcc006moluvmb.jpg',
    ansLisaMinci.id,
    byCosplay.id,
    [guessGameCharacter.id],
  );

  await createQuestion(
    '/static/guessGameCharacter/byCosplay/ggcc009nbkeobi.jpg',
    ansAnnaTheHuntress.id,
    byCosplay.id,
    [guessGameCharacter.id],
  );

  await createQuestion(
    '/static/guessGameCharacter/byCosplay/ggcc010oukgdjm.jpg',
    ansColeCassidy.id,
    byCosplay.id,
    [guessGameCharacter.id],
  );

  await createQuestion(
    '/static/guessGameCharacter/byCosplay/ggcc011hsjauut.JPG',
    ansTrissMerigold.id,
    byCosplay.id,
    [guessGameCharacter.id],
  );

  await createQuestion(
    '/static/guessGameCharacter/byCosplay/ggcc017mpgvfkw.jpg',
    ansAshe.id,
    byCosplay.id,
    [guessGameCharacter.id],
  );

  await createQuestion(
    '/static/guessGameCharacter/byCosplay/ggcc034oduldcl.jpg',
    ansMario.id,
    byCosplay.id,
    [guessGameCharacter.id],
  );

  await createQuestion(
    '/static/guessGameCharacter/byCosplay/ggcc043oofrouj.jpg',
    ansHornet.id,
    byCosplay.id,
    [guessGameCharacter.id],
  );

  await createQuestion(
    '/static/guessGameCharacter/byCosplay/ggcc044wlojgyq.jpg',
    ansAhri.id,
    byCosplay.id,
    [guessGameCharacter.id],
  );

  await createQuestion(
    '/static/guessGameCharacter/byCosplay/ggcc059fkbwudf.jpg',
    ansBellaDimitrescu.id,
    byCosplay.id,
    [guessGameCharacter.id],
  );

  await createQuestion(
    '/static/guessGameCharacter/byCosplay/ggcc074iltuicy.JPG',
    ansMadMoxxi.id,
    byCosplay.id,
    [guessGameCharacter.id],
  );

  await createQuestion(
    '/static/guessGameCharacter/byCosplay/ggcc078yvvcsbf.jpg',
    ansSpringtrap.id,
    byCosplay.id,
    [guessGameCharacter.id],
  );

  await createQuestion(
    '/static/guessGameCharacter/byCosplay/ggcc081ffcdqyt.jpg',
    ansJudeAlvarez.id,
    byCosplay.id,
    [guessGameCharacter.id],
  );

  await createQuestion(
    '/static/guessGameCharacter/byCosplay/ggcc093ruuyidj.jpg',
    ansCappie.id,
    byCosplay.id,
    [guessGameCharacter.id],
  );

  await createQuestion(
    '/static/guessGameCharacter/byCosplay/ggcc096makiuql.JPG',
    ansKimPossible.id,
    byCosplay.id,
    [guessGameCharacter.id],
  );

  await createQuestion(
    '/static/guessGameCharacter/byImage/ggci011wcwbemi.jpg',
    ansGeraltOfRivia.id,
    byImage.id,
    [guessGameCharacter.id],
    [onlyMale.id],
  );

  await createQuestion(
    '/static/guessGameCharacter/byImage/ggci015xtucfgm.PNG',
    ansGraceAshcroft.id,
    byImage.id,
    [guessGameCharacter.id],
    [onlyFemale.id],
  );

  await createQuestion(
    '/static/guessGameCharacter/byImage/ggci022bmprnds.png',
    ansHanzo.id,
    byImage.id,
    [guessGameCharacter.id],
    [onlyMale.id],
  );

  await createQuestion(
    '/static/guessGameCharacter/byImage/ggci030sbeighr.png',
    ansMadMoxxi.id,
    byImage.id,
    [guessGameCharacter.id],
    [onlyFemale.id],
  );

  await createQuestion(
    '/static/guessGameCharacter/byImage/ggci039ulbowlv.jpg',
    ansMaxPayne.id,
    byImage.id,
    [guessGameCharacter.id],
    [onlyMale.id],
  );

  await createQuestion(
    '/static/guessGameCharacter/byImage/ggci042ncyglcu.png',
    ansJudeAlvarez.id,
    byImage.id,
    [guessGameCharacter.id],
    [onlyFemale.id],
  );

  await createQuestion(
    '/static/guessGameCharacter/byImage/ggci043doejykc.png',
    ansTheHunter.id,
    byImage.id,
    [guessGameCharacter.id],
    [onlyMale.id],
  );

  await createQuestion(
    '/static/guessGameCharacter/byImage/ggci044qejcnds.png',
    ansRobertRobertsonIII.id,
    byImage.id,
    [guessGameCharacter.id],
    [onlyMale.id],
  );

  await createQuestion(
    '/static/guessGameCharacter/byImage/ggci045xpgexao.png',
    ansKena.id,
    byImage.id,
    [guessGameCharacter.id],
    [onlyFemale.id],
  );

  await createQuestion(
    '/static/guessGameCharacter/byImage/ggci048rmagtdq.png',
    ansHornet.id,
    byImage.id,
    [guessGameCharacter.id],
    [onlyFemale.id],
  );

  await createQuestion(
    '/static/guessGameCharacter/byImage/ggci049sexddxn.jpg',
    ans2B.id,
    byImage.id,
    [guessGameCharacter.id],
    [onlyFemale.id],
  );

  await createQuestion(
    '/static/guessGameCharacter/byImage/ggci050adlvssi.jpg',
    ansKratos.id,
    byImage.id,
    [guessGameCharacter.id],
    [onlyMale.id],
  );

  await createQuestion(
    '/static/guessGameCharacter/byImage/ggci051xfmkmhb.jpg',
    ansCommandorShepard.id,
    byImage.id,
    [guessGameCharacter.id],
    [onlyMale.id],
  );

  await createQuestion(
    '/static/guessGameCharacter/byImage/ggci063gogcwvf.png',
    ansTrevorPhilips.id,
    byImage.id,
    [guessGameCharacter.id],
    [onlyMale.id],
  );

  await createQuestion(
    '/static/guessGameCharacter/byImage/ggci065eluloib.png',
    ansSebastian.id,
    byImage.id,
    [guessGameCharacter.id],
    [onlyMale.id],
  );

  await createQuestion(
    '/static/guessGameCharacter/byImage/ggci067jpfxlio.png',
    ansAhri.id,
    byImage.id,
    [guessGameCharacter.id],
    [onlyFemale.id],
  );

  await createQuestion(
    '/static/guessGameCharacter/byImage/ggci073ieylbhi.png',
    ansEve.id,
    byImage.id,
    [guessGameCharacter.id],
    [onlyFemale.id],
  );

  await createQuestion(
    '/static/guessGameCharacter/byImage/ggci076afashpf.jpg',
    ansCiri.id,
    byImage.id,
    [guessGameCharacter.id],
    [onlyFemale.id],
  );

  await createQuestion(
    '/static/guessGameCharacter/byImage/ggci084dabfdwf.png',
    ansKenKaneki.id,
    byImage.id,
    [guessGameCharacter.id],
    [onlyMale.id],
  );

  await createQuestion(
    '/static/guessGameCharacter/byImage/ggci086xvlotbs.png',
    ansKratos.id,
    byImage.id,
    [guessGameCharacter.id],
    [onlyMale.id],
  );

  await createQuestion(
    '/static/guessGameCharacter/byImage/ggci093gyrfayy.jpg',
    ansTeemo.id,
    byImage.id,
    [guessGameCharacter.id],
    [onlyMale.id],
  );

  await createQuestion(
    '/static/guessGameCharacter/byImage/ggci097xjdqcyg.jpg',
    ansCiri.id,
    byImage.id,
    [guessGameCharacter.id],
    [onlyFemale.id],
  );

  await createQuestion(
    '/static/GuessLeagueChampion/byDeath/Aatrox_Original_SFX_Death.ogg',
    ansAatrox.id,
    byDeath.id,
    [guessLeagueChampion.id],
  );

  await createQuestion(
    '/static/GuessLeagueChampion/byDeath/Ahri_Original_Death_0.ogg',
    ansAhri.id,
    byDeath.id,
    [guessLeagueChampion.id],
  );

  await createQuestion(
    '/static/GuessLeagueChampion/byDeath/Ahri_Original_Death_1.ogg',
    ansAhri.id,
    byDeath.id,
    [guessLeagueChampion.id],
  );

  await createQuestion(
    '/static/GuessLeagueChampion/byDeath/Amumu_Original_Death_1.ogg',
    ansAmumu.id,
    byDeath.id,
    [guessLeagueChampion.id],
  );

  await createQuestion(
    '/static/GuessLeagueChampion/byDeath/Amumu_Original_Death_2.ogg',
    ansAmumu.id,
    byDeath.id,
    [guessLeagueChampion.id],
  );

  await createQuestion(
    '/static/GuessLeagueChampion/byDeath/Aurelion_Sol_Original_Death_0.ogg',
    ansAurelionSol.id,
    byDeath.id,
    [guessLeagueChampion.id],
  );

  await createQuestion(
    '/static/GuessLeagueChampion/byDeath/Aurelion_Sol_Original_Death_7.ogg',
    ansAurelionSol.id,
    byDeath.id,
    [guessLeagueChampion.id],
  );

  await createQuestion(
    "/static/GuessLeagueChampion/byDeath/Bel'Veth_Original_Death_1.ogg",
    ansBelVeth.id,
    byDeath.id,
    [guessLeagueChampion.id],
  );

  await createQuestion(
    '/static/GuessLeagueChampion/byDeath/Blitzcrank_Original_Death_0.ogg',
    ansBlitzcrank.id,
    byDeath.id,
    [guessLeagueChampion.id],
  );

  await createQuestion(
    '/static/GuessLeagueChampion/byDeath/Blitzcrank_Original_Death_1.ogg',
    ansBlitzcrank.id,
    byDeath.id,
    [guessLeagueChampion.id],
  );

  await createQuestion(
    "/static/GuessLeagueChampion/byDeath/Cho'Gath_Original_Death_0.ogg",
    ansChoGath.id,
    byDeath.id,
    [guessLeagueChampion.id],
  );

  await createQuestion(
    '/static/GuessLeagueChampion/byDeath/Dr._Mundo_Original_Death_0.ogg',
    ansDrMundo.id,
    byDeath.id,
    [guessLeagueChampion.id],
  );

  await createQuestion(
    '/static/GuessLeagueChampion/byDeath/Fizz_Original_Death_0.ogg',
    ansFizz.id,
    byDeath.id,
    [guessLeagueChampion.id],
  );

  await createQuestion(
    '/static/GuessLeagueChampion/byDeath/Gragas_Original_Death_3.ogg',
    ansGragas.id,
    byDeath.id,
    [guessLeagueChampion.id],
  );

  await createQuestion(
    '/static/GuessLeagueChampion/byDeath/Irelia_Original_Death_0.ogg',
    ansIrelia.id,
    byDeath.id,
    [guessLeagueChampion.id],
  );

  await createQuestion(
    '/static/GuessLeagueChampion/byDeath/Irelia_Original_Death_1.ogg',
    ansIrelia.id,
    byDeath.id,
    [guessLeagueChampion.id],
  );

  await createQuestion(
    '/static/GuessLeagueChampion/byDeath/Kennen_Original_Death_0.ogg',
    ansKennen.id,
    byDeath.id,
    [guessLeagueChampion.id],
  );

  await createQuestion(
    '/static/GuessLeagueChampion/byDeath/Kennen_Original_Death_3.ogg',
    ansKennen.id,
    byDeath.id,
    [guessLeagueChampion.id],
  );

  await createQuestion(
    '/static/GuessLeagueChampion/byDeath/Malphite_Original_Death_0.ogg',
    ansMalphite.id,
    byDeath.id,
    [guessLeagueChampion.id],
  );

  await createQuestion(
    '/static/GuessLeagueChampion/byDeath/Nasus_Original_Death_0.ogg',
    ansNasus.id,
    byDeath.id,
    [guessLeagueChampion.id],
  );

  await createQuestion(
    '/static/GuessLeagueChampion/byDeath/Soraka_Original_Death_1.ogg',
    ansSoraka.id,
    byDeath.id,
    [guessLeagueChampion.id],
  );

  await createQuestion(
    '/static/GuessLeagueChampion/byDeath/Tahm_Kench_Original_Death_0.ogg',
    ansTahm.id,
    byDeath.id,
    [guessLeagueChampion.id],
  );

  await createQuestion(
    '/static/GuessLeagueChampion/byDeath/Teemo_Original_Death_0.ogg',
    ansTeemo.id,
    byDeath.id,
    [guessLeagueChampion.id],
  );

  await createQuestion(
    '/static/GuessLeagueChampion/byDeath/Teemo_Original_Death_1.ogg',
    ansTeemo.id,
    byDeath.id,
    [guessLeagueChampion.id],
  );

  await createQuestion(
    '/static/GuessLeagueChampion/byDeath/Vex_Original_Death_0.ogg',
    ansVex.id,
    byDeath.id,
    [guessLeagueChampion.id],
  );

  await createQuestion(
    '/static/GuessLeagueChampion/byDeath/Vex_Original_Death_1.ogg',
    ansVex.id,
    byDeath.id,
    [guessLeagueChampion.id],
  );

  await createQuestion(
    '/static/GuessLeagueChampion/byDeath/Vex_Original_Death_3.ogg',
    ansVex.id,
    byDeath.id,
    [guessLeagueChampion.id],
  );

  await createQuestion(
    '/static/GuessLeagueChampion/byDeath/Yunara_Original_Death_0.ogg',
    ansYunara.id,
    byDeath.id,
    [guessLeagueChampion.id],
  );

  await createQuestion(
    '/static/GuessLeagueChampion/byPick/Aatrox_Select.ogg',
    ansAatrox.id,
    byPick.id,
    [guessLeagueChampion.id],
  );

  await createQuestion(
    '/static/GuessLeagueChampion/byPick/Ahri_Select.ogg',
    ansAhri.id,
    byPick.id,
    [guessLeagueChampion.id],
  );

  await createQuestion(
    '/static/GuessLeagueChampion/byPick/Amumu_Select.ogg',
    ansAmumu.id,
    byPick.id,
    [guessLeagueChampion.id],
  );

  await createQuestion(
    '/static/GuessLeagueChampion/byPick/Aurelion_Sol_Select.ogg',
    ansAurelionSol.id,
    byPick.id,
    [guessLeagueChampion.id],
  );

  await createQuestion(
    "/static/GuessLeagueChampion/byPick/Bel'Veth_Select.ogg",
    ansBelVeth.id,
    byPick.id,
    [guessLeagueChampion.id],
  );

  await createQuestion(
    '/static/GuessLeagueChampion/byPick/Blitzcrank_Select.ogg',
    ansBlitzcrank.id,
    byPick.id,
    [guessLeagueChampion.id],
  );

  await createQuestion(
    "/static/GuessLeagueChampion/byPick/Cho'Gath_Select.ogg",
    ansChoGath.id,
    byPick.id,
    [guessLeagueChampion.id],
  );

  await createQuestion(
    '/static/GuessLeagueChampion/byPick/Dr._Mundo_Select.ogg',
    ansDrMundo.id,
    byPick.id,
    [guessLeagueChampion.id],
  );

  await createQuestion(
    '/static/GuessLeagueChampion/byPick/Fizz_Select.ogg',
    ansFizz.id,
    byPick.id,
    [guessLeagueChampion.id],
  );

  await createQuestion(
    '/static/GuessLeagueChampion/byPick/Gragas_Select.ogg',
    ansGragas.id,
    byPick.id,
    [guessLeagueChampion.id],
  );

  await createQuestion(
    '/static/GuessLeagueChampion/byPick/Irelia_Select.ogg',
    ansIrelia.id,
    byPick.id,
    [guessLeagueChampion.id],
  );

  await createQuestion(
    '/static/GuessLeagueChampion/byPick/Kennen_Select.ogg',
    ansKennen.id,
    byPick.id,
    [guessLeagueChampion.id],
  );

  await createQuestion(
    '/static/GuessLeagueChampion/byPick/Malphite_Select.ogg',
    ansMalphite.id,
    byPick.id,
    [guessLeagueChampion.id],
  );

  await createQuestion(
    '/static/GuessLeagueChampion/byPick/Nasus_Select.ogg',
    ansNasus.id,
    byPick.id,
    [guessLeagueChampion.id],
  );

  await createQuestion(
    '/static/GuessLeagueChampion/byPick/Soraka_Select.ogg',
    ansSoraka.id,
    byPick.id,
    [guessLeagueChampion.id],
  );

  await createQuestion(
    '/static/GuessLeagueChampion/byPick/Tahm_Kench_Select.ogg',
    ansTahm.id,
    byPick.id,
    [guessLeagueChampion.id],
  );

  await createQuestion(
    '/static/GuessLeagueChampion/byPick/Teemo_Select.ogg',
    ansTeemo.id,
    byPick.id,
    [guessLeagueChampion.id],
  );

  await createQuestion(
    '/static/GuessLeagueChampion/byPick/Vex_Select.ogg',
    ansVex.id,
    byPick.id,
    [guessLeagueChampion.id],
  );

  await createQuestion(
    '/static/GuessLeagueChampion/byPick/Yunara_Select.ogg',
    ansYunara.id,
    byPick.id,
    [guessLeagueChampion.id],
  );

  await createQuestion(
    '/static/guessMovie/byFrame/MV5BMjAwNjgwNzc4M15BMl5BanBnXkFtZTgwMDA0MTc3MTE@._V1_.jpg',
    ans1408.id,
    byFrame.id,
    [guessMovie.id],
  );

  await createQuestion(
    '/static/guessMovie/byFrame/MV5BMjk3NTYyMzc4Nl5BMl5BanBnXkFtZTcwODU3ODMzMw@@._V1_FMjpg_UX2048_.jpg',
    ansFightClub.id,
    byFrame.id,
    [guessMovie.id],
  );

  await createQuestion(
    '/static/guessMovie/byFrame/MV5BMTc1NjkwMTY0OF5BMl5BanBnXkFtZTcwMjk5NDIyMw@@._V1_FMjpg_UX2048_.jpg',
    ansSpotlight.id,
    byFrame.id,
    [guessMovie.id],
  );

  await createQuestion(
    '/static/guessMovie/byFrame/MV5BMTk4NzQwODM5MF5BMl5BanBnXkFtZTcwNjgzNTI3Nw@@._V1_FMjpg_UX2048_.jpg',
    ansDjangoUnchained.id,
    byFrame.id,
    [guessMovie.id],
  );

  await createQuestion(
    '/static/guessMovie/byFrame/MV5BMTkyNDQyNTc4NF5BMl5BanBnXkFtZTgwMDU4MzkzMDI@._V1_FMjpg_UX2048_.jpg',
    ansTheHandmaiden.id,
    byFrame.id,
    [guessMovie.id],
  );

  await createQuestion(
    '/static/guessMovie/byFrame/MV5BMTM0NjUxMDk5MF5BMl5BanBnXkFtZTcwNDMxNDY3Mw@@._V1_FMjpg_UX1800_.jpg',
    ansShawshankRedemption.id,
    byFrame.id,
    [guessMovie.id],
  );

  await createQuestion(
    '/static/guessMovie/byFrame/MV5BMTM0NzMzNDYyOV5BMl5BanBnXkFtZTcwODM2NDY3Mw@@._V1_FMjpg_UX2048_.jpg',
    ansForestGump.id,
    byFrame.id,
    [guessMovie.id],
  );

  await createQuestion(
    '/static/guessMovie/byFrame/MV5BMW~1.JPG',
    ansElCamino.id,
    byFrame.id,
    [guessMovie.id],
  );

  await createQuestion(
    '/static/guessMovie/byFrame/MV5BNDA4MjgxODI2NV5BMl5BanBnXkFtZTgwMzQ1NTE4MjE@._V1_FMjpg_UX2048_.jpg',
    ansWhiplash.id,
    byFrame.id,
    [guessMovie.id],
  );

  await createQuestion(
    '/static/guessMovie/byFrame/MV5BNG~1.JPG',
    ansNoCountryForOldMen.id,
    byFrame.id,
    [guessMovie.id],
  );

  await createQuestion(
    '/static/guessMovie/byFrame/MV5BNJ~1.JPG',
    ansSmile.id,
    byFrame.id,
    [guessMovie.id],
  );

  await createQuestion(
    '/static/guessMovie/byFrame/MV5BNW~1.JPG',
    ansAmericanPsycho.id,
    byFrame.id,
    [guessMovie.id],
  );

  await createQuestion(
    '/static/guessMovie/byFrame/MV5BNzg4MTkxODg2NV5BMl5BanBnXkFtZTgwNzEwNjc0MDI@._V1_FMjpg_UX2048_.jpg',
    ansHacksawRidge.id,
    byFrame.id,
    [guessMovie.id],
  );

  await createQuestion(
    '/static/guessMovie/byFrame/MV5BOD~1.JPG',
    ansPlatform.id,
    byFrame.id,
    [guessMovie.id],
  );

  await createQuestion(
    '/static/guessMovie/byFrame/MV5BOG~1.JPG',
    ansBlackSwan.id,
    byFrame.id,
    [guessMovie.id],
  );

  await createQuestion(
    '/static/guessMovie/byFrame/MV5BYZ~1.JPG',
    ansSpotlight.id,
    byFrame.id,
    [guessMovie.id],
  );

  await createQuestion(
    '/static/guessMovie/byFrame/MV5BZD~1.JPG',
    ansHachi.id,
    byFrame.id,
    [guessMovie.id],
  );

  await createQuestion(
    '/static/guessMovie/byFrame/MV5BZJ~1.JPG',
    ans12.id,
    byFrame.id,
    [guessMovie.id],
  );

  await createQuestion(
    '/static/guessMovie/byTrailer/1408 (2007) - HD Trailer - Trim.mp4',
    ans1408.id,
    byTrailer.id,
    [guessMovie.id],
  );

  await createQuestion(
    '/static/guessMovie/byTrailer/AMERIC~2.MP4',
    ansAmericanPsycho.id,
    byTrailer.id,
    [guessMovie.id],
  );

  await createQuestion(
    '/static/guessMovie/byTrailer/BLACK SWAN  Official Trailer  FOX Searchlight - Trim.mp4',
    ansBlackSwan.id,
    byTrailer.id,
    [guessMovie.id],
  );

  await createQuestion(
    '/static/guessMovie/byTrailer/El Camino A Breaking Bad Movie  Official Trailer  Netflix.mp4',
    ansElCamino.id,
    byTrailer.id,
    [guessMovie.id],
  );

  await createQuestion(
    '/static/guessMovie/byTrailer/HACKSA~2.MP4',
    ansHacksawRidge.id,
    byTrailer.id,
    [guessMovie.id],
  );

  await createQuestion(
    '/static/guessMovie/byTrailer/Smile  Official Trailer (2022 Movie) - Trim.mp4',
    ansSmile.id,
    byTrailer.id,
    [guessMovie.id],
  );

  await createQuestion(
    '/static/guessMovie/byTrailer/spotlight.mp4',
    ansSpotlight.id,
    byTrailer.id,
    [guessMovie.id],
  );

  await createQuestion(
    '/static/guessMovie/byTrailer/The Platform  Main Trailer  Netflix - Trim.mp4',
    ansPlatform.id,
    byTrailer.id,
    [guessMovie.id],
  );

  await createQuestion(
    '/static/guessMovie/byTrailer/THE SUBSTANCE - Trim.mp4',
    ansSubstance.id,
    byTrailer.id,
    [guessMovie.id],
  );

  await createQuestion(
    '/static/guessMovie/byTrailer/Zodiac (2007) Trailer #1  Movieclips Classic Trailers - Trim.mp4',
    ansZodiac.id,
    byTrailer.id,
    [guessMovie.id],
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
