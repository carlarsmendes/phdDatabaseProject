
const express = require("express");
// const { isLoggedIn } = require("../middlewares");
const router = express.Router();
import Toolkit from './models/Toolkit';

router.get('/', (req, res) => {
  res.json({ message: 'Hello, World!' });
});


router.get('/toolkits', (req, res) => {
    Toolkit.find((err, toolkits) => {
      if (err) return res.json({ success: false, error: err });
      return res.json({ success: true, data: toolkits });
    });
  });
  
  router.post('/toolkits', (req, res) => {
    const toolkit = new Toolkit();
    // body parser lets us use the req.body
    const { name, author, version,category,link } = req.body;
    console.log("",req.body)
    
    if (!author || !name) {
      // we should throw an error. we can do this check on the front end
      return res.json({
        success: false,
        error: 'You must provide with, at least, an author and name'
      });
    }
    toolkit.name = name;
    toolkit.author = author;
    toolkit.version = version;
    toolkit.category = category;
    toolkit.link = link;
    toolkit.save(err => {
      if (err) return res.json({ success: false, error: err });
      return res.json({ success: true });
    });
  });

//update your toolkit

  router.put('/toolkits/:toolkitId', (req, res) => {
    const { toolkitId } = req.params;
    if (!toolkitId) {
      return res.json({ success: false, error: 'No toolkit id provided' });
    }
    Toolkit.findById(toolkitId, (error, toolkit) => {
      if (error) return res.json({ success: false, error });
      const { author, name } = req.body;
      if (author) toolkit.author = author;
      if (name) toolkit.name = name;
      toolkit.save(error => {
        if (error) return res.json({ success: false, error });
        return res.json({ success: true });
      });
    });
  });
  
  router.delete('/toolkits/:toolkitId', (req, res) => {
    const { toolkitId } = req.params;
    if (!toolkitId) {
      return res.json({ success: false, error: 'No toolkit id provided' });
    }
    Toolkit.remove({ _id: toolkitId }, (error, toolkit) => {
      if (error) return res.json({ success: false, error });
      return res.json({ success: true });
    });
  });




module.exports = router;