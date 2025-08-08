'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import { Plane, Calendar, MapPin, Users, Plus, CheckSquare } from 'lucide-react'
import { format } from 'date-fns'

interface Trip {
  id: string
  title: string
  description: string
  destination: string
  startDate: string
  endDate: string
  isPublic: boolean
  creator: {
    name: string
  }
  members: Array<{
    user: {
      name: string
    }
    role: string
  }>
  checklists: Array<{
    id: string
    name: string
    description: string
    items: Array<{
      id: string
      name: string
      isCompleted: boolean
    }>
  }>
}

export default function TripDetail() {
  const params = useParams()
  const [trip, setTrip] = useState<Trip | null>(null)
  const [loading, setLoading] = useState(true)
  const [newChecklistName, setNewChecklistName] = useState('')
  const [showNewChecklistForm, setShowNewChecklistForm] = useState(false)

  useEffect(() => {
    fetchTrip()
  }, [params.id])

  const fetchTrip = async () => {
    try {
      const response = await fetch(`/api/trips/${params.id}`)
      if (response.ok) {
        const tripData = await response.json()
        setTrip(tripData)
      }
    } catch (error) {
      console.error('Error fetching trip:', error)
    } finally {
      setLoading(false)
    }
  }

  const createChecklist = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newChecklistName.trim()) return

    try {
      const response = await fetch(`/api/trips/${params.id}/checklists`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: newChecklistName,
          description: ''
        }),
      })

      if (response.ok) {
        setNewChecklistName('')
        setShowNewChecklistForm(false)
        fetchTrip() // Refresh trip data
      }
    } catch (error) {
      console.error('Error creating checklist:', error)
    }
  }

  const toggleChecklistItem = async (checklistId: string, itemId: string, isCompleted: boolean) => {
    try {
      const response = await fetch(`/api/checklist-items/${itemId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          isCompleted: !isCompleted
        }),
      })

      if (response.ok) {
        fetchTrip() // Refresh trip data
      }
    } catch (error) {
      console.error('Error updating checklist item:', error)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">여행 정보를 불러오는 중...</p>
        </div>
      </div>
    )
  }

  if (!trip) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">여행을 찾을 수 없습니다</h1>
          <p className="text-gray-600">요청하신 여행이 존재하지 않거나 접근 권한이 없습니다.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center">
              <Plane className="h-8 w-8 text-blue-600" />
              <h1 className="ml-2 text-2xl font-bold text-gray-900">Travle</h1>
            </div>
            <nav className="flex space-x-8">
              <a href="/" className="text-gray-600 hover:text-gray-900">
                홈으로
              </a>
            </nav>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Trip Header */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{trip.title}</h1>
              {trip.description && (
                <p className="text-gray-600 mb-4">{trip.description}</p>
              )}
            </div>
            <div className="flex items-center space-x-2 text-sm text-gray-500">
              <Users className="h-4 w-4" />
              <span>{trip.members.length}명 참여</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex items-center">
              <MapPin className="h-5 w-5 text-blue-600 mr-2" />
              <span className="text-gray-700">{trip.destination}</span>
            </div>
            <div className="flex items-center">
              <Calendar className="h-5 w-5 text-green-600 mr-2" />
              <span className="text-gray-700">
                {format(new Date(trip.startDate), 'yyyy.MM.dd')} - {format(new Date(trip.endDate), 'yyyy.MM.dd')}
              </span>
            </div>
            <div className="flex items-center">
              <span className="text-gray-700">생성자: {trip.creator.name}</span>
            </div>
          </div>
        </div>

        {/* Checklists */}
        <div className="bg-white rounded-xl shadow-lg p-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900">준비물 체크리스트</h2>
            <button
              onClick={() => setShowNewChecklistForm(true)}
              className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Plus className="h-4 w-4 mr-2" />
              새 체크리스트
            </button>
          </div>

          {showNewChecklistForm && (
            <div className="mb-6 p-4 border border-gray-200 rounded-lg">
              <form onSubmit={createChecklist} className="flex gap-4">
                <input
                  type="text"
                  value={newChecklistName}
                  onChange={(e) => setNewChecklistName(e.target.value)}
                  placeholder="체크리스트 이름을 입력하세요"
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                >
                  추가
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowNewChecklistForm(false)
                    setNewChecklistName('')
                  }}
                  className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  취소
                </button>
              </form>
            </div>
          )}

          {trip.checklists.length === 0 ? (
            <div className="text-center py-12">
              <CheckSquare className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500">아직 체크리스트가 없습니다.</p>
              <p className="text-gray-400">새로운 체크리스트를 만들어보세요!</p>
            </div>
          ) : (
            <div className="space-y-6">
              {trip.checklists.map((checklist) => (
                <div key={checklist.id} className="border border-gray-200 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">{checklist.name}</h3>
                  {checklist.description && (
                    <p className="text-gray-600 mb-4">{checklist.description}</p>
                  )}
                  
                  {checklist.items.length === 0 ? (
                    <p className="text-gray-500 italic">아직 항목이 없습니다.</p>
                  ) : (
                    <div className="space-y-2">
                      {checklist.items.map((item) => (
                        <div key={item.id} className="flex items-center">
                          <input
                            type="checkbox"
                            checked={item.isCompleted}
                            onChange={() => toggleChecklistItem(checklist.id, item.id, item.isCompleted)}
                            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                          />
                          <span className={`ml-3 ${item.isCompleted ? 'line-through text-gray-500' : 'text-gray-700'}`}>
                            {item.name}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
