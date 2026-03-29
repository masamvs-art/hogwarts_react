import { Link } from 'react-router-dom'

function Home() {
  const cards = [
    {
      title: 'Заклинания',
      description: 'Справочник магических заклинаний и их обновление.',
      to: '/spell',
    },
    {
      title: 'Студенты',
      description: 'Учёт учеников, факультетов и курсов обучения.',
      to: '/student',
    },
    {
      title: 'Освоение',
      description: 'Связь учеников и изученных ими заклинаний.',
      to: '/mastery',
    },
  ]

  return (
    <section>
      <h1 className="title">Школа Чародейства и Волшебства</h1>
      <p className="subtitle">Выберите раздел, чтобы начать работу с Hogwarts CRUD.</p>

      <div className="card-grid">
        {cards.map((card) => (
          <Link key={card.to} to={card.to} className="card-link">
            <article className="home-card">
              <h2>{card.title}</h2>
              <p>{card.description}</p>
            </article>
          </Link>
        ))}
      </div>
    </section>
  )
}

export default Home
