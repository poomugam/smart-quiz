import express = require("express");
let router = express.Router();

let renderIndex = (req: express.Request, res: express.Response) => {
    res.render("index", { title: "Smart Quiz" });
}

/* GET home page.*/
router.get("/*", renderIndex);

module.exports = router;
