
import { LucideIcon } from "lucide-react";

export interface Metric {
  label: string;
  value: string;
}

export interface SuccessStory {
  id: number;
  title: string;
  client: string;
  industry: string;
  services: string[];
  challenge: string;
  solution: string;
  result: string;
  testimonial: string;
  clientLogo: string;
  image: string;
  icon: LucideIcon;
  metrics: Metric[];
}
