const express = require('express');
const Projects = require('../data/helpers/projectModel.js');

const router = express.Router();


// POST
router.post('/', validateProject, (req, res) => {
  Projects.insert(req.body)
    .then(project => {
      res.status(201).json(project);
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({ message: "Error adding the project to database." });
    })
});

// router.post('/:id/actions', validateAction, (req, res) => {
//   Actions.insert(req.body)
//     .then(action => {
//       res.status(201).json(action);
//     })
//     .catch(error => {
//       console.log(error);
//       res.status(500).json({ message: "Error adding action."})
//     })

// });


// GET 
router.get('/', (req, res) => {
  Projects.get()
    .then(project => {
      res.status(200).json(project);
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({ message: "Error retrieving the projects."})
    })
});

router.get('/:id', validateProjectId, (req, res) => {
  res.status(200).json(req.project)
});

router.get('/:id/actions', validateProjectId, (req, res) => {
  Projects.getProjectActions(req.params.id)
    .then(action => {
      res.status(200).json(action)
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({ message: "Error retrieving actions for the project."})
    })
});

// DELETE

router.delete('/:id', validateProjectId, (req, res) => {
  Projects.remove(req.params.id)
    .then(project => {
      if (project > 0) {
        res.status(200).json({ message: "Project has been deleted." })
      } else {
        res.status(404).json({ message: "Project could not be found."})
      }
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({ message: "Error deleting project from database." })
    })
});


// PUT

router.put('/:id', validateProjectId, validateProject, (req, res) => {
  Projects.update(req.params.id, req.body)
    .then(project => {
      if (project) {
        res.status(200).json(project);
      } else {
        res.status(404).json({ message: "Project could not be found."})
      }
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({ message: "Error retrieving project from database."})
    })
});

//custom middleware

function validateProjectId(req, res, next) {
  const { id } = req.params;
  Projects.get(id)
    .then(project => {
      if (project) {
        req.project = project;
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

function validateProject(req, res, next) {
  const reqBody = req.body;
  const { name, description } = req.body;
  if (!reqBody || reqBody === {}) {
    res.status(400).json({ message: "missing project data" })
  } else if (!name || name === undefined || !description || description === undefined) {
    res.status(400).json({ message: "missing required name or description field" })
  } else {
    next();
  }
}

function validateAction(req, res, next) {
  const reqBody = req.body;
  const { description, notes } = req.body;
  if (!reqBody || reqBody === {}) {
    res.status(400).json({ message: "missing action data" })
  } else if (!description || description === undefined || !notes || notes === undefined) {
    res.status(400).json({ message: "missing required description or notes field" })
  } else {
    next();
  }
}

module.exports = router;

// POST	Create	201 (Created), 'Location' header with link to /customers/{id} containing new ID.	404 (Not Found), 409 (Conflict) if resource already exists..

// GET	Read	200 (OK), list of customers. Use pagination, sorting and filtering to navigate big lists.	200 (OK), single customer. 404 (Not Found), if ID not found or invalid.

// PUT	Update/Replace	405 (Method Not Allowed), unless you want to update/replace every resource in the entire collection.	200 (OK) or 204 (No Content). 404 (Not Found), if ID not found or invalid.

// DELETE	Delete	405 (Method Not Allowed), unless you want to delete the whole collection—not often desirable.	200 (OK). 404 (Not Found), if ID not found or invalid.