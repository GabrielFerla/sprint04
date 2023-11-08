import { Link } from 'react-router-dom';

function Nav() {
  return (
  
    <header className="header">
      <nav className="headerMenu">
        <ul>
          <Link to="/" className="tlink">Home</Link> {''}
          <Link to="/produto" className="tlink">Produto</Link>
     
        </ul>
      </nav>
    </header>
   
  );
}
export default Nav
