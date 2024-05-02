const { app, port } = require('./app');

app.listen(port, () => console.log(`Server running on port: http://localhost:${port}`));

module.exports = app;