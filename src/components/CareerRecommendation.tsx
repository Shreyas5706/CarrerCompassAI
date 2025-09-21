import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Progress } from './ui/progress';
import { Badge } from './ui/badge';

interface CareerOption {
  id: string;
  title: string;
  matchPercentage: number;
  description: string;
  requiredSkills: string[];
  growthOutlook: 'High' | 'Medium' | 'Low';
  salaryRange: string;
}

const mockCareerOptions: CareerOption[] = [
  {
    id: '1',
    title: 'Data Scientist',
    matchPercentage: 92,
    description: 'Analyze complex data to help organizations make better decisions.',
    requiredSkills: ['Python', 'Machine Learning', 'Statistics', 'SQL', 'Data Visualization'],
    growthOutlook: 'High',
    salaryRange: '$95,000 - $150,000'
  },
  {
    id: '2',
    title: 'UX/UI Designer',
    matchPercentage: 85,
    description: 'Design user-friendly interfaces and improve user experience for digital products.',
    requiredSkills: ['User Research', 'Wireframing', 'Prototyping', 'Visual Design', 'Figma'],
    growthOutlook: 'Medium',
    salaryRange: '$75,000 - $120,000'
  },
  {
    id: '3',
    title: 'Full Stack Developer',
    matchPercentage: 78,
    description: 'Build and maintain both front-end and back-end components of web applications.',
    requiredSkills: ['JavaScript', 'React', 'Node.js', 'SQL', 'Git'],
    growthOutlook: 'High',
    salaryRange: '$85,000 - $140,000'
  }
];

const CareerRecommendation: React.FC = () => {
  const [selectedCareer, setSelectedCareer] = useState<CareerOption | null>(null);

  const handleSelectCareer = (career: CareerOption) => {
    setSelectedCareer(career);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-4">Career Recommendations</h2>
        <p className="text-muted-foreground mb-6">
          Based on your skills, interests, and assessment results, here are the top career paths that match your profile.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {mockCareerOptions.map((career) => (
          <Card key={career.id} className="hover:shadow-md transition-shadow">
            <CardHeader>
              <CardTitle>{career.title}</CardTitle>
              <CardDescription>Match: {career.matchPercentage}%</CardDescription>
              <Progress value={career.matchPercentage} className="h-2 mt-2" />
            </CardHeader>
            <CardContent>
              <p className="mb-4">{career.description}</p>
              <div className="mb-4">
                <p className="text-sm font-medium mb-2">Key Skills:</p>
                <div className="flex flex-wrap gap-2">
                  {career.requiredSkills.slice(0, 3).map((skill, index) => (
                    <Badge key={index} variant="outline">{skill}</Badge>
                  ))}
                  {career.requiredSkills.length > 3 && (
                    <Badge variant="outline">+{career.requiredSkills.length - 3} more</Badge>
                  )}
                </div>
              </div>
              <div className="flex justify-between text-sm">
                <div>
                  <span className="font-medium">Growth:</span>{' '}
                  <Badge variant={
                    career.growthOutlook === 'High' ? 'default' : 
                    career.growthOutlook === 'Medium' ? 'secondary' : 'outline'
                  }>
                    {career.growthOutlook}
                  </Badge>
                </div>
                <div>
                  <span className="font-medium">Salary:</span> {career.salaryRange}
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button 
                onClick={() => handleSelectCareer(career)}
                variant="outline" 
                className="w-full"
              >
                View Details
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      {selectedCareer && (
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>{selectedCareer.title} Career Path</CardTitle>
            <CardDescription>Detailed information and next steps</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="font-semibold mb-2">Description</h3>
              <p>{selectedCareer.description}</p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Required Skills</h3>
              <div className="flex flex-wrap gap-2">
                {selectedCareer.requiredSkills.map((skill, index) => (
                  <Badge key={index} variant="outline">{skill}</Badge>
                ))}
              </div>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Growth Outlook</h3>
              <p>
                This career has a <Badge variant={
                  selectedCareer.growthOutlook === 'High' ? 'default' : 
                  selectedCareer.growthOutlook === 'Medium' ? 'secondary' : 'outline'
                }>{selectedCareer.growthOutlook}</Badge> growth outlook over the next 5 years.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Salary Range</h3>
              <p>{selectedCareer.salaryRange} annually, depending on experience and location.</p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Recommended Next Steps</h3>
              <ul className="list-disc pl-5 space-y-1">
                <li>Complete the skill assessment to identify gaps</li>
                <li>Explore learning resources for key skills</li>
                <li>Connect with professionals in this field</li>
                <li>Review job listings to understand market requirements</li>
              </ul>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" onClick={() => setSelectedCareer(null)}>
              Back to Recommendations
            </Button>
            <Button>Explore Learning Resources</Button>
          </CardFooter>
        </Card>
      )}
    </div>
  );
};

export default CareerRecommendation;