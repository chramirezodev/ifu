// Schema para Servicio de Inmigración
module.exports = {
  kind: 'collectionType',
  collectionName: 'services',
  info: {
    name: 'Servicio',
    description: 'Servicios de inmigración ofrecidos'
  },
  options: {
    draftAndPublish: true,
  },
  attributes: {
    title: {
      type: 'string',
      required: true
    },
    slug: {
      type: 'uid',
      targetField: 'title',
      required: true
    },
    description: {
      type: 'richtext',
      required: true
    },
    shortDescription: {
      type: 'text',
      required: true,
      maxLength: 250
    },
    featuredImage: {
      type: 'media',
      multiple: false,
      required: true
    },
    icon: {
      type: 'media',
      multiple: false,
      required: true
    },
    processSteps: {
      type: 'component',
      component: 'elements.process-step',
      required: true,
      repeatable: true,
      min: 1
    },
    requiredDocuments: {
      type: 'component',
      component: 'elements.document',
      repeatable: true
    },
    estimatedTime: {
      type: 'string'
    },
    whatsappMessage: {
      type: 'text',
      description: 'Mensaje predefinido para WhatsApp'
    }
  }
}; 