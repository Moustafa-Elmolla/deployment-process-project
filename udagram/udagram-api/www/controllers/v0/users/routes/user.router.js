"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRouter = void 0;
const express_1 = require("express");
const User_1 = require("../models/User");
const auth_router_1 = require("./auth.router");
const router = express_1.Router();
router.use('/auth', auth_router_1.AuthRouter);
router.get('/');
router.get('/:id', async (req, res) => {
    const { id } = req.params;
    const item = await User_1.User.findByPk(id);
    res.send(item);
});
exports.UserRouter = router;
//# sourceMappingURL=user.router.js.map