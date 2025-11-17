import AsyncStorage from '@react-native-async-storage/async-storage';
import { SENDGRID_API_KEY, SENDGRID_API_URL } from './config';

const VERIFICATION_CODE_STORAGE_KEY = 'verificationCode';

// Generate a 4-digit verification code
export const generateVerificationCode = () => {
  return Math.floor(1000 + Math.random() * 9000).toString();
};

// Store verification code with email
export const storeVerificationCode = async (email, code) => {
  try {
    await AsyncStorage.setItem(
      VERIFICATION_CODE_STORAGE_KEY,
      JSON.stringify({ email, code, timestamp: Date.now() })
    );
  } catch (error) {
    console.error('Error storing verification code:', error);
  }
};

// Get stored verification code
export const getStoredVerificationCode = async () => {
  try {
    const stored = await AsyncStorage.getItem(VERIFICATION_CODE_STORAGE_KEY);
    return stored ? JSON.parse(stored) : null;
  } catch (error) {
    console.error('Error getting verification code:', error);
    return null;
  }
};

// Clear stored verification code
export const clearVerificationCode = async () => {
  try {
    await AsyncStorage.removeItem(VERIFICATION_CODE_STORAGE_KEY);
  } catch (error) {
    console.error('Error clearing verification code:', error);
  }
};

