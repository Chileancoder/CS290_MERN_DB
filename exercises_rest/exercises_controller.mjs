import * as exercises from './exercises_model.mjs';  // Import model functionality.
import express from 'express';  // Import express functionality.


const app = express();  // Create app instance.

const PORT = 3000;  // Port to be used.

app.use(express.json())  // Middleware that allows app to read http request body in json.

// Create a new exercise with the name, reps, weight, unit and date inputs.
app.post("/exercises", (req, res) => {

    // Calling creatExercise with body parameters, to create new exercise.
    exercises.createExercise(req.body.name, req.body.reps, req.body.weight, req.body.unit, req.body.date)
        .then(exercise => {  // Send back JSON object (sets type to application/json) with response code of 201.
            res.status(201).json(exercise);
        })
        .catch(error => {  // Catch, log and send status 500 and json of exception that caused error.
            console.error(error);
            res.status(500).json(error);
        });
});

// Retrieve all exercise documents, status code 200 response with all users in JSON format.
// For error send code 500 and JSON of error exception.
app.get("/exercises", (req, res) => {

    exercises.findExercises({})  // Calling findExercises using empty filter to get all exercises.
        .then(exercises => {  // Send exercises retrieved JSON object, with code 200 (assumed).
            res.json(exercises);
        })
        .catch(error => {  // Catch, log and send error if unsuccesful in json with status code 500.
            console.error(error);
            res.status(500).json(error);
        });
});

// Update exercise parameters, using updateExercise which searches by _id and then updates the exercise
// based on passed updates. Responds with all properties of updated document including _id, content type
// must be application/json and status code 200.
app.put("/exercises/:id", (req, res) => {

    // Call updateExercise with id and body parameters for update.
    exercises.updateExercise(req.params.id, req.body)   
        .then(exercise => {
            res.json(exercise)  // If succeful respond with updated exercise in JSON and status code 200.
        })
        .catch(error => {  // If not log error and respond with json exception and 500 status code.
            console.error(error)
            res.status(500).json(error)
        })

});

// Delete user with path _id, request does not contain a body. Response code must be 204.
app.delete("/exercises/:id", (req, res) => {

    exercises.deleteExercise(req.params.id)  // Delete user matching _id.
        .then((number) => {
            res.status(204).json(number);  // Respond with status code 204 when deletion successful.
        })
        .catch(error => {  // Catch, log and send error message with status code 500.
            console.error(error);
            res.status(500).json(error);
        });
});

// Listen on port 3000 and log message when server connected.
app.listen(PORT, () => {  
    console.log(`Server listening on port ${PORT}...`);
});
