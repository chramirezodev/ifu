const axios = require('axios');
const { sanitizeEntity } = require('strapi-utils');

module.exports = {
  // Enviar mensaje a través de WhatsApp Business API
  async sendMessage(ctx) {
    const { phoneNumber, message, serviceId } = ctx.request.body;
    
    try {
      // Validar datos de entrada
      if (!phoneNumber || !message) {
        return ctx.badRequest('Número de teléfono y mensaje son requeridos');
      }
      
      // Si se proporciona un ID de servicio, personalizar el mensaje
      let finalMessage = message;
      if (serviceId) {
        const service = await strapi.services.service.findOne({ id: serviceId });
        if (service && service.whatsappMessage) {
          finalMessage = service.whatsappMessage;
        }
      }
      
      // Configuración de WhatsApp Business API
      const whatsappApiKey = process.env.WHATSAPP_API_KEY;
      const businessPhoneNumber = process.env.WHATSAPP_PHONE_NUMBER;
      
      // Llamada a la API de WhatsApp Business
      const response = await axios.post(
        `https://graph.facebook.com/v14.0/${businessPhoneNumber}/messages`,
        {
          messaging_product: 'whatsapp',
          to: phoneNumber,
          type: 'template',
          template: {
            name: 'immigration_inquiry',
            language: {
              code: 'es'
            },
            components: [
              {
                type: 'body',
                parameters: [
                  {
                    type: 'text',
                    text: finalMessage
                  }
                ]
              }
            ]
          }
        },
        {
          headers: {
            'Authorization': `Bearer ${whatsappApiKey}`,
            'Content-Type': 'application/json'
          }
        }
      );
      
      return {
        success: true,
        messageId: response.data.messages[0].id
      };
      
    } catch (error) {
      console.error('Error al enviar mensaje WhatsApp:', error);
      return ctx.badRequest('Error al enviar mensaje WhatsApp');
    }
  }
}; 