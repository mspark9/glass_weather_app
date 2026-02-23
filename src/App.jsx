import './App.css'
import ErrorMessage from './components/ErrorMessage'
import LoadingSpinner from './components/LoadingSpinner'
import SearchBar from './components/SearchBar'
import TemperatureToggle from './components/TemperatureToggle'
import WeatherCard from './components/WeatherCard'
import WeatherForecast from './components/WeatherForecast'
import useWeather from './hook/useWeather'

function App() {
    // hook data
    const { loading, error, fetchWeatherByCity, currentWeather, fetchWeatherByLocation, units, toggleUnit, forecast } = useWeather()
    // console.log(currentWeather)

    return (
        <div className='min-h-screen relative overflow-hidden'>
            {/* Background */}
            <div className='absolute inset-0 bg-cover bg-center bg-no-repeat' style={{ backgroundImage: "url('https://images.pexels.com/photos/1431822/pexels-photo-1431822.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop')" }}>
                {/* Overlay */}
                <div className='absolute inset-0 bg-linear-to-r from-blue-900/40 via-purple-900/30 to-indigo-900/40'></div>
                <div className='absolute inset-0 bg-black/20'></div>
            </div>

            {/* Slogan Contents */}
            <div className='relative z-10 container mx-auto px-4 py-8 min-h-screen'>
                <div className='max-auto'>
                    <div className="text-center mb-12">
                        <div className='mb-8'>
                            <h1 className="text-5xl md:text-7xl font-bold text-white mb-4 drop-shadow-2xl tracking-tight">
                                Weather{' '}
                                <span className='bg-linear-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent'>
                                    Pro
                                </span>
                            </h1>

                            <p className='text-white/80 text-lg md:text-xl mb-8 max-w-2xl mx-auto leading-relaxed'>
                                Get real-time weather updates, forecasts, and alerts with our
                                advanced weather tracking system.
                            </p>
                        </div>

                        {/* Search Bar */}
                        <div className='flex flex-col lg:flex-row items-center justify-center space-y-6 lg:space-y-0 lg:space-x-6 mb-12'>
                            <SearchBar onSearch={fetchWeatherByCity} loading={loading} onLocationSearch={fetchWeatherByLocation} />
                            <TemperatureToggle units={units} onToggle={toggleUnit} />
                        </div>
                    </div>

                    {/* Main Section Contents */}
                    <div className='space-y-8'>
                        {loading && (
                            <div className="flex justify-center">
                                <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 border border-white/20">
                                    <LoadingSpinner />
                                    <p className="text-white/80 text-center mt-4 font-medium">
                                        Fetching Latest Weather Data..
                                    </p>
                                </div>
                            </div>
                        )}

                        {error && (
                            <div className="max-w-2xl mx-auto">
                                <ErrorMessage />
                            </div>
                        )}

                        {
                            currentWeather && !loading && (
                                <div>
                                    <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
                                        <div className="xl:col-span-2">
                                            <WeatherCard weather={currentWeather} units={units} />
                                        </div>
                                        <div className="xl:col-span-1">
                                            <WeatherForecast forecast={forecast} units={units} />
                                        </div>
                                    </div>
                                </div>
                            )
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default App
