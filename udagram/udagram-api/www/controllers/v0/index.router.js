"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IndexRouter = void 0;
const express_1 = require("express");
const feed_router_1 = require("./feed/routes/feed.router");
const user_router_1 = require("./users/routes/user.router");
const router = express_1.Router();
router.use('/feed', feed_router_1.FeedRouter);
router.use('/users', user_router_1.UserRouter);
router.get('/', async (req, res) => {
    res.send(`V0`);
});
exports.IndexRouter = router;
//# sourceMappingURL=index.router.js.map