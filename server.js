const express = require('express');
const path = require('path');
const fs = require('fs');
const config = JSON.parse(fs.readFileSync(process.env.CONFIG || path.join(__dirname, 'config.json')));
const port = process.env.PORT || config.port || 9900;
const app = express();
const multer = require('multer');
const upload = multer({dest: config.destination});
const files = [];

fs.readdir(config.destination, (err, items) => {
  for (let i = 0; i < items.length; i++) {
    if (items[i].endsWith('.jpg')) {
        console.log(items[i]);
        files.push(items[i]);
    }
  }
});

if (process.env.NODE_ENV !== 'production') {
  const webpack = require('webpack');
  const webpackConfig = require('./webpack.config');
  const compiler = webpack(webpackConfig);
  app.use(
    require('webpack-dev-middleware')(compiler, {
      noInfo: true,
      publicPath: webpackConfig.output.publicPath,
    })
  );
  app.use(require('webpack-hot-middleware')(compiler));
  console.log('HMR activated');
}

app.use(express.static(`${__dirname}/public`));

app.post('/', upload.single('file'), (req, res) => {
  const {path: inputFile, originalname: originalName} = req.file;
  fs.rename(inputFile, `${config.destination}/${originalName}`, error => {
    if (error) {
      return res.next(error);
    } else {
      files.push(originalName);
      res.sendStatus(200);
    }
  });
});

app.get('/:page', (req, res) => {
  const offset = (req.params.page - 1) * Number(config.itemsPerPage);
  res.send({
    entries: [...files]
      .reverse()
      .slice(offset, offset + Number(config.itemsPerPage))
      .map(file => `/imgs/${file}`),
    totalCount: files.length,
  });
});

app.get('*', (request, response) => {
  response.sendFile(path.resolve(__dirname, 'public', 'dist', 'index.html'));
});

app.listen(port);
console.log(`Server started on port ${port} with environment ${process.env.NODE_ENV || 'development'}`);
