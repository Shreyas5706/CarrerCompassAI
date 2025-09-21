import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  Users, 
  Calendar, 
  Clock, 
  Search,
  FileText,
  BarChart3,
  MapPin,
  TrendingUp,
  User,
  Settings,
  LogOut,
  Bell,
  Home,
  MessageCircle,
  Target,
  BookOpen,
  CheckCircle,
  Phone,
  Video,
  Mail
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const CounselorDashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [activeSection, setActiveSection] = useState('home');
  const [selectedStudent, setSelectedStudent] = useState<any>(null);

  // Sample data - would come from API in real app
  const counselorData = {
    name: "Dr. Sarah Chen",
    specialization: "Career Counseling",
    experience: "8 years",
    rating: 4.9
  };

  const upcomingSessions = [
    {
      id: 1,
      studentName: "Emma Rodriguez",
      time: "10:00 AM",
      duration: "45 min",
      type: "Career Planning",
      status: "confirmed",
      avatar: "ER",
      priority: "high"
    },
    {
      id: 2,
      studentName: "Michael Thompson",
      time: "2:30 PM",
      duration: "30 min",
      type: "Skill Assessment",
      status: "pending",
      avatar: "MT",
      priority: "medium"
    },
    {
      id: 3,
      studentName: "Lisa Chang",
      time: "4:00 PM",
      duration: "60 min",
      type: "Interview Prep",
      status: "confirmed",
      avatar: "LC",
      priority: "high"
    }
  ];

  const recentStudents = [
    {
      id: 1,
      name: "Emma Rodriguez",
      program: "Computer Science",
      year: "3rd Year",
      lastSession: "2 days ago",
      progress: 78,
      careerGoal: "Software Engineer",
      skillGaps: ["System Design", "Advanced Algorithms"],
      avatar: "ER"
    },
    {
      id: 2,
      name: "Michael Thompson",
      program: "Business Administration",
      year: "2nd Year",
      lastSession: "1 week ago",
      progress: 65,
      careerGoal: "Product Manager",
      skillGaps: ["Data Analysis", "Technical Knowledge"],
      avatar: "MT"
    },
    {
      id: 3,
      name: "Lisa Chang",
      program: "Psychology",
      year: "4th Year",
      lastSession: "3 days ago",
      progress: 82,
      careerGoal: "UX Researcher",
      skillGaps: ["Statistics", "User Testing"],
      avatar: "LC"
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

  const handleStudentSelect = (student: any) => {
    setSelectedStudent(student);
  };

  const renderStudentPanel = () => {
    if (!selectedStudent) {
      return (
        <div className="text-center py-12">
          <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-medium text-foreground mb-2">Select a Student</h3>
          <p className="text-muted-foreground">Choose a student from the list to view their details and tools</p>
        </div>
      );
    }

    return (
      <div className="space-y-6">
        {/* Student Header */}
        <div className="bg-gradient-primary rounded-xl p-6 text-white shadow-2xl">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center shadow-lg">
              <span className="text-lg font-bold">{selectedStudent.avatar}</span>
            </div>
            <div>
              <h2 className="text-2xl font-bold">{selectedStudent.name}</h2>
              <p className="text-white/80">{selectedStudent.program} • {selectedStudent.year}</p>
              <p className="text-white/80">Career Goal: {selectedStudent.careerGoal}</p>
            </div>
          </div>
        </div>

        {/* Four Key Features */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6">
          {/* Smart Session Brief */}
          <Card className="feature-card bg-card/80 backdrop-blur-xl border border-border shadow-2xl">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-foreground">
                <FileText className="h-5 w-5 text-primary" />
                Smart Session Brief
              </CardTitle>
              <CardDescription className="text-muted-foreground">
                AI-generated summary of student's profile
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 bg-primary/10 rounded-lg border border-primary/20">
                <h4 className="font-semibold text-primary mb-2">Quick Insights</h4>
                <ul className="space-y-2 text-sm text-foreground">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-primary" />
                    Strong programming fundamentals
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-primary" />
                    Active in coding competitions
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-primary" />
                    Needs improvement in soft skills
                  </li>
                </ul>
              </div>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-muted-foreground">Progress:</span>
                  <div className="w-full bg-muted/30 rounded-full h-2 mt-1">
                    <div 
                      className="bg-gradient-primary h-2 rounded-full" 
                      style={{ width: `${selectedStudent.progress}%` }}
                    />
                  </div>
                </div>
                <div>
                  <span className="text-muted-foreground">Last Session:</span>
                  <p className="font-medium text-foreground">{selectedStudent.lastSession}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Live Skill Match */}
          <Card className="feature-card bg-card/80 backdrop-blur-xl border border-border shadow-2xl">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-foreground">
                <BarChart3 className="h-5 w-5 text-primary" />
                Live Skill Match
              </CardTitle>
              <CardDescription className="text-muted-foreground">
                Compare student skills vs job requirements
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                {["Programming", "Problem Solving", "Communication", "Teamwork"].map((skill, index) => {
                  const level = [85, 78, 60, 72][index];
                  return (
                    <div key={skill} className="space-y-1">
                      <div className="flex justify-between text-sm">
                        <span className="font-medium text-foreground">{skill}</span>
                        <span className="text-muted-foreground">{level}%</span>
                      </div>
                      <div className="w-full bg-muted/30 rounded-full h-2">
                        <div
                          className="bg-gradient-primary h-2 rounded-full"
                          style={{ width: `${level}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
              <Button variant="gradient" className="w-full font-medium py-3 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl">
                Generate Skill Report
              </Button>
            </CardContent>
          </Card>

          {/* Roadmap Studio */}
          <Card className="feature-card bg-card/80 backdrop-blur-xl border border-border shadow-2xl">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-foreground">
                <MapPin className="h-5 w-5 text-primary" />
                Roadmap Studio
              </CardTitle>
              <CardDescription className="text-muted-foreground">
                Collaborative learning roadmap builder
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <h4 className="font-semibold text-foreground">Current Focus Areas</h4>
                {selectedStudent.skillGaps.map((gap: string, index: number) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-primary/10 rounded-lg border border-primary/20">
                    <span className="font-medium text-foreground">{gap}</span>
                    <Badge variant="secondary" className="bg-primary/20 text-primary">
                      In Progress
                    </Badge>
                  </div>
                ))}
              </div>
              <Button variant="gradient" className="w-full font-medium py-3 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl">
                <Target className="h-4 w-4 mr-2" />
                Build Learning Path
              </Button>
            </CardContent>
          </Card>

          {/* Progress Timeline */}
          <Card className="feature-card bg-card/80 backdrop-blur-xl border border-border shadow-2xl">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-foreground">
                <TrendingUp className="h-5 w-5 text-primary" />
                Progress Timeline
              </CardTitle>
              <CardDescription className="text-muted-foreground">
                Student's completed milestones and achievements
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                {[
                  { milestone: "Career Assessment Complete", date: "2 weeks ago", status: "completed" },
                  { milestone: "Resume Workshop", date: "1 week ago", status: "completed" },
                  { milestone: "Mock Interview #1", date: "3 days ago", status: "completed" },
                  { milestone: "Portfolio Review", date: "Scheduled", status: "upcoming" }
                ].map((item, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className={`w-3 h-3 rounded-full ${
                      item.status === 'completed' ? 'bg-primary' : 'bg-muted-foreground'
                    }`} />
                    <div className="flex-1">
                      <p className="font-medium text-foreground">{item.milestone}</p>
                      <p className="text-sm text-muted-foreground">{item.date}</p>
                    </div>
                  </div>
                ))}
              </div>
              <Button variant="gradient" className="w-full font-medium py-3 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl">
                View Full Timeline
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
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
                <Users className="h-6 w-6 text-white" />
              </div>
              <h1 className="text-lg sm:text-xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                CareerCompass - Counselor
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
                <span className="text-sm font-medium text-foreground hidden sm:inline">{counselorData.name}</span>
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
              <h2 className="text-xl sm:text-2xl font-bold mb-2">Welcome back, {counselorData.name}!</h2>
              <p className="text-sm sm:text-base text-white/80">
                Help students discover their potential with personalized guidance
              </p>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 lg:gap-6">
              {/* Left Column - Sessions List */}
              <div className="xl:col-span-1 space-y-4 lg:space-y-6">
                {/* Upcoming Sessions */}
                <Card className="feature-card bg-card/80 backdrop-blur-xl border border-border shadow-2xl">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-foreground">
                      <Calendar className="h-5 w-5 text-primary" />
                      Upcoming Sessions
                    </CardTitle>
                    <CardDescription className="text-muted-foreground">
                      Today's scheduled appointments
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {upcomingSessions.map((session) => (
                      <div 
                        key={session.id} 
                        className="p-3 bg-muted/20 rounded-lg cursor-pointer hover:bg-muted/40 transition-all duration-300 border border-border"
                        onClick={() => handleStudentSelect(recentStudents.find(s => s.name === session.studentName))}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-blue-600 rounded-full flex items-center justify-center">
                              <span className="text-xs font-bold text-white">{session.avatar}</span>
                            </div>
                            <h4 className="font-semibold text-gray-900">{session.studentName}</h4>
                          </div>
                          <Badge 
                            variant={session.status === 'confirmed' ? 'default' : 'secondary'}
                            className={session.status === 'confirmed' ? 'bg-green-100 text-green-800' : ''}
                          >
                            {session.status}
                          </Badge>
                        </div>
                        <div className="text-sm text-gray-600">
                          <div className="flex items-center gap-1 mb-1">
                            <Clock className="h-3 w-3" />
                            {session.time} ({session.duration})
                          </div>
                          <p>{session.type}</p>
                        </div>
                        <div className="flex gap-2 mt-2">
                          <Button size="sm" variant="outline" className="flex-1 border-border hover:bg-muted/50">
                            <Video className="h-3 w-3 mr-1" />
                            Join
                          </Button>
                          <Button size="sm" variant="outline" className="border-border hover:bg-muted/50">
                            <MessageCircle className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>

                {/* Recent Students */}
                <Card className="feature-card bg-card/80 backdrop-blur-xl border border-border shadow-2xl">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-foreground">
                      <Users className="h-5 w-5 text-primary" />
                      Recent Students
                    </CardTitle>
                    <div className="flex gap-2">
                      <Input placeholder="Search students..." className="flex-1 bg-muted/20 border-border text-foreground placeholder:text-muted-foreground" />
                      <Button size="sm" variant="outline" className="border-border hover:bg-muted/50">
                        <Search className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {recentStudents.map((student) => (
                      <div 
                        key={student.id} 
                        className={`p-3 rounded-lg cursor-pointer transition-all duration-300 border ${
                          selectedStudent?.id === student.id 
                            ? 'bg-primary/20 border-primary/50' 
                            : 'bg-muted/20 hover:bg-muted/40 border-border'
                        }`}
                        onClick={() => handleStudentSelect(student)}
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-gradient-primary rounded-full flex items-center justify-center shadow-lg">
                            <span className="text-sm font-bold text-white">{student.avatar}</span>
                          </div>
                          <div className="flex-1">
                            <h4 className="font-semibold text-foreground">{student.name}</h4>
                            <p className="text-sm text-muted-foreground">{student.program}</p>
                            <p className="text-xs text-muted-foreground">Last seen: {student.lastSession}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>

              {/* Right Column - Student Details Panel */}
              <div className="xl:col-span-2">
                <Card className="feature-card bg-card/80 backdrop-blur-xl border border-border shadow-2xl min-h-[400px] lg:min-h-[600px]">
                  <CardContent className="p-3 sm:p-4 lg:p-6">
                    {renderStudentPanel()}
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default CounselorDashboard;