// Send verification email via SendGrid
export const sendVerificationEmail = async (email, code) => {
  try {
    if (!SENDGRID_API_KEY) {
      console.error(
        'SendGrid API key is not configured. Please set SENDGRID_API_KEY in your environment variables or EAS Secrets.'
      );
      return {
        success: false,
        error:
          'Configuración de email no disponible. Por favor contacta al soporte.',
      };
    }
    const emailBody = {
      personalizations: [
        {
          to: [{ email }],
          subject: 'Código de Verificación - HUELLITAPP',
        },
      ],
      from: {
        email: 'huellitapp@outlook.com',
        name: 'HUELLITAPP',
      },
      content: [
        {
          type: 'text/html',
          value: `
            <!DOCTYPE html>
            <html lang="es">
              <head>
                <meta charset="utf-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <meta http-equiv="X-UA-Compatible" content="IE=edge">
                <!--[if mso]>
                <style type="text/css">
                  body, table, td {font-family: Arial, sans-serif !important;}
                </style>
                <![endif]-->
              </head>
              <body style="margin: 0; padding: 0; background-color: #f4f4f4; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;">
                <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background-color: #f4f4f4;">
                  <tr>
                    <td align="center" style="padding: 40px 20px;">
                      <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="600" style="max-width: 600px; background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
                        
                        <!-- Header -->
                        <tr>
                          <td style="background: linear-gradient(135deg, #FAA35F 0%, #FF8C42 100%); padding: 50px 40px; text-align: center;">
                            <h1 style="margin: 0; font-size: 38px; font-weight: 700; color: #ffffff; letter-spacing: 3px; text-transform: uppercase;">HUELLITAPP</h1>
                            <p style="margin: 8px 0 0 0; font-size: 15px; color: rgba(255,255,255,0.95); font-weight: 400;">Encuentra a tu mascota perdida</p>
                          </td>
                        </tr>
                        
                        <!-- Content -->
                        <tr>
                          <td style="padding: 50px 40px; text-align: center;">
                            <p style="margin: 0 0 20px 0; font-size: 20px; color: #333333; font-weight: 500;">¡Hola!</p>
                            <h2 style="margin: 0 0 20px 0; font-size: 28px; font-weight: 600; color: #5A80B2;">Código de Verificación</h2>
                            <p style="margin: 0 0 40px 0; font-size: 16px; color: #666666; line-height: 1.6;">
                              Gracias por registrarte en HUELLITAPP. Para completar tu registro, ingresa el siguiente código de verificación en la aplicación:
                            </p>
                            
                            <!-- Code Label -->
                            <p style="margin: 0 0 16px 0; font-size: 12px; color: #999999; text-transform: uppercase; letter-spacing: 1.5px; font-weight: 500;">Tu código de verificación</p>
                            
                            <!-- Code Boxes -->
                            <table role="presentation" cellspacing="0" cellpadding="0" border="0" align="center" style="margin: 0 auto 40px auto;">
                              <tr>
                                ${code
                                  .split('')
                                  .map(
                                    digit => `
                                  <td style="padding: 0 6px;">
                                    <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="70" height="80" style="background-color: #ffffff; border: 3px solid #FAA35F; border-radius: 10px; box-shadow: 0 4px 12px rgba(250,163,95,0.25);">
                                      <tr>
                                        <td align="center" valign="middle" style="font-size: 36px; font-weight: 700; color: #5A80B2; line-height: 1;">${digit}</td>
                                      </tr>
                                    </table>
                                  </td>
                                `
                                  )
                                  .join('')}
                              </tr>
                            </table>
                            
                            <!-- Info Box -->
                            <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background-color: #f8f9fa; border-left: 4px solid #5A80B2; border-radius: 6px; margin: 0 auto;">
                              <tr>
                                <td style="padding: 20px 24px;">
                                  <p style="margin: 0 0 12px 0; font-size: 14px; color: #555555; line-height: 1.6;">
                                    <strong style="color: #333333;">⏱️ Este código expirará en 10 minutos</strong>
                                  </p>
                                  <p style="margin: 0; font-size: 14px; color: #555555; line-height: 1.6;">
                                    <strong style="color: #333333;">🔒 Si no solicitaste este código</strong>, puedes ignorar este correo de forma segura.
                                  </p>
                                </td>
                              </tr>
                            </table>
                          </td>
                        </tr>
                        
                        <!-- Footer -->
                        <tr>
                          <td style="background-color: #f8f9fa; padding: 30px 40px; text-align: center; border-top: 1px solid #e9ecef;">
                            <p style="margin: 0; font-size: 12px; color: #999999; line-height: 1.6;">
                              Este es un correo automático, por favor no respondas.<br>
                              © ${new Date().getFullYear()} HUELLITAPP. Todos los derechos reservados.
                            </p>
                          </td>
                        </tr>
                        
                      </table>
                    </td>
                  </tr>
                </table>
              </body>
            </html>
          `,
        },
      ],
    };

    const response = await fetch(SENDGRID_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${SENDGRID_API_KEY}`,
      },
      body: JSON.stringify(emailBody),
    });

    if (response.ok) {
      // Store the verification code for later verification
      await storeVerificationCode(email, code);
      return { success: true };
    } else {
      let errorMessage = 'Error desconocido';
      try {
        const errorData = await response.json();
        console.error('SendGrid API Error:', response.status, errorData);

        // Extract error message from SendGrid response
        if (errorData.errors && errorData.errors.length > 0) {
          errorMessage = errorData.errors
            .map(err => err.message || err.field || 'Error')
            .join('. ');
        } else if (errorData.message) {
          errorMessage = errorData.message;
        } else {
          errorMessage = `Error ${response.status}: ${response.statusText}`;
        }
      } catch (parseError) {
        const errorText = await response.text();
        console.error('SendGrid API Error (text):', response.status, errorText);
        errorMessage = `Error ${response.status}: ${errorText || response.statusText}`;
      }

      return {
        success: false,
        error: errorMessage,
        statusCode: response.status,
      };
    }
  } catch (error) {
    console.error('Error sending verification email:', error);
    return {
      success: false,
      error:
        error.message || 'Error de conexión. Verifica tu conexión a internet.',
    };
  }
};

// Verify the code entered by user
export const verifyCode = async (enteredCode, email) => {
  try {
    const stored = await getStoredVerificationCode();

    if (!stored) {
      return { valid: false, error: 'No se encontró código de verificación' };
    }

    // Check if code has expired (10 minutes)
    const tenMinutes = 10 * 60 * 1000;
    if (Date.now() - stored.timestamp > tenMinutes) {
      await clearVerificationCode();
      return { valid: false, error: 'El código ha expirado' };
    }

    // Check if email matches
    if (stored.email !== email) {
      return { valid: false, error: 'El correo no coincide' };
    }

    // Check if code matches
    if (stored.code !== enteredCode) {
      return { valid: false, error: 'Código incorrecto' };
    }

    // Code is valid
    await clearVerificationCode();
    return { valid: true };
  } catch (error) {
    console.error('Error verifying code:', error);
    return { valid: false, error: error.message };
  }
};
