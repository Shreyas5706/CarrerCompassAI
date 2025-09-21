import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { GraduationCap, Eye, EyeOff, ArrowLeft, User, Lock, BookOpen, Star, Plus, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface StudentFormData {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
  currentEducationLevel: string;
  institutionName: string;
  fieldOfStudy: string;
  yearOfStudy: string;
  dateOfBirth: string;
  gender: string;
  interests: string[];
  skills: string[];
}

const StudentRegister = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [newInterest, setNewInterest] = useState("");
  const [newSkill, setNewSkill] = useState("");

  const [formData, setFormData] = useState<StudentFormData>({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    currentEducationLevel: "",
    institutionName: "",
    fieldOfStudy: "",
    yearOfStudy: "",
    dateOfBirth: "",
    gender: "",
    interests: [],
    skills: []
  });

  const handleInputChange = (field: keyof StudentFormData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const addInterest = () => {
    if (newInterest.trim() && !formData.interests.includes(newInterest.trim())) {
      setFormData(prev => ({
        ...prev,
        interests: [...prev.interests, newInterest.trim()]
      }));
      setNewInterest("");
    }
  };

  const removeInterest = (interest: string) => {
    setFormData(prev => ({
      ...prev,
      interests: prev.interests.filter(i => i !== interest)
    }));
  };

  const addSkill = () => {
    if (newSkill.trim() && !formData.skills.includes(newSkill.trim())) {
      setFormData(prev => ({
        ...prev,
        skills: [...prev.skills, newSkill.trim()]
      }));
      setNewSkill("");
    }
  };

  const removeSkill = (skill: string) => {
    setFormData(prev => ({
      ...prev,
      skills: prev.skills.filter(s => s !== skill)
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

    setIsLoading(true);

    setTimeout(() => {
      toast({
        title: "Registration Successful!",
        description: "Welcome to CareerCompass! Your student account has been created.",
      });
      
      localStorage.setItem('userRole', 'student');
      navigate('/dashboard/student');
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
              <GraduationCap className="w-16 h-16 text-primary animate-pulse icon-float" />
            </div>
            <h1 className="text-5xl font-bold mb-6 leading-tight">
              Student<br />
              <span className="bg-gradient-primary bg-clip-text text-transparent">
                Registration
              </span>
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Begin your journey with AI-powered career guidance and personalized learning paths
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
                <GraduationCap className="w-12 h-12 text-primary mx-auto mb-4 icon-float" />
                <h1 className="text-3xl font-bold text-foreground mb-2">Student Registration</h1>
                <p className="text-muted-foreground">Create your CareerCompass account</p>
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
                <h2 className="text-2xl font-bold text-foreground mb-2">Welcome, Future Professional!</h2>
                <p className="text-muted-foreground">Let's set up your personalized career journey</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Basic Information */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
                    <User className="h-5 w-5 text-primary" />
                    Basic Information
                  </h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                        placeholder="Enter your email"
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        required
                        className="input-field"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="dateOfBirth" className="text-foreground font-medium">Date of Birth *</Label>
                      <Input
                        id="dateOfBirth"
                        type="date"
                        value={formData.dateOfBirth}
                        onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
                        required
                        className="input-field"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="gender" className="text-foreground font-medium">Gender *</Label>
                      <Select onValueChange={(value) => handleInputChange('gender', value)}>
                        <SelectTrigger className="input-field">
                          <SelectValue placeholder="Select gender" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="male">Male</SelectItem>
                          <SelectItem value="female">Female</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                          <SelectItem value="prefer-not-to-say">Prefer not to say</SelectItem>
                        </SelectContent>
                      </Select>
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

                {/* Educational Information */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
                    <BookOpen className="h-5 w-5 text-primary" />
                    Educational Information
                  </h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="currentEducationLevel" className="text-foreground font-medium">Current Education Level *</Label>
                      <Select onValueChange={(value) => handleInputChange('currentEducationLevel', value)}>
                        <SelectTrigger className="input-field">
                          <SelectValue placeholder="Select education level" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="high-school">High School</SelectItem>
                          <SelectItem value="undergraduate">Undergraduate</SelectItem>
                          <SelectItem value="graduate">Graduate</SelectItem>
                          <SelectItem value="postgraduate">Postgraduate</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="institutionName" className="text-foreground font-medium">Institution Name *</Label>
                      <Input
                        id="institutionName"
                        type="text"
                        placeholder="Enter your institution"
                        value={formData.institutionName}
                        onChange={(e) => handleInputChange('institutionName', e.target.value)}
                        required
                        className="input-field"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="fieldOfStudy" className="text-foreground font-medium">Field of Study *</Label>
                      <Input
                        id="fieldOfStudy"
                        type="text"
                        placeholder="e.g., Computer Science"
                        value={formData.fieldOfStudy}
                        onChange={(e) => handleInputChange('fieldOfStudy', e.target.value)}
                        required
                        className="input-field"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="yearOfStudy" className="text-foreground font-medium">Year of Study *</Label>
                      <Select onValueChange={(value) => handleInputChange('yearOfStudy', value)}>
                        <SelectTrigger className="input-field">
                          <SelectValue placeholder="Select year" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1">1st Year</SelectItem>
                          <SelectItem value="2">2nd Year</SelectItem>
                          <SelectItem value="3">3rd Year</SelectItem>
                          <SelectItem value="4">4th Year</SelectItem>
                          <SelectItem value="final">Final Year</SelectItem>
                          <SelectItem value="graduated">Graduated</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>

                {/* Interests and Skills */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
                    <Star className="h-5 w-5 text-primary" />
                    Interests & Skills
                  </h3>
                  
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label className="text-foreground font-medium">Interests</Label>
                      <div className="flex gap-2">
                        <Input
                          placeholder="Add an interest"
                          value={newInterest}
                          onChange={(e) => setNewInterest(e.target.value)}
                          onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addInterest())}
                          className="input-field"
                        />
                        <Button type="button" onClick={addInterest} size="sm" variant="outline">
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {formData.interests.map((interest, index) => (
                          <Badge key={index} variant="secondary" className="bg-primary/20 text-primary">
                            {interest}
                            <button
                              type="button"
                              onClick={() => removeInterest(interest)}
                              className="ml-1 hover:text-destructive"
                            >
                              <X className="h-3 w-3" />
                            </button>
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label className="text-foreground font-medium">Skills</Label>
                      <div className="flex gap-2">
                        <Input
                          placeholder="Add a skill"
                          value={newSkill}
                          onChange={(e) => setNewSkill(e.target.value)}
                          onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addSkill())}
                          className="input-field"
                        />
                        <Button type="button" onClick={addSkill} size="sm" variant="outline">
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {formData.skills.map((skill, index) => (
                          <Badge key={index} variant="secondary" className="bg-secondary/20 text-secondary-foreground">
                            {skill}
                            <button
                              type="button"
                              onClick={() => removeSkill(skill)}
                              className="ml-1 hover:text-destructive"
                            >
                              <X className="h-3 w-3" />
                            </button>
                          </Badge>
                        ))}
                      </div>
                    </div>
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
                    {isLoading ? "Creating Account..." : "Create Student Account"}
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

export default StudentRegister;
