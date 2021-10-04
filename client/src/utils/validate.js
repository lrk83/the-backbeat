const validateEmail = function(input) {
    return input.match(/.+@.+\..+/)
};

module.exports= {validateEmail};