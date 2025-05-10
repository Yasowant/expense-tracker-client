
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import AppLayout from "@/components/layout/AppLayout";
import AuthForm from "@/components/auth/AuthForm";

const Login = () => {
  return (
    <AppLayout isAuthenticated={false}>
      <div className="container max-w-md py-12 md:py-24 px-4 md:px-6">
        <div className="flex flex-col space-y-2 text-center mb-8">
          <h1 className="text-3xl font-bold">Welcome back</h1>
          <p className="text-muted-foreground">
            Enter your email and password to access your account
          </p>
        </div>
        
        <div className="bg-background border rounded-lg shadow-sm p-6">
          <AuthForm type="login" />
          
          <div className="mt-6 text-center text-sm">
            <p className="text-muted-foreground">
              Don't have an account?{" "}
              <Link to="/register" className="text-primary font-medium hover:underline">
                Register
              </Link>
            </p>
          </div>
        </div>
        
        <div className="mt-8 text-center text-sm text-muted-foreground">
          <p>
            By logging in, you agree to our{" "}
            <Button variant="link" className="p-0 h-auto text-sm" onClick={() => console.log("Terms")}>
              Terms of Service
            </Button>{" "}
            and{" "}
            <Button variant="link" className="p-0 h-auto text-sm" onClick={() => console.log("Privacy")}>
              Privacy Policy
            </Button>
          </p>
        </div>
      </div>
    </AppLayout>
  );
};

export default Login;
