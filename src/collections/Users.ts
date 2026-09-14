import type { CollectionConfig } from 'payload'

export const Users: CollectionConfig = {
  slug: 'users',
  labels: {
    singular: 'Usuario del panel',
    plural: 'Usuarios del panel',
  },
  admin: {
    useAsTitle: 'email',
    group: 'Administración',
    description: 'Personas que pueden entrar a este panel para editar el sitio.',
  },
  auth: true,
  fields: [
    {
      name: 'name',
      label: 'Nombre',
      type: 'text',
    },
  ],
}
