export interface StrapiResponse<T> {
  data: T;
  meta: {
    pagination?: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

export interface StrapiData<T> {
  id: number;
  attributes: T;
}

export interface StrapiImage {
  data: {
    id: number;
    attributes: {
      url: string;
      alternativeText: string;
      caption: string;
      width: number;
      height: number;
    };
  };
}

export interface Service {
  id: number;
  attributes: {
    title: string;
    description: string;
    expandedDescription?: string;
    slug: string;
    image?: {
      data: {
        attributes: {
          url: string;
        };
      };
    };
  };
}

export interface Testimonial {
  id: number;
  attributes: {
    name: string;
    role?: string;
    content: string;
    image?: {
      data: {
        attributes: {
          url: string;
        };
      };
    };
  };
}

export interface GlobalMetadata {
  siteName: string;
  description: string;
  keywords: string;
  logo: StrapiImage;
  socialMedia: {
    platform: string;
    url: string;
  }[];
  contactInfo: {
    email: string;
    phone: string;
    address: string;
  };
} 