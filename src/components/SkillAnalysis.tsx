import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Progress } from './ui/progress';
import { Badge } from './ui/badge';

interface Skill {
  name: string;
  level: number;
  category: 'technical' | 'soft' | 'domain';
}

interface SkillGap {
  skill: string;
  importance: number;
  resources: { title: string; url: string }[];
}

const mockSkills: Skill[] = [
  { name: 'JavaScript', level: 85, category: 'technical' },
  { name: 'React', level: 78, category: 'technical' },
  { name: 'Data Analysis', level: 65, category: 'technical' },
  { name: 'Communication', level: 90, category: 'soft' },
  { name: 'Problem Solving', level: 82, category: 'soft' },
  { name: 'Project Management', level: 75, category: 'soft' },
  { name: 'Machine Learning', level: 45, category: 'technical' },
  { name: 'Healthcare Knowledge', level: 60, category: 'domain' },
];

const mockSkillGaps: SkillGap[] = [
  {
    skill: 'Python',
    importance: 90,
    resources: [
      { title: 'Python for Data Science', url: 'https://www.coursera.org/learn/python-for-data-science' },
      { title: 'Python Crash Course', url: 'https://www.udemy.com/course/python-crash-course/' },
    ],
  },
  {
    skill: 'SQL',
    importance: 85,
    resources: [
      { title: 'SQL for Data Analysis', url: 'https://www.udacity.com/course/sql-for-data-analysis--ud198' },
      { title: 'Complete SQL Bootcamp', url: 'https://www.udemy.com/course/the-complete-sql-bootcamp/' },
    ],
  },
  {
    skill: 'Data Visualization',
    importance: 80,
    resources: [
      { title: 'Data Visualization with Tableau', url: 'https://www.coursera.org/learn/data-visualization-tableau' },
      { title: 'D3.js Data Visualization', url: 'https://www.udemy.com/course/d3js-data-visualization/' },
    ],
  },
];

