import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { ArrowLeft, PlusCircle, Sparkles, Copy, CheckCircle2, ExternalLink, BarChart3, QrCode } from 'lucide-react'
import { topicApi } from '@/services/api'
import { QRCodeSVG } from 'qrcode.react'

export const CreateTopicPage = () => {
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [createdTopicId, setCreatedTopicId] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [copied, setCopied] = useState(false)

  const handleCreateTopic = async (e: React.FormEvent) => {
    e.preventDefault()
    if (name.trim()) {
      setIsSubmitting(true)
      try {
        const resp = await topicApi.create({ name, description })
        setCreatedTopicId(resp.id)
      } catch (error) {
        console.error('Failed to create topic:', error)
      } finally {
        setIsSubmitting(false)
      }
    }
  }

  const feedbackLink = createdTopicId 
    ? `${window.location.origin}/feedback/${createdTopicId}`
    : ''

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(feedbackLink)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (error) {
      console.error('Failed to copy:', error)
    }
  }

  return (
    <div className="min-h-screen">
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
          {!createdTopicId ? (
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
                      value={name}
                      onChange={(e) => setName(e.target.value)}
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
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
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
                    <Button type="submit" size="lg" className="flex-1" disabled={isSubmitting}>
                      <PlusCircle className="mr-2 h-5 w-5" />
                      {isSubmitting ? 'Creating...' : 'Create Topic'}
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
          ) : (
            <Card className="shadow-xl border-green-200 dark:border-green-800">
              <CardHeader className="bg-green-50 dark:bg-green-950">
                <CardTitle className="flex items-center gap-2 text-green-900 dark:text-green-100">
                  <CheckCircle2 className="h-6 w-6" />
                  Topic Created Successfully!
                </CardTitle>
                <CardDescription className="text-green-700 dark:text-green-300">
                  Your feedback topic "{name}" is ready to share
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-6 space-y-6">
                <div className="space-y-2">
                  <Label className="text-base font-semibold">
                    Share this link to collect feedback:
                  </Label>
                  <div className="flex gap-2">
                    <Input
                      value={feedbackLink}
                      readOnly
                      className="font-mono text-sm"
                    />
                    <Button
                      onClick={copyToClipboard}
                      variant={copied ? "default" : "outline"}
                      className="shrink-0"
                    >
                      {copied ? (
                        <>
                          <CheckCircle2 className="mr-2 h-4 w-4" />
                          Copied!
                        </>
                      ) : (
                        <>
                          <Copy className="mr-2 h-4 w-4" />
                          Copy
                        </>
                      )}
                    </Button>
                  </div>
                  <p className="text-sm text-slate-500 dark:text-slate-400">
                    Share this link with your customers to collect their feedback
                  </p>
                </div>

                {/* QR Code Section */}
                <div className="space-y-2">
                  <Label className="text-base font-semibold">
                    Or scan this QR code:
                  </Label>
                  <div className="flex justify-center p-6 bg-white rounded-lg border border-slate-200 dark:border-slate-700">
                    <QRCodeSVG 
                      value={feedbackLink}
                      size={200}
                      level="H"
                      includeMargin={true}
                    />
                  </div>
                  <p className="text-sm text-slate-500 dark:text-slate-400 text-center">
                    <QrCode className="inline h-4 w-4 mr-1" />
                    Scan to access feedback form instantly
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-3">
                  <Link to={`/feedback/${createdTopicId}`} className="flex-1">
                    <Button variant="outline" size="lg" className="w-full">
                      <ExternalLink className="mr-2 h-4 w-4" />
                      Preview Feedback Form
                    </Button>
                  </Link>
                  <Link to={`/analysis/${createdTopicId}`} className="flex-1">
                    <Button variant="outline" size="lg" className="w-full">
                      <BarChart3 className="mr-2 h-4 w-4" />
                      View Analysis
                    </Button>
                  </Link>
                  <Link to="/" className="flex-1">
                    <Button size="lg" className="w-full">
                      Back to Home
                    </Button>
                  </Link>
                </div>

                <div className="bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
                  <h3 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">
                    📋 Next Steps:
                  </h3>
                  <ol className="space-y-2 text-sm text-blue-800 dark:text-blue-200">
                    <li>1. Copy and share the feedback link with your audience</li>
                    <li>2. Customers can submit feedback through the link</li>
                    <li>3. View analysis page to track sentiment and responses</li>
                  </ol>
                </div>
              </CardContent>
            </Card>
          )}

          {/* What Happens Next */}
          {!createdTopicId && (
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
          )}
        </div>
      </div>
    </div>
  )
}
