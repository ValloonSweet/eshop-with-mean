const express = require('express');
const app = express();

const port = 5000 || process.env.PORT;

app.listen(port, () => {
    console.log(`server is running on http://localhost:${port}`)
})
