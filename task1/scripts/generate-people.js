const faker = require('faker');
const fs = require('fs');
const path = require('path');


const MALE_GENDER = 'male';
const FEMALE_GENDER = 'female';

const COUNT = 20;

const DATA_DIRECTORY_PATH = path.resolve(__dirname, '../data/generated');

function generateHuman() {
   return {
      name: `${faker.name.firstName()} ${faker.name.lastName()}`,
      age: faker.datatype.number({ min: 0, max: 100 }),
      gender: faker.datatype.number({ min: 0, max: 1000 }) > 500 ? MALE_GENDER : FEMALE_GENDER
   };
}

function storeHuman(human) {
   fs.writeFileSync(path.resolve(DATA_DIRECTORY_PATH, `${human.name}.json`), JSON.stringify(human))
}

function clearPeople() {
   const files = fs.readdirSync(DATA_DIRECTORY_PATH);
   for (const file of files) {
      fs.unlinkSync(path.join(DATA_DIRECTORY_PATH, file));
   }
}


clearPeople();
for (let i = 0; i < COUNT; i++) {
   const human = generateHuman();
   storeHuman(human);
}

