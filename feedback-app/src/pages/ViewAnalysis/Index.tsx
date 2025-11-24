import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ArrowLeft, TrendingUp, MessageSquare, BarChart3, AlertCircle } from 'lucide-react'
import { feedbackApi, topicApi } from '@/services/api'
import type { GetSentimentResponse, Topic, Feedback } from '@/services/api'
import { Spinner } from '@/components/ui/spinner'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Slider } from '@/components/ui/slider'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts'

export const ViewAnalysisPage = () => {
  const { topicId } = useParams()
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [topic, setTopic] = useState<Topic | null>(null)
  const [sentiment, setSentiment] = useState<GetSentimentResponse | null>(null)
  const [feedbackMessages, setFeedbackMessages] = useState<Feedback[]>([])

  useEffect(() => {
    const fetchData = async () => {
      if (!topicId) {
        setError('Topic ID is missing.')
        setIsLoading(false)
        return
      }

      try {
        const [topicData, sentimentData, feedbackData] = await Promise.all([
          topicApi.getById(topicId),
          feedbackApi.getSentiment(topicId),
          feedbackApi.getByTopic(topicId)
        ])
        setTopic(topicData)
        setSentiment(sentimentData)
        setFeedbackMessages(feedbackData.feedback)
      } catch (err) {
        console.error('Failed to fetch analysis:', err)
        setError('Failed to load analysis data.')
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [topicId])

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <Card className="max-w-md w-full shadow-xl">
          <CardContent className="flex flex-col items-center justify-center py-12">
            <Spinner className="h-12 w-12 mb-4" />
            <p className="text-slate-600 dark:text-slate-400">Loading analysis...</p>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (error || !topic) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <Card className="max-w-md w-full shadow-xl">
          <CardHeader className="text-center">
            <div className="mx-auto mb-4 h-16 w-16 bg-red-100 dark:bg-red-900 rounded-full flex items-center justify-center">
              <AlertCircle className="h-10 w-10 text-red-600 dark:text-red-400" />
            </div>
            <CardTitle className="text-2xl">Error</CardTitle>
            <CardDescription>{error || 'Failed to load analysis'}</CardDescription>
          </CardHeader>
          <CardContent>
            <Link to="/">
              <Button className="w-full">Return to Home</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    )
  }

  const feedbackCount = sentiment ? parseInt(sentiment.feedback_count) : 0
  const hasNoFeedback = feedbackCount === 0

  // Prepare chart data - sort from oldest to newest
  const chartData = sentiment?.feedback_history
    ?.map((feedback) => ({
      date: new Date(feedback.created_at).toLocaleDateString(),
      score: feedback.sentiment_score,
      sentiment: feedback.sentiment,
      timestamp: new Date(feedback.created_at).getTime()
    }))
    .sort((a, b) => a.timestamp - b.timestamp) || []

  // Get sentiment color
  const getSentimentColor = (score: number) => {
    if (score >= 0.6) return 'text-green-600 dark:text-green-400'
    if (score >= 0.3) return 'text-yellow-600 dark:text-yellow-400'
    return 'text-red-600 dark:text-red-400'
  }

  const getSentimentBgColor = (score: number) => {
    if (score >= 0.6) return 'bg-green-100 dark:bg-green-900'
    if (score >= 0.3) return 'bg-yellow-100 dark:bg-yellow-900'
    return 'bg-red-100 dark:bg-red-900'
  }

  const getSentimentLabel = (score: number) => {
    if (score >= 0.6) return 'Positive'
    if (score >= 0.3) return 'Neutral'
    return 'Negative'
  }

  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
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
              <BarChart3 className="h-8 w-8 text-primary" />
            </div>
            <h1 className="text-4xl font-bold text-slate-900 dark:text-slate-50 mb-3">
              Sentiment Analysis
            </h1>
            <p className="text-lg text-slate-600 dark:text-slate-400">
              {topic.name}
            </p>
          </div>

          {/* No Feedback State */}
          {hasNoFeedback ? (
            <Card className="shadow-xl">
              <CardHeader className="text-center">
                <div className="mx-auto mb-4 h-16 w-16 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
                  <MessageSquare className="h-10 w-10 text-blue-600 dark:text-blue-400" />
                </div>
                <CardTitle className="text-2xl">No Feedback Yet</CardTitle>
                <CardDescription>
                  This topic hasn't received any feedback yet. Share the feedback link to start collecting responses.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Alert>
                  <MessageSquare className="h-4 w-4" />
                  <AlertDescription>
                    Share your feedback link: <br />
                    <code className="text-sm bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded mt-2 inline-block">
                      {window.location.origin}/feedback/{topicId}
                    </code>
                  </AlertDescription>
                </Alert>
                <div className="flex gap-3">
                  <Link to={`/feedback/${topicId}`} className="flex-1">
                    <Button variant="outline" className="w-full">
                      Preview Feedback Form
                    </Button>
                  </Link>
                  <Link to="/" className="flex-1">
                    <Button className="w-full">Back to Home</Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ) : (
            <>
              {/* Overview Stats */}
              <div className="grid md:grid-cols-3 gap-6 mb-8">
                <Card className="shadow-lg">
                  <CardHeader>
                    <CardTitle className="text-sm font-medium text-slate-600 dark:text-slate-400">
                      Total Feedback
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-3xl font-bold">{feedbackCount}</p>
                  </CardContent>
                </Card>

                <Card className="shadow-lg">
                  <CardHeader>
                    <CardTitle className="text-sm font-medium text-slate-600 dark:text-slate-400">
                      Average Sentiment
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className={`text-3xl font-bold ${getSentimentColor(sentiment?.average_sentiment_score || 0)}`}>
                      {getSentimentLabel(sentiment?.average_sentiment_score || 0)}
                    </p>
                  </CardContent>
                </Card>

                <Card className="shadow-lg">
                  <CardHeader>
                    <CardTitle className="text-sm font-medium text-slate-600 dark:text-slate-400">
                      Sentiment Score
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className={`text-3xl font-bold ${getSentimentColor(sentiment?.average_sentiment_score || 0)}`}>
                      {((sentiment?.average_sentiment_score || 0) * 100).toFixed(0)}%
                    </p>
                  </CardContent>
                </Card>
              </div>

              {/* Sentiment Slider */}
              <Card className="shadow-xl mb-8">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5" />
                    Overall Sentiment Score
                  </CardTitle>
                  <CardDescription>
                    Visual representation of the average sentiment across all feedback
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex justify-between text-sm text-slate-600 dark:text-slate-400">
                      <span>Negative</span>
                      <span>Neutral</span>
                      <span>Positive</span>
                    </div>
                    <Slider
                      value={[sentiment?.average_sentiment_score || 0]}
                      max={1}
                      step={0.01}
                      disabled
                      className="w-full"
                    />
                    <div className="text-center">
                      <span className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-semibold ${getSentimentBgColor(sentiment?.average_sentiment_score || 0)} ${getSentimentColor(sentiment?.average_sentiment_score || 0)}`}>
                        {getSentimentLabel(sentiment?.average_sentiment_score || 0)} - {((sentiment?.average_sentiment_score || 0) * 100).toFixed(1)}%
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Sentiment Distribution */}
              <Card className="shadow-xl mb-8">
                <CardHeader>
                  <CardTitle>Sentiment Distribution</CardTitle>
                  <CardDescription>
                    Breakdown of feedback by sentiment category
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {sentiment?.sentiment_distribution && (
                      <>
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium">Positive</span>
                          <div className="flex items-center gap-3 flex-1 ml-4">
                            <div className="flex-1 h-4 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                              <div
                                className="h-full bg-green-500 dark:bg-green-600"
                                style={{ width: `${(sentiment.sentiment_distribution.POSITIVE / feedbackCount) * 100}%` }}
                              />
                            </div>
                            <span className="text-sm font-semibold w-12 text-right">
                              {sentiment.sentiment_distribution.POSITIVE}
                            </span>
                          </div>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium">Neutral</span>
                          <div className="flex items-center gap-3 flex-1 ml-4">
                            <div className="flex-1 h-4 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                              <div
                                className="h-full bg-yellow-500 dark:bg-yellow-600"
                                style={{ width: `${(sentiment.sentiment_distribution.NEUTRAL / feedbackCount) * 100}%` }}
                              />
                            </div>
                            <span className="text-sm font-semibold w-12 text-right">
                              {sentiment.sentiment_distribution.NEUTRAL}
                            </span>
                          </div>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium">Negative</span>
                          <div className="flex items-center gap-3 flex-1 ml-4">
                            <div className="flex-1 h-4 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                              <div
                                className="h-full bg-red-500 dark:bg-red-600"
                                style={{ width: `${(sentiment.sentiment_distribution.NEGATIVE / feedbackCount) * 100}%` }}
                              />
                            </div>
                            <span className="text-sm font-semibold w-12 text-right">
                              {sentiment.sentiment_distribution.NEGATIVE}
                            </span>
                          </div>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium">Mixed</span>
                          <div className="flex items-center gap-3 flex-1 ml-4">
                            <div className="flex-1 h-4 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                              <div
                                className="h-full bg-blue-500 dark:bg-blue-600"
                                style={{ width: `${(sentiment.sentiment_distribution.MIXED / feedbackCount) * 100}%` }}
                              />
                            </div>
                            <span className="text-sm font-semibold w-12 text-right">
                              {sentiment.sentiment_distribution.MIXED}
                            </span>
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Sentiment Over Time Chart */}
              {chartData.length > 0 && (
                <Card className="shadow-xl mb-8">
                  <CardHeader>
                    <CardTitle>Sentiment Development Over Time</CardTitle>
                    <CardDescription>
                      Track how sentiment scores have evolved with each feedback submission
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="w-full h-80">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={chartData}>
                          <CartesianGrid strokeDasharray="3 3" className="stroke-slate-200 dark:stroke-slate-700" />
                          <XAxis 
                            dataKey="date" 
                            className="text-slate-600 dark:text-slate-400"
                            tick={{ fontSize: 12 }}
                          />
                          <YAxis 
                            domain={[0, 1]}
                            className="text-slate-600 dark:text-slate-400"
                            tick={{ fontSize: 12 }}
                          />
                          <Tooltip 
                            contentStyle={{ 
                              backgroundColor: 'var(--color-card)',
                              border: '1px solid var(--color-border)',
                              borderRadius: '0.5rem'
                            }}
                            labelStyle={{ color: 'var(--color-foreground)' }}
                          />
                          <Legend />
                          <Line 
                            type="monotone" 
                            dataKey="score" 
                            stroke="#3b82f6" 
                            strokeWidth={2}
                            dot={{ fill: '#3b82f6', r: 4 }}
                            activeDot={{ r: 6 }}
                            name="Sentiment Score"
                          />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Feedback Messages */}
              {feedbackMessages.length > 0 && (
                <Card className="shadow-xl mb-8">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex flex-col items-start">
                        <CardTitle className="flex items-center gap-2">
                          <MessageSquare className="h-5 w-5" />
                          Feedback Messages
                        </CardTitle>
                        <CardDescription>
                          All customer feedback submissions ({feedbackMessages.length} total)
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">{feedbackMessages
                                .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
                                .map((feedback) => {
                              const sentimentColor = getSentimentColor(feedback.sentiment_score)
                              const sentimentBg = getSentimentBgColor(feedback.sentiment_score)
                              const sentimentLabel = getSentimentLabel(feedback.sentiment_score)
                              
                              return (
                                <div
                                  key={feedback.id}
                                  className="border border-slate-200 dark:border-slate-700 rounded-lg p-4 space-y-3"
                                >
                                  <div className="flex items-start justify-between gap-4">
                                    <div className="flex-1">
                                      <p className="text-slate-700 dark:text-slate-300">
                                        {feedback.comments || 'No comment provided'}
                                      </p>
                                    </div>
                                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold shrink-0 ${sentimentBg} ${sentimentColor}`}>
                                      {sentimentLabel}
                                    </span>
                                  </div>
                                  <div className="flex items-center gap-4 text-xs text-slate-500 dark:text-slate-400">
                                    <span>
                                      {new Date(feedback.created_at).toLocaleDateString()} at {new Date(feedback.created_at).toLocaleTimeString()}
                                    </span>
                                    <span>•</span>
                                    <span>
                                      Score: {(feedback.sentiment_score * 100).toFixed(0)}%
                                    </span>
                                  </div>
                                </div>
                              )
                            })}
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Action Buttons */}
              <div className="flex gap-3">
                <Link to={`/feedback/${topicId}`} className="flex-1">
                  <Button variant="outline" size="lg" className="w-full">
                    <MessageSquare className="mr-2 h-4 w-4" />
                    View Feedback Form
                  </Button>
                </Link>
                <Link to="/" className="flex-1">
                  <Button size="lg" className="w-full">
                    Back to Home
                  </Button>
                </Link>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
