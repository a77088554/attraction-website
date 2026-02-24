import { useContext } from "react";
import { PriceModel } from "../types/priceType"
import usePrice from "../hooks/usePrice";
import { AuthContext } from "../../../core/context/AuthContext";

function Plan(){
    const {Price} = usePrice();
    const {IsLogin} = useContext(AuthContext)

    const handleClick = (login: boolean):void=> {
        if(login === false){
            alert("尚未登入")
        }
        if(login === true){
            alert("尚未實作，但也敢寫你的支持")
        }
    }
    
    return(
        <>
            <div className="sm:w-[75%] w-[80%] max-sm:flex max-sm:flex-col grid grid-flow-col grid-cols-3 gap-4 py-5">
                <div className="text-sm">
                    <h1 className="text-2xl">價格方案</h1>
                    <p>選擇適合你的方案，開始使用我們的服務！</p>
                </div>
                {Price && Price.map((product: PriceModel) => (
                    <div key={product.id} className="flex flex-col items-start gap-5 border p-4 rounded-xl">
                        <h2>{product.name}</h2>
                        <p>價格: {product.price}元/月</p>
                        <button onClick={()=> handleClick(IsLogin)} className={product.name == "斗內一杯咖啡"? "bg-black hover:bg-gray-800 text-white font-bold px-4 py-1 rounded-full": "bg-amber-300 hover:bg-amber-200 text-black font-bold px-4 py-1 rounded-full"}>donate</button>
                    </div>
                ))}
            </div>
        </>
    )
}

export default Plan