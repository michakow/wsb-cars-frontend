import { useState } from 'react';
import { Toaster } from 'react-hot-toast';
import AuthView from './components/auth-view/AuthView';
import CarsView from './components/cars-view/CarsView';
import Header from './components/Header';

function App() {
  const [isLogged, setIsLogged] = useState(false);

  function handleLogIn(value) {
    setIsLogged(value);
  }

  function logOut() {
    setIsLogged(false);
    localStorage.clear();
  }

  return (
    <div className="wrapper">
      <Toaster position="bottom-left" />
      <Header logOut={logOut} isLogged={isLogged} />
      <main>
        {isLogged ? (
          <CarsView />
        ) : (
          <AuthView handleLogIn={handleLogIn} />
        )}
      </main>
    </div>
  );
}

export default App;
