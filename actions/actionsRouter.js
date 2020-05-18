const express = require('express');
const Actions = require('../data/helpers/actionModel.js');
const router = express.Router();


// GET
router.get('/', (req, res) => {
  Actions.get()
    .then(action => {
      res.status(200).json(action);
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({ message: "Error retrieving the actions."})
    })
});

router.get('/:id', validateActionId, (req, res) => {
  res.status(200).json(req.action)
});


// DELETE
router.delete('/:id', validateActionId, (req, res) => {
  Actions.remove(req.params.id)
    .then(action => {
      if (action > 0) {
        res.status(200).json({ message: "Action has been deleted." })
      } else {
        res.status(404).json({ message: "Action could not be found."})
      }
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({ message: "Error deleting action from database." })
    })
});


// PUT
router.put('/:id', validateActionId, (req, res) => {
  Actions.update(req.params.id, req.body)
    .then(action => {
      if (action) {
        res.status(200).json(action);
      } else {
        res.status(404).json({ message: "Action could not be found."})
      }
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({ message: "Error retrieving action from database."})
    })
});

// custom middleware

function validateActionId(req, res, next) {
  const { id } = req.params;
  Actions.get(id)
    .then(action => {
      if (action) {
        req.action = action;
        next();
      } else {
        next(new Error("invalid project id"))
      }
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({ message: "exception", error})
    })

}

module.exports = router;