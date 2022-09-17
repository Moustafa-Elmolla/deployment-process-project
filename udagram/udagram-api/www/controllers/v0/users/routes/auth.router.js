"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthRouter = exports.requireAuth = void 0;
const express_1 = require("express");
const User_1 = require("../models/User");
const c = __importStar(require("../../../../config/config"));
// import * as bcrypt from 'bcrypt';
const jwt = __importStar(require("jsonwebtoken"));
const EmailValidator = __importStar(require("email-validator"));
const router = express_1.Router();
var bcrypt = require('bcryptjs');
async function generatePassword(plainTextPassword) {
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    return await bcrypt.hash(plainTextPassword, salt);
}
async function comparePasswords(plainTextPassword, hash) {
    return await bcrypt.compare(plainTextPassword, hash);
}
function generateJWT(user) {
    return jwt.sign(user.short(), c.config.jwt.secret);
}
function requireAuth(req, res, next) {
    if (!req.headers || !req.headers.authorization) {
        return res.status(401).send({ message: 'No authorization headers.' });
    }
    const tokenBearer = req.headers.authorization.split(' ');
    if (tokenBearer.length != 2) {
        return res.status(401).send({ message: 'Malformed token.' });
    }
    const token = tokenBearer[1];
    return jwt.verify(token, c.config.jwt.secret, (err, decoded) => {
        if (err) {
            return res.status(500).send({ auth: false, message: 'Failed to authenticate.' });
        }
        return next();
    });
}
exports.requireAuth = requireAuth;
router.get('/verification', requireAuth, async (req, res) => {
    return res.status(200).send({ auth: true, message: 'Authenticated.' });
});
router.post('/login', async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    if (!email || !EmailValidator.validate(email)) {
        return res.status(400).send({ auth: false, message: 'Email is required or malformed.' });
    }
    if (!password) {
        return res.status(400).send({ auth: false, message: 'Password is required.' });
    }
    const user = await User_1.User.findByPk(email);
    if (!user) {
        return res.status(401).send({ auth: false, message: 'User was not found..' });
    }
    const authValid = await comparePasswords(password, user.passwordHash);
    if (!authValid) {
        return res.status(401).send({ auth: false, message: 'Password was invalid.' });
    }
    const jwt = generateJWT(user);
    res.status(200).send({ auth: true, token: jwt, user: user.short() });
});
router.post('/', async (req, res) => {
    const email = req.body.email;
    const plainTextPassword = req.body.password;
    if (!email || !EmailValidator.validate(email)) {
        return res.status(400).send({ auth: false, message: 'Email is missing or malformed.' });
    }
    if (!plainTextPassword) {
        return res.status(400).send({ auth: false, message: 'Password is required.' });
    }
    const user = await User_1.User.findByPk(email);
    if (user) {
        return res.status(422).send({ auth: false, message: 'User already exists.' });
    }
    const generatedHash = await generatePassword(plainTextPassword);
    const newUser = await new User_1.User({
        email: email,
        passwordHash: generatedHash,
    });
    const savedUser = await newUser.save();
    const jwt = generateJWT(savedUser);
    res.status(201).send({ token: jwt, user: savedUser.short() });
});
router.get('/', async (req, res) => {
    res.send('auth');
});
exports.AuthRouter = router;
//# sourceMappingURL=auth.router.js.map