import Footer from "./components/Footer"
import Header from "./components/Header"
import Title from "./components/Title"
import GoTopButton from "./components/GoTopButton"

function FullLayout({ children }: { children: React.ReactNode }){
    return(
        <div className="w-full font-bold flex flex-col items-center overflow-x-auto bg-slate-50 ">
            <Title/>
            <Header/>
            {children}
            <Footer/>
            <GoTopButton/>
        </div>
    )
}

export default FullLayout