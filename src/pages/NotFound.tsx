
import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Home } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4 sm:px-6 lg:px-8">
      <div className="text-center">
        <div className="mb-8">
          <h1 className="text-6xl sm:text-8xl font-bold text-primary mb-4">404</h1>
          <h2 className="text-2xl sm:text-3xl font-semibold text-foreground mb-4">
            Page Not Found
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-md mx-auto">
            The page you're looking for doesn't exist or has been moved.
          </p>
        </div>
        
        <div className="space-y-4">
          <Link to="/">
            <Button className="acft-button flex items-center space-x-2">
              <Home className="h-4 w-4" />
              <span>Return to Home</span>
            </Button>
          </Link>
          
          <div className="text-sm text-muted-foreground">
            <p>Need help? <Link to="/contact" className="text-primary hover:text-primary/80 underline">Contact us</Link></p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
