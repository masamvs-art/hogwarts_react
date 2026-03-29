import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import Navbar from '@/components/Navbar'
import Home from '@/pages/Home'
import SpellList from '@/pages/spell/SpellList'
import SpellAdd from '@/pages/spell/SpellAdd'
import SpellEdit from '@/pages/spell/SpellEdit'
import StudentList from '@/pages/student/StudentList'
import StudentAdd from '@/pages/student/StudentAdd'
import StudentEdit from '@/pages/student/StudentEdit'
import MasteryList from '@/pages/mastery/MasteryList'

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <main className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/spell" element={<SpellList />} />
          <Route path="/spell/add" element={<SpellAdd />} />
          <Route path="/spell/edit/:id" element={<SpellEdit />} />
          <Route path="/student" element={<StudentList />} />
          <Route path="/student/add" element={<StudentAdd />} />
          <Route path="/student/edit/:id" element={<StudentEdit />} />
          <Route path="/mastery" element={<MasteryList />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
    </BrowserRouter>
  )
}

export default App
