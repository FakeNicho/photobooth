const chokidar = require('chokidar');
const fetch = require('isomorphic-fetch');
const fs = require('fs');
const path = require('path');
const FormData = require('form-data');
const config = JSON.parse(fs.readFileSync(process.env.CONFIG || path.join(__dirname, 'config.json')));

chokidar.watch('./photos', {ignored: /(^|[\/\\])\../}).on('all', async (event, filepath) => {
  console.log(event, filepath);
  if (event === 'add') {
    //await new Promise(resolve => setTimeout(resolve, 1000));
    const readStream = fs.createReadStream(path.resolve(__dirname, filepath));
    const form = new FormData();
    form.append('file', readStream);
    console.log('posting');
    fetch(config.url, {method: 'POST', body: form});
  }
});
