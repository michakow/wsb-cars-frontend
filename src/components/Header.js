import './Header.css';

function Header({ logOut, isLogged }) {
  return (
    <header>
      <h1>WSB Cars - Frontend</h1>
      {isLogged && (
        <div>
          <p>Zalogowano jako {localStorage.getItem('email')}</p>
          <button onClick={logOut}>Wyloguj</button>
        </div>
      )}
    </header>
  );
}

export default Header;
