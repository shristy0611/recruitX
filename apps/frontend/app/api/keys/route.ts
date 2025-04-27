import { NextResponse } from 'next/server';

// Return all Gemini API keys from environment variables
export async function GET() {
  try {
    // Get all Gemini API keys from environment variables
    const keys: string[] = [];
    
    // Look for environment variables named GEMINI_API_KEY_1, GEMINI_API_KEY_2, etc.
    for (let i = 1; i <= 10; i++) {
      const key = process.env[`GEMINI_API_KEY_${i}`];
      if (key) {
        keys.push(key);
      }
    }
    
    // Return the API keys (in a real-world scenario, you might want to implement
    // additional security measures before exposing API keys to the frontend)
    return NextResponse.json({ keys });
  } catch (error) {
    console.error('Error fetching API keys:', error);
    return NextResponse.json(
      { error: 'Failed to fetch API keys' },
      { status: 500 }
    );
  }
} 