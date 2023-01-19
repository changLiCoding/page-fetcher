const request = require('request');
const fs = require('fs');

const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const fetcher = (url,file) => {

  request(url,(error,response,body) => {
    if (error) throw new Error(error);

    fs.readFile(file,'utf-8',(err,data) => {
      if (err) throw new Error(error);
      if (data) {
        rl.question('Same file name detected, do you still want to continue over written the file? (Y/N) y for yes n for skip it. ',(key) => {
          if (key === 'y') {
            fs.writeFile(`${file}`, body, err => {
              if (err) {
                console.error(err);
              }
              if (body) {
                const string = body;
                console.log(`Downloaded and saved ${string.length} bytes to ${file}`);
              }
              // file written successfully
            });
          } else {
            process.exit();
          }
        });
      }
    });


    //console.log('error:', error);
    //console.log('statusCode:', response && response.statusCode);
    //console.log('body:', body.body);
  });

};
const argv = process.argv.slice(2);
console.log(argv);

fetcher(...argv);
