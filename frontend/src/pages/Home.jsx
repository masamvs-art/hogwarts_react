import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useEffect } from 'react'
import AnimatedPage from '@/components/AnimatedPage'

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  show: (index) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.42,
      delay: 0.08 + index * 0.08,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
}

function Home() {
  useEffect(() => {
    document.title = 'Hogwarts CRUD - Главная'
  }, [])

  const cards = [
    {
      title: 'Заклинания',
      icon: '⚡',
      description: 'Справочник магических заклинаний и управление записями.',
      to: '/spell',
    },
    {
      title: 'Студенты',
      icon: '🧙',
      description: 'Факультеты, курсы и статусы студентов Хогвартса.',
      to: '/student',
    },
    {
      title: 'Освоение',
      icon: '🔮',
      description: 'Связи студентов с изученными заклинаниями.',
      to: '/mastery',
    },
  ]

  return (
    <AnimatedPage>
      <h1 className="title">Школа Чародейства и Волшебства</h1>
      <p className="subtitle">
        Управляйте заклинаниями, студентами и прогрессом освоения в одном месте.
      </p>

      <div className="card-grid">
        {cards.map((card, index) => (
          <Link key={card.to} to={card.to} className="card-link">
            <motion.article
              className="home-card"
              variants={cardVariants}
              initial="hidden"
              animate="show"
              custom={index}
              whileHover={{ y: -6, scale: 1.01 }}
              whileTap={{ scale: 0.985 }}
            >
              <h2>
                <span className="card-icon">{card.icon}</span> {card.title}
              </h2>
              <p>{card.description}</p>
            </motion.article>
          </Link>
        ))}
      </div>
    </AnimatedPage>
  )
}

export default Home
