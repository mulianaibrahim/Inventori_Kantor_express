const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const User = require('../../database/users');

const secret = 'very-secret';

async function register(body) {
    const {
        username,
        password,
        password_confirm,
        name,
        gender
    } = body;
    if (password !== password_confirm) {
        return {
            status: 400,
            message: 'password dan konfirmasi password tidak sesuai',
        };
    }
    const user = new User({
        username,
        password: hashPassword(password),
        name,
        gender,
    });
    await user.save();
    return {
        status: 200,
        data: {
            username,
            name,
            gender,
        },
    };
};

async function login(username, password) {
    const user = await User.findOne({
        username,
        password: hashPassword(password),
    });
    if (!user) {
        return {
            status: 401,
            message: 'username atau password salah'
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