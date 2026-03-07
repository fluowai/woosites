import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatWhatsApp(phone: string) {
  const cleaned = phone.replace(/\D/g, "");
  return `https://wa.me/55${cleaned}`;
}
