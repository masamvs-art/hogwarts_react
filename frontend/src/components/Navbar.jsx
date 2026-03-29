import { NavLink } from 'react-router-dom'

function Navbar() {
  const linkClass = ({ isActive }) =>
    isActive ? 'nav-link nav-link--active' : 'nav-link'

  return (
    <header className="topbar">
      <nav className="container topbar__nav">
        <NavLink to="/" className="brand">
          Hogwarts CRUD
        </NavLink>
        <div className="topbar__links">
          <NavLink to="/spell" className={linkClass}>
            Заклинания
          </NavLink>
          <NavLink to="/student" className={linkClass}>
            Студенты
          </NavLink>
          <NavLink to="/mastery" className={linkClass}>
            Освоение
          </NavLink>
        </div>
      </nav>
    </header>
  )
}

export default Navbar
