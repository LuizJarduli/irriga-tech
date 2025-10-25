import type { APIRoute } from "astro";
import { createEmailService, type EmailData } from "@/utils/email";

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
  try {
    // Check if request has body
    const contentType = request.headers.get("content-type");
    if (!contentType || !contentType.includes("application/json")) {
      return new Response(
        JSON.stringify({
          success: false,
          message: "Content-Type deve ser application/json",
        }),
        {
          status: 400,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    }

    // Get request body with error handling
    let body;
    try {
      const text = await request.text();
      console.log("Raw request body:", text);

      if (!text || text.trim() === "") {
        return new Response(
          JSON.stringify({
            success: false,
            message: "Corpo da requisição está vazio",
          }),
          {
            status: 400,
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
      }

      body = JSON.parse(text);
      console.log("Parsed body:", body);
    } catch (error) {
      console.error("JSON parsing error:", error);
      return new Response(
        JSON.stringify({
          success: false,
          message: "Dados inválidos no corpo da requisição",
        }),
        {
          status: 400,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    }

    const { name, email, message }: EmailData = body;

    // Validate required fields
    if (!name || !email || !message) {
      return new Response(
        JSON.stringify({
          success: false,
          message: "Nome, email e mensagem são obrigatórios",
        }),
        {
          status: 400,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return new Response(
        JSON.stringify({
          success: false,
          message: "Email inválido",
        }),
        {
          status: 400,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    }

    // Check if email service is configured
    if (!import.meta.env.SMTP_USER || !import.meta.env.SMTP_PASS) {
      console.error(
        "Email service not configured. Missing SMTP_USER or SMTP_PASS environment variables."
      );
      return new Response(
        JSON.stringify({
          success: false,
          message: "Serviço de email não configurado",
        }),
        {
          status: 500,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    }

    // Create email service and send email
    const emailService = createEmailService();
    await emailService.sendContactEmail({ name, email, message });

    return new Response(
      JSON.stringify({
        success: true,
        message: "Mensagem enviada com sucesso!",
      }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  } catch (error) {
    console.error("Error sending email:", error);

    return new Response(
      JSON.stringify({
        success: false,
        message: "Erro interno do servidor. Tente novamente mais tarde.",
      }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }
};
