const express = require("express");
// const { isLoggedIn } = require("../middlewares");
const router = express.Router();
import Tool from '../models/Tool';
import Toolkit from '../models/Toolkit';
import Competency from '../models/Competency';


router.get('/competencies', (req, res) => {
    Competency.find((err, competencies) => {
        if (err) { return res.json({ success: false, error: err }); }
        else {
            console.log("Competencies called");
            return res.json({ success: true, data: competencies });
        }
    });
});

router.get("/competencies/:compId", (req, res, next) => {
    Competency.findOne({ _id: req.params.compId })
        .populate('_tools')
        .then(competencies => {
            //res.json(response);
            res.send(competencies);
        })
        .catch(err => next(err));
});

router.post('/competencies', (req, res) => {
    const competency = new Competency();
    // body parser lets us use the req.body
    const { name, summary, sources,_tools } = req.body;
    console.log("creating tool", req.body);

    if (!name) {
        // we should throw an error. we can do this check on the front end
        return res.json({
            success: false,
            error: 'You must provide with, at least, a name'
        });
    }
    competency.name = name;
    competency.summary = summary;
    competency.sources = sources;
    competency._tools = _tools;
    competency.save(err => {
        if (err) return res.json({ success: false, error: err });
        return res.json({ success: true });
    });
});

//update your competency
router.put('/competencies/:compId', (req, res) => {
    const { compId } = req.params;
    if (!compId) {
        return res.json({ success: false, error: 'No competency id provided' });
    }
    Competency.findById(compId, (error, competency) => {
        if (error) return res.json({ success: false, error });
        const { name, summary, sources, _tools } = req.body;
        if (name) competency.name = name;
        if (summary) competency.summary = summary;
        if (sources) competency.sources = sources;
        if (_tools) competency._tools = _tools;

        competency.save(error => {
            if (error) return res.json({ success: false, error });
            return res.json({ success: true });
        });
    });
});

//delete your competency
router.delete('/competencies/:compId', (req, res) => {
    const { compId } = req.params;

    if (!compId) {
        return res.json({ success: false, error: 'No tool id provided' });
    }
    Competency.remove({ _id: compId }, (error, compId) => {
        if (error) return res.json({ success: false, error });
        return res.json({ success: true, message: `Your tool was removed` });
    });
});


module.exports = router;