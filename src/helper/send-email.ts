import * as nodemailer from 'nodemailer';
import * as fs from 'fs';
import handlebars from 'handlebars';
import * as dotenv from 'dotenv';
import { Logger } from '@nestjs/common';

dotenv.config();
const logger = new Logger('EmailService');

interface EmailOptions {
  to: string;
  subject: string;
  template?: string;
  templateData?: Record<string, any>;
  attachments?: Array<{ filename: string; path: string }>;
  bcc?: string[];
}

const compileTemplate = (
  templateName: string,
  templateData: Record<string, any>,
): string => {
  const filePath = `./src/config/email-templates/${templateName}.hbs`;

  try {
    const source = fs.readFileSync(filePath, 'utf-8');
    const compiledTemplate = handlebars.compile(source);
    return compiledTemplate(templateData);
  } catch (error) {
    logger.error(`Error reading email template file: ${filePath}`, error.stack);
    throw error;
  }
};

const sendEmail = async ({
  to,
  subject,
  template,
  templateData,
  attachments,
  bcc,
}: EmailOptions): Promise<void> => {
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT),
    secure: process.env.SMTP_SECURE === 'true',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
    bcc,
  });

  const mailOptions = {
    from: `"${process.env.EMAIL_FROM_NAME}" <${process.env.EMAIL_FROM}>`,
    to,
    subject,
    html: template ? compileTemplate(template, templateData ?? {}) : undefined,
    attachments,
  };

  try {
    logger.log(`Sending email to: ${to}, Subject: ${subject}`);
    const info = await transporter.sendMail(mailOptions);
    logger.log(`Email sent successfully: ${info.response}`);
  } catch (error) {
    logger.error(`Error sending email to ${to}: ${error.message}`, error.stack);
    throw error;
  }
};

export default sendEmail;
