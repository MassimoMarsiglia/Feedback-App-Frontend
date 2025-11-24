import { Link } from 'react-router-dom'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { MessageSquare, BarChart3, PlusCircle, Users, TrendingUp, Lightbulb } from 'lucide-react'

export const HomePage = () => {
  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-5xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center justify-center p-2 bg-primary/10 rounded-full mb-4">
              <MessageSquare className="h-8 w-8 text-primary" />
            </div>
            <h1 className="text-5xl font-bold text-slate-900 dark:text-slate-50 mb-4">
              Feedback Collection & Analysis Platform
            </h1>
            <p className="text-xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto mb-8">
              Create feedback topics, gather insights from your customers, and generate powerful analysis to drive better decisions
            </p>
            <Link to="/create-topic">
              <Button size="lg" className="text-lg px-8 py-6">
                <PlusCircle className="mr-2 h-5 w-5" />
                Create New Topic
              </Button>
            </Link>
          </div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <Card className="shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <div className="h-12 w-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center mb-4">
                  <PlusCircle className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                </div>
                <CardTitle>Create Topics</CardTitle>
                <CardDescription>
                  Set up feedback topics in seconds. Define what you want to learn from your audience.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <div className="h-12 w-12 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center mb-4">
                  <Users className="h-6 w-6 text-green-600 dark:text-green-400" />
                </div>
                <CardTitle>Collect Feedback</CardTitle>
                <CardDescription>
                  Share your topic with customers and gather valuable feedback responses effortlessly.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <div className="h-12 w-12 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center mb-4">
                  <BarChart3 className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                </div>
                <CardTitle>Generate Analysis</CardTitle>
                <CardDescription>
                  Get AI-powered insights and analytics to understand sentiment and trends in your feedback.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>

          {/* How It Works */}
          <Card className="shadow-lg mb-12">
            <CardHeader>
              <CardTitle className="text-2xl">How It Works</CardTitle>
              <CardDescription>Get started in three simple steps</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="flex flex-col items-center text-center gap-4">
                  <div className="flex-shrink-0 h-10 w-10 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold">
                    1
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-1">Create a Feedback Topic</h3>
                    <p className="text-slate-600 dark:text-slate-400">
                      Define what you want feedback on - a product feature, service experience, or any area you want to improve.
                    </p>
                  </div>
                </div>
                <div className="flex flex-col items-center text-center gap-4">
                  <div className="flex-shrink-0 h-10 w-10 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold">
                    2
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-1">Share with Your Audience</h3>
                    <p className="text-slate-600 dark:text-slate-400">
                      Get a shareable link and invite customers to submit their feedback on your topic.
                    </p>
                  </div>
                </div>
                <div className="flex flex-col items-center text-center gap-4">
                  <div className="flex-shrink-0 h-10 w-10 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold">
                    3
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-1">Analyze & Take Action</h3>
                    <p className="text-slate-600 dark:text-slate-400">
                      Review AI-generated analysis to identify patterns, sentiment, and actionable insights.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* CTA Section */}
          <div className="text-center bg-primary/5 dark:bg-primary/10 rounded-lg p-8">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Lightbulb className="h-6 w-6 text-primary" />
              <TrendingUp className="h-6 w-6 text-primary" />
            </div>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-50 mb-3">
              Ready to understand your customers better?
            </h2>
            <p className="text-slate-600 dark:text-slate-400 mb-6">
              Create your first feedback topic and start collecting valuable insights today.
            </p>
            <Link to="/create-topic">
              <Button size="lg">
                <PlusCircle className="mr-2 h-5 w-5" />
                Get Started
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}