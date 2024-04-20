const { app, port } = require('./app');


app.listen(port, () => console.log('Server listening on port ' + port));

module.exports = app;