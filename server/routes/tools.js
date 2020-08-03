
const express = require("express");
// const { isLoggedIn } = require("../middlewares");
const router = express.Router();
import Tool from '../models/Tool';

/*router.get('/', (req, res) => {
  res.json({ message: 'Hello, World!' });
});*/

router.get('/tools', (req, res) => {
    console.log("route to show all tools");
    Tool.find((err, tools) => {
      if (err) {return res.json({ success: false, error: err });}
      else {
          console.log("Tools called");
          return res.json({ success: true, data: tools });
      }
        });
  });

router.get("/tools/:toolId", async (req, res) => {
    try {
        const tool = await Tool.findOne({ _id: req.params.toolId });
        res.send(tool);
    } catch (error) {
        res.status(404);
        res.send({ error: "Tool doesn't exist!" });
    }
});
  
  router.post('/tools', (req, res) => {
    const tool = new Tool();
    // body parser lets us use the req.body
    const { name, skill, toolkits} = req.body;
    console.log("creating tool",req.body);
    
    if (!name) {
      // we should throw an error. we can do this check on the front end
      return res.json({
        success: false,
        error: 'You must provide with, at least, a name'
      });
    }
    tool.name = name;
    tool.skill = skill;
    tool.toolkits = toolkits;
    tool.save(err => {
      if (err) return res.json({ success: false, error: err });
      return res.json({ success: true });
    });
  });

//update your tool
  router.put('/tools/:toolId', (req, res) => {
      const { toolId } = req.params;
      if (!toolId) {
      return res.json({ success: false, error: 'No tool id provided' });
    }
    Tool.findById(toolId, (error, tool) => {
      if (error) return res.json({ success: false, error });
      const { name } = req.body;
      if (name) tool.name = name;
      tool.save(error => {
        if (error) return res.json({ success: false, error });
        return res.json({ success: true });
      });
    });
  });
  
  //delete your tool
  router.delete('/tool/:toolId', (req, res) => {
    const { toolId } = req.params;
   
      if (!toolId) {
      return res.json({ success: false, error: 'No tool id provided' });
    }
      Tool.remove({ _id: toolId }, (error, toolId) => {
      if (error) return res.json({ success: false, error });
        return res.json({ success: true, message: `Your tool was removed`});
    });
  });


module.exports = router;