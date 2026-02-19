import { useEffect, useState } from 'react'
import { supabase } from './config/Supabase'
import Title from './sections/Home/Title'
import type { Product } from './types/product'
import type { TaiwanWeatherResponse } from './types/taiwanWeatherType'
import GoTopButton from './components/GoTopButton'
import Home from './pages/Home'
import type { User } from './types/user'
import UserContext from './context/UserContext'

function App() {
  const [products, setProducts] =useState<Product[] | null>(null)
  const [weatherData, setWeatherData] = useState<TaiwanWeatherResponse[] | null>(null)
  const [error, setError] =useState<string | null>(null)
  const [isLogin, setIsLogin] = useState<boolean>(false)
  const [user, setUser] = useState<User | null>(null)
  const citys: string[] = [];
  const [menuOpen, setMenuOpen] = useState(false)

  // Fetch products from supabase
  useEffect(() => {
    // supabase資料抓取(後面使用postgre+express+docker取代)
    const fetchProducts = async () => {
      const { data, error } = await supabase
        .from('products')
        .select()
      if (error) {
        setError("Failed to fetch products")
        setProducts(null)
      } else {
        setProducts(data)
        setError(null)
      }
    }
  
    // 台灣氣象局開放API
    const fetchWeather = async ()=>{
            const response = await fetch(import.meta.env.VITE_WEATHER_API_URL)
            const data = await response.json()
            setWeatherData(data.records.location)
        }
    fetchWeather()

    try{
      fetchProducts();
      fetchWeather();
    }
    catch{
      alert("Unexpect Error")
    }
  }, [])
  weatherData?.forEach((item: TaiwanWeatherResponse) => {
    citys.push(item.locationName)
  });

  return (
    <>
      <UserContext.Provider value={user}>
        <Title isLogin={isLogin} setIsLogin={setIsLogin} user={user} setUser={setUser} menuOpen={menuOpen} setMenuOpen={setMenuOpen}/>
        <Home weatherData={weatherData} citys={citys} isLogin={isLogin} products={products} error={error}/>
      </UserContext.Provider>
      <GoTopButton/>
    </>
  )
}

export default App
