export type CmsPageStatus = 'active' | 'inactive';

export interface ICmsPage {
  _id?: string;
  title: string;
  slug: string;
  content: string;
  status: CmsPageStatus;
  metaTitle?: string;
  metaDescription?: string;
  createdAt?: Date;
  updatedAt?: Date;
}
