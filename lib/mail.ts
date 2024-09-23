import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendVerificationEmail = async (email: string, token: string) => {
  console.log(email, token)
  const {data, error} = await resend.emails.send({
    from: 'NotesApp <onboarding@resend.dev>',
    to: email,
    subject: 'Verify your email',
    html: `<h1>Verify your email</h1><p>Please click the following link to verify your email address:</p><p><a href="http://localhost:3000/authentication/verify-email/${token}">Confirm email</a></p>`,
  });

  if (error) {
    console.log(error);
  } else {
    console.log(data);
  }
}