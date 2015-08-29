var config = {};

config.mongoUri = 'mongodb://localhost:27017/users';
config.statsUri = 'mongodb://localhost:27017/statistics';
config.cookieMaxAge = 1000 * 60 * 60 *24 * 365;

config.getCurrentDate = function getCurrentDate() {
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1;
    var yyyy = today.getFullYear();
    
    if(dd<10) {
        dd='0'+dd;
    } 
    
    if(mm<10) {
        mm='0'+mm;
    } 
    return "" + yyyy + "" + mm + "" + dd; 
};

module.exports = config;