// https://api.openweathermap.org/geo/1.0/direct?q={city name},{state code},{country code}&limit={limit}&appid={API key}
// https://api.openweathermap.org/geo/1.0/direct?q=seoul&limit=5&appid={API key}

// https://api.openweathermap.org/data/2.5/weather?lat=37.56&lon=127.00&appid={API key}&units=metric
// https://api.openweathermap.org/data/2.5/forecast?q=seoul&appid={API key}&units=metric


const API_KEY = import.meta.env.VITE_WEATHER_API_KEY
const BASE_URL = import.meta.env.VITE_BASE_URL
const GEO_URL = import.meta.env.VITE_GEO_URL

// get current weather data
export const getCurrentWeather = async (city) => {
    try {
        const response = await fetch(
            `${BASE_URL}/weather?q=${city}&appid=${API_KEY}&units=metric`
        )
        if (!response.ok) {
            if (response.status === 404) {
                throw new Error(
                    `city ${city} not found, Please check the spelling and try again.`
                )
            } else if (response.status === 401) {
                throw new Error(
                    `Invalid API key, Please check the API key and try again.`
                )
            } else {
                throw new Error(
                    `Weather service is temporarily unavailable, Please try again later.`
                )
            }
        }

        const data = await response.json()

        if (!data.dt) {
            // 현재 시간을 밀리초 단위에서 초단위로 표시하고 소숫점 날림
            data.dt = Math.floor(Date.now() / 1000)
        }
        return data

    } catch (error) {
        if (error instanceof TypeError && error.message.includes('fetch')) {
            throw new Error(
                'Network error. Please check your internet connection and try again.'
            )
        }
        throw error
    }
}

// get search city data list
export const searchCities = async (query) => {
    try {
        const response = await fetch(
            `${GEO_URL}/direct?q=${query}&limit=5&appid=${API_KEY}`
        )
        if (!response.ok) {
            if (response.status === 401) {
                throw new Error(
                    `Invalid API key, Please check the API key and try again.`
                )
            } else {
                throw new Error(
                    `Weather service is temporarily unavailable, Please try again later.`
                )
            }
        }

        const data = await response.json()

        return data.map((city) => ({
            name: city.name,
            lat: city.lat,
            lon: city.lon,
            country: city.country,
            state: city.state || '',
        }))
    } catch (error) {
        if (error instanceof TypeError && error.message.includes('fetch')) {
            throw new Error(
                'Network error. Please check your internet connection and try again.'
            )
        }
        throw error
    }
}

// get current weather data by coordinates: 위치별 날씨 정보 가져오기
export const getCurrentWeatherByCoords = async (lat, lon) => {
    try {
        const response = await fetch(
            `${BASE_URL}/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
        )
        if (!response.ok) {
            if (response.status === 401) {
                throw new Error(
                    `Invalid API key, Please check the API key and try again.`
                )
            } else {
                throw new Error(
                    `Weather service is temporarily unavailable, Please try again later.`
                )
            }
        }

        const data = await response.json()

        if (!data.dt) {
            // 현재 시간 표시가 없다면 현재 시간으로 대체
            data.dt = Math.floor(Date.now() / 1000)  // 현재 시간을 밀리초 단위에서 초단위로 표시하고 소수점 버림
        }
        return data
    } catch (error) {
        if (error instanceof TypeError && error.message.includes('fetch')) {
            throw new Error(
                'Network error. Please check your internet connection and try again.'
            )
        }
        throw error
    }
}

// get forecast weather data by city
export const getWeatherForecast = async (city) => {
    try {
        const response = await fetch(
            `${BASE_URL}/forecast?q=${city}&appid=${API_KEY}&units=metric`
        )

        if (!response.ok) {
            if (response.status === 404) {
                throw new Error(
                    `city ${city} not found, Please check the spelling and try again.`
                )
            } else if (response.status === 401) {
                throw new Error(
                    `Invalid API key, Please check the API key and try again.`
                )
            } else {
                throw new Error(
                    `Weather service is temporarily unavailable, Please try again later.`
                )
            }
        }

        const data = await response.json()
        return data
    } catch (error) {
        if (error instanceof TypeError && error.message.includes('fetch')) {
            throw new Error(
                'Network error. Please check your internet connection and try again.'
            )
        }
        throw error
    }
}