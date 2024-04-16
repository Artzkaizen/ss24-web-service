const app = require('./app.js');

export const port = 3500

app.listen(port, ()=>{
    console.log(`Works! Here is the link: http://localhost:${port}`)
})

