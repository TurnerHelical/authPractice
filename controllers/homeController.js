

function homePageGet(req, res) {
    res.render('index', {
        title: 'Homepage',
        stylesheet: '/styles/homepage.css',
    });
};

module.exports = { homePageGet };