import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const { components } = await request.json()

    if (!components || !Array.isArray(components)) {
      return NextResponse.json(
        { error: 'Components array is required' },
        { status: 400 }
      )
    }

    const response = await fetch('https://ecookbook-b.onrender.com/generate-schematic', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(components),
    })

    if (!response.ok) {
      throw new Error(`Backend error: ${response.status}`)
    }

    const schematicData = await response.json()
    return NextResponse.json(schematicData)
  } catch (error) {
    console.error('Schematic generation error:', error)
    return NextResponse.json(
      { error: 'Failed to generate schematic' },
      { status: 500 }
    )
  }
}
