import React, { createContext, useState, useEffect, useContext } from 'react';
import { Session, User } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/components/ui/use-toast';
import { logActivity } from '@/hooks/useActivityLogger';

type AppRole = 'admin' | 'moderator' | 'user' | 'client';
type UserRole = AppRole | null;

type AuthContextType = {
  session: Session | null;
  user: User | null;
  userRole: UserRole;
  isAdmin: boolean;
  isClient: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, fullName: string) => Promise<void>;
  signInWithGoogle: () => Promise<void>;
  signOut: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  updatePassword: (newPassword: string) => Promise<void>;
  loading: boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [userRole, setUserRole] = useState<UserRole>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const fetchUserRole = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('user_roles' as any)
        .select('role')
        .eq('user_id', userId)
        .single();

      if (error) {
        console.error('Error fetching user role:', error);
        return null;
      }
      return (data as any)?.role as AppRole;
    } catch (error) {
      console.error('Error fetching user role:', error);
      return null;
    }
  };

  useEffect(() => {
    // Set up auth state listener FIRST
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        setLoading(false);

        // Fetch role after auth state change using setTimeout to avoid deadlock
        if (session?.user) {
          setTimeout(() => {
            fetchUserRole(session.user.id).then(setUserRole);
          }, 0);

          // Log auth events
          if (event === 'SIGNED_IN') {
            setTimeout(() => {
              logActivity({ userId: session.user.id, action: 'login' });
            }, 0);
          }
        } else {
          setUserRole(null);
        }

        // Log sign out
        if (event === 'SIGNED_OUT' && user) {
          logActivity({ userId: user.id, action: 'logout' });
        }

        console.log('Auth event:', event);
      }
    );

    // THEN check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
      
      if (session?.user) {
        fetchUserRole(session.user.id).then(setUserRole);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const signIn = async (email: string, password: string) => {
    try {
      setLoading(true);
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      toast({
        title: "Successfully signed in",
        description: "Welcome back!",
      });
      
    } catch (error: any) {
      toast({
        title: "Error signing in",
        description: error.message || "An unknown error occurred",
        variant: "destructive",
      });
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const signUp = async (email: string, password: string, fullName: string) => {
    try {
      setLoading(true);
      const redirectUrl = `${window.location.origin}/`;
      
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: redirectUrl,
          data: {
            full_name: fullName,
          },
        }
      });

      if (error) throw error;

      // Log signup activity
      if (data.user) {
        logActivity({ userId: data.user.id, action: 'signup' });
      }

      toast({
        title: "Account created successfully",
        description: "Please check your email for verification.",
      });
      
    } catch (error: any) {
      toast({
        title: "Error creating account",
        description: error.message || "An unknown error occurred",
        variant: "destructive",
      });
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const signInWithGoogle = async () => {
    try {
      setLoading(true);
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/`,
        },
      });

      if (error) throw error;
    } catch (error: any) {
      toast({
        title: "Error signing in with Google",
        description: error.message || "An unknown error occurred",
        variant: "destructive",
      });
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const signOut = async () => {
    try {
      setLoading(true);
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      
      setUserRole(null);
      
      toast({
        title: "Signed out successfully",
      });
    } catch (error: any) {
      toast({
        title: "Error signing out",
        description: error.message || "An unknown error occurred",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const resetPassword = async (email: string) => {
    try {
      setLoading(true);
      const redirectUrl = `${window.location.origin}/auth?type=recovery`;
      
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: redirectUrl,
      });

      if (error) throw error;

      // Log password reset request (we don't have user id here, so just toast)
      toast({
        title: "Password reset email sent",
        description: "Please check your email for the reset link.",
      });
    } catch (error: any) {
      toast({
        title: "Error sending reset email",
        description: error.message || "An unknown error occurred",
        variant: "destructive",
      });
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const updatePassword = async (newPassword: string) => {
    try {
      setLoading(true);
      const { error } = await supabase.auth.updateUser({
        password: newPassword,
      });

      if (error) throw error;

      // Log password update
      if (user) {
        logActivity({ userId: user.id, action: 'password_update' });
      }

      toast({
        title: "Password updated successfully",
        description: "You can now sign in with your new password.",
      });
    } catch (error: any) {
      toast({
        title: "Error updating password",
        description: error.message || "An unknown error occurred",
        variant: "destructive",
      });
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const isAdmin = userRole === 'admin';
  const isClient = userRole === 'client';

  return (
    <AuthContext.Provider value={{ 
      session, 
      user, 
      userRole, 
      isAdmin,
      isClient, 
      signIn, 
      signUp, 
      signInWithGoogle,
      signOut, 
      resetPassword, 
      updatePassword, 
      loading
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
