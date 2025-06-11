export interface DatedNewsMetadata {
  id: string;
  image: string;
  title: string;
  summary?: string;
  date: string;
  tags?: string[];
  author?: string;
}