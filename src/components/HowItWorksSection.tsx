import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  User, 
  Brain, 
  Target, 
  BookOpen, 
  TrendingUp, 
  BarChart, 
  ArrowRight,
  ChevronRight 
} from "lucide-react";
import { Link } from "react-router-dom";

const HowItWorksSection = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    const element = document.getElementById('how-it-works');
    if (element) {
      observer.observe(element);
    }

    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, []);

  const steps = [
    {
      id: 1,
      icon: User,
      title: "Student Profiling",
      description: "Complete comprehensive assessments including academic performance, MBTI/RIASEC tests, interest surveys, and aptitude evaluations.",
      gradient: "from-blue-500 to-purple-600",
      details: [
        "Academic performance analysis",
        "MBTI personality assessment", 
        "RIASEC interest profiling",
        "Aptitude testing & passive data collection"
      ]
    },
    {
      id: 2,
      icon: Brain,
      title: "AI Skill Mapping",
      description: "Our AI compares your profile with job market requirements using Google Cloud BigQuery and Vertex AI for precise career clustering.",
      gradient: "from-purple-500 to-pink-600",
      details: [
        "Profile-to-job skill comparison",
        "Google Cloud BigQuery integration",
        "Vertex AI powered analysis",
        "Advanced career clustering algorithms"
      ]
    },
    {
      id: 3,
      icon: Target,
      title: "Personalized Career Recommendations",
      description: "Receive 3-5 AI-suggested careers with detailed job outlooks, required skills, and customized learning roadmaps.",
      gradient: "from-pink-500 to-red-600",
      details: [
        "3-5 tailored career suggestions",
        "Comprehensive job market outlook",
        "Required skills breakdown",
        "Personalized learning pathways"
      ]
    },
    {
      id: 4,
      icon: BookOpen,
      title: "Dynamic Learning Roadmap",
      description: "Get adaptive milestones with curated resources from YouTube, Coursera, and LinkedIn Learning, all on personalized timelines.",
      gradient: "from-red-500 to-orange-600",
      details: [
        "Adaptive learning milestones",
        "Curated YouTube content",
        "Coursera course recommendations",
        "LinkedIn Learning pathways"
      ]
    },
    {
      id: 5,
      icon: TrendingUp,
      title: "Continuous Monitoring & Feedback",
      description: "Track your progress through interactive quizzes and projects while receiving AI-powered micro-feedback and nudges.",
      gradient: "from-orange-500 to-yellow-600",
      details: [
        "Progress tracking via quizzes",
        "Project-based assessments",
        "AI-powered micro-feedback",
        "Smart learning nudges"
      ]
    },
    {
      id: 6,
      icon: BarChart,
      title: "Career Market Updates",
      description: "Stay informed with real-time job market insights and emerging roles like Cloud Security Analyst and AI specialists.",
      gradient: "from-yellow-500 to-green-600",
      details: [
        "Real-time job market data",
        "Emerging career opportunities",
        "Industry trend analysis",
        "Future-proof career guidance"
      ]
    }
  ];

  return (
    <section id="how-it-works" className="relative z-10 container mx-auto px-6 py-20">
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
          How the System Works
        </h2>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          Our AI-powered platform guides you through a comprehensive 6-step journey 
          from initial profiling to career success.
        </p>
      </div>

      {/* Desktop Timeline View */}
      <div className="hidden lg:block">
        <div className="relative">
          {/* Connection Line */}
          <div className="absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-purple-500 via-pink-500 via-red-500 via-orange-500 to-green-500 rounded-full transform -translate-y-1/2 z-0"></div>
          
          {/* Steps */}
          <div className="grid grid-cols-6 gap-4 relative z-10">
            {steps.map((step, index) => (
              <div key={step.id} className="flex flex-col items-center">
                {/* Step Circle */}
                <div 
                  className={`w-16 h-16 rounded-full bg-gradient-to-r ${step.gradient} flex items-center justify-center mb-4 cursor-pointer transition-all duration-300 hover:scale-110 ${
                    isVisible ? 'animate-scale-in' : ''
                  }`}
                  style={{
                    animationDelay: `${index * 0.1}s`
                  }}
                  onMouseEnter={() => setActiveStep(index)}
                >
                  <step.icon className="w-8 h-8 text-white" />
                </div>
                
                {/* Step Number */}
                <div className="text-sm font-bold text-primary mb-2">STEP {step.id}</div>
                
                {/* Step Content */}
                <Card className={`transition-all duration-300 cursor-pointer hover:shadow-lg ${
                  activeStep === index ? 'border-primary shadow-lg scale-105' : 'hover:border-primary/50'
                }`}>
                  <CardHeader className="text-center pb-2">
                    <CardTitle className="text-lg">{step.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <CardDescription className="text-center text-sm mb-3">
                      {step.description}
                    </CardDescription>
                    {activeStep === index && (
                      <div className="space-y-1 animate-fade-in">
                        {step.details.map((detail, idx) => (
                          <div key={idx} className="flex items-center text-xs text-muted-foreground">
                            <ChevronRight className="w-3 h-3 mr-1 text-primary" />
                            {detail}
                          </div>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Mobile Card View */}
      <div className="lg:hidden space-y-6">
        {steps.map((step, index) => (
          <Card 
            key={step.id} 
            className={`transition-all duration-300 hover:shadow-lg border-l-4 ${
              isVisible ? 'animate-fade-in' : ''
            }`}
            style={{
              borderLeftColor: `var(--${step.gradient.split(' ')[1].split('-')[1]}-500)`,
              animationDelay: `${index * 0.2}s`
            }}
          >
            <CardHeader>
              <div className="flex items-center space-x-4">
                <div className={`w-12 h-12 rounded-full bg-gradient-to-r ${step.gradient} flex items-center justify-center`}>
                  <step.icon className="w-6 h-6 text-white" />
                </div>
                <div>
                  <div className="text-sm font-bold text-primary mb-1">STEP {step.id}</div>
                  <CardTitle className="text-xl">{step.title}</CardTitle>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <CardDescription className="mb-4">{step.description}</CardDescription>
              <div className="space-y-2">
                {step.details.map((detail, idx) => (
                  <div key={idx} className="flex items-center text-sm text-muted-foreground">
                    <ChevronRight className="w-4 h-4 mr-2 text-primary" />
                    {detail}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* CTA Section */}
      <div className="text-center mt-16">
        <div className="bg-gradient-primary rounded-2xl p-8 text-white">
          <h3 className="text-2xl font-bold mb-4">Ready to Start Your Journey?</h3>
          <p className="text-white/90 mb-6 max-w-2xl mx-auto">
            Join thousands of students who have discovered their perfect career path through our AI-powered system.
          </p>
          <Link to="/register">
            <Button 
              size="lg" 
              className="bg-white text-primary hover:bg-white/90 text-lg px-8 py-4 group hover:scale-105 transition-all duration-300"
            >
              Start Your Journey 
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;