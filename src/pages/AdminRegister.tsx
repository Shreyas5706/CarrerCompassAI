import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Building, Eye, EyeOff, ArrowLeft, User, Lock, School, MapPin, Phone } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface AdminFormData {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
  institutionName: string;
  institutionType: string;
  institutionAddress: string;
  phoneNumber: string;
  position: string;
  institutionSize: string;
}

const AdminRegister = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState<AdminFormData>({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    institutionName: "",
    institutionType: "",
    institutionAddress: "",
    phoneNumber: "",
    position: "",
    institutionSize: ""
  });

  const handleInputChange = (field: keyof AdminFormData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const validateInstitutionalEmail = (email: string) => {
    // Basic validation for institutional email domains
    const educationalDomains = ['.edu', '.ac.', '.edu.', 'university', 'college', 'institute'];
    return educationalDomains.some(domain => email.toLowerCase().includes(domain));
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

    if (!validateInstitutionalEmail(formData.email)) {
      toast({
        title: "Email Validation",
        description: "Please use an institutional email address (.edu, .ac., etc.)",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      toast({
        title: "Registration Successful!",
        description: "Welcome to CareerCompass! Your admin account has been created.",
      });
      
      localStorage.setItem('userRole', 'admin');
      navigate('/dashboard/admin');
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
              <Building className="w-16 h-16 text-primary animate-pulse icon-float" />
            </div>
            <h1 className="text-5xl font-bold mb-6 leading-tight">
              Institution<br />
              <span className="bg-gradient-primary bg-clip-text text-transparent">
                Admin
              </span>
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Manage your institution's career development programs with comprehensive analytics and insights
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
                <Building className="w-12 h-12 text-primary mx-auto mb-4 icon-float" />
                <h1 className="text-3xl font-bold text-foreground mb-2">Institution Admin</h1>
                <p className="text-muted-foreground">Register your institution</p>
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
                <h2 className="text-2xl font-bold text-foreground mb-2">Welcome, Administrator!</h2>
                <p className="text-muted-foreground">Set up your institutional account</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Basic Information */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
                    <User className="h-5 w-5 text-primary" />
                    Administrator Information
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
                      <Label htmlFor="email" className="text-foreground font-medium">Institutional Email *</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="admin@institution.edu"
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        required
                        className="input-field"
                      />
                      <p className="text-xs text-muted-foreground">Please use your official institutional email</p>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="position" className="text-foreground font-medium">Position/Title *</Label>
                      <Input
                        id="position"
                        type="text"
                        placeholder="e.g., Director of Career Services"
                        value={formData.position}
                        onChange={(e) => handleInputChange('position', e.target.value)}
                        required
                        className="input-field"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="phoneNumber" className="text-foreground font-medium">Phone Number *</Label>
                      <Input
                        id="phoneNumber"
                        type="tel"
                        placeholder="Enter your phone number"
                        value={formData.phoneNumber}
                        onChange={(e) => handleInputChange('phoneNumber', e.target.value)}
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

                {/* Institution Information */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
                    <School className="h-5 w-5 text-primary" />
                    Institution Information
                  </h3>
                  
                  <div className="grid grid-cols-1 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="institutionName" className="text-foreground font-medium">Institution Name *</Label>
                      <Input
                        id="institutionName"
                        type="text"
                        placeholder="Enter institution name"
                        value={formData.institutionName}
                        onChange={(e) => handleInputChange('institutionName', e.target.value)}
                        required
                        className="input-field"
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="institutionType" className="text-foreground font-medium">Institution Type *</Label>
                        <Select onValueChange={(value) => handleInputChange('institutionType', value)}>
                          <SelectTrigger className="input-field">
                            <SelectValue placeholder="Select type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="university">University</SelectItem>
                            <SelectItem value="college">College</SelectItem>
                            <SelectItem value="community-college">Community College</SelectItem>
                            <SelectItem value="technical-institute">Technical Institute</SelectItem>
                            <SelectItem value="vocational-school">Vocational School</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="institutionSize" className="text-foreground font-medium">Institution Size *</Label>
                        <Select onValueChange={(value) => handleInputChange('institutionSize', value)}>
                          <SelectTrigger className="input-field">
                            <SelectValue placeholder="Select size" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="small">Small (&lt; 1,000 students)</SelectItem>
                            <SelectItem value="medium">Medium (1,000 - 10,000 students)</SelectItem>
                            <SelectItem value="large">Large (10,000 - 30,000 students)</SelectItem>
                            <SelectItem value="very-large">Very Large (&gt; 30,000 students)</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="institutionAddress" className="text-foreground font-medium">Institution Address *</Label>
                      <Textarea
                        id="institutionAddress"
                        placeholder="Enter complete address"
                        value={formData.institutionAddress}
                        onChange={(e) => handleInputChange('institutionAddress', e.target.value)}
                        required
                        className="input-field min-h-[80px]"
                      />
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
                    {isLoading ? "Creating Account..." : "Create Admin Account"}
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

export default AdminRegister;
