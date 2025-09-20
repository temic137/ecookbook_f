import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const image = formData.get('image');

    if (!image || !(image instanceof File)) {
      return NextResponse.json({ error: 'No image file provided' }, { status: 400 });
    }

    // Forward the request to the backend
    const backendFormData = new FormData();
    backendFormData.append('file', image);

    const backendResponse = await fetch('http://localhost:8000/identify-components', {
      method: 'POST',
      body: backendFormData,
    });

    if (!backendResponse.ok) {
      const errorText = await backendResponse.text();
      console.error('Backend error:', errorText);
      return NextResponse.json({ error: 'Backend analysis failed' }, { status: backendResponse.status });
    }

    const data = await backendResponse.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('API route error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
