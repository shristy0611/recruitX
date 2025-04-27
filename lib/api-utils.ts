import { NextRequest } from 'next/server';
import { i18n } from '@/lib/i18n-config';

// Define database interface
export interface D1Database {
  prepare: (query: string) => D1PreparedStatement;
  exec: (query: string) => Promise<D1ExecResult>;
  batch: (statements: D1PreparedStatement[]) => Promise<D1Result[]>;
}

export interface D1PreparedStatement {
  bind: (...values: any[]) => D1PreparedStatement;
  first: <T = unknown>(colName?: string) => Promise<T | null>;
  run: () => Promise<D1Result>;
  all: <T = unknown>() => Promise<D1Result<T>>;
}

export interface D1Result<T = unknown> {
  results?: T[];
  success: boolean;
  error?: string;
  meta?: Record<string, any>;
}

export interface D1ExecResult {
  count: number;
  duration: number;
}

// Define Cloudflare context
export interface CloudflareContext {
  env: {
    DB: D1Database;
  };
}

// Get Cloudflare context from request
export function getCloudflareContext(req: NextRequest): CloudflareContext | null {
  // @ts-ignore - Cloudflare specific property
  return req.cf || null;
}

// Get user's preferred language from request
export function getLanguage(req: NextRequest): string {
  // Check for language in cookie
  const cookieValue = req.cookies.get('NEXT_LOCALE')?.value;
  if (cookieValue && i18n.locales.includes(cookieValue)) {
    return cookieValue;
  }

  // Check for language in Accept-Language header
  const acceptLanguage = req.headers.get('Accept-Language');
  if (acceptLanguage) {
    const preferredLocale = acceptLanguage
      .split(',')
      .map(lang => lang.split(';')[0].trim())
      .find(lang => {
        // Check if language code matches any of our supported locales
        return i18n.locales.some(locale => 
          lang === locale || lang.startsWith(`${locale}-`)
        );
      });
    
    if (preferredLocale) {
      // Extract the base language code
      const baseLocale = i18n.locales.find(locale => 
        preferredLocale === locale || preferredLocale.startsWith(`${locale}-`)
      );
      if (baseLocale) return baseLocale;
    }
  }

  // Default to English
  return i18n.defaultLocale;
}

// Helper function to handle API responses
export function apiResponse(data: any, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      'Content-Type': 'application/json',
    },
  });
}

// Helper function to handle API errors
export function apiError(message: string, status = 400) {
  return apiResponse({ error: message }, status);
}
