import mongoose from 'mongoose';  // Get mongoose object.

mongoose.connect(  // Prepare new database in MongoDB server runing locally on port 27017.
    'mongodb://localhost:27017/exercises',
    {useNewURLParser: true}
)

const db = mongoose.connection;  // Connect to database.

db.once('open', () => {  // Open event called when database connection is successful.
    console.log('Successfully connected to MongoDB using mongoose!');
});

mongoose.set('useCreateIndex', true);  // Create indexes which help with faster querying.

const exerciseSchema = mongoose.Schema({  // User schema to go from JS to MongoDB.
    name: {type: String, required: true},
    reps: {type: Number, required: true},
    weight: {type: Number, required: true},
    unit: {type: String, required: true},
    date: {type: String, required: true}
});

const Exercise = mongoose.model("Exercise", exerciseSchema);  // Compile the model/class from the schema.

// Create new exercise function, based on input parameters. 
const createExercise = async (name, reps, weight, unit, date) => {

    // Call constructor to create new exercise.
    const exercise = new Exercise({name: name, reps: reps, weight: weight, unit: unit, date: date});
    return exercise.save();  // Save exercise to database.
};

// Retrieve exercises function, based on filter if inputed, else retrieve all.
const findExercises = async (filter) => {

    // Find exercises that match filter.
    const query = Exercise.find(filter);
    return query.exec();  // Return exercise documents that match desired criteria.
};

// Update exercise function, will always have _id and one more parameter at least.
const updateExercise = async (id, updates) => {
    let options = {new: true};  // Return object after update was applied.
    let filter = {_id: id}  // id number for filter.

    let updated = await Exercise.findOneAndUpdate(
        filter,  // Search condition for document.
        updates, // Desired updates to be made in object format.
        options  // Optional parameter.
    );
    return updated; // Return updated exercise document.
};

// Delete exercise with passed _id.
const deleteExercise = async (id) => {
    const filter = {_id: id}  // _id filter.

    let deleted = await Exercise.deleteOne(filter);
    return deleted.deletedCount  // Return count for verification purposes.
};

export {createExercise, findExercises, updateExercise, deleteExercise}  // Export all functions.