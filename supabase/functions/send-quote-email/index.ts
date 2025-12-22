import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

/**
 * Edge function for sending project quote emails via Resend
 * Includes input validation and security measures
 */

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface QuoteEmailRequest {
  name: string;
  email: string;
  estimatedBudget: number;
  projectType: string;
  timeline: string;
  features: string[];
  pages?: number;
  projectedImpact: {
    conversionIncrease: number;
    timeToLaunch: string;
    satisfactionRate: number;
  };
}

// Input validation
function validateInput(data: any): { valid: boolean; error?: string; sanitized?: QuoteEmailRequest } {
  if (!data || typeof data !== "object") {
    return { valid: false, error: "Invalid request body" };
  }

  const { name, email, estimatedBudget, projectType, timeline, features, pages, projectedImpact } = data;

  // Validate required fields
  if (!name || typeof name !== "string" || name.trim().length < 2 || name.length > 100) {
    return { valid: false, error: "Invalid name" };
  }

  // Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email || typeof email !== "string" || !emailRegex.test(email) || email.length > 255) {
    return { valid: false, error: "Invalid email address" };
  }

  if (typeof estimatedBudget !== "number" || estimatedBudget < 0 || estimatedBudget > 10000000) {
    return { valid: false, error: "Invalid budget" };
  }

  if (!projectType || typeof projectType !== "string" || projectType.length > 100) {
    return { valid: false, error: "Invalid project type" };
  }

  if (!timeline || typeof timeline !== "string" || timeline.length > 50) {
    return { valid: false, error: "Invalid timeline" };
  }

  if (!Array.isArray(features) || features.length > 20) {
    return { valid: false, error: "Invalid features" };
  }

  // Validate each feature
  for (const feature of features) {
    if (typeof feature !== "string" || feature.length > 100) {
      return { valid: false, error: "Invalid feature value" };
    }
  }

  if (!projectedImpact || typeof projectedImpact !== "object") {
    return { valid: false, error: "Invalid projected impact" };
  }

  // Check for XSS patterns
  const xssPatterns = [/<script/i, /javascript:/i, /on\w+\s*=/i];
  const stringsToCheck = [name, email, projectType, timeline, ...features];
  
  for (const str of stringsToCheck) {
    for (const pattern of xssPatterns) {
      if (pattern.test(str)) {
        return { valid: false, error: "Invalid characters detected" };
      }
    }
  }

  // Sanitize and return
  const sanitized: QuoteEmailRequest = {
    name: name.trim(),
    email: email.trim().toLowerCase(),
    estimatedBudget: Math.round(estimatedBudget),
    projectType: projectType.trim(),
    timeline: timeline.trim(),
    features: features.map((f: string) => f.trim()),
    pages: pages ? Math.min(Math.max(1, Math.round(pages)), 100) : undefined,
    projectedImpact: {
      conversionIncrease: Math.round(projectedImpact.conversionIncrease || 0),
      timeToLaunch: String(projectedImpact.timeToLaunch || "TBD").slice(0, 50),
      satisfactionRate: Math.round(projectedImpact.satisfactionRate || 0),
    },
  };

  return { valid: true, sanitized };
}

