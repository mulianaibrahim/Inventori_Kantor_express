const {
    login,
    register
} = require('../domain/auth.domain');

async function userRegister(req, res) {
    const body = req.body;
    const response = await register(body);
    res.status(response.status).send(response)
}

async function userLogin(req, res) {
    const {
        username,
        password
    } = req.body;
    const response = await login(username, password);
    res.status(response.status).send(response);
}

module.exports = {
    userRegister,
    userLogin
}