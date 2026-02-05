function createDashboard(req, res) {
    res.render("dashboard", {
        title: "Dashboard",
    })
}

function categoryGet(req, res){
    res.render("category", {
        title: req.params.slug,
    })
}

module.exports = {
    createDashboard,
    categoryGet
}