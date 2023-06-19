const {
    login,
    register
} = require('../domain/auth/auth.domain');

async function userRegister(req, res) {
    const body = req.body;
    const response = await register(body);
    res.status(response.status).send(response.data)
}

async function userLogin(req, res) {
    const {
        username,
        password
    } = req.body;
    const response = await login(username, password);
    res.status(response.status).send(response.data);
}

module.exports = {
    userRegister,
    userLogin
}