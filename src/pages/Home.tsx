import Footer from "../sections/Home/Footer"
import Header from "../sections/Home/Header"
import Main from "../sections/Home/Main"
import Price from "../sections/Home/Price"
import type { Product } from "../types/product"
import type { TaiwanWeatherResponse } from "../types/taiwanWeatherType"

function Home({weatherData, citys, isLogin, products, error}:{weatherData: TaiwanWeatherResponse[] | null, citys: string[], isLogin: boolean, products: Product[] | null, error: string | null}) {
    return(
        <>
            <div className='w-full bg-[#FFFCEC] flex-col-center font-bold text-xl overflow-x-hidden'>
                <Header/>
                <Main WeatherData={weatherData} Citys={citys} IsLogin={isLogin}/>
                <Price Products={products} Error={error} IsLogin={isLogin}/>
                <Footer/>
            </div>
        </>
     )
}

export default Home