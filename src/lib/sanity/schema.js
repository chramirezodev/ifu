// Esquema Sanity para CMS optimizado de sitio One Page

export default {
  name: 'siteSettings',
  title: 'Configuración del Sitio',
  type: 'document',
  fields: [
    // Sección Hero
    {
      name: 'hero',
      title: 'Sección Principal',
      type: 'object',
      fields: [
        {
          name: 'title',
          title: 'Título Principal',
          type: 'string',
          validation: Rule => Rule.required()
        },
        {
          name: 'subtitle',
          title: 'Subtítulo',
          type: 'text',
          rows: 2
        },
        {
          name: 'backgroundImage',
          title: 'Imagen de Fondo',
          type: 'image',
          options: {
            hotspot: true
          }
        },
        {
          name: 'ctaText',
          title: 'Texto del Botón',
          type: 'string'
        },
        {
          name: 'whatsappMessage',
          title: 'Mensaje de WhatsApp',
          type: 'text',
          rows: 3
        }
      ]
    },
    
    // Sección Servicios
    {
      name: 'services',
      title: 'Servicios',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'title',
              title: 'Título del Servicio',
              type: 'string'
            },
            {
              name: 'slug',
              title: 'Identificador Único',
              type: 'slug',
              options: {
                source: 'title'
              }
            },
            {
              name: 'shortDescription',
              title: 'Descripción Corta',
              type: 'text',
              rows: 2,
              validation: Rule => Rule.max(140)
            },
            {
              name: 'fullDescription',
              title: 'Descripción Completa',
              type: 'array',
              of: [{ type: 'block' }]
            },
            {
              name: 'icon',
              title: 'Ícono',
              type: 'image'
            },
            {
              name: 'featuredImage',
              title: 'Imagen Destacada',
              type: 'image',
              options: {
                hotspot: true
              }
            },
            {
              name: 'whatsappMessage',
              title: 'Mensaje de WhatsApp Personalizado',
              type: 'text',
              rows: 3
            }
          ]
        }
      ]
    },
    
    // Secciones adicionales como AboutUs, Testimonials, Blog, etc.
    // ...
    
    // Información de contacto
    {
      name: 'contactInfo',
      title: 'Información de Contacto',
      type: 'object',
      fields: [
        {
          name: 'phone',
          title: 'Teléfono',
          type: 'string'
        },
        {
          name: 'whatsapp',
          title: 'WhatsApp',
          type: 'string'
        },
        {
          name: 'email',
          title: 'Email',
          type: 'string'
        },
        {
          name: 'address',
          title: 'Dirección',
          type: 'text',
          rows: 2
        },
        {
          name: 'mapUrl',
          title: 'URL de Google Maps',
          type: 'url'
        }
      ]
    },
    
    // Redes sociales
    {
      name: 'socialMedia',
      title: 'Redes Sociales',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'platform',
              title: 'Plataforma',
              type: 'string',
              options: {
                list: [
                  {title: 'Facebook', value: 'facebook'},
                  {title: 'Instagram', value: 'instagram'},
                  {title: 'Twitter', value: 'twitter'},
                  {title: 'LinkedIn', value: 'linkedin'},
                  {title: 'YouTube', value: 'youtube'}
                ]
              }
            },
            {
              name: 'url',
              title: 'URL',
              type: 'url'
            }
          ]
        }
      ]
    }
  ]
} 