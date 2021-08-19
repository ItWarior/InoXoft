const fs = require('fs');
const path = require('path');

const WAY_TO_TASK_TWO = path.join(__dirname, '../', './data', './taskTwo');
const WAY_TO_DATA = path.join(__dirname, '../', './data');

function get_all_files(dir) {
   fs.readdir(dir, (err, all_files_names) => {
      if (err) {
         console.log(err);
         return;
      }
      for (const file_name of all_files_names) {
         const way_to_file = path.join(dir, file_name)
         fs.stat(way_to_file, (err, stat) => {
            if (err) {
               console.log(err);
               return
            } else if (stat.isDirectory()) {
               get_all_files(way_to_file);
            } else if (stat.isFile()) {
               fs.rename(way_to_file, path.resolve(WAY_TO_DATA, file_name), function d(err) {
                  if (err) {
                     console.log(err);
                     return;
                  }
               })
            }
         });
      }
   })
}
get_all_files(WAY_TO_TASK_TWO);