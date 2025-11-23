import { Routes, Route } from 'react-router-dom'
import { HomePage } from '@/pages/HomePage/Index'
import { CreateTopicPage } from "@/pages/CreateTopic/Index"
import { SubmitFeedbackPage } from '@/pages/SubmitFeedback/Index'
import './App.css'

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/create-topic" element={<CreateTopicPage />} />
      <Route path="/feedback/:topicId" element={<SubmitFeedbackPage />} />
    </Routes>
  )
}

export default App
