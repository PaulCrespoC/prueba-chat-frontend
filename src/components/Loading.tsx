export default function Loading() {
    return (
        <div className="flex justify-center items-center h-screen bg-gray-200">
            <div className="flex items-center space-x-2">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-gray-800" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647zM12 20c-3.042 0-5.824-1.135-7.938-3l-3 2.647A7.962 7.962 0 0012 24v-4zm5.938-3A7.962 7.962 0 0020 12h4c0 6.627-5.373 12-12 12v-4a7.96 7.96 0 013.938-2.062l2.647 3zM12 4c3.042 0 5.824 1.135 7.938 3l3-2.647A7.962 7.962 0 0024 12h-4zM7.062 7A7.962 7.962 0 004 12H0C0 5.373 5.373 0 12 0v4zm0 13c-3.042 0-5.824-1.135-7.938-3l-3 2.647A7.962 7.962 0 004 24v-4zm10.876-2A5.963 5.963 0 0117 12h-2v-2a4 4 0 00-4-4h-2v2h2a2 2 0 012 2v2c0 1.103.897 2 2 2h2v2z"></path>
                </svg>
                <span className="text-gray-800 text-lg">Cargando...</span>
            </div>
        </div>
    )
}