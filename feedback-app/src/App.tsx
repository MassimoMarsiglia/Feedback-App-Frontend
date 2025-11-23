import { Routes, Route } from 'react-router-dom'
import { HomePage } from '@/pages/HomePage/Index'
import { CreateTopicPage } from "@/pages/CreateTopic/Index"
import './App.css'

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/create-topic" element={<CreateTopicPage />} />
    </Routes>
  )
}

export default App
