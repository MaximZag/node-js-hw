// 1. Спробуйте створити якийсь файл txt, прочитайте з нього дані і одразу, дані які ви отримали запишіть їх в інший файл, в вас вийде невеликий callback hell, пізніше я вам покажу
// як можна це обійти, але поки зробіть так
//
// 2. Створіть файл ( можете вручну ) заповніть його якимись даними
// Прочитайте його, скопіюйте всі дані з нього і перенесіть їх в нову папку та файл в ній, старий файл видаліть після того як все завершиться. Також вийде callback hell
//
// 3. Створіть папку (можете вручну) напишіть скріпт який створить в ній якись дані (можуть бути нові папки і файли(в файли запишіть якусь дату) )
// і напишіть функцію яка буде зчитувати папку і перевіряти якщо дані які в ній лежать - це файли тоді вам потрібно їх очистити, але не видаляти, якщо дані - це папки, вам потрібно їх перейменувати і додати до назви префікс _new

const fs = require("fs");
const path = require("path");


// 1)


// fs.writeFile(path.join(__dirname, 'file1.txt'), 'SomeData', (err) => {
//     if (err) {
//         console.log(err);
//         throw err;
//     }
// })
//
// fs.readFile(path.join(__dirname, 'file1.txt'), (err, data) => {
//     if (err) {
//         console.log(err);
//         throw err;
//     }
//     fs.writeFile(path.join(__dirname, 'file2.txt'), `${data}`, (err1) => {
//         if (err1) {
//             console.log(err1);
//             throw err1;
//         }
//     })
// })


// 2)


// fs.readFile(path.join(__dirname, 'file2.txt'), (err, data) => {
//     if (err) {
//         console.log(err);
//         throw err;
//     }
//     fs.mkdir(path.join(__dirname, 'main'), err1 => {
//         if (err1) {
//             console.log(err1);
//             throw err1;
//         }
//         fs.writeFile(path.join(__dirname, 'main', 'file3.txt'), `${data}`, (err2) => {
//             if (err2) {
//                 console.log(err2);
//                 throw err2;
//             }
//         })
//     })
// })


// 3) Проверка папки с одним подуровнем


// for (let i = 1; i < 7; i++) {
//     if (i % 2) {
//         fs.mkdir(path.join(__dirname, 'dir1', `${i}`), (err) => {
//             if (err) {
//                 console.log(err);
//                 throw err;
//             }
//         })
//     } else {
//         fs.writeFile(path.join(__dirname, 'dir1', `${i}.txt`), 'SomeData', (err) => {
//             if (err) {
//                 console.log(err);
//                 throw err;
//             }
//         })
//     }
// }


// function verify(path1) {
//     fs.readdir(path.join(__dirname, path1), (err, data) => {
//         if (err) {
//             console.log(err);
//             throw err;
//         }
//
//         for (const item of data) {
//             if (item.includes('.')) {
//                 fs.truncate(path.join(__dirname, `${path1}`, `${item}`), (err1) => {
//                     if (err1) {
//                         console.log(err1);
//                         throw err1;
//                     }
//                 })
//             } else {
//                 fs.rename(path.join(__dirname, `${path1}`, `${item}`), path.join(__dirname, `${path1}`, `${item}_new`), (err2) => {
//                     if (err2) {
//                         console.log(err2);
//                         throw err2;
//                     }
//                 })
//             }
//         }
//     })
// }
//
// verify('dir1')


// Вариант3 с рекурсией для проверки множества уровней вложенных папок и файлов


function verify(path1) {
    fs.readdir(path.join(__dirname, path1), (err, data) => {
        if (err) {
            console.log(err);
            throw err;
        }

        for (const item of data) {
            fs.stat(path.join(__dirname, `${path1}`, `${item}`), (err1, status) => {
                if (err1) {
                    console.log(err1);
                    throw err1;
                }
                if (status.isDirectory()) {
                    fs.rename(path.join(__dirname, `${path1}`, `${item}`), path.join(__dirname, `${path1}`, `${item}_new`), (err2) => {
                        if (err2) {
                            console.log(err2);
                            throw err2;
                        }
                        verify(`${path1}/${item}_new`)
                    })
                } else {
                    fs.truncate(path.join(__dirname, `${path1}`, `${item}`), (err3) => {
                        if (err3) {
                            console.log(err3);
                            throw err3;
                        }
                    })
                }
            })


        }
    })
}

verify('dir1')



