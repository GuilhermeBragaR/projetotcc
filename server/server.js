const express = require('express');
const cors = require('cors');

const corsOptions = {
    origin: '*',
    optionsSucessStatus: 200,
}

async function start(api, repository) {
    const app = express();
    app.use(express.json());

    app.use(cors(corsOptions))

    api(app, repository)

    app.use((error, req, res, next) => {
        console.log(error);
        res.sendStatus(500);
    })

    app.listen(process.env.PORT, () =>
        console.log(`rodando servidor na porta ${process.env.PORT}`)
    )
}

module.exports = {
    start
}   