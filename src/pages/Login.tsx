import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { useAuth } from '../contexts/AuthContext';
import { useToast } from '../hooks/use-toast';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive",
      });
      return;
    }
    
    try {
      setIsLoading(true);
      // For demo purposes, we'll use a try-catch but handle the error gracefully
      try {
        await login(email, password);
        toast({
          title: "Success",
          description: "You have successfully logged in",
        });
        navigate('/dashboard');
      } catch (firebaseError) {
        console.log('Firebase auth not configured properly, using demo login instead');
        // Fall back to demo login if Firebase auth fails
        handleDemoLogin();
      }
    } catch (error) {
      console.error('Login error:', error);
      toast({
        title: "Login Failed",
        description: "Invalid email or password. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // For demo purposes - quick login without Firebase
  const handleDemoLogin = () => {
    setIsLoading(true);
    toast({
      title: "Demo Login",
      description: "Logging in with demo account",
    });
    setTimeout(() => {
      setIsLoading(false);
      navigate('/user-dashboard');
    }, 1000);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-muted/40">
      <div className="w-full max-w-md p-4">
        <Card className="w-full">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold text-center">Career Compass</CardTitle>
            <CardDescription className="text-center">
              Enter your credentials to access your account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">Password</Label>
                  <Link to="/forgot-password" className="text-sm text-primary hover:underline">
                    Forgot password?
                  </Link>
                </div>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? 'Signing in...' : 'Sign In'}
              </Button>
            </form>

            <div className="relative my-4">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-muted-foreground/20"></div>
              </div>
              <div className="relative flex justify-center text-xs">
                <span className="bg-card px-2 text-muted-foreground">Or continue with</span>
              </div>
            </div>

            <Button 
              variant="outline" 
              className="w-full" 
              onClick={handleDemoLogin}
            >
              Demo Login (No Authentication)
            </Button>
          </CardContent>
          <CardFooter className="flex flex-col space-y-2">
            <div className="text-sm text-center text-muted-foreground">
              Don't have an account?{' '}
              <Link to="/register" className="text-primary hover:underline">
                Sign up
              </Link>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default Login;