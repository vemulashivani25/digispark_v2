/**
 * ============================================================================
 * Authentication Page
 * ============================================================================
 * 
 * Handles user authentication including login, registration, password reset,
 * and password recovery. Uses Supabase Auth via AuthContext.
 * 
 * Features:
 * - Tab-based login/register forms with validation (Zod)
 * - Password reset via email
 * - Password recovery with URL parameter detection
 * - Haptic feedback for mobile devices
 * - Animated UI elements with framer-motion
 * 
 * URL Parameters:
 * - ?type=recovery - Triggers password recovery form
 * 
 * @author DigiSpark Team
 * @version 1.0.0
 * ============================================================================
 */

import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import Navbar from '@/components/Navbar';
import FooterSection from '@/components/FooterSection';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Helmet } from 'react-helmet';
import { ArrowLeft, Mail, Lock, User, KeyRound } from 'lucide-react';
import { mediumTap, successFeedback } from '@/utils/hapticFeedback';

const loginSchema = z.object({
  email: z.string()
    .trim()
    .min(1, { message: 'Email is required' })
    .email({ message: 'Please enter a valid email address' })
    .max(255, { message: 'Email is too long' }),
  password: z.string()
    .min(6, { message: 'Password must be at least 6 characters' })
    .max(72, { message: 'Password is too long' }),
});

