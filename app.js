const { app, port } = require('./src/main');


app.listen(port, () => console.log('Server listening on port ' + port))