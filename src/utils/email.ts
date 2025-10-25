import nodemailer from "nodemailer";

export interface EmailData {
  name: string;
  email: string;
  message: string;
}

export interface EmailConfig {
  host: string;
  port: number;
  user: string;
  pass: string;
  contactEmail: string;
}

export class EmailService {
  private transporter: nodemailer.Transporter;
  private config: EmailConfig;

  constructor(config: EmailConfig) {
    this.config = config;
    this.transporter = nodemailer.createTransport({
      host: config.host,
      port: config.port,
      secure: false, // true for 465, false for other ports
      auth: {
        user: config.user,
        pass: config.pass,
      },
    });
  }

  async sendContactEmail(data: EmailData): Promise<void> {
    const mailOptions = {
      from: this.config.user,
      to: this.config.contactEmail,
      subject: `Nova mensagem de contato - ${data.name}`,
      html: this.generateHtmlEmail(data),
      text: this.generateTextEmail(data),
    };

    await this.transporter.sendMail(mailOptions);
  }

  private generateHtmlEmail(data: EmailData): string {
    return `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #333; border-bottom: 2px solid #4ade80; padding-bottom: 10px;">
          Nova mensagem de contato - IrrigaTech
        </h2>
        
        <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <p style="margin: 10px 0;"><strong>Nome:</strong> ${data.name}</p>
          <p style="margin: 10px 0;"><strong>Email:</strong> ${data.email}</p>
          <p style="margin: 10px 0;"><strong>Mensagem:</strong></p>
          <div style="background-color: white; padding: 15px; border-radius: 4px; border-left: 4px solid #4ade80;">
            ${data.message.replace(/\n/g, "<br>")}
          </div>
        </div>
        
        <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 30px 0;">
        
        <p style="color: #6b7280; font-size: 14px; text-align: center;">
          <em>Enviado através do site IrrigaTech - Sistema de Irrigação Inteligente para Hortas</em>
        </p>
      </div>
    `;
  }

  private generateTextEmail(data: EmailData): string {
    return `
Nova mensagem de contato - IrrigaTech

Nome: ${data.name}
Email: ${data.email}
Mensagem: ${data.message}

---
Enviado através do site IrrigaTech - Sistema de Irrigação Inteligente para Hortas
    `.trim();
  }
}

// Factory function to create email service with environment variables
export function createEmailService(): EmailService {
  const config: EmailConfig = {
    host: import.meta.env.SMTP_HOST || "smtp.gmail.com",
    port: parseInt(import.meta.env.SMTP_PORT || "587"),
    user: import.meta.env.SMTP_USER || "",
    pass: import.meta.env.SMTP_PASS || "",
    contactEmail:
      import.meta.env.CONTACT_EMAIL || import.meta.env.SMTP_USER || "",
  };

  return new EmailService(config);
}
