import 'bootstrap/dist/css/bootstrap.css';
import { Link } from "react-router-dom";

function Navbar() {

  return (
      <nav class="navbar bg-info navbar-expand-sm">
        <div class="container-fluid">
          <Link class="nav-link navbar-brand text-light" to="/">StatXo</Link>
        </div>
        <ul class="navbar-nav me-5 ms-2">
          <li class="nav-item">
            <Link class="nav-link text-light text-nowrap" to="/addExcel">Add Data</Link>
          </li>
          <li class="nav-item">
            <Link class="nav-link text-light text-nowrap" to="/getExcel">See Data</Link>
          </li>
        </ul>
      </nav>
  );
}

export default Navbar;