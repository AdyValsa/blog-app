require('dotenv').config();

const dev = {
    app: {
        serverPort: process.env.SERVER_PORT || 8080,
        jwtUserKey: process.env.JWT_USER_KEY || "AIOSHDIUHASDKJABSDK",
        jwtAuthKey: process.env.JWT_AUTH_KEY || "AASDJASDKASLOAIRJASKJMN",
        smtpPass: process.env.SMTP_PASS,
        smtpUser: process.env.SMTP_USER,
        clientUrl: process.env.CLIENT_URL,
        serverUrl: process.env.SERVER_URL
    },
    db: {
        mongoUrl: process.env.MONGODB_ATLAS
    }
}
module.exports = dev