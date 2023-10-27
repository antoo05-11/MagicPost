import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        index: true
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: ["manager", "employee"],
        default: "employee",
    },
    name: {
        type: String,
        required: true,
        default: "new-user"
    },
    reputation: {
        type: Number,
        required: true,
        default: 0
    },
    avatar: {
        type: String
    }
});

export default mongoose.model("User", userSchema);