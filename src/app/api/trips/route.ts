import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { title, description, destination, startDate, endDate, isPublic } = body

    // 임시로 하드코딩된 사용자 ID 사용 (실제로는 인증된 사용자 ID를 사용해야 함)
    const userId = 'temp-user-id'

    const trip = await prisma.trip.create({
      data: {
        title,
        description,
        destination,
        startDate: new Date(startDate),
        endDate: new Date(endDate),
        isPublic,
        creatorId: userId,
        members: {
          create: {
            userId,
            role: 'creator'
          }
        }
      },
      include: {
        creator: true,
        members: {
          include: {
            user: true
          }
        }
      }
    })

    return NextResponse.json(trip)
  } catch (error) {
    console.error('Error creating trip:', error)
    return NextResponse.json(
      { error: 'Failed to create trip' },
      { status: 500 }
    )
  }
}

export async function GET() {
  try {
    const trips = await prisma.trip.findMany({
      where: {
        isPublic: true
      },
      include: {
        creator: true,
        members: {
          include: {
            user: true
          }
        },
        _count: {
          select: {
            members: true
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    })

    return NextResponse.json(trips)
  } catch (error) {
    console.error('Error fetching trips:', error)
    return NextResponse.json(
      { error: 'Failed to fetch trips' },
      { status: 500 }
    )
  }
}
