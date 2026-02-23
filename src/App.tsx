import MainView from "./features/Attraction/views/AttractionView"
import PlanView from "./features/Plan/views/PlanView"

function App(){
    return(
        <div className="w-full flex-col-center">
            <MainView/>
            <PlanView/>
        </div>
    )
}

export default App