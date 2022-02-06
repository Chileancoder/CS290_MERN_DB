import React from 'react';  // Import React functionality.
import {MdDelete, MdEdit} from 'react-icons/md';

function GetRow({exercise, onDelete, onEdit}){  // Returns a row of the HTML table with the current exercise information.
    return(
        <tr>
            <td>{exercise.name}</td>
            <td>{exercise.reps}</td>
            <td>{exercise.weight}</td>
            <td>{exercise.unit}</td>
            <td>{exercise.date}</td>
            <td><MdEdit onClick={() => onEdit(exercise)}/></td>
            <td><MdDelete onClick={() => onDelete(exercise._id)}/></td>
        </tr>
    );  // All exercise parameters pulled for HTML table and onDelete function called when MdDelete icon clicked.
}

export default GetRow; // Export GetRow component.