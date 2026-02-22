import Main from "../components/Main";
import Plan from "../components/Plan";
import useAttraction from "../hooks/useAttraction";
import usePrice from "../hooks/usePrice";
import useWeather from "../hooks/useWeather";
import { TaiwanWeatherModel } from "../types/taiwanWeatherType";
import { UserModel } from "../types/UserType";

function MainView({isLogin, user}:{isLogin: boolean, user: UserModel}){
    const {Attractions} = useAttraction();
    const {WeatherData} = useWeather();
    const {Price} = usePrice();
    const Citys: string[] = WeatherData ? WeatherData.map((item: TaiwanWeatherModel) => item.locationName) : []
    return(
        <>
            <Main WeatherData={WeatherData} Citys={Citys} Attractions={Attractions} IsLogin={isLogin} user={user}/>
            <Plan Price={Price} IsLogin={isLogin}/>
        </>
    )
}

export default MainView