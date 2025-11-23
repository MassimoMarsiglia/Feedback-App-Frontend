import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { ArrowLeft, PlusCircle, Sparkles } from 'lucide-react'

export const CreateTopicPage = () => {
  const [topicName, setTopicName] = useState('')
  const [topicDescription, setTopicDescription] = useState('')

  const handleCreateTopic = (e: React.FormEvent) => {
    e.preventDefault()
    if (topicName.trim()) {
      // Here you would typically save to backend
      console.log('Creating topic:', { topicName, topicDescription })
      // For now, just navigate back or to a success page
      // navigate('/')
    }
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
              <Sparkles className="h-8 w-8 text-primary" />
            </div>
            <h1 className="text-4xl font-bold text-slate-900 dark:text-slate-50 mb-3">
              Create Feedback Topic
            </h1>
            <p className="text-lg text-slate-600 dark:text-slate-400">
              Set up a new topic to start collecting customer feedback
            </p>
          </div>

          {/* Create Topic Form */}
          <Card className="shadow-xl">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <PlusCircle className="h-5 w-5" />
                Topic Details
              </CardTitle>
              <CardDescription>
                Provide information about what you'd like feedback on
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleCreateTopic} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="topic-name">
                    Topic Name <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="topic-name"
                    placeholder="e.g., New Mobile App Experience"
                    value={topicName}
                    onChange={(e) => setTopicName(e.target.value)}
                    required
                    className="text-lg"
                  />
                  <p className="text-sm text-slate-500 dark:text-slate-400">
                    Give your topic a clear, descriptive name
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="topic-description">
                    Description <span className="text-slate-400">(Optional)</span>
                  </Label>
                  <Textarea
                    id="topic-description"
                    placeholder="Describe what specific aspects you'd like feedback on. This will help participants provide more relevant responses..."
                    value={topicDescription}
                    onChange={(e) => setTopicDescription(e.target.value)}
                    rows={6}
                    className="resize-none"
                  />
                  <p className="text-sm text-slate-500 dark:text-slate-400">
                    Provide context to help your audience give meaningful feedback
                  </p>
                </div>

                <div className="bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
                  <h3 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">
                    💡 Tips for great feedback topics:
                  </h3>
                  <ul className="space-y-1 text-sm text-blue-800 dark:text-blue-200">
                    <li>• Be specific about what you want feedback on</li>
                    <li>• Explain why this feedback matters</li>
                    <li>• Keep the scope focused and manageable</li>
                    <li>• Mention any specific questions you'd like answered</li>
                  </ul>
                </div>

                <div className="flex gap-3 pt-4">
                  <Button type="submit" size="lg" className="flex-1">
                    <PlusCircle className="mr-2 h-5 w-5" />
                    Create Topic
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

          {/* What Happens Next */}
          <Card className="shadow-lg mt-6">
            <CardHeader>
              <CardTitle className="text-lg">What happens after you create this topic?</CardTitle>
            </CardHeader>
            <CardContent>
              <ol className="space-y-3 text-slate-600 dark:text-slate-400">
                <li className="flex gap-3">
                  <span className="font-semibold text-primary">1.</span>
                  <span>You'll receive a unique shareable link for your feedback topic</span>
                </li>
                <li className="flex gap-3">
                  <span className="font-semibold text-primary">2.</span>
                  <span>Share the link with your customers via email, social media, or your website</span>
                </li>
                <li className="flex gap-3">
                  <span className="font-semibold text-primary">3.</span>
                  <span>Customers can easily submit their feedback through the link</span>
                </li>
                <li className="flex gap-3">
                  <span className="font-semibold text-primary">4.</span>
                  <span>View real-time responses and generate AI-powered analysis anytime</span>
                </li>
              </ol>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
