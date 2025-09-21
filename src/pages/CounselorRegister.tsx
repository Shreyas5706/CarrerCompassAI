import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Users, Eye, EyeOff, ArrowLeft, User, Lock, Briefcase, GraduationCap, FileText } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface CounselorFormData {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
  yearsExperience: string;
  highestQualification: string;
  specializations: string[];
  bio: string;
}

const specializationOptions = [
  "Career Counseling",
  "Academic Guidance", 
  "Mental Health Counseling",
  "Vocational Rehabilitation",
  "Educational Psychology",
  "Student Development",
  "Life Coaching",
  "Employment Counseling",
  "College Admissions",
  "Skills Assessment"
];

const CounselorRegister = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState<CounselorFormData>({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    yearsExperience: "",
    highestQualification: "",
    specializations: [],
    bio: ""
  });

  const handleInputChange = (field: keyof CounselorFormData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSpecializationToggle = (specialization: string) => {
    setFormData(prev => ({
      ...prev,
      specializations: prev.specializations.includes(specialization)
        ? prev.specializations.filter(s => s !== specialization)
        : [...prev.specializations, specialization]
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      toast({
        title: "Error",
        description: "Passwords do not match",
        variant: "destructive",
      });
      return;
    }

    if (formData.specializations.length === 0) {
      toast({
        title: "Error", 
        description: "Please select at least one specialization",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      toast({
        title: "Registration Successful!",
        description: "Welcome to CareerCompass! Your counselor account has been created.",
      });
      
      localStorage.setItem('userRole', 'counselor');
      navigate('/dashboard/counselor');
      setIsLoading(false);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Animated Grid Background */}
      <div className="fixed inset-0 animated-grid opacity-20 pointer-events-none"></div>

      <div className="relative z-10 min-h-screen flex">
        {/* Left Section - Branding */}
        <div className="hidden lg:flex lg:w-1/2 p-12 flex-col justify-center items-center text-center">
          <div className="max-w-md text-foreground">
            <div className="mb-8 flex justify-center">
              <Users className="w-16 h-16 text-primary animate-pulse icon-float" />
            </div>
            <h1 className="text-5xl font-bold mb-6 leading-tight">
              Counselor<br />
              <span className="bg-gradient-primary bg-clip-text text-transparent">
                Registration
              </span>
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Join our network of professional counselors and guide students towards successful careers
            </p>
          </div>
        </div>

        {/* Right Section - Registration Form */}
        <div className="w-full lg:w-1/2 flex items-start justify-center p-8 overflow-y-auto">
          <div className="w-full max-w-lg my-8">
            {/* Glassmorphism Card */}
            <div className="bg-card/80 backdrop-blur-xl border border-border rounded-2xl p-8 shadow-2xl">
              {/* Mobile Branding */}
              <div className="lg:hidden text-center mb-8">
                <Users className="w-12 h-12 text-primary mx-auto mb-4 icon-float" />
                <h1 className="text-3xl font-bold text-foreground mb-2">Counselor Registration</h1>
                <p className="text-muted-foreground">Join our counseling network</p>
              </div>

              {/* Back Link */}
              <Link 
                to="/register" 
                className="inline-flex items-center text-primary hover:text-primary/80 font-medium mb-6 transition-colors"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to role selection
              </Link>

              {/* Form Header */}
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-foreground mb-2">Welcome, Professional Counselor!</h2>
                <p className="text-muted-foreground">Let's set up your counseling profile</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Basic Information */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
                    <User className="h-5 w-5 text-primary" />
                    Basic Information
                  </h3>
                  
                  <div className="grid grid-cols-1 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="fullName" className="text-foreground font-medium">Full Name *</Label>
                      <Input
                        id="fullName"
                        type="text"
                        placeholder="Enter your full name"
                        value={formData.fullName}
                        onChange={(e) => handleInputChange('fullName', e.target.value)}
                        required
                        className="input-field"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-foreground font-medium">Email Address *</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="Enter your professional email"
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        required
                        className="input-field"
                      />
                    </div>
                  </div>
                </div>

                {/* Password Section */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
                    <Lock className="h-5 w-5 text-primary" />
                    Password
                  </h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="password" className="text-foreground font-medium">Password *</Label>
                      <div className="relative">
                        <Input
                          id="password"
                          type={showPassword ? "text" : "password"}
                          placeholder="Create a password"
                          value={formData.password}
                          onChange={(e) => handleInputChange('password', e.target.value)}
                          required
                          className="input-field pr-10"
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="absolute right-0 top-0 h-full px-3 hover:bg-muted/20"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? (
                            <EyeOff className="w-4 h-4 text-muted-foreground" />
                          ) : (
                            <Eye className="w-4 h-4 text-muted-foreground" />
                          )}
                        </Button>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="confirmPassword" className="text-foreground font-medium">Confirm Password *</Label>
                      <div className="relative">
                        <Input
                          id="confirmPassword"
                          type={showConfirmPassword ? "text" : "password"}
                          placeholder="Confirm your password"
                          value={formData.confirmPassword}
                          onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                          required
                          className="input-field pr-10"
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="absolute right-0 top-0 h-full px-3 hover:bg-muted/20"
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        >
                          {showConfirmPassword ? (
                            <EyeOff className="w-4 h-4 text-muted-foreground" />
                          ) : (
                            <Eye className="w-4 h-4 text-muted-foreground" />
                          )}
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Professional Information */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
                    <Briefcase className="h-5 w-5 text-primary" />
                    Professional Information
                  </h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="yearsExperience" className="text-foreground font-medium">Years of Experience *</Label>
                      <Select onValueChange={(value) => handleInputChange('yearsExperience', value)}>
                        <SelectTrigger className="input-field">
                          <SelectValue placeholder="Select experience" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="0-1">0-1 years</SelectItem>
                          <SelectItem value="2-5">2-5 years</SelectItem>
                          <SelectItem value="6-10">6-10 years</SelectItem>
                          <SelectItem value="11-15">11-15 years</SelectItem>
                          <SelectItem value="16+">16+ years</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="highestQualification" className="text-foreground font-medium">Highest Qualification *</Label>
                      <Select onValueChange={(value) => handleInputChange('highestQualification', value)}>
                        <SelectTrigger className="input-field">
                          <SelectValue placeholder="Select qualification" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="bachelor">Bachelor's Degree</SelectItem>
                          <SelectItem value="master">Master's Degree</SelectItem>
                          <SelectItem value="phd">PhD</SelectItem>
                          <SelectItem value="professional">Professional Certification</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>

                {/* Specializations */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
                    <GraduationCap className="h-5 w-5 text-primary" />
                    Specializations *
                  </h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {specializationOptions.map((specialization) => (
                      <div key={specialization} className="flex items-center space-x-2">
                        <Checkbox
                          id={specialization}
                          checked={formData.specializations.includes(specialization)}
                          onCheckedChange={() => handleSpecializationToggle(specialization)}
                          className="border-border data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                        />
                        <Label 
                          htmlFor={specialization} 
                          className="text-sm text-muted-foreground cursor-pointer"
                        >
                          {specialization}
                        </Label>
                      </div>
                    ))}
                  </div>
                  
                  <div className="flex flex-wrap gap-2 mt-2">
                    {formData.specializations.map((specialization) => (
                      <Badge key={specialization} variant="secondary" className="bg-primary/20 text-primary">
                        {specialization}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Bio Section */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
                    <FileText className="h-5 w-5 text-primary" />
                    Professional Bio
                  </h3>
                  
                  <div className="space-y-2">
                    <Label htmlFor="bio" className="text-foreground font-medium">Brief Bio (Optional)</Label>
                    <Textarea
                      id="bio"
                      placeholder="Tell us about your counseling philosophy and approach..."
                      value={formData.bio}
                      onChange={(e) => handleInputChange('bio', e.target.value)}
                      className="input-field min-h-[100px]"
                    />
                  </div>
                </div>

                <div className="flex gap-4 pt-6">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => navigate('/register')}
                    className="flex-1"
                  >
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Back
                  </Button>
                  <Button
                    type="submit"
                    variant="gradient"
                    disabled={isLoading}
                    className="flex-1 font-medium py-3 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                  >
                    {isLoading ? "Creating Account..." : "Create Counselor Account"}
                  </Button>
                </div>
              </form>

              <div className="text-center pt-4 border-t border-border">
                <p className="text-sm text-muted-foreground">
                  Already have an account?{" "}
                  <Link to="/login" className="text-primary hover:text-primary/80 font-medium transition-colors">
                    Sign in here
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CounselorRegister;
