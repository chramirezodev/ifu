import type { CollectionConfig } from 'payload'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { IMG } from '../cms/imageGuides'

export const Posts: CollectionConfig = {
  slug: 'posts',
  labels: {
    singular: 'Artículo del blog',
    plural: 'Blog',
  },
  admin: {
    group: 'Contenido',
    useAsTitle: 'title',
    defaultColumns: ['title', 'publishedAt', 'category', 'updatedAt'],
    description: 'Artículos del blog. Cambie título, resumen, imagen y cuerpo del texto.',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Contenido',
          fields: [
            {
              name: 'title',
              label: 'Título',
              type: 'text',
              required: true,
              localized: true,
            },
            {
              name: 'excerpt',
              label: 'Resumen (listado del blog)',
              type: 'textarea',
              localized: true,
              maxLength: 300,
              admin: {
                description: 'Máximo ~160–200 caracteres. Aparece en la lista de artículos.',
              },
            },
            {
              name: 'content',
              label: 'Cuerpo del artículo',
              type: 'richText',
              localized: true,
              editor: lexicalEditor(),
              admin: {
                description: 'Escriba aquí el artículo con formato (títulos, listas, negritas).',
              },
            },
            {
              name: 'publishedAt',
              label: 'Fecha de publicación',
              type: 'date',
              required: true,
              admin: {
                date: { pickerAppearance: 'dayAndTime' },
              },
            },
            {
              name: 'author',
              label: 'Autor',
              type: 'text',
              defaultValue: 'Roger Mardini, Esq.',
            },
            {
              name: 'category',
              label: 'Categoría',
              type: 'text',
              admin: {
                description: 'Ej. Residencia Permanente, Visas, Asilo…',
              },
            },
            {
              name: 'readTime',
              label: 'Tiempo de lectura',
              type: 'text',
              admin: {
                description: 'Ej. 8 min',
              },
            },
          ],
        },
        {
          label: 'Imagen de portada',
          fields: [
            {
              name: 'image',
              label: 'Imagen principal',
              type: 'upload',
              relationTo: 'media',
              admin: {
                description: IMG.blog,
              },
            },
          ],
        },
        {
          label: 'SEO (opcional)',
          fields: [
            {
              name: 'seo',
              label: 'Datos para Google',
              type: 'group',
              fields: [
                {
                  name: 'metaTitle',
                  label: 'Título SEO',
                  type: 'text',
                  localized: true,
                },
                {
                  name: 'metaDescription',
                  label: 'Descripción SEO',
                  type: 'textarea',
                  localized: true,
                  admin: {
                    description: 'Ideal: 140–160 caracteres.',
                  },
                },
                {
                  name: 'keywords',
                  label: 'Palabras clave',
                  type: 'text',
                  localized: true,
                },
              ],
            },
          ],
        },
        {
          label: 'Avanzado',
          description: 'Uso técnico. No necesario para publicar un artículo normal.',
          fields: [
            {
              name: 'slug',
              label: 'Identificador en la URL',
              type: 'text',
              required: true,
              unique: true,
              index: true,
              admin: {
                description: 'Ej. guia-green-card-2024 (sin espacios).',
              },
            },
            {
              name: 'imageUrl',
              label: 'Ruta de imagen antigua',
              type: 'text',
            },
            {
              name: 'contentHtml',
              label: 'HTML antiguo (legacy)',
              type: 'textarea',
              localized: true,
              admin: {
                description: 'Preferir el editor de la pestaña Contenido.',
              },
            },
          ],
        },
      ],
    },
  ],
}
