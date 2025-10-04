import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Layout } from './components/Layout'
import { ScrollToTop } from './components/ScrollToTop'
import { Home } from './pages/Home'
import { Calendar } from './pages/Calendar'
import { Training } from './pages/Training'
import { TrainingDetail } from './pages/TrainingDetail'
import { Learn } from './pages/Learn'
import { Account } from './pages/Account'
import { Certificates } from './pages/Certificates'

function App() {
  return (
    <Router>
      <ScrollToTop />
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/calendar" element={<Calendar />} />
          <Route path="/training" element={<Training />} />
          <Route path="/training/:id" element={<TrainingDetail />} />
          <Route path="/learn" element={<Learn />} />
          <Route path="/account" element={<Account />} />
          <Route path="/certificates" element={<Certificates />} />
        </Routes>
      </Layout>
    </Router>
  )
}

export default App
