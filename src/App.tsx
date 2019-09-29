import React from 'react';
import './App.css';

import Chat from './components/Chat';
import store from './store';
import StoreContext from './store/StoreContext';

const App: React.FC = () => {
  return (
    <StoreContext.Provider value={store}>
      <div className="App">
        <header className="App-header">
          <p>Emoji picker demo</p>
        </header>
        <Chat />
      </div>
    </StoreContext.Provider>
  );
};

export default App;
