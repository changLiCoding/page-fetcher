const request = require('request');
const fs = require('fs');
const path = require('path');

const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const fileWriteAsync = (data,file) => {
  fs.writeFile(`./${file}`, data, err => {
    if (err) {
      console.error(err);
    }
    if (data) {
      const string = data;
      console.log(`Downloaded and saved ${string.length} bytes to ${file}`);
    }
    // file written successfully
    process.exit();
  });
};

const fetcher = (url,file) => {

  request(url,(error,response,body) => {
    if (error) throw new Error(error);
    if (!file === path.basename(file)) throw new Error('Not valid file name. ');
    fs.readFile(`./${file}`,'utf-8',(err,data) => {
      if (err) {
        fileWriteAsync(body, file);
      }
      if (data) {
        rl.question('Same file name detected, do you still want to continue over written the file? (Y/N) y for yes n for skip it. ',(key) => {
          if (key === 'y') {
            fileWriteAsync(body,file);
            console.log('Over written accomplished. ');
          } else {
            console.log("Over written canceled.");
            process.exit();
          }
        });
      }
    });

  });
};
const argv = process.argv.slice(2);
console.log(argv);

fetcher(...argv);
