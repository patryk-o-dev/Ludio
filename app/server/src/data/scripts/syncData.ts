import syncChips from './syncChips';
import { prisma } from './prisma';
import syncAnswers from './syncAnswers';
import syncQuestions from './syncQuestions';

async function syncData() {
  console.log('SYNC START');
  try {
    await syncChips(
      'src/data/chips/filter.json',
      'src/data/chips/by.json',
      'src/data/chips/guess.json',
    );
    await syncAnswers(
      'src/data/answers/guessGame.json',
      'src/data/answers/guessGameCharacter.json',
      'src/data/answers/guessLeagueChampion.json',
      'src/data/answers/guessMovie.json',
    );
    console.log('ANSWERS DONE');
    await syncQuestions(
      'src/data/questions/standard/game.json',
      'src/data/questions/standard/gameCharacter.json',
      'src/data/questions/standard/movie.json',
      'src/data/questions/games/dbd/qdbd.json',
      'src/data/questions/games/lol/qlol.json',
    );
    console.log('QUESTIONS DONE');
  } finally {
    await prisma.$disconnect();
  }
}

syncData();
