import React from 'react';  // Import react functionality.
import GetRow from './GetRow';  // Import GetRow component functionality.

function GetTable({exercises, onDelete, onEdit}){ // Builds table calling the map function to pass each exercise to getRow component.
    return (
    <table>
      <caption>Exercise List</caption>
        <thead>
          <tr>
            <th>Name</th>
            <th>Reps</th>
            <th>Weight</th>
            <th>Unit</th>
            <th>Date</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
            {exercises.map((exercise, i) => <GetRow exercise={exercise} onDelete={onDelete} onEdit={onEdit} 
            key={i} />)}
        </tbody>
    </table>
    );  // also passes down onDelete function to GetRow component.
}

export default GetTable;  // Export component.