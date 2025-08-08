import Link from 'next/link'
import { Plane, Users, CheckSquare, MapPin, Calendar } from 'lucide-react'

export default function Home() {
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
              <Link href="/auth/signin" className="text-gray-600 hover:text-gray-900">
                로그인
              </Link>
              <Link href="/auth/signup" className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
                회원가입
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 sm:text-6xl">
            여행 계획을
            <span className="text-blue-600"> 함께</span> 만들어보세요
          </h1>
          <p className="mt-6 text-xl text-gray-600 max-w-3xl mx-auto">
            친구들과 함께 여행 계획을 세우고, 준비물을 체크하며, 
            완벽한 여행을 준비하세요.
          </p>
          <div className="mt-10">
            <Link 
              href="/trips/create" 
              className="bg-blue-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              여행 계획 만들기
            </Link>
          </div>
        </div>

        {/* Features */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-8 rounded-xl shadow-lg">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
              <Users className="h-6 w-6 text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">함께 계획하기</h3>
            <p className="text-gray-600">
              친구들과 함께 여행 계획을 세우고 일정을 조율하세요.
            </p>
          </div>

          <div className="bg-white p-8 rounded-xl shadow-lg">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
              <CheckSquare className="h-6 w-6 text-green-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">준비물 체크</h3>
            <p className="text-gray-600">
              필요한 준비물을 체크리스트로 관리하고 누락된 것이 없는지 확인하세요.
            </p>
          </div>

          <div className="bg-white p-8 rounded-xl shadow-lg">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
              <MapPin className="h-6 w-6 text-purple-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">여행 정보 공유</h3>
            <p className="text-gray-600">
              여행지 정보와 추천 장소를 팀원들과 공유하세요.
            </p>
          </div>
        </div>

        {/* How it works */}
        <div className="mt-20">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            사용 방법
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                1
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">여행 계획 생성</h3>
              <p className="text-gray-600">목적지와 일정을 설정하여 새로운 여행을 만드세요.</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                2
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">팀원 초대</h3>
              <p className="text-gray-600">친구들을 초대하여 함께 계획을 세우세요.</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                3
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">준비물 체크</h3>
              <p className="text-gray-600">필요한 준비물을 체크리스트로 관리하세요.</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                4
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">여행 시작</h3>
              <p className="text-gray-600">모든 준비가 완료되면 즐거운 여행을 시작하세요!</p>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <div className="flex items-center justify-center mb-4">
              <Plane className="h-6 w-6 text-blue-400" />
              <span className="ml-2 text-xl font-bold">Travle</span>
            </div>
            <p className="text-gray-400">
              © 2024 Travle. 모든 권리 보유.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