// Escape HTML to prevent XSS in email content
function escapeHtml(text: string): string {
  const map: Record<string, string> = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;',
  };
  return text.replace(/[&<>"']/g, (m) => map[m]);
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  // Only allow POST requests
  if (req.method !== "POST") {
    return new Response(JSON.stringify({ success: false, error: "Method not allowed" }), {
      status: 405,
      headers: { "Content-Type": "application/json", ...corsHeaders },
    });
  }

  // Check for API key
  if (!RESEND_API_KEY) {
    console.error("[send-quote-email] RESEND_API_KEY not configured");
    return new Response(
      JSON.stringify({ success: false, error: "Email service not configured" }),
      {
        status: 503,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }

  try {
    const body = await req.json();
    
    // Validate and sanitize input
    const validation = validateInput(body);
    if (!validation.valid || !validation.sanitized) {
      console.error("[send-quote-email] Validation error:", validation.error);
      return new Response(
        JSON.stringify({ success: false, error: validation.error }),
        {
          status: 400,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        }
      );
    }

    const data = validation.sanitized;
    
    console.log(`[send-quote-email] Sending quote email to ${data.email}`);

    const firstName = escapeHtml(data.name.split(" ")[0]);
    const featuresList = data.features
      .map(f => `<li style="margin-bottom: 8px; color: #374151;">${escapeHtml(f)}</li>`)
      .join('');

    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: "DigiSpark <onboarding@resend.dev>",
        to: [data.email],
        subject: `Your Project Quote - $${data.estimatedBudget.toLocaleString()} Estimate`,
        html: `
          <!DOCTYPE html>
          <html>
          <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
          </head>
          <body style="margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f3f4f6;">
            <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff;">
              <!-- Header -->
              <div style="background: linear-gradient(135deg, #1f2937 0%, #111827 100%); padding: 40px 30px; text-align: center;">
                <h1 style="color: #fbbf24; margin: 0; font-size: 28px;">✨ Your Project Quote</h1>
                <p style="color: #9ca3af; margin-top: 10px; font-size: 16px;">Thank you for choosing DigiSpark</p>
              </div>
              
              <!-- Main Content -->
              <div style="padding: 40px 30px;">
                <p style="color: #374151; font-size: 16px; line-height: 1.6;">
                  Hi ${firstName},
                </p>
                <p style="color: #374151; font-size: 16px; line-height: 1.6;">
                  Thank you for your interest in working with us! Here's a summary of your project estimate:
                </p>
                
                <!-- Estimate Box -->
                <div style="background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%); border-radius: 12px; padding: 25px; margin: 25px 0; text-align: center;">
                  <p style="color: #92400e; margin: 0; font-size: 14px; text-transform: uppercase; letter-spacing: 1px;">Estimated Budget</p>
                  <p style="color: #1f2937; margin: 10px 0 0; font-size: 36px; font-weight: bold;">$${data.estimatedBudget.toLocaleString()}</p>
                </div>
                
                <!-- Project Details -->
                <div style="background-color: #f9fafb; border-radius: 12px; padding: 25px; margin: 25px 0;">
                  <h3 style="color: #1f2937; margin: 0 0 20px; font-size: 18px;">📋 Project Details</h3>
                  
                  <table style="width: 100%; border-collapse: collapse;">
                    <tr>
                      <td style="padding: 10px 0; color: #6b7280; border-bottom: 1px solid #e5e7eb;">Project Type</td>
                      <td style="padding: 10px 0; color: #1f2937; font-weight: 600; text-align: right; border-bottom: 1px solid #e5e7eb;">${escapeHtml(data.projectType)}</td>
                    </tr>
                    <tr>
                      <td style="padding: 10px 0; color: #6b7280; border-bottom: 1px solid #e5e7eb;">Timeline</td>
                      <td style="padding: 10px 0; color: #1f2937; font-weight: 600; text-align: right; border-bottom: 1px solid #e5e7eb;">${escapeHtml(data.timeline)}</td>
                    </tr>
                    ${data.pages ? `
                    <tr>
                      <td style="padding: 10px 0; color: #6b7280; border-bottom: 1px solid #e5e7eb;">Pages/Views</td>
                      <td style="padding: 10px 0; color: #1f2937; font-weight: 600; text-align: right; border-bottom: 1px solid #e5e7eb;">${data.pages}</td>
                    </tr>
                    ` : ''}
                  </table>
                </div>
                
                <!-- Features -->
                ${data.features.length > 0 ? `
                <div style="margin: 25px 0;">
                  <h3 style="color: #1f2937; margin: 0 0 15px; font-size: 18px;">🚀 Selected Features</h3>
                  <ul style="margin: 0; padding-left: 20px;">
                    ${featuresList}
                  </ul>
                </div>
                ` : ''}
                
                <!-- Projected Impact -->
                <div style="background: linear-gradient(135deg, #111827 0%, #1f2937 100%); border-radius: 12px; padding: 25px; margin: 25px 0;">
                  <h3 style="color: #fbbf24; margin: 0 0 20px; font-size: 18px;">📈 Projected Impact</h3>
                  
                  <table style="width: 100%;">
                    <tr>
                      <td style="text-align: center; padding: 10px;">
                        <p style="color: #10b981; font-size: 24px; font-weight: bold; margin: 0;">+${data.projectedImpact.conversionIncrease}%</p>
                        <p style="color: #9ca3af; font-size: 12px; margin: 5px 0 0;">Conversion Increase</p>
                      </td>
                      <td style="text-align: center; padding: 10px;">
                        <p style="color: #3b82f6; font-size: 24px; font-weight: bold; margin: 0;">${escapeHtml(data.projectedImpact.timeToLaunch)}</p>
                        <p style="color: #9ca3af; font-size: 12px; margin: 5px 0 0;">Time to Launch</p>
                      </td>
                      <td style="text-align: center; padding: 10px;">
                        <p style="color: #f59e0b; font-size: 24px; font-weight: bold; margin: 0;">${data.projectedImpact.satisfactionRate}%</p>
                        <p style="color: #9ca3af; font-size: 12px; margin: 5px 0 0;">Client Satisfaction</p>
                      </td>
                    </tr>
                  </table>
                </div>
                
                <!-- CTA -->
                <div style="text-align: center; margin: 35px 0;">
                  <p style="color: #374151; font-size: 16px; line-height: 1.6;">
                    Ready to bring your project to life? Our team will reach out within 24 hours to discuss the details.
                  </p>
                </div>
              </div>
              
              <!-- Footer -->
              <div style="background-color: #1f2937; padding: 30px; text-align: center;">
                <p style="color: #9ca3af; margin: 0; font-size: 14px;">
                  © ${new Date().getFullYear()} DigiSpark. All rights reserved.
                </p>
                <p style="color: #6b7280; margin: 10px 0 0; font-size: 12px;">
                  This quote is valid for 30 days from the date of receipt.
                </p>
              </div>
            </div>
          </body>
          </html>
        `,
      }),
    });

    if (!res.ok) {
      const errorData = await res.text();
      console.error("[send-quote-email] Resend API error:", errorData);
      throw new Error(`Failed to send email: ${res.status}`);
    }

    const responseData = await res.json();
    console.log("[send-quote-email] Email sent successfully:", responseData.id);

    return new Response(JSON.stringify({ success: true, data: { id: responseData.id } }), {
      status: 200,
      headers: { "Content-Type": "application/json", ...corsHeaders },
    });
  } catch (error: unknown) {
    console.error("[send-quote-email] Error:", error);
    
    return new Response(
      JSON.stringify({ success: false, error: "Failed to send email" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
});
