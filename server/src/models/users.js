const {Schema,model} = require("mongoose");
const uuid4 = require("uuid4");

const userSchema = new Schema ({
    id: {
        type: String,
        default:uuid4(),
    },
    name: {
        type: String,
        trim: true,
        required: [true, "Name is required"],
        minlength: [2, "Minimum length for a name is 2 charachters"],
        maxlength: [100, "Maximum length for a name is 100 charachters"],
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        unique:true,
        trim:true,
        lowercase:true,
        },
    password: {
        type:String,
        required: [true, "Please chose a password"],
        min: 8,
        },
    phone: {
        type:String,
        required: [true, "Please chose a phone number"],
    }, 
    is_admin: {
        type:Number,
        default: false,
    },
    is_verified: {
        type:Number,
        default: false,
    },
    created_on: {
        type:Date,
        default:Date.now,
    },
    isBanned: {
        type: Boolean,
        default: false
    }
})

const User = model("users", userSchema);

module.exports = User