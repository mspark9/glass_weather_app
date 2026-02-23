import { Calendar, Cloud, Droplet } from 'lucide-react'
import React from 'react'
import { formatDate, formatTemperature, getWeatherIcon } from '../utils/weatherUtils'
import * as LucideIcons from 'lucide-react'

const WeatherForecast = ({ forecast, units }) => {
    const dailyForecast = forecast?.list.reduce((acc, item) => {  // reduce : 배열을 순회하면서 합산하지만 문자열의 경우 중복을 제거한다.
        const date = new Date(item.dt * 1000).toDateString()  // unix 타임스탬프를 밀리초 단위로 변환후 저장 - toDateString() : Mon, Feb 23 2026 형식으로 변환

        if (!acc[date]) {  // 해당 날짜의 첫번째 항목만 저장한다. - 3시간 단위로 분리된 하루예보 중 가장 앞에 있는 항목을 지정
            acc[date] = item
        }
        return acc
    }, {})

    const dailyItems = Object.values(dailyForecast).slice(0, 5)
    // console.log(dailyItems)

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
                {dailyItems.map((item, index) => {
                    const iconName = getWeatherIcon(item.weather[0])
                    const IconComponent = LucideIcons[iconName]

                    return (
                        <div className="flex items-center justify-between p-5 bg-white/5 backdrop-blur-sm rounded-2xl hover:bg-white/10 transition-all duration-300 group border border-white/10" key={index}>
                            <div className="flex items-center space-x-5 flex-1">
                                <div className='text-white/90 group-hover:text-white transition-all transform group-hover:scale-110 duration-200'>
                                    <IconComponent size={40} />
                                </div>
                                <div className='flex-1'>
                                    <div className='text-white font-semibold text-lg'>
                                        {index === 0 ? 'Today' : formatDate(item.dt)}
                                    </div>
                                    <div className='text-white/70 text-sm capitalize font-medium'>
                                        {item.weather[0].description}
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-center space-x-6">
                                <div className='flex items-center space-x-2 text-white/60'>
                                    <Droplet className='w-4 h-4 text-blue-300' />
                                    <span className='text-sm font-medium'>{Math.round(item.pop * 100)}%</span>
                                </div>
                                <div className='text-right'>
                                    <div className='text-white font-bold text-xl'>{formatTemperature(item.main.temp_max, units)}°</div>
                                    <div className='text-white font-medium text-sm'>{formatTemperature(item.main.temp_min, units)}°</div>
                                </div>
                            </div>
                        </div>
                    )
                })}

            </div>
        </div>
    )
}

export default WeatherForecast