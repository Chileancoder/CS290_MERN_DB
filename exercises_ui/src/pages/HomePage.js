import React, { useEffect, useState } from 'react';  // Import react functionality.
import { useHistory, Link } from 'react-router-dom';  // Import useHistory hook.
import GetTable from '../components/GetTable';

function HomePage({setExerciseToEdit}) {  // Consist of intro to App and onDelete and loadExercises functions.

    const [exercises, setExercises] = useState([]);  // UseState to update DOM tree when component is updated.
    const history = useHistory()  // 

    const onDelete = async _id => {  // onDelete function to be called when delete icon clicked.

        const response = await fetch(`/exercises/${_id}`, {method: 'DELETE'}); // Send delete request to rest api.

        if (response.status === 204){ // If delete request successful, create new list of updated exercises.
            // Use filter to create new list of exercises, if id equal to passed id don't add to new list.
            const newExercises = exercises.filter(exercise => exercise._id !== _id);  
            setExercises(newExercises);  // Reset state with updates exercises list.
        }
        else{  // If not log error.
            console.error(`Failed to delete exercise with id ${_id}, status code ${response.status}`);
        }
    }

    const onEdit = exercise => {  // Send user to the editExercise page and set exercise to edit when clicked.
        setExerciseToEdit(exercise);
        history.push('/edit_exercise');
    }

    const loadExercises = async () => {  // async function to load data from rest api using fetch hook.
        const response = await fetch('/exercises');  // Fetch data with GET which returns promise so must wait.
        const data = await response.json();  // Parse the json.
        setExercises(data);  // Set state once data is recieved.
    }

    useEffect(() => {  // useEffect hook to call loakExercises function when the page is first loaded.
        loadExercises();
    }, [] );  // Empty array signifies when page is first loaded.

    return (
      <>
        <h2>Exercise App</h2>
        <GetTable exercises={exercises} onDelete={onDelete} onEdit={onEdit}></GetTable>  
        <Link to="/add_exercise">Add Exercise</Link>
      </>
    );// Pass exercises obtained from rest API and onDelete function to child components.
  }
  
  export default HomePage;  // Export home page component.