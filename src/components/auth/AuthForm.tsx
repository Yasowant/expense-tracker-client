import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';
import axios from '@/lib/axios'; // ✅ Use your custom axios instance

// Schemas
const loginSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

const registerSchema = z
  .object({
    name: z.string().min(2, 'Name must be at least 2 characters'),
    email: z.string().email('Please enter a valid email address'),
    password: z.string().min(6, 'Password must be at least 6 characters'),
    confirmPassword: z
      .string()
      .min(6, 'Password must be at least 6 characters'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ['confirmPassword'],
    message: 'Passwords do not match',
  });

type LoginFormValues = z.infer<typeof loginSchema>;
type RegisterFormValues = z.infer<typeof registerSchema>;

interface AuthFormProps {
  type: 'login' | 'register';
}

export const AuthForm = ({ type }: AuthFormProps) => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const schema = type === 'login' ? loginSchema : registerSchema;

  const form = useForm<LoginFormValues | RegisterFormValues>({
    resolver: zodResolver(schema),
    defaultValues:
      type === 'login'
        ? { email: '', password: '' }
        : { name: '', email: '', password: '', confirmPassword: '' },
  });

  const onSubmit = async (data: LoginFormValues | RegisterFormValues) => {
    setIsLoading(true);

    try {
      const endpoint = type === 'login' ? '/auth/login' : '/auth/register';

      const payload =
        type === 'login'
          ? {
              email: (data as LoginFormValues).email,
              password: (data as LoginFormValues).password,
            }
          : {
              name: (data as RegisterFormValues).name,
              email: (data as RegisterFormValues).email,
              password: (data as RegisterFormValues).password,
            };

      const res = await axios.post(endpoint, payload);

      if (type === 'login') {
        const { accessToken, refreshToken, user } = res.data;

        localStorage.setItem('accessToken', accessToken);
        localStorage.setItem('refreshToken', refreshToken);
        localStorage.setItem('user', JSON.stringify(user));
      }

      toast({
        title:
          type === 'login' ? 'Login successful' : 'Registration successful',
        description:
          type === 'login'
            ? 'You are now logged in to your account.'
            : 'Your account has been created successfully.',
      });

      navigate('/dashboard');
    } catch (error: any) {
      const errMsg =
        error.response?.data?.message ||
        'Something went wrong. Please try again.';

      toast({
        title: 'Error',
        description: errMsg,
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 w-full">
        {type === 'register' && (
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Full Name</FormLabel>
                <FormControl>
                  <Input placeholder="John Doe" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        )}

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input type="email" placeholder="you@example.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input type="password" placeholder="••••••••" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {type === 'register' && (
          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirm Password</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="••••••••" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        )}

        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading
            ? 'Processing...'
            : type === 'login'
            ? 'Login'
            : 'Register'}
        </Button>
      </form>
    </Form>
  );
};

export default AuthForm;
