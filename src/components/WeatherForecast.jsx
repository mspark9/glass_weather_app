import { Calendar, Cloud, Droplet } from 'lucide-react'
import React from 'react'

const WeatherForecast = () => {
    return (
        <div className='bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8 shadow-2xl'>
            <div className="flex items-center space-x-3 mb-8">
                <div className="p-2 bg-white/10 rounded-full">
                    <Calendar className='w-6 h-6 text-white/80' />
                </div>
                <h2 className="text-2xl font-bold text-white">
                    5 Days Forecast
                </h2>
            </div>

            {/* Forecast List */}
            <div className='space-y-4'>
                <div className="flex items-center justify-between p-5 bg-white/5 backdrop-blur-sm rounded-2xl hover:bg-white/10 transition-all duration-300 group border border-white/10">
                    <div className="flex items-center space-x-5 flex-1">
                        <div className='text-white/90 group-hover:text-white transition-all transform group-hover:scale-110 duration-200'>
                            <Cloud size={40} />
                        </div>
                        <div className='flex-1'>
                            <div className='text-white font-semibold text-lg'>
                                Today
                            </div>
                            <div className='text-white/70 text-sm capitalize font-medium'>
                                Clear Sky
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center space-x-6">
                        <div className='flex items-center space-x-2 text-white/60'>
                            <Droplet className='w-4 h-4 text-blue-300' />
                            <span className='text-sm font-medium'>20%</span>
                        </div>
                        <div className='text-right'>
                            <div className='text-white font-bold text-xl'>17°</div>
                            <div className='text-white font-medium text-sm'>7°</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default WeatherForecast