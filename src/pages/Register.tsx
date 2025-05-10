
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import AppLayout from "@/components/layout/AppLayout";
import AuthForm from "@/components/auth/AuthForm";

const Register = () => {
  return (
    <AppLayout isAuthenticated={false}>
      <div className="container max-w-md py-12 md:py-16 px-4 md:px-6">
        <div className="flex flex-col space-y-2 text-center mb-8">
          <h1 className="text-3xl font-bold">Create an account</h1>
          <p className="text-muted-foreground">
            Enter your details below to create your account and get started
          </p>
        </div>
        
        <div className="bg-background border rounded-lg shadow-sm p-6">
          <AuthForm type="register" />
          
          <div className="mt-6 text-center text-sm">
            <p className="text-muted-foreground">
              Already have an account?{" "}
              <Link to="/login" className="text-primary font-medium hover:underline">
                Login
              </Link>
            </p>
          </div>
        </div>
        
        <div className="mt-8 text-center text-sm text-muted-foreground">
          <p>
            By registering, you agree to our{" "}
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

export default Register;
