import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { ArrowLeft, Send, CheckCircle2, MessageSquare } from 'lucide-react'
import { Alert, AlertDescription } from '@/components/ui/alert'

export const SubmitFeedbackPage = () => {
  const { topicId } = useParams()
  const [isSubmitted, setIsSubmitted] = useState(false)
  
  // Form state
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [feedback, setFeedback] = useState('')
  const [rating, setRating] = useState<number>(0)

  // Mock topic data - in real app, fetch from API using topicId
  const topicName = "New Mobile App Experience"
  const topicDescription = "We'd love to hear your thoughts on our new mobile application"

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    // Here you would send to backend
    console.log('Submitting feedback:', {
      topicId,
      name,
      email,
      feedback,
      rating
    })
    
    setIsSubmitted(true)
    
    // Reset form
    setTimeout(() => {
      setName('')
      setEmail('')
      setFeedback('')
      setRating(0)
    }, 100)
  }

  const handleSubmitAnother = () => {
    setIsSubmitted(false)
  }

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-linear-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 flex items-center justify-center p-4">
        <Card className="max-w-md w-full shadow-xl">
          <CardHeader className="text-center">
            <div className="mx-auto mb-4 h-16 w-16 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center">
              <CheckCircle2 className="h-10 w-10 text-green-600 dark:text-green-400" />
            </div>
            <CardTitle className="text-2xl">Thank You!</CardTitle>
            <CardDescription>
              Your feedback has been successfully submitted
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <p className="text-center text-slate-600 dark:text-slate-400">
              We appreciate you taking the time to share your thoughts. Your input helps us improve!
            </p>
            <div className="flex flex-col gap-2 pt-4">
              <Button onClick={handleSubmitAnother} className="w-full">
                Submit Another Response
              </Button>
              <Link to="/">
                <Button variant="outline" className="w-full">
                  Return to Home
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          {/* Back Button */}
          <Link to="/">
            <Button variant="ghost" className="mb-6">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Home
            </Button>
          </Link>

          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center p-2 bg-primary/10 rounded-full mb-4">
              <MessageSquare className="h-8 w-8 text-primary" />
            </div>
            <h1 className="text-4xl font-bold text-slate-900 dark:text-slate-50 mb-3">
              {topicName}
            </h1>
            <p className="text-lg text-slate-600 dark:text-slate-400">
              {topicDescription}
            </p>
          </div>

          {/* Feedback Form */}
          <Card className="shadow-xl">
            <CardHeader>
              <CardTitle>Share Your Feedback</CardTitle>
              <CardDescription>
                Your honest feedback helps us understand what's working and what needs improvement
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Rating */}
                <div className="space-y-3">
                  <Label>
                    Overall Rating <span className="text-red-500">*</span>
                  </Label>
                  <div className="flex gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setRating(star)}
                        className={`text-4xl transition-all ${
                          star <= rating
                            ? 'text-yellow-400 hover:text-yellow-500'
                            : 'text-slate-300 dark:text-slate-600 hover:text-slate-400'
                        }`}
                      >
                        ★
                      </button>
                    ))}
                  </div>
                  <p className="text-sm text-slate-500 dark:text-slate-400">
                    {rating === 0 && 'Click to rate your experience'}
                    {rating === 1 && 'Poor'}
                    {rating === 2 && 'Fair'}
                    {rating === 3 && 'Good'}
                    {rating === 4 && 'Very Good'}
                    {rating === 5 && 'Excellent'}
                  </p>
                </div>

                {/* Feedback Text */}
                <div className="space-y-2">
                  <Label htmlFor="feedback">
                    Your Feedback <span className="text-red-500">*</span>
                  </Label>
                  <Textarea
                    id="feedback"
                    placeholder="Share your thoughts, suggestions, or concerns..."
                    value={feedback}
                    onChange={(e) => setFeedback(e.target.value)}
                    required
                    rows={6}
                    className="resize-none"
                  />
                  <p className="text-sm text-slate-500 dark:text-slate-400">
                    Be as detailed as you'd like - your insights are valuable to us
                  </p>
                </div>

                {/* Name */}
                <div className="space-y-2">
                  <Label htmlFor="name">
                    Name <span className="text-slate-400">(Optional)</span>
                  </Label>
                  <Input
                    id="name"
                    placeholder="Your name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>

                {/* Email */}
                <div className="space-y-2">
                  <Label htmlFor="email">
                    Email <span className="text-slate-400">(Optional)</span>
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="your.email@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <p className="text-sm text-slate-500 dark:text-slate-400">
                    We'll only use this to follow up if needed
                  </p>
                </div>

                <Alert>
                  <AlertDescription>
                    🔒 Your feedback is confidential and will be used solely for improvement purposes
                  </AlertDescription>
                </Alert>

                {/* Submit Button */}
                <div className="flex gap-3 pt-4">
                  <Button 
                    type="submit" 
                    size="lg" 
                    className="flex-1"
                    disabled={rating === 0 || !feedback.trim()}
                  >
                    <Send className="mr-2 h-5 w-5" />
                    Submit Feedback
                  </Button>
                  <Link to="/" className="flex-1">
                    <Button type="button" variant="outline" size="lg" className="w-full">
                      Cancel
                    </Button>
                  </Link>
                </div>
              </form>
            </CardContent>
          </Card>

          {/* Additional Info */}
          <div className="mt-6 text-center text-sm text-slate-500 dark:text-slate-400">
            <p>Thank you for taking the time to provide your feedback!</p>
          </div>
        </div>
      </div>
    </div>
  )
}
