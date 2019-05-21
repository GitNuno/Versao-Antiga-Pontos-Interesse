// dbPassword = 'mongodb+srv://YOUR_USERNAME_HERE:'+ encodeURIComponent('YOUR_PASSWORD_HERE') + '@CLUSTER_NAME_HERE.mongodb.net/test?retryWrites=true';
dbPassword = 'mongodb+srv://test:'+ encodeURIComponent('nnn') + '@nodejscluster-art2k.mongodb.net/test?retryWrites=true';
localDB =  'mongodb://localhost:27017/restfullBD';

module.exports = {
    mongoURI: dbPassword,
    localURI: localDB
};
