
const express = require("express");
const { isLoggedIn } = require("../middlewares");
const router = express.Router();
import Toolkit from './models/Toolkit';


router.get('/toolkits', (req, res) => {
    Toolkit.find((err, toolkits) => {
      if (err) return res.json({ success: false, error: err });
      return res.json({ success: true, data: toolkits });
    });
  });
  
  router.post('/toolkits', (req, res) => {
    const comtoolkitment = new Toolkit();
    // body parser lets us use the req.body
    const { name, author, version,category,link } = req.body;
    
    if (!author || !text) {
      // we should throw an error. we can do this check on the front end
      return res.json({
        success: false,
        error: 'You must provide an author and comment'
      });
    }
    comment.author = author;
    comment.text = text;
    comment.save(err => {
      if (err) return res.json({ success: false, error: err });
      return res.json({ success: true });
    });
  });

module.exports = router;