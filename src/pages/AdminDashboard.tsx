import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Building, 
  BarChart3, 
  AlertTriangle,
  FileText,
  Users,
  TrendingUp,
  TrendingDown,
  User,
  Settings,
  LogOut,
  Bell,
  Home,
  Download,
  ExternalLink,
  Target,
  GraduationCap,
  Briefcase,
  DollarSign
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [activeSection, setActiveSection] = useState('home');

  // Sample data - would come from API in real app
  const institutionData = {
    name: "State University",
    type: "Public University",
    adminName: "Dr. John Smith",
    totalStudents: 15420,
    activePrograms: 45
  };

  const employabilityData = {
    overallScore: 78,
    skillGaps: [
      { skill: "Digital Literacy", gap: 35, trend: "up" },
      { skill: "Communication", gap: 28, trend: "down" },
      { skill: "Problem Solving", gap: 42, trend: "up" },
      { skill: "Leadership", gap: 51, trend: "stable" }
    ],
    careerInterests: [
      { field: "Technology", percentage: 32, students: 4934 },
      { field: "Healthcare", percentage: 24, students: 3701 },
      { field: "Business", percentage: 18, students: 2776 },
      { field: "Education", percentage: 14, students: 2159 },
      { field: "Engineering", percentage: 12, students: 1850 }
    ]
  };

  const earlyWarningData = [
    {
      id: 1,
      name: "Sarah Johnson",
      program: "Computer Science",
      year: "3rd Year",
      riskLevel: "high",
      issues: ["Low engagement", "Missed sessions"],
      lastActivity: "2 weeks ago"
    },
    {
      id: 2,
      name: "Mike Chen",
      program: "Business Admin",
      year: "2nd Year",
      riskLevel: "medium",
      issues: ["Inconsistent progress"],
      lastActivity: "5 days ago"
    },
    {
      id: 3,
      name: "Emma Davis",
      program: "Psychology",
      year: "4th Year",
      riskLevel: "low",
      issues: ["Career uncertainty"],
      lastActivity: "1 day ago"
    }
  ];

  const reportsData = [
    {
      title: "Q4 Employability Report",
      type: "Quarterly Analysis",
      generatedDate: "Dec 2024",
      status: "ready",
      insights: 247
    },
    {
      title: "Skills Gap Analysis",
      type: "Comprehensive Study",
      generatedDate: "Nov 2024",
      status: "ready",
      insights: 156
    },
    {
      title: "Career Outcomes Tracking",
      type: "Annual Report",
      generatedDate: "Processing...",
      status: "generating",
      insights: 0
    }
  ];

  const alumniData = {
    totalAlumni: 24567,
    recentPlacements: [
      { company: "Google", role: "Software Engineer", count: 15, avgSalary: "$120k" },
      { company: "Microsoft", role: "Product Manager", count: 12, avgSalary: "$115k" },
      { company: "Apple", role: "UX Designer", count: 8, avgSalary: "$110k" },
      { company: "Amazon", role: "Data Scientist", count: 18, avgSalary: "$125k" }
    ],
    topCareerPaths: [
      { path: "Software Engineering", percentage: 28, growth: "+15%" },
      { path: "Data Science", percentage: 22, growth: "+24%" },
      { path: "Product Management", percentage: 18, growth: "+8%" },
      { path: "Consulting", percentage: 16, growth: "+5%" }
    ]
  };

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

  const getRiskColor = (level: string) => {
    switch (level) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up': return <TrendingUp className="h-4 w-4 text-red-500" />;
      case 'down': return <TrendingDown className="h-4 w-4 text-green-500" />;
      default: return <div className="h-4 w-4 bg-gray-400 rounded-full" />;
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground relative overflow-x-hidden">
      {/* Animated Background Grid */}
      <div className="fixed inset-0 opacity-20 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-primary/10"></div>
        <div 
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, rgb(var(--primary)) 1px, transparent 0)`,
            backgroundSize: '40px 40px',
            animation: 'float 20s ease-in-out infinite'
          }}
        ></div>
      </div>

      {/* Header */}
      <header className="bg-card/80 backdrop-blur-xl border-b border-border sticky top-0 z-50 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gradient-primary rounded-lg shadow-lg icon-float">
                <Building className="h-6 w-6 text-white" />
              </div>
              <h1 className="text-lg sm:text-xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                CareerCompass - Admin
              </h1>
            </div>
            
            <div className="flex items-center gap-2 sm:gap-4">
              <Button variant="ghost" size="sm" className="hover:bg-muted/50 hidden sm:inline-flex">
                <Bell className="h-4 w-4" />
              </Button>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-gradient-primary rounded-full flex items-center justify-center shadow-lg">
                  <User className="h-4 w-4 text-white" />
                </div>
                <span className="text-sm font-medium text-foreground hidden sm:inline">{institutionData.adminName}</span>
              </div>
              <Button variant="outline" size="sm" onClick={handleLogout} className="border-border hover:bg-muted/50">
                <LogOut className="h-4 w-4 sm:mr-2" />
                <span className="hidden sm:inline">Logout</span>
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="flex flex-col lg:flex-row">
        {/* Sidebar */}
        <aside className="w-full lg:w-64 bg-card/60 backdrop-blur-xl border-b lg:border-b-0 lg:border-r border-border min-h-auto lg:min-h-screen p-4 shadow-xl">
          <nav className="flex lg:flex-col gap-2 lg:space-y-2 overflow-x-auto lg:overflow-x-visible">
            {sidebarItems.map((item) => {
              const IconComponent = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveSection(item.id)}
                  className={`flex-shrink-0 lg:w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left transition-all duration-300 ${
                    activeSection === item.id
                      ? 'bg-gradient-primary text-white shadow-lg'
                      : 'text-muted-foreground hover:bg-muted/50 hover:text-foreground'
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
        <main className="flex-1 p-3 sm:p-4 lg:p-6 relative">
          <div className="max-w-7xl mx-auto space-y-4 lg:space-y-6">
            {/* Welcome Section */}
            <div className="bg-gradient-primary rounded-xl p-4 sm:p-6 text-white shadow-2xl">
              <h2 className="text-xl sm:text-2xl font-bold mb-2">Welcome back, {institutionData.adminName}!</h2>
              <p className="text-sm sm:text-base text-white/80 mb-4">
                Manage your institution's career development programs and track student outcomes
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
                <div>
                  <p className="text-xl sm:text-2xl font-bold">{institutionData.totalStudents.toLocaleString()}</p>
                  <p className="text-white/70 text-xs sm:text-sm">Total Students</p>
                </div>
                <div>
                  <p className="text-xl sm:text-2xl font-bold">{institutionData.activePrograms}</p>
                  <p className="text-white/70 text-xs sm:text-sm">Active Programs</p>
                </div>
                <div>
                  <p className="text-xl sm:text-2xl font-bold">{employabilityData.overallScore}%</p>
                  <p className="text-white/70 text-xs sm:text-sm">Employability Score</p>
                </div>
              </div>
            </div>

            {/* Dashboard Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6">
              {/* Employability Dashboard */}
              <Card className="feature-card bg-card/80 backdrop-blur-xl border border-border shadow-2xl">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-foreground">
                    <BarChart3 className="h-5 w-5 text-primary" />
                    Employability Dashboard
                  </CardTitle>
                  <CardDescription className="text-muted-foreground">
                    Student skill gaps and career interests across the institution
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Skill Gaps */}
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3">Top Skill Gaps</h4>
                    <div className="space-y-3">
                      {employabilityData.skillGaps.map((item, index) => (
                        <div key={index} className="flex items-center justify-between">
                          <div className="flex items-center gap-2 flex-1">
                            <span className="font-medium text-sm">{item.skill}</span>
                            {getTrendIcon(item.trend)}
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="w-24 bg-gray-200 rounded-full h-2">
                              <div
                                className="bg-red-500 h-2 rounded-full"
                                style={{ width: `${item.gap}%` }}
                              />
                            </div>
                            <span className="text-sm text-gray-600 w-8">{item.gap}%</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Career Interests */}
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3">Career Interest Distribution</h4>
                    <div className="space-y-2">
                      {employabilityData.careerInterests.map((interest, index) => (
                        <div key={index} className="flex items-center justify-between text-sm">
                          <span className="font-medium">{interest.field}</span>
                          <div className="flex items-center gap-2">
                            <span className="text-gray-600">{interest.students} students</span>
                            <span className="font-bold">{interest.percentage}%</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <Button variant="gradient" className="w-full font-medium py-3 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl">
                    <Target className="h-4 w-4 mr-2" />
                    View Detailed Analytics
                  </Button>
                </CardContent>
              </Card>

              {/* Early Warning System */}
              <Card className="feature-card bg-card/80 backdrop-blur-xl border border-border shadow-2xl">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-foreground">
                    <AlertTriangle className="h-5 w-5 text-primary" />
                    Early Warning System
                  </CardTitle>
                  <CardDescription className="text-muted-foreground">
                    Students who may be at risk of disengaging
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {earlyWarningData.map((student) => (
                    <div key={student.id} className="p-4 bg-muted/20 rounded-lg border border-border">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h4 className="font-semibold text-foreground">{student.name}</h4>
                          <p className="text-sm text-muted-foreground">{student.program} • {student.year}</p>
                        </div>
                        <Badge className={getRiskColor(student.riskLevel)}>
                          {student.riskLevel} risk
                        </Badge>
                      </div>
                      <div className="text-sm text-gray-600 mb-2">
                        Issues: {student.issues.join(", ")}
                      </div>
                      <div className="text-xs text-gray-500">
                        Last activity: {student.lastActivity}
                      </div>
                    </div>
                  ))}
                  <Button className="w-full bg-gradient-to-r from-orange-500 to-red-600">
                    <AlertTriangle className="h-4 w-4 mr-2" />
                    View All At-Risk Students
                  </Button>
                </CardContent>
              </Card>

              {/* AI-Powered Reports */}
              <Card className="feature-card bg-card/80 backdrop-blur-xl border border-border shadow-2xl">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-foreground">
                    <FileText className="h-5 w-5 text-primary" />
                    AI-Powered Reports
                  </CardTitle>
                  <CardDescription className="text-muted-foreground">
                    Automatically generated reports on student employability
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {reportsData.map((report, index) => (
                    <div key={index} className="p-4 bg-muted/20 rounded-lg border border-border">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h4 className="font-semibold text-foreground">{report.title}</h4>
                          <p className="text-sm text-muted-foreground">{report.type}</p>
                        </div>
                        <Badge variant={report.status === 'ready' ? 'default' : 'secondary'} className={report.status === 'ready' ? 'bg-primary/20 text-primary' : ''}>
                          {report.status}
                        </Badge>
                      </div>
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-muted-foreground">{report.generatedDate}</span>
                        {report.status === 'ready' && (
                          <div className="flex items-center gap-2">
                            <span className="text-primary">{report.insights} insights</span>
                            <Button size="sm" variant="outline" className="border-border hover:bg-muted/50">
                              <Download className="h-3 w-3 mr-1" />
                              Download
                            </Button>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                  <Button variant="gradient" className="w-full font-medium py-3 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl">
                    <FileText className="h-4 w-4 mr-2" />
                    Generate New Report
                  </Button>
                </CardContent>
              </Card>

              {/* Alumni Connector & Insights */}
              <Card className="feature-card bg-card/80 backdrop-blur-xl border border-border shadow-2xl">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-foreground">
                    <GraduationCap className="h-5 w-5 text-primary" />
                    Alumni Connector & Insights
                  </CardTitle>
                  <CardDescription className="text-muted-foreground">
                    Career paths and top-hiring companies
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Top Hiring Companies */}
                  <div>
                    <h4 className="font-semibold text-foreground mb-3">Recent Placements</h4>
                    <div className="space-y-2">
                      {alumniData.recentPlacements.map((placement, index) => (
                        <div key={index} className="flex justify-between items-center p-2 bg-muted/20 rounded border border-border">
                          <div>
                            <span className="font-medium text-foreground">{placement.company}</span>
                            <p className="text-sm text-muted-foreground">{placement.role}</p>
                          </div>
                          <div className="text-right">
                            <p className="font-bold text-foreground">{placement.count} placed</p>
                            <p className="text-sm text-muted-foreground">{placement.avgSalary}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Top Career Paths */}
                  <div>
                    <h4 className="font-semibold text-foreground mb-3">Popular Career Paths</h4>
                    <div className="space-y-2">
                      {alumniData.topCareerPaths.map((path, index) => (
                        <div key={index} className="flex justify-between items-center">
                          <span className="font-medium text-sm text-foreground">{path.path}</span>
                          <div className="flex items-center gap-2">
                            <Badge variant="secondary" className="bg-primary/20 text-primary">
                              {path.growth}
                            </Badge>
                            <span className="text-sm font-bold text-foreground">{path.percentage}%</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <Button variant="gradient" className="w-full font-medium py-3 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl">
                    <ExternalLink className="h-4 w-4 mr-2" />
                    Alumni Network Portal
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

export default AdminDashboard;