const registerSchema = z.object({
  email: z.string()
    .trim()
    .min(1, { message: 'Email is required' })
    .email({ message: 'Please enter a valid email address' })
    .max(255, { message: 'Email is too long' }),
  password: z.string()
    .min(8, { message: 'Password must be at least 8 characters' })
    .max(72, { message: 'Password is too long' })
    .regex(/[A-Z]/, { message: 'Password must contain at least one uppercase letter' })
    .regex(/[a-z]/, { message: 'Password must contain at least one lowercase letter' })
    .regex(/[0-9]/, { message: 'Password must contain at least one number' }),
  fullName: z.string()
    .trim()
    .min(2, { message: 'Full name must be at least 2 characters' })
    .max(100, { message: 'Name is too long' })
    .regex(/^[a-zA-Z\s'-]+$/, { message: 'Name contains invalid characters' }),
  confirmPassword: z.string().min(8, { message: 'Password must be at least 8 characters' }),
}).refine(data => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

const resetPasswordSchema = z.object({
  email: z.string()
    .trim()
    .min(1, { message: 'Email is required' })
    .email({ message: 'Please enter a valid email address' })
    .max(255, { message: 'Email is too long' }),
});

const newPasswordSchema = z.object({
  password: z.string()
    .min(8, { message: 'Password must be at least 8 characters' })
    .max(72, { message: 'Password is too long' })
    .regex(/[A-Z]/, { message: 'Password must contain at least one uppercase letter' })
    .regex(/[a-z]/, { message: 'Password must contain at least one lowercase letter' })
    .regex(/[0-9]/, { message: 'Password must contain at least one number' }),
  confirmPassword: z.string().min(8, { message: 'Password must be at least 8 characters' }),
}).refine(data => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

type LoginFormValues = z.infer<typeof loginSchema>;
type RegisterFormValues = z.infer<typeof registerSchema>;
type ResetPasswordFormValues = z.infer<typeof resetPasswordSchema>;
type NewPasswordFormValues = z.infer<typeof newPasswordSchema>;

const Auth = () => {
  const [searchParams] = useSearchParams();
  const isRecovery = searchParams.get('type') === 'recovery';
  
  const [activeTab, setActiveTab] = useState<'login' | 'register'>('login');
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(isRecovery);
  const { signIn, signUp, resetPassword, updatePassword, user, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect if user is already logged in and not in recovery mode
    if (user && !isRecovery) {
      navigate('/');
    }
  }, [user, navigate, isRecovery]);

  useEffect(() => {
    if (isRecovery) {
      setShowNewPassword(true);
    }
  }, [isRecovery]);

  const loginForm = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const registerForm = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      email: '',
      password: '',
      fullName: '',
      confirmPassword: '',
    },
  });

  const resetForm = useForm<ResetPasswordFormValues>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      email: '',
    },
  });

  const newPasswordForm = useForm<NewPasswordFormValues>({
    resolver: zodResolver(newPasswordSchema),
    defaultValues: {
      password: '',
      confirmPassword: '',
    },
  });

  const onLoginSubmit = async (data: LoginFormValues) => {
    mediumTap();
    try {
      await signIn(data.email, data.password);
      successFeedback();
    } catch (error) {
      // Error handled in context
    }
  };

  const onRegisterSubmit = async (data: RegisterFormValues) => {
    mediumTap();
    try {
      await signUp(data.email, data.password, data.fullName);
      successFeedback();
      setActiveTab('login');
    } catch (error) {
      // Error handled in context
    }
  };

  const onResetSubmit = async (data: ResetPasswordFormValues) => {
    try {
      await resetPassword(data.email);
      setShowForgotPassword(false);
    } catch (error) {
      // Error handled in context
    }
  };

  const onNewPasswordSubmit = async (data: NewPasswordFormValues) => {
    try {
      await updatePassword(data.password);
      setShowNewPassword(false);
      navigate('/');
    } catch (error) {
      // Error handled in context
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-yellow-400"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black overflow-hidden">
      <Helmet>
        <title>Authentication | DigiSpark</title>
        <meta name="description" content="Sign in or register for a DigiSpark account to access premium resources and features." />
      </Helmet>
      
      <Navbar />
      
      <div className="pt-32 pb-20 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-black/95 to-black/90 pointer-events-none"></div>
        
        {/* Animated background elements */}
        <div className="absolute w-[40rem] h-[40rem] bg-yellow-400/5 rounded-full blur-3xl top-0 -right-20 animate-pulse-slow"></div>
        <div className="absolute w-[30rem] h-[30rem] bg-blue-400/5 rounded-full blur-3xl -bottom-20 -left-20 animate-pulse-slow" style={{ animationDelay: '1.5s' }}></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <motion.div 
            className="text-center mb-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              <span className="text-yellow-400">Account</span> Access
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              {showNewPassword 
                ? 'Set your new password' 
                : showForgotPassword 
                  ? 'Reset your password' 
                  : 'Sign in to your account or create a new one'}
            </p>
          </motion.div>
          
          <motion.div 
            className="max-w-md mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="bg-gray-900/60 backdrop-blur-md p-8 rounded-xl border border-gray-800/50">
              {showNewPassword ? (
                // New Password Form (after recovery)
                <div>
                  <div className="flex items-center mb-6">
                    <KeyRound className="text-yellow-400 mr-3" size={28} />
                    <h2 className="text-xl font-semibold text-white">Set New Password</h2>
                  </div>
                  
                  <Form {...newPasswordForm}>
                    <form onSubmit={newPasswordForm.handleSubmit(onNewPasswordSubmit)} className="space-y-6">
                      <FormField
                        control={newPasswordForm.control}
                        name="password"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-gray-300">New Password</FormLabel>
                            <FormControl>
                              <div className="relative">
                                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" size={18} />
                                <Input 
                                  type="password" 
                                  placeholder="••••••••" 
                                  className="bg-gray-800/50 border-gray-700 pl-10" 
                                  {...field} 
                                />
                              </div>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={newPasswordForm.control}
                        name="confirmPassword"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-gray-300">Confirm New Password</FormLabel>
                            <FormControl>
                              <div className="relative">
                                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" size={18} />
                                <Input 
                                  type="password" 
                                  placeholder="••••••••" 
                                  className="bg-gray-800/50 border-gray-700 pl-10" 
                                  {...field} 
                                />
                              </div>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <div className="text-xs text-gray-400 space-y-1">
                        <p>Password must contain:</p>
                        <ul className="list-disc list-inside">
                          <li>At least 8 characters</li>
                          <li>One uppercase letter</li>
                          <li>One lowercase letter</li>
                          <li>One number</li>
                        </ul>
                      </div>
                      
                      <Button 
                        type="submit" 
                        className="w-full bg-yellow-400 hover:bg-yellow-300 text-black font-medium"
                        disabled={loading}
                      >
                        {loading ? 'Updating...' : 'Update Password'}
                      </Button>
                    </form>
                  </Form>
                </div>
              ) : showForgotPassword ? (
                // Forgot Password Form
                <div>
                  <button 
                    onClick={() => setShowForgotPassword(false)}
                    className="flex items-center text-gray-400 hover:text-white mb-6 transition-colors"
                  >
                    <ArrowLeft size={18} className="mr-2" />
                    Back to login
                  </button>
                  
                  <div className="flex items-center mb-6">
                    <Mail className="text-yellow-400 mr-3" size={28} />
                    <h2 className="text-xl font-semibold text-white">Reset Password</h2>
                  </div>
                  
                  <p className="text-gray-400 mb-6">
                    Enter your email address and we'll send you a link to reset your password.
                  </p>
                  
                  <Form {...resetForm}>
                    <form onSubmit={resetForm.handleSubmit(onResetSubmit)} className="space-y-6">
                      <FormField
                        control={resetForm.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-gray-300">Email</FormLabel>
                            <FormControl>
                              <div className="relative">
                                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" size={18} />
                                <Input 
                                  placeholder="your.email@example.com" 
                                  className="bg-gray-800/50 border-gray-700 pl-10" 
                                  {...field} 
                                />
                              </div>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <Button 
                        type="submit" 
                        className="w-full bg-yellow-400 hover:bg-yellow-300 text-black font-medium"
                        disabled={loading}
                      >
                        {loading ? 'Sending...' : 'Send Reset Link'}
                      </Button>
                    </form>
                  </Form>
                </div>
              ) : (
                // Login/Register Tabs
                <Tabs defaultValue={activeTab} onValueChange={(value) => setActiveTab(value as 'login' | 'register')}>
                  <TabsList className="grid w-full grid-cols-2 mb-8">
                    <TabsTrigger value="login">Sign In</TabsTrigger>
                    <TabsTrigger value="register">Register</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="login">
                    <Form {...loginForm}>
                      <form onSubmit={loginForm.handleSubmit(onLoginSubmit)} className="space-y-6">
                        <FormField
                          control={loginForm.control}
                          name="email"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-gray-300">Email</FormLabel>
                              <FormControl>
                                <div className="relative">
                                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" size={18} />
                                  <Input 
                                    placeholder="your.email@example.com" 
                                    className="bg-gray-800/50 border-gray-700 pl-10" 
                                    {...field} 
                                  />
                                </div>
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={loginForm.control}
                          name="password"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-gray-300">Password</FormLabel>
                              <FormControl>
                                <div className="relative">
                                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" size={18} />
                                  <Input 
                                    type="password" 
                                    placeholder="••••••••" 
                                    className="bg-gray-800/50 border-gray-700 pl-10" 
                                    {...field} 
                                  />
                                </div>
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <div className="flex justify-end">
                          <button 
                            type="button"
                            onClick={() => setShowForgotPassword(true)}
                            className="text-sm text-yellow-400 hover:text-yellow-300 transition-colors"
                          >
                            Forgot password?
                          </button>
                        </div>
                        
                        <Button 
                          type="submit" 
                          className="w-full bg-yellow-400 hover:bg-yellow-300 text-black font-medium"
                          disabled={loading}
                        >
                          {loading ? (
                            <span className="flex items-center justify-center">
                              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                              </svg>
                              Signing In...
                            </span>
                          ) : (
                            'Sign In'
                          )}
                        </Button>
                      </form>
                    </Form>
                  </TabsContent>
                  
                  <TabsContent value="register">
                    <Form {...registerForm}>
                      <form onSubmit={registerForm.handleSubmit(onRegisterSubmit)} className="space-y-6">
                        <FormField
                          control={registerForm.control}
                          name="fullName"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-gray-300">Full Name</FormLabel>
                              <FormControl>
                                <div className="relative">
                                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" size={18} />
                                  <Input 
                                    placeholder="John Smith" 
                                    className="bg-gray-800/50 border-gray-700 pl-10" 
                                    {...field} 
                                  />
                                </div>
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={registerForm.control}
                          name="email"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-gray-300">Email</FormLabel>
                              <FormControl>
                                <div className="relative">
                                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" size={18} />
                                  <Input 
                                    placeholder="your.email@example.com" 
                                    className="bg-gray-800/50 border-gray-700 pl-10" 
                                    {...field} 
                                  />
                                </div>
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={registerForm.control}
                          name="password"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-gray-300">Password</FormLabel>
                              <FormControl>
                                <div className="relative">
                                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" size={18} />
                                  <Input 
                                    type="password" 
                                    placeholder="••••••••" 
                                    className="bg-gray-800/50 border-gray-700 pl-10" 
                                    {...field} 
                                  />
                                </div>
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={registerForm.control}
                          name="confirmPassword"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-gray-300">Confirm Password</FormLabel>
                              <FormControl>
                                <div className="relative">
                                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" size={18} />
                                  <Input 
                                    type="password" 
                                    placeholder="••••••••" 
                                    className="bg-gray-800/50 border-gray-700 pl-10" 
                                    {...field} 
                                  />
                                </div>
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <Button 
                          type="submit" 
                          className="w-full bg-yellow-400 hover:bg-yellow-300 text-black font-medium"
                          disabled={loading}
                        >
                          {loading ? (
                            <span className="flex items-center justify-center">
                              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                              </svg>
                              Creating Account...
                            </span>
                          ) : (
                            'Create Account'
                          )}
                        </Button>
                      </form>
                    </Form>
                  </TabsContent>
                </Tabs>
              )}
            </div>
          </motion.div>
        </div>
      </div>
      
      <FooterSection />
    </div>
  );
};

export default Auth;