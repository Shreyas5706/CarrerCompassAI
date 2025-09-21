import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { 
  Brain, 
  Target, 
  BarChart3, 
  BookOpen, 
  MessageCircle,
  TrendingUp,
  Award,
  Star,
  Play,
  Clock,
  CheckCircle,
  ArrowRight,
  User,
  Settings,
  LogOut,
  Bell,
  Home
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const StudentDashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [activeSection, setActiveSection] = useState('home');

  // Sample data - would come from API in real app
  const userData = {
    name: "Alex Johnson",
    currentLevel: "Undergraduate",
    institution: "State University",
    fieldOfStudy: "Computer Science"
  };

  const careerRecommendations = [
    {
      title: "Software Engineer",
      match: 92,
      description: "Perfect match for your programming skills",
      growth: "+13% job growth",
      avgSalary: "$85,000"
    },
    {
      title: "Data Scientist",
      match: 87,
      description: "Great fit for your analytical mindset",
      growth: "+22% job growth",
      avgSalary: "$95,000"
    },
    {
      title: "Product Manager",
      match: 79,
      description: "Combines tech and business skills",
      growth: "+18% job growth",
      avgSalary: "$110,000"
    }
  ];

  const skillsData = [
    { name: "Programming", current: 85, target: 90, color: "bg-blue-500" },
    { name: "Problem Solving", current: 78, target: 85, color: "bg-green-500" },
    { name: "Communication", current: 65, target: 80, color: "bg-yellow-500" },
    { name: "Project Management", current: 45, target: 75, color: "bg-red-500" },
    { name: "Data Analysis", current: 70, target: 85, color: "bg-purple-500" }
  ];

  const learningResources = [
    {
      title: "Advanced React Development",
      type: "Course",
      provider: "TechAcademy",
      duration: "8 weeks",
      rating: 4.8,
      enrolled: false
    },
    {
      title: "Data Structures & Algorithms",
      type: "Practice",
      provider: "CodeMaster",
      duration: "Self-paced",
      rating: 4.9,
      enrolled: true
    },
    {
      title: "System Design Fundamentals",
      type: "Workshop",
      provider: "TechConf",
      duration: "3 days",
      rating: 4.7,
      enrolled: false
    }
  ];

  const handleLogout = () => {
    localStorage.removeItem('userRole');
    localStorage.removeItem('userData');
    toast({
      title: "Logged Out",
      description: "You have been successfully logged out.",
    });
    navigate('/');
  };

  const sidebarItems = [
    { id: 'home', label: 'Dashboard', icon: Home },
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Animated Grid Background */}
      <div className="fixed inset-0 animated-grid opacity-20 pointer-events-none"></div>
      
      {/* Header */}
      <header className="relative z-10 bg-card/80 backdrop-blur-xl border-b border-border sticky top-0">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gradient-primary rounded-lg icon-float">
                <Brain className="h-6 w-6 text-white" />
              </div>
              <h1 className="text-lg sm:text-xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                CareerCompass
              </h1>
            </div>
            
            <div className="flex items-center gap-2 sm:gap-4">
              <Button variant="ghost" size="sm" className="text-foreground hover:bg-muted/20 hidden sm:inline-flex">
                <Bell className="h-4 w-4" />
              </Button>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-gradient-primary rounded-full flex items-center justify-center">
                  <User className="h-4 w-4 text-white" />
                </div>
                <span className="text-sm font-medium text-foreground hidden sm:inline">{userData.name}</span>
              </div>
              <Button variant="outline" size="sm" onClick={handleLogout} className="border-border text-foreground hover:bg-muted/20">
                <LogOut className="h-4 w-4 sm:mr-2" />
                <span className="hidden sm:inline">Logout</span>
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="relative z-10 flex flex-col lg:flex-row">
        {/* Sidebar */}
        <aside className="w-full lg:w-64 bg-card/60 backdrop-blur-sm border-b lg:border-b-0 lg:border-r border-border min-h-auto lg:min-h-screen p-4">
          <nav className="flex lg:flex-col gap-2 lg:space-y-2 overflow-x-auto lg:overflow-x-visible">
            {sidebarItems.map((item) => {
              const IconComponent = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveSection(item.id)}
                  className={`flex-shrink-0 lg:w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left transition-colors ${
                    activeSection === item.id
                      ? 'bg-gradient-primary text-white'
                      : 'text-foreground hover:bg-muted/20'
                  }`}
                >
                  <IconComponent className="h-4 w-4" />
                  <span className="hidden sm:inline">{item.label}</span>
                </button>
              );
            })}
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-3 sm:p-4 lg:p-6">
          <div className="max-w-6xl mx-auto space-y-4 lg:space-y-6">
            {/* Welcome Section */}
            <div className="bg-gradient-primary rounded-xl p-4 sm:p-6 text-white">
              <h2 className="text-xl sm:text-2xl font-bold mb-2">Welcome back, {userData.name}!</h2>
              <p className="text-sm sm:text-base text-white/90">
                Continue your journey to discover your perfect career path
              </p>
            </div>

            {/* Dashboard Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6">
              {/* Career Compass */}
              <Card className="feature-card bg-card/80 backdrop-blur-xl border border-border shadow-2xl">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-foreground">
                    <Target className="h-5 w-5 text-primary" />
                    Career Compass
                  </CardTitle>
                  <CardDescription className="text-muted-foreground">
                    Your top recommended career paths
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {careerRecommendations.map((career, index) => (
                    <div key={index} className="p-4 bg-muted/20 rounded-lg border border-border">
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-semibold text-foreground">{career.title}</h4>
                        <Badge variant="secondary" className="bg-primary/20 text-primary">
                          {career.match}% match
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">{career.description}</p>
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span>{career.growth}</span>
                        <span>Avg: {career.avgSalary}</span>
                      </div>
                    </div>
                  ))}
                  <Button variant="gradient" className="w-full font-medium py-3 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl">
                    Explore More Careers
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                </CardContent>
              </Card>

              {/* Skill Scorecard */}
              <Card className="feature-card bg-card/80 backdrop-blur-xl border border-border shadow-2xl">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-foreground">
                    <BarChart3 className="h-5 w-5 text-primary" />
                    Skill Scorecard
                  </CardTitle>
                  <CardDescription className="text-muted-foreground">
                    Your skills vs target career requirements
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {skillsData.map((skill, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="font-medium text-foreground">{skill.name}</span>
                        <span className="text-muted-foreground">{skill.current}%</span>
                      </div>
                      <div className="w-full bg-muted/30 rounded-full h-2">
                        <div className="relative">
                          <div
                            className="h-2 rounded-full bg-gradient-primary"
                            style={{ width: `${skill.current}%` }}
                          />
                          <div
                            className="absolute top-0 h-2 w-0.5 bg-muted-foreground"
                            style={{ left: `${skill.target}%` }}
                          />
                        </div>
                      </div>
                      <div className="text-xs text-muted-foreground">
                        Target: {skill.target}%
                      </div>
                    </div>
                  ))}
                  <Button variant="gradient" className="w-full font-medium py-3 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl">
                    View Detailed Analysis
                    <BarChart3 className="h-4 w-4 ml-2" />
                  </Button>
                </CardContent>
              </Card>

              {/* Learning Hub */}
              <Card className="feature-card bg-card/80 backdrop-blur-xl border border-border shadow-2xl">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-foreground">
                    <BookOpen className="h-5 w-5 text-primary" />
                    Learning Hub
                  </CardTitle>
                  <CardDescription className="text-muted-foreground">
                    Personalized learning resources and courses
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {learningResources.map((resource, index) => (
                    <div key={index} className="p-4 bg-muted/20 rounded-lg border border-border">
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-semibold text-foreground">{resource.title}</h4>
                        {resource.enrolled && (
                          <Badge variant="secondary" className="bg-primary/20 text-primary">
                            Enrolled
                          </Badge>
                        )}
                      </div>
                      <div className="flex justify-between items-center text-sm text-muted-foreground">
                        <span>{resource.type} • {resource.provider}</span>
                        <div className="flex items-center gap-1">
                          <Star className="h-3 w-3 fill-primary text-primary" />
                          <span>{resource.rating}</span>
                        </div>
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">{resource.duration}</p>
                    </div>
                  ))}
                  <Button variant="gradient" className="w-full font-medium py-3 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl">
                    Browse All Resources
                    <BookOpen className="h-4 w-4 ml-2" />
                  </Button>
                </CardContent>
              </Card>

              {/* AI Interview Coach */}
              <Card className="feature-card bg-card/80 backdrop-blur-xl border border-border shadow-2xl">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-foreground">
                    <MessageCircle className="h-5 w-5 text-primary" />
                    AI Interview Coach
                  </CardTitle>
                  <CardDescription className="text-muted-foreground">
                    Practice interviews with AI-powered feedback
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-center py-6">
                    <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                      <Brain className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="text-lg font-semibold text-foreground mb-2">
                      Ready for your next interview?
                    </h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Practice with our AI coach and get personalized feedback to improve your performance
                    </p>
                    <div className="grid grid-cols-2 gap-2 text-xs text-muted-foreground mb-4">
                      <div className="flex items-center gap-1">
                        <CheckCircle className="h-3 w-3 text-primary" />
                        Real-time feedback
                      </div>
                      <div className="flex items-center gap-1">
                        <CheckCircle className="h-3 w-3 text-primary" />
                        Industry-specific
                      </div>
                      <div className="flex items-center gap-1">
                        <CheckCircle className="h-3 w-3 text-primary" />
                        Progress tracking
                      </div>
                      <div className="flex items-center gap-1">
                        <CheckCircle className="h-3 w-3 text-primary" />
                        24/7 available
                      </div>
                    </div>
                  </div>
                  <Button variant="gradient" className="w-full font-medium py-3 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl text-lg">
                    <Play className="h-5 w-5 mr-2" />
                    Start Mock Interview
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default StudentDashboard;
