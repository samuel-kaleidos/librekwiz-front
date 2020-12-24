import React from 'react';
import { Router } from "@reach/router"
import { Home } from "./pages/Home/Home"
import { Admin } from "./pages/Admin/Admin"
import { Game } from "./pages/Game/Game"
import { PinCode } from "./pages/PinCode/PinCode"
import { EditGame } from "./pages/EditGame/EditGame"
import { CreateNewKwiz } from "./pages/CreateNewKwiz/CreateNewKwiz"
import './App.css';

const App = () => {
  return (
      <div className="App">
        <Router>
          <Home path='/' />
          <Admin path='/admin' />
          <EditGame path='/admin/:id' />
          <Game path='/game/:pincode/:name' />
          <PinCode path='/game/:admin' />
          <CreateNewKwiz path='/create'/>
        </Router>
      </div>
  );
}

export default App;
