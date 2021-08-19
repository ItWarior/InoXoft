const fs = require('fs');
const path = require('path');

const WAY_TO_GENERATED = (path.join(__dirname, '../', '/data', '/generated'));
const WAY_TO_BOYS = (path.join(__dirname, '../', '/data', '/boys'));
const WAY_TO_GIRLS = (path.join(__dirname, '../', '/data', '/girls'));

fs.readdir(WAY_TO_GENERATED, function (err, all_filles_names) {
   if (err) {
      console.log(err);
      return;
   }
   for (const file_name of all_filles_names) {
      const way_to_file = path.join(WAY_TO_GENERATED, file_name)
      fs.readFile(way_to_file, (err, file) => {
         if (err) {
            console.log(err);
            return
         } else if (file) {
            const status_gender = JSON.parse(file.toString()).gender
            const destination = status_gender === 'male' ? WAY_TO_BOYS : WAY_TO_GIRLS
            fs.rename(way_to_file, path.resolve(destination, file_name), (err) => {
               if (err) {
                  console.log(err);
                  return;
               }
            })
         }
      })
   }
})
