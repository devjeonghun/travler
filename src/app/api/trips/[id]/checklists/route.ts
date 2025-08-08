import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json()
    const { name, description } = body

    const checklist = await prisma.checklist.create({
      data: {
        name,
        description,
        tripId: params.id
      },
      include: {
        items: true
      }
    })

    return NextResponse.json(checklist)
  } catch (error) {
    console.error('Error creating checklist:', error)
    return NextResponse.json(
      { error: 'Failed to create checklist' },
      { status: 500 }
    )
  }
}
