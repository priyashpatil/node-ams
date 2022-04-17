const dotenv = require('dotenv');
dotenv.config();
const { Umzug, SequelizeStorage } = require('umzug');
const db = require('./models');

const sequelize = db.sequelize;
var args = process.argv.slice(2);

const umzug = new Umzug({
  migrations: { glob: 'database/migrations/*.js' },
  context: sequelize.getQueryInterface(),
  storage: new SequelizeStorage({ sequelize }),
  logger: console,
});

const umzugSeeder = new Umzug({
  migrations: { glob: 'database/seeders/*.js' },
  context: sequelize.getQueryInterface(),
  storage: new SequelizeStorage({ sequelize }),
  logger: console,
});

(async () => {
  switch (args[0]) {
    case 'down':
      await umzug.down();
      break;
    case 'reset':
      await umzug.down({ to: 0 });
      await umzug.up();
      break;
    case 'seed':
      await umzugSeeder.up();
      break;
    case 'seed-fresh':
        await umzug.down({ to: 0 });
        await umzug.up();
        await umzugSeeder.down();
        await umzugSeeder.up();
        break;
    default:
      await umzug.up();
      break;
  }
})();
