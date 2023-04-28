const bcrypt = require("bcrypt")
const createError = require("http-errors")
const saltRounds = 10

const hashPassword = async (password) => {
    try {
        return await bcrypt.hash(password,saltRounds)
    } catch (error) {
        console.log(error)
    }
}
const comparePassword = async (plainPassword, hashedPassword) => {
    try {
    await bcrypt.compare(plainPassword,hashedPassword, function(err,result) {
        console.log(result)
    return result
    })
    } catch (error) {
        next(error)
    }
}
module.exports = {hashPassword, comparePassword}