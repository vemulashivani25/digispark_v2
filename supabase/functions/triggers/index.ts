/**
 * =========================================================
 * TRIGGERS EDGE FUNCTION
 * =========================================================
 * 
 * This edge function serves as a centralized handler for 
 * processing database events and triggering notifications.
 * 
 * Features:
 * - Fetches recent contact submissions
 * - Fetches recent newsletter subscriptions
 * - Fetches recent project quotes
 * - Fetches recent blog suggestions
 * - Prepares admin notifications for each event type
 * - Provides detailed logging for debugging
 * 
 * Usage:
 * POST /functions/v1/triggers
 * 
 * Response:
 * {
 *   success: boolean,
 *   notifications: Array<NotificationItem>,
 *   stats: { contacts: number, subscriptions: number, quotes: number, suggestions: number }
 * }
 * 
 * =========================================================
 */

import { serve } from "https://deno.land/std@0.177.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.21.0';

// =========================================================
// CORS CONFIGURATION
// =========================================================
// These headers allow cross-origin requests from any domain
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// =========================================================
// TYPE DEFINITIONS
// =========================================================

/** Represents a notification item to be sent to admin */
interface NotificationItem {
  type: 'new_contact' | 'new_subscription' | 'new_quote' | 'new_blog_suggestion';
  data: Record<string, unknown>;
  timestamp: string;
}

/** Statistics about fetched records */
interface FetchStats {
  contacts: number;
  subscriptions: number;
  quotes: number;
  suggestions: number;
}

// =========================================================
// MAIN HANDLER
// =========================================================
serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    console.log("[triggers] Handling CORS preflight request");
    return new Response(null, {
      headers: corsHeaders,
      status: 204,
    });
  }
  
  console.log("[triggers] Processing trigger request...");
  
  try {
    // =====================================================
    // INITIALIZE SUPABASE CLIENT
    // =====================================================
    // Using service role key for admin-level access
    const supabaseUrl = Deno.env.get('SUPABASE_URL');
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');
    
    if (!supabaseUrl || !supabaseServiceKey) {
      throw new Error("Missing required environment variables: SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY");
    }
    
    const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey, {
      auth: {
        persistSession: false,
      },
    });

    console.log("[triggers] Supabase client initialized successfully");

    // =====================================================
    // FETCH RECENT DATA FROM ALL TABLES
    // =====================================================
    const adminNotifications: NotificationItem[] = [];
    const stats: FetchStats = { contacts: 0, subscriptions: 0, quotes: 0, suggestions: 0 };

    // ----- Fetch Recent Contact Submissions -----
    console.log("[triggers] Fetching recent contact submissions...");
    const { data: contactData, error: contactError } = await supabaseAdmin
      .from('contact_submissions')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(10);

    if (contactError) {
      console.error("[triggers] Error fetching contact submissions:", contactError.message);
    } else if (contactData && contactData.length > 0) {
      stats.contacts = contactData.length;
      console.log(`[triggers] Found ${contactData.length} recent contact submission(s)`);
      
      // Add each contact as a notification
      contactData.forEach(contact => {
        adminNotifications.push({
          type: 'new_contact',
          data: {
            id: contact.id,
            name: contact.name,
            email: contact.email,
            service: contact.service,
            company: contact.company,
            phone: contact.phone,
          },
          timestamp: contact.created_at,
        });
      });
    }

    // ----- Fetch Recent Newsletter Subscriptions -----
    console.log("[triggers] Fetching recent newsletter subscriptions...");
    const { data: newsletterData, error: newsletterError } = await supabaseAdmin
      .from('newsletter_subscriptions')
      .select('*')
      .eq('is_active', true)
      .order('subscribed_at', { ascending: false })
      .limit(10);
    
    if (newsletterError) {
      console.error("[triggers] Error fetching newsletter subscriptions:", newsletterError.message);
    } else if (newsletterData && newsletterData.length > 0) {
      stats.subscriptions = newsletterData.length;
      console.log(`[triggers] Found ${newsletterData.length} active subscription(s)`);
      
      newsletterData.forEach(subscription => {
        adminNotifications.push({
          type: 'new_subscription',
          data: {
            id: subscription.id,
            email: subscription.email,
            isActive: subscription.is_active,
          },
          timestamp: subscription.subscribed_at,
        });
      });
    }

    // ----- Fetch Recent Project Quotes -----
    console.log("[triggers] Fetching recent project quotes...");
    const { data: quoteData, error: quoteError } = await supabaseAdmin
      .from('project_quotes')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(10);
    
    if (quoteError) {
      console.error("[triggers] Error fetching project quotes:", quoteError.message);
    } else if (quoteData && quoteData.length > 0) {
      stats.quotes = quoteData.length;
      console.log(`[triggers] Found ${quoteData.length} recent project quote(s)`);
      
      quoteData.forEach(quote => {
        adminNotifications.push({
          type: 'new_quote',
          data: {
            id: quote.id,
            name: quote.name,
            email: quote.email,
            companyName: quote.company_name,
            selectedCategory: quote.selected_category,
            estimatedBudget: quote.estimated_budget,
            timeline: quote.timeline,
          },
          timestamp: quote.created_at,
        });
      });
    }

    // ----- Fetch Recent Blog Suggestions -----
    console.log("[triggers] Fetching recent blog suggestions...");
    const { data: suggestionData, error: suggestionError } = await supabaseAdmin
      .from('blog_suggestions')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(10);
    
    if (suggestionError) {
      console.error("[triggers] Error fetching blog suggestions:", suggestionError.message);
    } else if (suggestionData && suggestionData.length > 0) {
      stats.suggestions = suggestionData.length;
      console.log(`[triggers] Found ${suggestionData.length} blog suggestion(s)`);
      
      suggestionData.forEach(suggestion => {
        adminNotifications.push({
          type: 'new_blog_suggestion',
          data: {
            id: suggestion.id,
            email: suggestion.email,
            suggestion: suggestion.suggestion,
            topicInterest: suggestion.topic_interest,
          },
          timestamp: suggestion.created_at,
        });
      });
    }

    // =====================================================
    // SORT NOTIFICATIONS BY TIMESTAMP (MOST RECENT FIRST)
    // =====================================================
    adminNotifications.sort((a, b) => 
      new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
    );

    console.log(`[triggers] Total notifications prepared: ${adminNotifications.length}`);
    console.log(`[triggers] Stats: ${JSON.stringify(stats)}`);
    
    // =====================================================
    // RETURN SUCCESS RESPONSE
    // =====================================================
    return new Response(JSON.stringify({
      success: true,
      notifications: adminNotifications,
      stats: stats,
      message: `Successfully fetched ${adminNotifications.length} notification(s)`,
    }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });
    
  } catch (error: unknown) {
    // =====================================================
    // ERROR HANDLING
    // =====================================================
    console.error("[triggers] Fatal error processing triggers:", error);
    
    const errorMessage = error instanceof Error ? error.message : "Unknown error occurred";
    
    return new Response(JSON.stringify({
      success: false,
      error: errorMessage,
      message: "Failed to process trigger request",
    }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});