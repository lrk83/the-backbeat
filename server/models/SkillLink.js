const {Schema, model} = require('mongoose');

const skillLinkSchema = new Schema(
    {
        name:{
            type: String,
            required: true,
        },
        content:{
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

const SkillLink = model("SkillLink", skillLinkSchema);

module.exports = SkillLink;