import { useEffect, useCallback, useRef } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

const INACTIVITY_TIMEOUT = 10 * 60 * 1000; // 10 minutes in milliseconds

export const useInactivityLogout = (enabled: boolean = true) => {
  const { toast } = useToast();
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const warningTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const logout = useCallback(async () => {
    try {
      await supabase.auth.signOut();
      toast({
        title: "Session Expired",
        description: "You have been logged out due to inactivity.",
        variant: "destructive"
      });
      window.location.href = '/auth';
    } catch (error) {
      console.error("Error logging out:", error);
    }
  }, [toast]);

  const showWarning = useCallback(() => {
    toast({
      title: "Session Expiring Soon",
      description: "You will be logged out in 1 minute due to inactivity.",
    });
  }, [toast]);

  const resetTimer = useCallback(() => {
    // Clear existing timers
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    if (warningTimeoutRef.current) {
      clearTimeout(warningTimeoutRef.current);
    }

    if (!enabled) return;

    // Set warning 1 minute before logout
    warningTimeoutRef.current = setTimeout(() => {
      showWarning();
    }, INACTIVITY_TIMEOUT - 60000);

    // Set logout timer
    timeoutRef.current = setTimeout(() => {
      logout();
    }, INACTIVITY_TIMEOUT);
  }, [enabled, logout, showWarning]);

  useEffect(() => {
    if (!enabled) return;

    const events = [
      'mousedown',
      'mousemove',
      'keydown',
      'scroll',
      'touchstart',
      'click'
    ];

    // Initial timer
    resetTimer();

    // Reset timer on user activity
    const handleActivity = () => {
      resetTimer();
    };

    events.forEach(event => {
      document.addEventListener(event, handleActivity, { passive: true });
    });

    return () => {
      events.forEach(event => {
        document.removeEventListener(event, handleActivity);
      });
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      if (warningTimeoutRef.current) {
        clearTimeout(warningTimeoutRef.current);
      }
    };
  }, [enabled, resetTimer]);

  return { resetTimer };
};

export default useInactivityLogout;
