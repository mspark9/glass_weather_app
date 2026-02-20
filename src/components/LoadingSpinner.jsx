import React from 'react'

const LoadingSpinner = () => {
    return (
        <div className='flex items-center justify-center p-12'>
            <div className="relative">
                {/* Outer Ring */}
                <div className="w-20 h-20 border-4 border-white/20 rounded-full animate-spin border-t-white/80 shadow-lg"></div>
                {/* Inner Ring */}
                <div className="absolute inset-4 w-12 h-12 border-3 border-blue-200/30 rounded-full animate-spin border-t-blue-200/80 animate-delay-200 left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>
            </div>
        </div>
    )
}

export default LoadingSpinner