import { NavLink } from 'react-router-dom'
import { motion } from 'framer-motion'

function Navbar() {
  const linkClass = ({ isActive }) =>
    isActive ? 'nav-link nav-link--active' : 'nav-link'

  const links = [
    { to: '/spell', label: 'Заклинания' },
    { to: '/student', label: 'Студенты' },
    { to: '/mastery', label: 'Освоение' },
  ]

  return (
    <header className="topbar">
      <nav className="container topbar__nav">
        <NavLink to="/" className="brand">
          Hogwarts CRUD
        </NavLink>

        <motion.div
          className="topbar__links"
          initial="hidden"
          animate="show"
          variants={{
            hidden: {},
            show: { transition: { staggerChildren: 0.08, delayChildren: 0.04 } },
          }}
        >
          {links.map((link) => (
            <motion.div
              key={link.to}
              variants={{
                hidden: { opacity: 0, y: -6 },
                show: { opacity: 1, y: 0, transition: { duration: 0.24 } },
              }}
            >
              <NavLink to={link.to} className={linkClass}>
                {link.label}
              </NavLink>
            </motion.div>
          ))}
        </motion.div>
      </nav>
    </header>
  )
}

export default Navbar