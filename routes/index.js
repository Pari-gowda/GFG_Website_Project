const router = require("express").Router()

router.get("/", (req,res)=> {
    res.send("Welcome to Qooh Page")
})

module.exports = router;