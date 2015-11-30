let authMiddleware = require('./middleware/auth')
let pipelinesController = require('./controllers/pipelines')
let express = require('express')

export default function (app) {

  // Authentication middleware
  app.use('/api/*', authMiddleware)


  // Pipelines
  app.get('/api/pipelines', pipelinesController.getList)

  //app.get('/', (req, res) => {
  //  res.send({message: 'Welcome to the API!'})
  //})

  //app.use('*', function(req, res) {
  //  res.sendFile('index.html');
  //})

  // Static files
  app.use(express.static('./build/ui/'))

  // 404
  app.use(function(req, res, next){
    res.status(404);

    // respond with html page
    if (req.accepts('html')) {
      res.send('<h1>404 Not found</h1>');
      return;
    }

    // respond with json
    if (req.accepts('json')) {
      res.send({ error: 'Not found' });
      return;
    }

    // default to plain-text. send()
    res.type('txt').send('Not found');
  });

}
