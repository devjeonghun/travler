import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json()
    const { isCompleted } = body

    const checklistItem = await prisma.checklistItem.update({
      where: {
        id: params.id
      },
      data: {
        isCompleted
      }
    })

    return NextResponse.json(checklistItem)
  } catch (error) {
    console.error('Error updating checklist item:', error)
    return NextResponse.json(
      { error: 'Failed to update checklist item' },
      { status: 500 }
    )
  }
}
