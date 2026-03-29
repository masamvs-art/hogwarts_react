import { NavLink } from 'react-router-dom'

function Navbar() {
  return (
    <header className="topbar">
      <nav className="container topbar__nav">
        <NavLink to="/" className="brand">
          Hogwarts CRUD
        </NavLink>
        <div className="topbar__links">
          <NavLink to="/spell" className="nav-link">
            Заклинания
          </NavLink>
          <NavLink to="/student" className="nav-link">
            Студенты
          </NavLink>
          <NavLink to="/mastery" className="nav-link">
            Освоение
          </NavLink>
        </div>
      </nav>
    </header>
  )
}

export default Navbar
