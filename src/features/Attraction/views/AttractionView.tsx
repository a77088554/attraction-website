import Main from "../components/Main";
import Search from "../components/Search";

function AttractionView(){    
    return(
        <div className="w-full py-8 bg-[#FFF4C1] flex-col-center">
            <Main/> 
            <Search/>
        </div>
    )
}

export default AttractionView