export type FileType = "png" | "jpeg";
export type Theme = "light" | "dark" | "blue";

export interface ParsedRequest {
  text: string;
  fileType: FileType;
  md: boolean;
  id: string;
}
