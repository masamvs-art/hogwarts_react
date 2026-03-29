import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import Navbar from '@/components/Navbar'
import Home from '@/pages/Home'
import SpellList from '@/pages/spell/SpellList'
import StudentList from '@/pages/student/StudentList'
import MasteryList from '@/pages/mastery/MasteryList'

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <main className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/spell" element={<SpellList />} />
          <Route path="/student" element={<StudentList />} />
          <Route path="/mastery" element={<MasteryList />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
    </BrowserRouter>
  )
}

export default App
