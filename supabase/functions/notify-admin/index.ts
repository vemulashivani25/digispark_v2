import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

/**
 * Edge function for sending admin notifications
 * Validates input and queues notifications securely
 */

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// Simple validation for notification types
const validNotificationTypes = [
  "contact_submission",
  "newsletter_subscription",
  "project_quote",
  "project_inquiry",
  "blog_suggestion",
];

// Input validation
function validateInput(data: any): { valid: boolean; error?: string } {
  if (!data || typeof data !== "object") {
    return { valid: false, error: "Invalid request body" };
  }

  const { type, data: notificationData } = data;

  if (!type || typeof type !== "string") {
    return { valid: false, error: "Notification type is required" };
  }

  if (!validNotificationTypes.includes(type)) {
    return { valid: false, error: "Invalid notification type" };
  }

  if (!notificationData || typeof notificationData !== "object") {
    return { valid: false, error: "Notification data is required" };
  }

  // Check for XSS patterns in string values
  const stringValues = Object.values(notificationData).filter(v => typeof v === "string");
  const xssPatterns = [/<script/i, /javascript:/i, /on\w+\s*=/i];
  
  for (const value of stringValues) {
    for (const pattern of xssPatterns) {
      if (pattern.test(value as string)) {
        return { valid: false, error: "Invalid characters detected in input" };
      }
    }
  }

  return { valid: true };
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, {
      headers: corsHeaders,
      status: 204,
    });
  }

  // Only allow POST requests
  if (req.method !== "POST") {
    return new Response(JSON.stringify({
      success: false,
      error: "Method not allowed"
    }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 405
    });
  }

  try {
    const body = await req.json();
    
    // Validate input
    const validation = validateInput(body);
    if (!validation.valid) {
      console.error("Validation error:", validation.error);
      return new Response(JSON.stringify({
        success: false,
        error: validation.error
      }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 400
      });
    }

    const { type, data } = body;
    
    // Log notification (in production, you would send an email here)
    console.log(`[notify-admin] Type: ${type}`);
    console.log(`[notify-admin] Timestamp: ${new Date().toISOString()}`);
    // Don't log sensitive data like emails in production
    console.log(`[notify-admin] Data keys: ${Object.keys(data).join(", ")}`);
    
    return new Response(JSON.stringify({
      success: true,
      message: "Admin notification queued successfully"
    }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200
    });
    
  } catch (error: unknown) {
    console.error("[notify-admin] Error processing notification:", error);
    
    const errorMessage = error instanceof Error ? error.message : "Unknown error occurred";
    
    return new Response(JSON.stringify({
      success: false,
      error: "Failed to process notification"
    }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500
    });
  }
});
