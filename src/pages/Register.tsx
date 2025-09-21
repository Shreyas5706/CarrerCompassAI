import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  GraduationCap, 
  Users, 
  Building, 
  ArrowRight, 
  CheckCircle
} from "lucide-react";

const Register = () => {
  const navigate = useNavigate();
  const [selectedRole, setSelectedRole] = useState<string>("");

  const roles = [
    {
      id: "student",
      title: "Student",
      description: "Discover your career path and build essential skills",
      icon: GraduationCap,
      features: [
        "Personalized career recommendations",
        "Skill gap analysis and development",
        "AI-powered interview coaching",
        "Learning resource recommendations"
      ]
    },
    {
      id: "counselor",
      title: "Counselor",
      description: "Guide students towards successful career outcomes",
      icon: Users,
      features: [
        "Student progress tracking",
        "Interactive counseling tools",
        "Session management dashboard",
        "Career roadmap builder"
      ]
    },
    {
      id: "admin",
      title: "Institution Admin",
      description: "Manage institutional career development programs",
      icon: Building,
      features: [
        "Institution-wide analytics",
        "Student outcome tracking",
        "Alumni insights and connections",
        "Automated reporting system"
      ]
    }
  ];

  const handleRoleSelect = (roleId: string) => {
    navigate(`/register/${roleId}`);
  };

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Animated Grid Background */}
      <div className="fixed inset-0 animated-grid opacity-20 pointer-events-none"></div>

      <div className="relative z-10 min-h-screen flex items-center justify-center p-8">
        <div className="w-full max-w-6xl">
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold text-foreground mb-4">
              Join{" "}
              <span className="bg-gradient-primary bg-clip-text text-transparent">
                CareerCompass
              </span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Choose your role to get started with personalized career guidance and development tools
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {roles.map((role) => {
              const IconComponent = role.icon;
              return (
                <Card
                  key={role.id}
                  className="feature-card bg-card/80 backdrop-blur-xl border border-border group hover:shadow-xl hover:shadow-primary/10 transition-all duration-500 cursor-pointer"
                  onClick={() => handleRoleSelect(role.id)}
                >
                  <CardHeader className="text-center space-y-4 pb-4">
                    <div className="flex justify-center">
                      <div className="p-4 bg-gradient-primary rounded-full group-hover:scale-110 transition-transform duration-300 icon-float">
                        <IconComponent className="h-8 w-8 text-white" />
                      </div>
                    </div>
                    <div>
                      <CardTitle className="text-2xl font-bold text-foreground">
                        {role.title}
                      </CardTitle>
                      <CardDescription className="text-muted-foreground mt-2">
                        {role.description}
                      </CardDescription>
                    </div>
                  </CardHeader>

                  <CardContent className="space-y-4">
                    <ul className="space-y-3">
                      {role.features.map((feature, index) => (
                        <li key={index} className="flex items-start gap-2 text-sm text-muted-foreground">
                          <CheckCircle className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                          {feature}
                        </li>
                      ))}
                    </ul>

                    <Button 
                      variant="gradient"
                      className="w-full font-medium py-3 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleRoleSelect(role.id);
                      }}
                    >
                      Register as {role.title}
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          <div className="text-center mt-8 pt-6 border-t border-border">
            <p className="text-muted-foreground">
              Already have an account?{" "}
              <Link to="/login" className="text-primary hover:text-primary/80 font-medium transition-colors">
                Sign in here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;