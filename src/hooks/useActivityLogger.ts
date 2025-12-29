import { supabase } from "@/integrations/supabase/client";

export type ActivityAction = 
  | 'login'
  | 'logout'
  | 'signup'
  | 'password_reset'
  | 'password_update'
  | 'profile_update'
  | 'role_change'
  | 'user_created'
  | 'user_deleted'
  | 'page_visit';

interface LogActivityParams {
  userId: string;
  action: ActivityAction;
  details?: Record<string, any>;
}

export const logActivity = async ({ userId, action, details = {} }: LogActivityParams) => {
  try {
    const { error } = await supabase
      .from('user_activity_logs' as any)
      .insert({
        user_id: userId,
        action,
        details,
        user_agent: navigator.userAgent,
        ip_address: null, // IP is typically captured server-side
      });

    if (error) {
      console.error('Failed to log activity:', error);
    }
  } catch (err) {
    console.error('Error logging activity:', err);
  }
};

export const useActivityLogger = () => {
  const log = (userId: string, action: ActivityAction, details?: Record<string, any>) => {
    logActivity({ userId, action, details });
  };

  return { log };
};
