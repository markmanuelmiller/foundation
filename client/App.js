import React from 'react';
import MainControls from './components/MainControls';
import Canvas from './components/Canvas';
import styles from './styles/App.css';

const App = () => {
  return (
    <div className="App">
      <main className={styles.main}>
        <MainControls />
        <Canvas />
      </main>
    </div>
  );
};

export default App;
