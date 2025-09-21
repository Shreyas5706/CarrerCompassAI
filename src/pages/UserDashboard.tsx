import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import Chatbot from '../components/Chatbot';
import CareerRecommendation from '../components/CareerRecommendation';
import SkillAnalysis from '../components/SkillAnalysis';

const UserDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="container mx-auto py-6 px-4">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">Career Compass Dashboard</h1>
          <p className="text-muted-foreground mt-1">
            Your AI-powered career guidance platform
          </p>
        </div>
        <div className="mt-4 md:mt-0">
          <p className="text-sm text-muted-foreground">
            Welcome back, <span className="font-medium">Alex Johnson</span>
          </p>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid grid-cols-4 w-full max-w-3xl mx-auto">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="recommendations">Career Paths</TabsTrigger>
          <TabsTrigger value="skills">Skill Analysis</TabsTrigger>
          <TabsTrigger value="assistant">AI Assistant</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle>Profile Completion</CardTitle>
                <CardDescription>Complete your profile to get better recommendations</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="text-2xl font-bold">75%</div>
                  <div className="text-sm text-muted-foreground">3 items remaining</div>
                </div>
                <div className="w-full bg-muted rounded-full h-2.5 mt-2">
                  <div className="bg-primary h-2.5 rounded-full" style={{ width: '75%' }}></div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle>Skill Assessment</CardTitle>
                <CardDescription>Your skill assessment progress</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="text-2xl font-bold">2/3</div>
                  <div className="text-sm text-muted-foreground">Assessments completed</div>
                </div>
                <div className="w-full bg-muted rounded-full h-2.5 mt-2">
                  <div className="bg-primary h-2.5 rounded-full" style={{ width: '66%' }}></div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle>Learning Progress</CardTitle>
                <CardDescription>Your progress on recommended courses</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="text-2xl font-bold">42%</div>
                  <div className="text-sm text-muted-foreground">Overall completion</div>
                </div>
                <div className="w-full bg-muted rounded-full h-2.5 mt-2">
                  <div className="bg-primary h-2.5 rounded-full" style={{ width: '42%' }}></div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle>Career Path Progress</CardTitle>
                <CardDescription>Your progress towards Data Scientist role</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium">Technical Skills</span>
                      <span className="text-sm">65%</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div className="bg-blue-500 h-2 rounded-full" style={{ width: '65%' }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium">Domain Knowledge</span>
                      <span className="text-sm">40%</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div className="bg-green-500 h-2 rounded-full" style={{ width: '40%' }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium">Projects & Portfolio</span>
                      <span className="text-sm">25%</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div className="bg-amber-500 h-2 rounded-full" style={{ width: '25%' }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium">Certifications</span>
                      <span className="text-sm">50%</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div className="bg-purple-500 h-2 rounded-full" style={{ width: '50%' }}></div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Upcoming Tasks</CardTitle>
                <CardDescription>Recommended next steps</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <div className="mr-2 mt-0.5 h-5 w-5 rounded-full border-2 border-primary flex items-center justify-center">
                      <div className="h-2 w-2 rounded-full bg-primary"></div>
                    </div>
                    <div>
                      <p className="font-medium">Complete Python assessment</p>
                      <p className="text-sm text-muted-foreground">Due in 3 days</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <div className="mr-2 mt-0.5 h-5 w-5 rounded-full border-2 border-primary flex items-center justify-center">
                      <div className="h-2 w-2 rounded-full bg-primary"></div>
                    </div>
                    <div>
                      <p className="font-medium">Update your resume</p>
                      <p className="text-sm text-muted-foreground">Due in 5 days</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <div className="mr-2 mt-0.5 h-5 w-5 rounded-full border-2 border-primary flex items-center justify-center">
                      <div className="h-2 w-2 rounded-full bg-primary"></div>
                    </div>
                    <div>
                      <p className="font-medium">Start SQL course module</p>
                      <p className="text-sm text-muted-foreground">Due in 7 days</p>
                    </div>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="recommendations">
          <CareerRecommendation />
        </TabsContent>

        <TabsContent value="skills">
          <SkillAnalysis />
        </TabsContent>

        <TabsContent value="assistant">
          <div className="max-w-2xl mx-auto">
            <Chatbot />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default UserDashboard;