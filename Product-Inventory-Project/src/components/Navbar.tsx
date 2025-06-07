import { Package, Search, Bell, User } from 'lucide-react'

export default function Navbar() {
  return (
    <nav className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <a href="/" className="flex items-center gap-2">
              <div className="p-1.5 bg-blue-600 rounded-lg">
                <Package className="h-5 w-5 text-white" />
              </div>
              <span className="font-semibold text-gray-900">Inventory</span>
            </a>
            <div className="hidden sm:ml-8 sm:flex sm:space-x-4">
              <a href="#" className="px-3 py-2 text-sm font-medium text-gray-900 hover:text-blue-600">
                Dashboard
              </a>
              <a href="#" className="px-3 py-2 text-sm font-medium text-gray-900 hover:text-blue-600">
                Products
              </a>
              <a href="#" className="px-3 py-2 text-sm font-medium text-gray-900 hover:text-blue-600">
                Categories
              </a>
              <a href="#" className="px-3 py-2 text-sm font-medium text-gray-900 hover:text-blue-600">
                Reports
              </a>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <button className="p-2 text-gray-500 hover:text-gray-700 focus:outline-none">
              <Search className="h-5 w-5" />
            </button>
            <button className="p-2 text-gray-500 hover:text-gray-700 focus:outline-none">
              <Bell className="h-5 w-5" />
            </button>
            <button className="p-2 text-gray-500 hover:text-gray-700 focus:outline-none">
              <User className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </nav>
  )
}
