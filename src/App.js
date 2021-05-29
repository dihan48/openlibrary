import React from 'react';
import { Header } from './components/header/Header';
import { ListCards } from './components/listCards/ListCards';
import './App.css';

function App() {
  return (
    <div className="App">
      <Header />
      <ListCards />
    </div>
  );
}

export default App;
