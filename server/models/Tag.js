const {Schema, model} = require('mongoose');

const TagSchema = new Schema(
    {
        name:{
            type: String,
            required: true,
        }
    },
    {
        toJSON: {
            virtuals: true,
            getters: true
        },
        id: false
    }
)

const Tag = model("Tag", TagSchema);

module.exports = Tag;