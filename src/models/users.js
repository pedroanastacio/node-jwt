import mongoose from "mongoose"

const schema = new mongoose.Schema({
    username: String,
    password: String,
    name: String,
    admin: Boolean
}, {
    timestamps: { createdAt: true, updatedAt: true },
    toJSON: { 
        virtuals: true,
        transform(doc, ret) {
            ret.id = ret._id
            delete ret._id
          }
    },
    versionKey: false,
})

const UsersModel = mongoose.model('Users', schema)

export default UsersModel