const SkillAnalysis: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisComplete, setAnalysisComplete] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleAnalyzeResume = () => {
    if (!file) return;
    
    setIsAnalyzing(true);
    
    // Simulate API call to Google Cloud Natural Language API
    setTimeout(() => {
      setIsAnalyzing(false);
      setAnalysisComplete(true);
    }, 2000);
  };

  const renderSkillLevel = (level: number) => {
    let label = '';
    let variant: 'default' | 'secondary' | 'destructive' | 'outline' = 'outline';
    
    if (level >= 80) {
      label = 'Expert';
      variant = 'default';
    } else if (level >= 60) {
      label = 'Proficient';
      variant = 'secondary';
    } else if (level >= 40) {
      label = 'Intermediate';
      variant = 'outline';
    } else {
      label = 'Beginner';
      variant = 'destructive';
    }
    
    return <Badge variant={variant}>{label}</Badge>;
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-4">Skill Analysis</h2>
        <p className="text-muted-foreground mb-6">
          Upload your resume or take an assessment to analyze your skills and identify areas for improvement.
        </p>
      </div>

      {!analysisComplete ? (
        <Card>
          <CardHeader>
            <CardTitle>Analyze Your Skills</CardTitle>
            <CardDescription>
              Upload your resume or CV to analyze your skills using AI.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid w-full max-w-sm items-center gap-1.5">
                <Label htmlFor="resume">Upload Resume</Label>
                <Input 
                  id="resume" 
                  type="file" 
                  accept=".pdf,.doc,.docx" 
                  onChange={handleFileChange}
                />
                <p className="text-sm text-muted-foreground">
                  Supported formats: PDF, DOC, DOCX
                </p>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button 
              onClick={handleAnalyzeResume} 
              disabled={!file || isAnalyzing}
            >
              {isAnalyzing ? 'Analyzing...' : 'Analyze Resume'}
            </Button>
          </CardFooter>
        </Card>
      ) : (
        <Tabs defaultValue="skills">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="skills">Current Skills</TabsTrigger>
            <TabsTrigger value="gaps">Skill Gaps</TabsTrigger>
            <TabsTrigger value="recommendations">Recommendations</TabsTrigger>
          </TabsList>
          
          <TabsContent value="skills" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Your Skills Profile</CardTitle>
                <CardDescription>
                  Based on your resume and assessment, here's an analysis of your current skills.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <h3 className="font-semibold mb-3">Technical Skills</h3>
                    <div className="space-y-4">
                      {mockSkills
                        .filter(skill => skill.category === 'technical')
                        .map((skill, index) => (
                          <div key={index} className="space-y-1">
                            <div className="flex justify-between">
                              <span>{skill.name}</span>
                              <span>{renderSkillLevel(skill.level)}</span>
                            </div>
                            <Progress value={skill.level} className="h-2" />
                          </div>
                        ))}
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold mb-3">Soft Skills</h3>
                    <div className="space-y-4">
                      {mockSkills
                        .filter(skill => skill.category === 'soft')
                        .map((skill, index) => (
                          <div key={index} className="space-y-1">
                            <div className="flex justify-between">
                              <span>{skill.name}</span>
                              <span>{renderSkillLevel(skill.level)}</span>
                            </div>
                            <Progress value={skill.level} className="h-2" />
                          </div>
                        ))}
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold mb-3">Domain Knowledge</h3>
                    <div className="space-y-4">
                      {mockSkills
                        .filter(skill => skill.category === 'domain')
                        .map((skill, index) => (
                          <div key={index} className="space-y-1">
                            <div className="flex justify-between">
                              <span>{skill.name}</span>
                              <span>{renderSkillLevel(skill.level)}</span>
                            </div>
                            <Progress value={skill.level} className="h-2" />
                          </div>
                        ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="gaps">
            <Card>
              <CardHeader>
                <CardTitle>Skill Gaps</CardTitle>
                <CardDescription>
                  Based on your career goals, here are the skills you should develop.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {mockSkillGaps.map((gap, index) => (
                    <div key={index} className="pb-4 border-b last:border-0">
                      <div className="flex justify-between items-center mb-2">
                        <h3 className="font-semibold">{gap.skill}</h3>
                        <Badge variant="outline">Importance: {gap.importance}%</Badge>
                      </div>
                      <div className="space-y-2">
                        <p className="text-sm text-muted-foreground">Recommended resources:</p>
                        <ul className="space-y-1">
                          {gap.resources.map((resource, idx) => (
                            <li key={idx} className="text-sm">
                              <a 
                                href={resource.url} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="text-primary hover:underline"
                              >
                                {resource.title}
                              </a>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="recommendations">
            <Card>
              <CardHeader>
                <CardTitle>Personalized Recommendations</CardTitle>
                <CardDescription>
                  Based on your skills and career goals, here are personalized recommendations.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold mb-2">Learning Path</h3>
                    <p className="text-sm text-muted-foreground mb-3">
                      Follow this learning path to achieve your career goals:
                    </p>
                    <ol className="list-decimal pl-5 space-y-2">
                      <li>Complete Python for Data Science course (8 weeks)</li>
                      <li>Learn SQL fundamentals (4 weeks)</li>
                      <li>Practice data visualization techniques (6 weeks)</li>
                      <li>Build a portfolio project combining these skills (4 weeks)</li>
                    </ol>
                  </div>
                  
                  <div className="pt-4">
                    <h3 className="font-semibold mb-2">Certifications to Consider</h3>
                    <ul className="list-disc pl-5 space-y-1">
                      <li>Google Data Analytics Professional Certificate</li>
                      <li>IBM Data Science Professional Certificate</li>
                      <li>Microsoft Certified: Data Analyst Associate</li>
                    </ul>
                  </div>
                  
                  <div className="pt-4">
                    <h3 className="font-semibold mb-2">Career Transition Timeline</h3>
                    <p className="text-sm text-muted-foreground mb-3">
                      Estimated timeline to transition to a Data Analyst role:
                    </p>
                    <div className="bg-muted p-3 rounded-md">
                      <p className="text-sm">
                        Based on your current skills and learning capacity, you could be ready for a 
                        junior Data Analyst position in approximately <strong>6 months</strong> with 
                        dedicated study and practice.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button>Download Full Report</Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      )}
    </div>
  );
};

export default SkillAnalysis;