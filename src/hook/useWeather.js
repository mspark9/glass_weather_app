import React, { useEffect, useState } from 'react'
import { getCurrentWeather, getCurrentWeatherByCoords, getWeatherForecast } from '../utils/weatherAPI'

const useWeather = () => {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const [currentWeather, setCurrentweather] = useState(null)
    const [forecast, setForecast] = useState(null)
    const [units, setUnit] = useState('C')

    const fetchWeatherByCity = async (city) => {
        setLoading(true)
        setError(null)
        try {
            const [weatherData, forecastData] = await Promise.all([
                getCurrentWeather(city),
                getWeatherForecast(city),
            ])
            setCurrentweather(weatherData)
            setForecast(forecastData)
        } catch (error) {
            setError(
                error instanceof Error ? error.message : "Failed to fetch weather data"
            )
        } finally {
            setLoading(false)
        }
    }

    const fetchWeatherByLocation = async (lat, lon) => {
        if (!navigator.geolocation) {
            setError("Geolocation is not supported by your browser")
            return
        }

        setLoading(true)
        setError(null)
        navigator.geolocation.getCurrentPosition(async (position) => {  // 내 기기의 현재 위치를 가져옴
            try {
                const { latitude, longitude } = position.coords
                const weatherData = await getCurrentWeatherByCoords(
                    latitude,
                    longitude,
                )
                setCurrentweather(weatherData)
            } catch (error) {
                setError(
                    error instanceof Error ? error.message : "Failed to fetch weather data"
                )
            } finally {
                setLoading(false)
            }
        })
    }

    useEffect(() => {
        fetchWeatherByCity('seoul')
    }, [])

    const toggleUnit = () => {
        setUnit(units === 'C' ? 'F' : 'C')
    }

    return { loading, error, currentWeather, forecast, units, fetchWeatherByCity, fetchWeatherByLocation, toggleUnit }
}

export default useWeather