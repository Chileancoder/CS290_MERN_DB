import React, {useState} from 'react'; // Import react functionality.
import { useHistory } from 'react-router-dom';  // Import useHistory hook.

function EditExercisePage({exerciseToEdit}) {

    const [name, setName] = useState(exerciseToEdit.name);  // useState functions and variables to update DOM tree as values changes.
    const [reps, setReps] = useState(exerciseToEdit.reps);  // Initialize values to exercise that was clicked on.
    const [weight, setWeight] = useState(exerciseToEdit.weight);
    const [unit, setUnit] = useState(exerciseToEdit.unit);
    const [date, setDate] = useState(exerciseToEdit.date);

    const history = useHistory();  // useHistory hook to go back to homepage.

    const editExercise = async () => {  // addExercise function to be called onclick of add button.

        const editedExercise = {name, reps, weight, unit, date};  // newExercise object to be sent in Post request.
        const response = await fetch(`/exercises/${exerciseToEdit._id}`, {  // Fetch hook to send Post request to rest api using _id.
            method: 'PUT',
            body: JSON.stringify(editedExercise),
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if (response.status === 200){  // If successfully edited exercise show alert. 
            alert(`Successfully edit ${name}`);
        } 
        else {  // If not log error and send error message.
            console.log(`Error occured ${response.status}`);
            alert("Sorry error ocurred, please try again.");
        }
        history.push('/');  // Go back to HomePage once alert pops up regardless of status.
    }

    return (  // Edit exercise form with all inputs and onChange function to set them.
    <div>  
        <h1>Edit Exercise</h1>
        <input 
        type="text"
        value={name}
        onChange={exercise => setName(exercise.target.value)}
        />
        <input 
        type="number"
        value={reps}
        onChange={exercise => setReps(exercise.target.value)}
        />
        <input 
        type="number"
        value={weight}
        onChange={exercise => setWeight(exercise.target.value)}
        />
        <input 
        type="text"
        value={unit}
        onChange={exercise => setUnit(exercise.target.value)}
        />
        <input 
        type="text"
        value={date}
        onChange={exercise => setDate(exercise.target.value)}
        />
        <button onClick={editExercise}>Save</button>
    </div>
    )};
export default EditExercisePage;  // Export EditExercisePage component.