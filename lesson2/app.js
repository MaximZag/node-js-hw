// 1. /login, поля які треба відрендерити в файлі hbs: firstName, lastName, email(унікальне поле), password, age, city
// просто зробити темплейт з цим усім і вводити свої дані які будуть пушитися в масив і редірект робити на сторінку з усіма юзерами /users і перевірка чи такий імейл не існує, якщо існує то редірект на еррор пейдж
// 2. /users просто сторінка з усіма юзерами, але можна по квері параметрам їх фільтрувати по age і city
// 3. /user/:id сторінка з інфою про одного юзера
//
// 4. зробити якщо не відпрацюють ендпоінти то на сторінку notFound редірект

const path = require('path');
const express = require('express')
const app = express();

const {engine} = require('express-handlebars');

app.use(express.json());
app.use(express.urlencoded({extended: true}))

app.use(express.static(path.join(__dirname, 'static')));
app.set('view engine', '.hbs');
app.engine('.hbs', engine({defaultLayout: false}));
app.set('views', path.join(__dirname, 'static'));

const users = []

app.get('/login', (req, res) => {
    res.render('login')
})

app.post('/login', (req, res) => {
    if (users.length > 0) {
        if (users.map(user => user.email).includes(req.body.email)) {
            res.redirect('/error')
        } else {
            users.push(req.body)
        }
    } else {
        users.push(req.body)
    }
    res.redirect('/users')
})

app.get('/users', (req, res) => {
    let filterUsers = [...users]
    if (req.query.age) {
        filterUsers = filterUsers.filter(user => user.age === req.query.age)
    }
    if (req.query.city) {
        filterUsers = filterUsers.filter(user => user.city === req.query.city)
    }
    res.render('users', {filterUsers})
})

app.get('/users/:id', (req, res) => {
    const {id} = req.params
    res.render(`user`, {users: users[parseInt(id) - 1]})
})

app.get('/error', (req, res) => {
    res.render('error')
})

app.use((req, res) => {
    res.render('notFound')
})

app.listen(8000, () => {
    console.log('Server listening on port 8000!')
});