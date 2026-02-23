import { MapPin } from 'lucide-react'
import React, { useMemo } from 'react'
import { GoogleMap, useLoadScript, Marker } from '@react-google-maps/api'

const mapContainerStyle = {
    width: '100%',
    height: '400px',
    borderRadius: '1.5rem',
    overflow: 'hidden',
}

const mapOptions = {
    zoomControl: true,  // 확대, 축소 버튼 표시
    mapTypeControl: false,  // 지도 타입 버튼 표시 안함
    streetViewControl: false,  // 도로 뷰 버튼 표시 안함
    fullscreenControl: true,  // 전체 화면 버튼 표시
}

const WeatherMap = ({ weather }) => {
    const { isLoaded, loadError } = useLoadScript({
        googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
    })
    const center = useMemo(() => {
        return {
            lat: weather.coord.lat,
            lng: weather.coord.lon,
        }
    }, [weather])

    if (loadError) {
        return (
            <div className='bg-white/10 backdrop-blur-xl rounded-3xl p-8 border border-white/20 flex items-center justify-center h-40'>
                <p className="text-red-300">Fail to load map</p>
            </div>
        )
    }

    if (!isLoaded) {
        return (
            <div className='bg-white/10 backdrop-blur-xl rounded-3xl p-8 border border-white/20 flex items-center justify-center h-40'>
                <p className="text-red-300">Loading map..</p>
            </div>
        )
    }

    return (
        <div className='bg-white/10 backdrop-blur-xl rounded-3xl p-4 border border-white/20'>
            <div className="flex items-center gap-2 mb-4 px-2">
                <MapPin size={20} className='text-indigo-400' />
                <h3 className="text-white font-semibold text-lg">
                    {weather.name}, {weather.sys.country}
                </h3>
                <span className='text-white/60 text-sm ml-auto'>
                    {weather.coord.lat.toFixed(4)}°N, {weather.coord.lon.toFixed(4)}°E
                </span>
            </div>
            <GoogleMap
                mapContainerStyle={mapContainerStyle}
                center={center}
                zoom={12}
                options={mapOptions}
            >
                <Marker position={center} title={weather.name} />
            </GoogleMap>
        </div>
    )
}

export default WeatherMap