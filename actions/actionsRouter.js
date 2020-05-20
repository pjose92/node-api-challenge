const express = require('express');

const Actions = require('../data/helpers/actionModel');

const router = express.Router();

router.get('/', (req, res) => {
  const {id} = req.params;
  console.log(id);

  Actions.get(id)
    .then(action => {
      res.status(200).json(action);
    })
    .catch(error => {
      res.status(500).json({message: 'Data could not be located', error: error.message});
    });
});

router.get('/:id', (req, res) => {
  const {id} = req.params;
  console.log(id);

  Actions.get(id)
    .then(action => {
      res.status(200).json(action);
    })
    .catch(error => {
      res.status(500).json({message: 'Data could not be located', error: error.message});
    });
});


// Post is here
router.post('/', (req, res) => {
  const data = req.body;

  Actions.insert(data)
    .then(action => {
      res.status(201).json(action);
    })
    .catch(error => {
      res.status(500).json({message: 'Data could not be posted', error: error.message});
    });
});

router.put('/:id', (req, res) => {
  const {id} = req.params;
  const data = req.body;

  Actions.update(id, data)
    .then(action => {
      res.status(200).json(action);
    })
    .catch(error => {
      res.status(500).json({message: 'Data could not be changed', message: error.message});
    });
});

router.delete('/:id', (req, res) => {
  const {id} = req.params;

  Actions.remove(id)
    .then(action => {
      res.status(200).json(action);
    })
    .catch(error => {
      res.status(500).json({message: 'Data could not be deleted', message: error.message});
    });
});

module.exports = router;