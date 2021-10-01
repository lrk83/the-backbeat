const {Schema, model} = require('mongoose');

const GenreSchema = new Schema(
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

const Genre = model("Genre", GenreSchema);

module.exports = Genre;