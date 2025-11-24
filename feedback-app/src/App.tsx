import { Routes, Route } from 'react-router-dom'
import { HomePage } from '@/pages/HomePage/Index'
import { CreateTopicPage } from "@/pages/CreateTopic/Index"
import { SubmitFeedbackPage } from '@/pages/SubmitFeedback/Index'
import { ViewAnalysisPage } from '@/pages/ViewAnalysis/Index'
import './App.css'

function App() {
  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/create-topic" element={<CreateTopicPage />} />
        <Route path="/feedback/:topicId" element={<SubmitFeedbackPage />} />
        <Route path="/analysis/:topicId" element={<ViewAnalysisPage />} />
      </Routes>
    </div>
  )
}

export default App
