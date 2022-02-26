"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const express_1 = __importDefault(require("express"));
const typeorm_1 = require("typeorm");
const user_1 = require("./entity/user");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(express_1.default.urlencoded());
app.get('/users', async (req, res) => {
    const user = await (0, typeorm_1.getManager)().getRepository(user_1.User).find();
    console.log(user);
    res.json(user);
});
app.post('/users', async (req, res) => {
    console.log(req.body);
    // const createdUser = await getManager().getRepository(User).save(req.body);
    // console.log(createdUser);
    // res.json(createdUser);
});
app.get('/users/:id', async (req, res) => {
    const user = await (0, typeorm_1.getManager)().getRepository(user_1.User)
        .createQueryBuilder('user')
        .where('user.id = :id', { id: +req.params['id'] })
        .leftJoin('Posts', 'posts', 'posts.userId = user.id')
        .getOne();
    res.json(user);
});
app.patch('/users/:id', async (req, res) => {
    const { password, email } = req.body;
    const createdUser = await (0, typeorm_1.getManager)()
        .getRepository(user_1.User)
        .update({ id: Number(req.params.id) }, {
        password,
        email,
    });
    res.json(createdUser);
});
app.listen(5500, async () => {
    console.log('Server started!!!');
    try {
        const connection = await (0, typeorm_1.createConnection)();
        if (connection) {
            console.log('Database connected');
        }
    }
    catch (err) {
        if (err)
            console.log(err);
    }
});
//# sourceMappingURL=app.js.map