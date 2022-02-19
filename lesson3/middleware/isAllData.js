function isAllData(req, res, next) {
    try {
        const {firstName, lastName, email, password, age, city} = req.body;

        if (!firstName || !lastName || !email || !password || !age || !city) {
            throw new Error('Not all values were entered!!!')
        }

        next();
    } catch (err) {
        console.log(err.message)
        res.status(400).send(err.message)
    }
}

module.exports = isAllData;