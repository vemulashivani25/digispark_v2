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
import { motion, AnimatePresence } from 'framer-motion';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import Navbar from '@/components/Navbar';
import FooterSection from '@/components/FooterSection';
import AuthBackground from '@/components/auth/AuthBackground';
import AnimatedAuthIcon from '@/components/auth/AnimatedAuthIcon';
import { useTypingPlaceholder } from '@/hooks/useTypingPlaceholder';
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
import { ArrowLeft, Mail, Lock, User, KeyRound, Eye, EyeOff } from 'lucide-react';
import { mediumTap, successFeedback } from '@/utils/hapticFeedback';

const EMAIL_PLACEHOLDERS = [
  "john.doe@example.com",
  "your.email@company.com",
  "hello@yourname.com",
  "contact@business.org",
];

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
  const [showLoginPassword, setShowLoginPassword] = useState(false);
  const [showRegisterPassword, setShowRegisterPassword] = useState(false);
  const [showRegisterConfirmPassword, setShowRegisterConfirmPassword] = useState(false);
  const [showNewPasswordField, setShowNewPasswordField] = useState(false);
  const [showNewConfirmPasswordField, setShowNewConfirmPasswordField] = useState(false);
  const { signIn, signUp, signInWithGoogle, resetPassword, updatePassword, user, loading } = useAuth();
  const navigate = useNavigate();
  
  // Animated typing placeholder for email inputs
  const emailPlaceholder = useTypingPlaceholder({
    placeholders: EMAIL_PLACEHOLDERS,
    typingSpeed: 80,
    deletingSpeed: 40,
    pauseDuration: 2500,
  });

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
      
      <div className="pt-32 pb-20 relative min-h-screen">
        {/* Creative animated background */}
        <AuthBackground />
        
        <div className="container mx-auto px-4 relative z-10">
          <motion.div 
            className="text-center mb-10"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            {/* Dynamic elegant heading with inline icon */}
            <AnimatePresence mode="wait">
              <motion.div
                key={showNewPassword ? 'new' : showForgotPassword ? 'forgot' : activeTab}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
                className="flex flex-col items-center"
              >
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 flex items-center justify-center gap-4">
                  {/* Inline animated icon */}
                  {!showNewPassword && !showForgotPassword && (
                    <span className="inline-block">
                      <AnimatedAuthIcon isLogin={activeTab === 'login'} />
                    </span>
                  )}
                  
                  <span className="flex flex-col md:flex-row md:items-center md:gap-3">
                    {showNewPassword ? (
                      <>
                        <span className="bg-gradient-to-r from-yellow-400 via-amber-300 to-yellow-500 bg-clip-text text-transparent">
                          Secure Your
                        </span>
                        <span className="text-white font-light tracking-tight">Account</span>
                      </>
                    ) : showForgotPassword ? (
                      <>
                        <span className="bg-gradient-to-r from-yellow-400 via-amber-300 to-yellow-500 bg-clip-text text-transparent">
                          Reset Your
                        </span>
                        <span className="text-white font-light tracking-tight">Password</span>
                      </>
                    ) : activeTab === 'login' ? (
                      <>
                        <span className="bg-gradient-to-r from-yellow-400 via-amber-300 to-yellow-500 bg-clip-text text-transparent drop-shadow-[0_0_30px_rgba(250,204,21,0.3)]">
                          Welcome
                        </span>
                        <span className="text-white font-light tracking-tight">Back</span>
                      </>
                    ) : (
                      <>
                        <span className="text-white font-light tracking-tight">
                          Welcome to
                        </span>
                        <span className="relative inline-block">
                          <span className="relative z-10 font-bold tracking-tight">
                            <span className="bg-gradient-to-r from-white via-gray-100 to-white bg-clip-text text-transparent">Digi</span>
                            <span className="bg-gradient-to-r from-yellow-300 via-yellow-400 to-amber-500 bg-clip-text text-transparent drop-shadow-[0_0_25px_rgba(250,204,21,0.5)]">Spark</span>
                          </span>
                          {/* Elegant glow backdrop */}
                          <span className="absolute inset-0 blur-xl bg-gradient-to-r from-yellow-400/20 via-amber-300/30 to-yellow-400/20 -z-10 scale-150"></span>
                        </span>
                      </>
                    )}
                  </span>
                </h1>
              </motion.div>
            </AnimatePresence>
            
            <motion.p 
              className="text-base md:text-lg text-gray-400 max-w-md mx-auto font-light"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              {showNewPassword 
                ? 'Create a strong, secure password for your account' 
                : showForgotPassword 
                  ? 'Enter your email to receive a password reset link' 
                  : activeTab === 'login'
                    ? 'Sign in to access your dashboard and resources'
                    : 'Join our community and unlock exclusive features'}
            </motion.p>
          </motion.div>
          
          <motion.div 
            className="max-w-md mx-auto"
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.3, ease: 'easeOut' }}
          >
            {/* Glowing card effect */}
            <div className="relative group">
              {/* Animated glow border */}
              <motion.div
                className="absolute -inset-0.5 bg-gradient-to-r from-yellow-400 via-green-400 to-yellow-400 rounded-2xl opacity-20 blur-sm"
                animate={{
                  backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: 'linear',
                }}
                style={{ backgroundSize: '200% 200%' }}
              />
              
              <div className="relative bg-gray-900/80 backdrop-blur-xl p-8 rounded-2xl border border-gray-700/50 shadow-2xl">
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
                              <div className="relative group">
                                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 group-focus-within:text-yellow-400 transition-colors duration-300" size={18} />
                                <Input 
                                  type={showNewPasswordField ? "text" : "password"} 
                                  placeholder="••••••••" 
                                  className="bg-gray-800/50 border-gray-700 pl-10 pr-10 text-white transition-all duration-300 focus:border-yellow-400 focus:ring-yellow-400/20" 
                                  {...field} 
                                />
                                <button
                                  type="button"
                                  onClick={() => setShowNewPasswordField(!showNewPasswordField)}
                                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-yellow-400 transition-colors duration-300"
                                >
                                  {showNewPasswordField ? <EyeOff size={18} /> : <Eye size={18} />}
                                </button>
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
                              <div className="relative group">
                                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 group-focus-within:text-yellow-400 transition-colors duration-300" size={18} />
                                <Input 
                                  type={showNewConfirmPasswordField ? "text" : "password"} 
                                  placeholder="••••••••" 
                                  className="bg-gray-800/50 border-gray-700 pl-10 pr-10 text-white transition-all duration-300 focus:border-yellow-400 focus:ring-yellow-400/20" 
                                  {...field} 
                                />
                                <button
                                  type="button"
                                  onClick={() => setShowNewConfirmPasswordField(!showNewConfirmPasswordField)}
                                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-yellow-400 transition-colors duration-300"
                                >
                                  {showNewConfirmPasswordField ? <EyeOff size={18} /> : <Eye size={18} />}
                                </button>
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
                              <div className="relative group">
                                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 group-focus-within:text-yellow-400 transition-colors duration-300" size={18} />
                                <Input 
                                  placeholder={emailPlaceholder || "email@example.com"} 
                                  className="bg-gray-800/50 border-gray-700 pl-10 text-white transition-all duration-300 focus:border-yellow-400 focus:ring-yellow-400/20 placeholder:text-gray-500" 
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
                  <TabsList className="grid w-full grid-cols-2 mb-8 bg-gray-800/70 p-2 rounded-xl border border-gray-700/50">
                    <TabsTrigger 
                      value="login" 
                      className="flex-1 data-[state=active]:bg-yellow-400 data-[state=active]:text-black data-[state=active]:shadow-lg data-[state=inactive]:bg-transparent data-[state=inactive]:text-gray-400 data-[state=inactive]:hover:text-gray-200 rounded-lg py-3.5 text-sm font-semibold transition-all duration-300 text-center whitespace-nowrap"
                    >
                      Sign In
                    </TabsTrigger>
                    <TabsTrigger 
                      value="register"
                      className="flex-1 data-[state=active]:bg-gradient-to-r data-[state=active]:from-emerald-400 data-[state=active]:to-green-500 data-[state=active]:text-black data-[state=active]:shadow-lg data-[state=inactive]:bg-transparent data-[state=inactive]:text-gray-400 data-[state=inactive]:hover:text-gray-200 rounded-lg py-3.5 text-sm font-semibold transition-all duration-300 text-center whitespace-nowrap"
                    >
                      Create Account
                    </TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="login" className="pt-2">
                    <Form {...loginForm}>
                      <form onSubmit={loginForm.handleSubmit(onLoginSubmit)} className="space-y-6">
                        <FormField
                          control={loginForm.control}
                          name="email"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-gray-300">Email</FormLabel>
                              <FormControl>
                                <div className="relative group">
                                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 group-focus-within:text-yellow-400 transition-colors duration-300" size={18} />
                                  <Input 
                                    placeholder={emailPlaceholder || "email@example.com"} 
                                    className="bg-gray-800/50 border-gray-700 pl-10 text-white transition-all duration-300 focus:border-yellow-400 focus:ring-yellow-400/20 placeholder:text-gray-500" 
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
                                <div className="relative group">
                                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 group-focus-within:text-yellow-400 transition-colors duration-300" size={18} />
                                  <Input 
                                    type={showLoginPassword ? "text" : "password"} 
                                    placeholder="••••••••" 
                                    className="bg-gray-800/50 border-gray-700 pl-10 pr-10 text-white transition-all duration-300 focus:border-yellow-400 focus:ring-yellow-400/20" 
                                    {...field} 
                                  />
                                  <button
                                    type="button"
                                    onClick={() => setShowLoginPassword(!showLoginPassword)}
                                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-yellow-400 transition-colors duration-300"
                                  >
                                    {showLoginPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                  </button>
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
                        
                        <div className="relative my-4">
                          <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-gray-700"></div>
                          </div>
                          <div className="relative flex justify-center text-sm">
                            <span className="px-2 bg-gray-900/60 text-gray-400">Or continue with</span>
                          </div>
                        </div>
                        
                        <Button
                          type="button"
                          variant="outline"
                          className="w-full border-gray-700 bg-white hover:bg-gray-100 text-black font-medium"
                          onClick={() => signInWithGoogle()}
                          disabled={loading}
                        >
                          <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                          </svg>
                          Continue with Google
                        </Button>
                      </form>
                    </Form>
                  </TabsContent>
                  
                  <TabsContent value="register" className="pt-2">
                    <Form {...registerForm}>
                      <form onSubmit={registerForm.handleSubmit(onRegisterSubmit)} className="space-y-6">
                        <FormField
                          control={registerForm.control}
                          name="fullName"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-gray-300">Full Name</FormLabel>
                              <FormControl>
                                <div className="relative group">
                                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 group-focus-within:text-yellow-400 transition-colors duration-300" size={18} />
                                  <Input 
                                    placeholder="John Smith" 
                                    className="bg-gray-800/50 border-gray-700 pl-10 text-white transition-all duration-300 focus:border-yellow-400 focus:ring-yellow-400/20" 
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
                                <div className="relative group">
                                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 group-focus-within:text-yellow-400 transition-colors duration-300" size={18} />
                                  <Input 
                                    placeholder={emailPlaceholder || "email@example.com"} 
                                    className="bg-gray-800/50 border-gray-700 pl-10 text-white transition-all duration-300 focus:border-yellow-400 focus:ring-yellow-400/20 placeholder:text-gray-500" 
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
                          render={({ field }) => {
                            const password = field.value || '';
                            const getStrength = () => {
                              let strength = 0;
                              if (password.length >= 8) strength++;
                              if (/[A-Z]/.test(password)) strength++;
                              if (/[a-z]/.test(password)) strength++;
                              if (/[0-9]/.test(password)) strength++;
                              if (/[^A-Za-z0-9]/.test(password)) strength++;
                              return strength;
                            };
                            const strength = getStrength();
                            const strengthLabel = ['Very Weak', 'Weak', 'Fair', 'Good', 'Strong'][strength - 1] || '';
                            const strengthColor = ['bg-red-500', 'bg-orange-500', 'bg-yellow-500', 'bg-lime-500', 'bg-green-500'][strength - 1] || 'bg-gray-600';
                            
                            return (
                              <FormItem>
                                <FormLabel className="text-gray-300">Password</FormLabel>
                                <FormControl>
                                  <div className="relative group">
                                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 group-focus-within:text-yellow-400 transition-colors duration-300" size={18} />
                                    <Input 
                                      type={showRegisterPassword ? "text" : "password"} 
                                      placeholder="••••••••" 
                                      className="bg-gray-800/50 border-gray-700 pl-10 pr-10 text-white transition-all duration-300 focus:border-yellow-400 focus:ring-yellow-400/20" 
                                      {...field} 
                                    />
                                    <button
                                      type="button"
                                      onClick={() => setShowRegisterPassword(!showRegisterPassword)}
                                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-yellow-400 transition-colors duration-300"
                                    >
                                      {showRegisterPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                    </button>
                                  </div>
                                </FormControl>
                                {password.length > 0 && (
                                  <div className="mt-2 space-y-1">
                                    <div className="flex gap-1">
                                      {[1, 2, 3, 4, 5].map((level) => (
                                        <div
                                          key={level}
                                          className={`h-1.5 flex-1 rounded-full transition-all duration-300 ${
                                            level <= strength ? strengthColor : 'bg-gray-700'
                                          }`}
                                        />
                                      ))}
                                    </div>
                                    <p className={`text-xs ${strength <= 2 ? 'text-red-400' : strength <= 3 ? 'text-yellow-400' : 'text-green-400'}`}>
                                      {strengthLabel}
                                    </p>
                                  </div>
                                )}
                                <FormMessage />
                              </FormItem>
                            );
                          }}
                        />
                        
                        <FormField
                          control={registerForm.control}
                          name="confirmPassword"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-gray-300">Confirm Password</FormLabel>
                              <FormControl>
                                <div className="relative group">
                                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 group-focus-within:text-yellow-400 transition-colors duration-300" size={18} />
                                  <Input 
                                    type={showRegisterConfirmPassword ? "text" : "password"} 
                                    placeholder="••••••••" 
                                    className="bg-gray-800/50 border-gray-700 pl-10 pr-10 text-white transition-all duration-300 focus:border-yellow-400 focus:ring-yellow-400/20" 
                                    {...field} 
                                  />
                                  <button
                                    type="button"
                                    onClick={() => setShowRegisterConfirmPassword(!showRegisterConfirmPassword)}
                                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-yellow-400 transition-colors duration-300"
                                  >
                                    {showRegisterConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                  </button>
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
            </div>
          </motion.div>
        </div>
      </div>
      
      <FooterSection />
    </div>
  );
};

export default Auth;