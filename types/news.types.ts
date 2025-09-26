export interface DatedNewsMetadata {
  id: string;
  title: string;
  date: string;
  description: string;
  city: string;
  img: string;
  img_alt: string;
  read_time_seconds: number;
  tags: string[];
  author?: string;
  source?: string;
  img_author?: string;
  img_author_src?: string;
  original_src?: string;
}