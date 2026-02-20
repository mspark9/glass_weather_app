import { MapPin, Search, X } from 'lucide-react'
import React, { useEffect, useRef, useState } from 'react'
import { searchCities } from '../utils/weatherAPI'

const SearchBar = ({ onSearch, loading }) => {
    const [query, setQuery] = useState('')
    const [searchLoading, setSearchLoading] = useState(false)
    const [showSuggestion, setShowSuggestion] = useState(false)
    const [suggestion, setSuggestion] = useState([])

    const searchRef = useRef()

    useEffect(() => {
        const searchTimeout = setTimeout(async () => {
            if (query.length > 2) {
                setSearchLoading(true)

                try {
                    const result = await searchCities(query)
                    setSuggestion(result)
                    setShowSuggestion(true)
                } catch (error) {
                    console.error('Search Failed: ', error)
                } finally {
                    setSearchLoading(false)
                }
            } else {
                setSuggestion([])
                setShowSuggestion(false)
            }
        }, 300)

        return () => clearTimeout(searchTimeout)
    }, [query])

    const clearSearch = () => {
        setQuery('')
        setSuggestion([])
        setShowSuggestion(false)
    }

    const handleSuggestionClick = (city) => {
        const cityName = city.name ? `${city.name}, ${city.state}` : city.name
        onSearch(cityName)
        setQuery("")
        setShowSuggestion(false)
    }

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (searchRef.current && !searchRef.current.contains(e.target)) {
                setShowSuggestion(false)
            }
        }

        document.addEventListener('mousedown', handleClickOutside)
        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [])

    return (
        <div className='relative w-full max-w-2xl' ref={searchRef}>
            <form className='relative'>
                <div className="relative group">
                    <Search className='absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-50 w-5 h-5 group-focus-within:text-white transition-all z-50' />
                    <input type="text" placeholder='Search for city name worldwide..'
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        className='w-full pl-12 pr-24 py-4 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/30 transition-all focus:border-white/40 duration-300 hover:bg-white/15' />

                    {query ? (
                        <button className='absolute right-14 top-1/2 transform -translate-y-1/2 text-white/50 hover:text-white transition-all p-1 rounded-full hover:bg-white/10' onClick={clearSearch}>
                            <X />
                        </button>
                    ) : (
                        <button className='absolute right-14 top-1/2 transform -translate-y-1/2 text-white/50 hover:text-white transition-all p-1 rounded-full hover:bg-white/10'>
                            <MapPin />
                        </button>
                    )}
                </div>
            </form>

            {showSuggestion && (suggestion.length > 0 || searchLoading) && (
                <div className='absolute top-full left-0 right-0 mt-3 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl shadow-2xl overflow-hidden z-50'>
                    {/* Conditional */}
                    {
                        searchLoading ? (
                            <div className="p-6 text-center text-white/70">
                                <div className="animate-spin rounded-full h-6 w-6 border-2 border-white/30 border-t-white mx-auto mb-2"></div>
                                <p>Search Cities..</p>
                            </div>
                        ) : (
                            suggestion.map((city, index) => (
                                <button
                                    className='w-full px-6 py-4 text-left hover:bg-white/10 transition-all duration-200 flex items-center justify-between group border-b border-white/10 last:border-none'
                                    key={index}
                                    onClick={() => handleSuggestionClick(city)}>
                                    <div>
                                        <div className="font-medium text-white group-hover:text-white/90">
                                            {city.name},
                                            {city.state && (
                                                <span className='text-white/70'> {city.state}</span>
                                            )}
                                        </div>
                                        <div className="text-sm text-white/60">
                                            {city.country}
                                        </div>
                                    </div>
                                    <Search className='w-4 h-4 text-white/40 group-hover:text-white/60 transition-all' />
                                </button>
                            ))
                        )
                    }
                </div>
            )}

        </div>
    )
}

export default SearchBar