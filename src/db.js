const { connect } = require("mongoose");

const CONFIG = {
    username: "gfs-user",
    pass: "bG9qbdiZnKYTfQFM",
    db: "GFS-DEV"
};

const URI = `mongodb+srv://${CONFIG.username}:${CONFIG.pass}@gasst-free-6soje.mongodb.net/${CONFIG.db}?retryWrites=true&w=majority`;

module.exports.db = () => {
    return connect(
        URI,
        { useNewUrlParser: true, useFindAndModify: true }
    );
};
