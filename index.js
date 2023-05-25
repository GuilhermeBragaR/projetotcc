const router = require('./router/router');
const repository = require('./repository/repository');
const server = require('./server/server');

(async () => {
    try {
        await server.start(router, repository);
    } catch (error) {
        console.log(error);
    }
})();