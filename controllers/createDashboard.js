function createDashboard(req, res) {
    res.render("dashboard", {
        title: "Dashboard"
    })
}

module.exports = {
    createDashboard,
}