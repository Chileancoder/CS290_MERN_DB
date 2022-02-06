import './App.css';  // Import CSS styles.
import { BrowserRouter as Router, Route } from 'react-router-dom'; // Import SPA functionality.
import HomePage from './pages/HomePage';  // Import page components.
import EditExercisePage from './pages/EditExercisePage';  
import AddExercisePage from './pages/AddExercisePage';
import React, { useState } from 'react';  // Import react and useState hook functionality.

function App() {  

  // State variable and function for exercise to edit, allows for the passing of exercise to edit page, via home page.
  const [exerciseToEdit, setExerciseToEdit] = useState()  

  return ( // App returned in SPA form using router and route to individual page components.
    <body>
    <div className="App">  
      <Router>
        <header className="App-header">
          <Route path="/" exact>  
            <HomePage setExerciseToEdit={setExerciseToEdit}/>
          </Route>
          <Route path="/edit_exercise">
            <EditExercisePage exerciseToEdit={exerciseToEdit}/>
          </Route>
          <Route path="/add_exercise">
            <AddExercisePage />
          </Route>
        </header>
      </Router>
    </div>
    </body>
  );  // Pass items to ShoppingListPage and stores to StoreListPage, also set there paths.
}

export default App;
