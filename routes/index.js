module.exports = function ( app ) {
    require('./login')(app);
    require('./home')(app);
    require('./signUp')(app);
};