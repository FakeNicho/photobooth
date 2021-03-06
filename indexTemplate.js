module.exports = config => `<!DOCTYPE html>
<html>
<head>
  <meta charset=utf-8/>
  <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0 shrink-to-fit=no">
  <script>
    const CONFIG = ${JSON.stringify(config)};
  </script>
  ${process.env.NODE_ENV === 'production' ? '<link href="/dist/master.min.css" rel="stylesheet" />' : ''}
</head>
<body>
<div id="app"></div>
<script type="text/javascript" src="/dist/bundle${process.env.NODE_ENV === 'production' ? '.min' : ''}.js"></script>
</body>
</html>`;
