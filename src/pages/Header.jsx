import { Outlet, Link } from "react-router-dom";

const Header = () => {
  return (
    <>
      
      <nav className="navBar">
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/movies">Movies</Link>
          </li>
        </ul>
      </nav>
      <hr/>
        <Outlet />
      
    </>
  )
};

export default Header;