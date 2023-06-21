const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const User = require('../../../model/users');

const secret = 'very-secret';

async function searchUser(username) {
    const response = await User.find({
        username: username
    });
    try {
        if (response.length < 1) {
            throw new Error();
        }
        return {
            status: 200,
            data: response,
        };
    } catch (error) {
        return {
            status: 404,
            message: 'Username tidak ada!',
        }
    }
}

async function register(body) {
    const {
        username,
        password,
        password_confirm,
        name
    } = body;

    const search = await searchUser(username);

    try {
        if (search.status === 200) {
            throw new Error('Username sudah digunakan');
        }
        if (password !== password_confirm) {
            throw new Error('Password dan konfirmasi password tidak sesuai');
        }
        await User.create({
            username,
            password: hashPassword(password),
            name,
        });
        return {
            status: 200,
            data: {
                username,
                name,
            },
        };
    } catch (error) {
        return {
            status: 500,
            message: error.message
        };
    }

};

async function login(username, password) {
    const user = await User.findOne({
        username,
        password: hashPassword(password),
    });
    if (!user) {
        return {
            status: 401,
            message: 'Username atau password salah'
        };
    }
    const data = {
        id: user.id,
        username: user.username,
    };
    const encoded = jwt.sign(data, secret);
    return {
        status: 200,
        data: {
            token: encoded
        }
    }
}

function hashPassword(password) {
    return crypto.createHash('sha256').update(password).digest('hex');
}

module.exports = {
    login,
    register
}