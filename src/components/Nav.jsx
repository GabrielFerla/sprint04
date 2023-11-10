import { Link } from 'react-router-dom';
import '../css/style.css';

function Nav() {
  return (
  
    <header className="header">
    <nav className="headerMenu">
      <ul>
        <li><Link to="/" className="tlink">Home</Link></li>
        <li><Link to="/produto" className="tlink">Produto</Link></li>
      </ul>
    </nav>
  </header>
   
  );
}
export default Nav
