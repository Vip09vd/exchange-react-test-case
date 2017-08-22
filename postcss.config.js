module.exports = function (ctx) {
    return {
        parser: '',
        map: ctx.env === 'production' ? false : { inline: true }
    };
};
