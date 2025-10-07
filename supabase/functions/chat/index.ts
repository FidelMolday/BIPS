import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const { messages } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY is not configured");

    const systemPrompt = `You are BIPS, a helpful virtual assistant for Blessing Institute of Professional Studies (BIPS Technical College).

ABOUT BIPS:
- Founded in 2014 in Kangemi, Nairobi
- Started with 6 students in a salon
- Over 1000 students have graduated since opening
- Registered under the Ministry of Higher Education, TVET Chapter
- Two branches: Kangemi and Kawangware (along Naivasha road on Cooperative Bank building)
- One of the best leading colleges in Nairobi County for technical training

COURSES OFFERED:
1. Hospitality Management (Catering)
2. Cosmetology (Hair & Beauty)
3. Fashion Design (Dress Making)
4. Electrical Installation
5. Plumbing
6. Welding
7. Driving
8. Computer Packages
9. Motor Vehicle Mechanic
10. Certified Nursing Assistant
11. Foreign Language
12. Assistant House Manager

CONTACT INFORMATION:
- Phone: +254 758 538 801
- Email: bipsinfo254@gmail.com
- Location: Kangemi, Nairobi & Kawangware along Naivasha road
- Working Hours: Monday - Friday: 8:00 AM - 5:00 PM, Saturday: 9:00 AM - 1:00 PM

FEE PAYMENT:
Payments are STRICTLY through:
- Equity Bank
- Co-operative Bank

MANAGEMENT:
- Steve Kamwanza - Principal
- Kevin Mbugua - Operations Manager
- Asha Mohamed - College Secretary
- Mukuhi Karimi - Director

IMPORTANT INSTRUCTIONS:
- Answer questions based ONLY on the information provided above
- Keep responses clear, concise, and friendly
- If asked about topics not covered in the information above (like specific fees, detailed course content, admission requirements, etc.), politely respond: "That's a great question! For detailed information about [topic], please contact us directly at +254 758 538 801 or email bipsinfo254@gmail.com. Our team will be happy to help you with all the details."
- Always maintain a professional and encouraging tone
- If unsure, always direct to contact information rather than guessing`;

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          { role: "system", content: systemPrompt },
          ...messages,
        ],
        stream: true,
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(JSON.stringify({ error: "Rate limits exceeded, please try again later." }), {
          status: 429,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (response.status === 402) {
        return new Response(JSON.stringify({ error: "Payment required, please add funds to your Lovable AI workspace." }), {
          status: 402,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      const errorText = await response.text();
      console.error("AI gateway error:", response.status, errorText);
      return new Response(JSON.stringify({ error: "AI gateway error" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    return new Response(response.body, {
      headers: { ...corsHeaders, "Content-Type": "text/event-stream" },
    });
  } catch (e) {
    console.error("chat error:", e);
    return new Response(JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
