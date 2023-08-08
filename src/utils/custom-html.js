export function loginNotification (token) { return `<!DOCTYPE html>
  <html>
  <head>
      <meta charset="UTF-8">
      <title>Restablecimiento de Contraseña</title>
  </head>
  <body style="font-family: Arial, sans-serif;">
  
      <h2>Restablecimiento de Contraseña</h2>
      
      <p>Hola,</p>
      <p>Hemos recibido una solicitud para restablecer la contraseña de tu cuenta. Si no solicitaste este cambio, puedes ignorar este mensaje.</p>
      
      <p>Si deseas restablecer tu contraseña, haz clic en el siguiente enlace:</p>
      <p><a href="http://localhost:8081/reset-password?token=${token}" style="background-color: #007BFF; color: #FFFFFF; padding: 10px 20px; text-decoration: none; border-radius: 4px;">Restablecer Contraseña</a></p>
      
      <p>Si el enlace no funciona, copia y pega la siguiente URL en tu navegador:</p>
      <p>http://localhost:8081/reset-password?token=${token}</p>
      
      <p>Si no solicitaste este cambio, no es necesario que realices ninguna acción.</p>
      
      <p>Gracias,</p>
      <p>El equipo de coderDarioOrquera.com</p>
  
  </body>
  </html>`
}