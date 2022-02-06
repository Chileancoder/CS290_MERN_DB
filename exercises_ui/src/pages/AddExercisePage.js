import React, {useState} from 'react'; // Import react functionality.
import { useHistory } from 'react-router-dom';

function AddExercisePage() {  // Page consist of form to add exercise and required functions.

    const [name, setName] = useState('');  // useState functions and variables to update DOM tree as values changes.
    const [reps, setReps] = useState('');
    const [weight, setWeight] = useState('');
    const [unit, setUnit] = useState('');
    const [date, setDate] = useState('');

    const history = useHistory();  // useHistory hook to go back to homepage.

    const addExercise = async () => {  // addExercise function to be called onclick of add button.

        const newExercise = {name, reps, weight, unit, date};  // newExercise object to be sent in Post request.
        const response = await fetch('/exercises', {  // Fetch hook to send Post request to rest api.
            method: 'POST',
            body: JSON.stringify(newExercise),
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if (response.status === 201){  // If successfully added exercise show alert. 
            alert(`Successfully added ${name}`);
        } 
        else {  // If not log error and send error message.
            console.log(`Error occured ${response.status}`);
            alert("Sorry error ocurred, please try again.");
        }
        history.push('/');  // Go back to HomePage once alert pops up regardless of status.
    }

    return (  // Add exercise form with all inputs and onChange function to set them.
    <div>  
        <h1>Add Exercise</h1>
        <input 
        type="text"
        placeholder="Enter exercise name"
        value={name}
        onChange={exercise => setName(exercise.target.value)}
        />
        <input 
        type="number"
        placeholder="Enter number of reps"
        value={reps}
        onChange={exercise => setReps(exercise.target.value)}
        />
        <input 
        type="number"
        placeholder="Enter weight"
        value={weight}
        onChange={exercise => setWeight(exercise.target.value)}
        />
        <input 
        type="text"
        placeholder="Enter weight units"
        value={unit}
        onChange={exercise => setUnit(exercise.target.value)}
        />
        <input 
        type="text"
        placeholder="Enter date mm-dd-yy"
        value={date}
        onChange={exercise => setDate(exercise.target.value)}
        />
        <button onClick={addExercise}>Add</button>
    </div>
    )};

export default AddExercisePage;  // Export AddExercisePage component.