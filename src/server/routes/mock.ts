import express = require("express");
let router = express.Router();

let mockRouter = (req: express.Request, res: express.Response) => {
    res.json({
        "status": "success",
        "data": {
            "mock": ["mocked_data"]
        }
    });
}

/* GET home page.*/
router.get("/*", mockRouter);

module.exports = router;
