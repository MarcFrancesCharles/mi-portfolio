"use server";

import { z } from "zod";

const schema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  message: z.string().min(10),
});

export type ContactResult = {
  success: boolean;
  error?: string;
};

/**
 * Server Action para enviar el formulario de contacto.
 * Usa Resend. Requiere RESEND_API_KEY en .env.local.
 */
export async function sendContactEmail(
  formData: FormData
): Promise<ContactResult> {
  const parsed = schema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    message: formData.get("message"),
  });

  if (!parsed.success) {
    return { success: false, error: "Datos inválidos" };
  }

  const { name, email, message } = parsed.data;

  try {
    const { Resend } = await import("resend");
    const resend = new Resend(process.env.RESEND_API_KEY);

    await resend.emails.send({
      // Cambia el from por tu dominio verificado en Resend
      from: "Portfolio <onboarding@resend.dev>",
      to: "mfrancescharles@gmail.com",
      subject: `[Portfolio] Mensaje de ${name}`,
      replyTo: email,
      html: `
        <div style="font-family:monospace;max-width:600px;margin:auto">
          <h2 style="color:#3ef5a8">Nuevo mensaje desde tu portfolio</h2>
          <p><strong>Nombre:</strong> ${name}</p>
          <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
          <hr/>
          <p><strong>Mensaje:</strong></p>
          <p style="white-space:pre-wrap">${message}</p>
        </div>
      `,
    });

    return { success: true };
  } catch (err) {
    console.error("[contact action]", err);
    return { success: false, error: "Error al enviar" };
  }
}