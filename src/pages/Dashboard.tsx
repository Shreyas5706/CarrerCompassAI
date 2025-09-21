import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Check user role and redirect to appropriate dashboard
    const userRole = localStorage.getItem('userRole');
    
    switch (userRole) {
      case 'student':
        navigate('/dashboard/student', { replace: true });
        break;
      case 'counselor':
        navigate('/dashboard/counselor', { replace: true });
        break;
      case 'admin':
        navigate('/dashboard/admin', { replace: true });
        break;
      default:
        // If no role is set, redirect to login
        navigate('/login', { replace: true });
    }
  }, [navigate]);

  // Show loading while redirecting
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-cyan-50 flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
        <p className="text-gray-600">Redirecting to your dashboard...</p>
      </div>
    </div>
  );
};

export default Dashboard;
