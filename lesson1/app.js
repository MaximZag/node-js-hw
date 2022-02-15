// Всі дії виконувати з допомогою модулів (вручну нічого не створюємо)
// Створити основну папку (main), в яку покласти дві інші папки: перша - online, друга - inPerson
// Потім створити в вашому головному файлі (для прикладу app.js) два масиви з обєктами user ({. name: "Andrii", age: 22, city: "Lviv" }),  відповідно перший - onlineUsers, другий - inPersonUsers;
// і створити файли txt в папках (online, inPerson) в яких як дату покласти юзерів з ваших масивів, але щоб ваш файл виглядав як NAME: ім'я з обєкту і т.д і всі пункти з нового рядка.
//
// Коли ви це виконаєте напишіть функцію яка буде міняти місцями юзерів з одного файлу і папки в іншу. (ті, що були в папці inPerson будуть в папці online)


const fs = require('fs')
const path = require("path");

// fs.mkdir(path.join(__dirname, 'main', 'online'), {recursive:true}, (err) => {
//     if (err){
//         console.log(err);
//         throw err;
//     }
// })

// fs.mkdir(path.join(__dirname, 'main', 'inPerson'), (err) => {
//     if (err) {
//         console.log(err);
//         throw err;
//     }
// })

// fs.appendFile(path.join(__dirname, 'app.js'), 'const onlineUsers= [{name: "Andrii", age: 22, city: "Lviv"},' +
//     '{name: "Max", age: 33, city: "Kyiv"}]\n const inPersonUsers= [{name: "Olya", age: 18, city: "Odessa"}, {name: "Tanya", age: 24, city: "Dnepr"}]', (err) => {
//     if (err) {
//         console.log(err);
//         throw err;
//     }
// })

// const onlineUsers = [{name: "Andrii", age: 22, city: "Lviv"}, {name: "Max", age: 33, city: "Kyiv"}]
// const inPersonUsers = [{name: "Olya", age: 18, city: "Odessa"}, {name: "Tanya", age: 24, city: "Dnepr"}]
//
// for (const onlineUser of onlineUsers) {
//     for (const onlineUserKey in onlineUser) {
//         fs.writeFile(path.join(__dirname, 'main', 'online', 'online.txt'),
//             `${onlineUserKey}:${onlineUser[onlineUserKey]}\n`,
//             {flag: 'a'},
//             (err) => {
//                 if (err) {
//                     console.log(err);
//                     throw err;
//                 }
//             })
//     }
// }
//
// for (const inPersonUser of inPersonUsers) {
//     for (const inPersonUserKey in inPersonUser) {
//         fs.writeFile(path.join(__dirname, 'main', 'inPerson', 'inPerson.txt'),
//             `${inPersonUserKey}:${inPersonUser[inPersonUserKey]}\n`,
//             {flag: 'a'},
//             (err) => {
//                 if (err) {
//                     console.log(err);
//                     throw err;
//                 }
//             })
//     }
// }

const changer = () => {
    fs.readFile(path.join(__dirname, 'main', 'online', 'online.txt'), (err, data) => {
        if (err) {
            console.log(err);
            throw err;
        }
        fs.readFile(path.join(__dirname, 'main', 'inPerson', 'inPerson.txt'), (err1, data1) => {
            if (err1) {
                console.log(err1);
                throw err1;
            }

            fs.writeFile(path.join(__dirname, 'main', 'online', 'online.txt'), `${data1.toString()}`, (err2) => {
                if (err2) {
                    console.log(err2);
                    throw err2;
                }
                fs.writeFile(path.join(__dirname, 'main', 'inPerson', 'inPerson.txt'), `${data.toString()}`, (err3) => {
                    if (err3) {
                        console.log(err3);
                        throw err3;
                    }
                })
            })
        })
    })
}
changer()