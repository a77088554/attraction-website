import { useContext } from "react";
import { supabase } from "../config/Supabase";
import UserContext from "../context/UserContext";

function SubmitSuggest({setShowSubmit, city}: {setShowSubmit: React.Dispatch<React.SetStateAction<boolean>>, city: string}) {
    const user = useContext(UserContext)

    // 將使用者所推薦的地點以及位置上傳到supabase
    const insertSuggest = async ({email, name, attraction, location, city}: {email: string, name: string, attraction: string, location: string, city: string}) => {
        const { data, error } = await supabase
        .from('suggests')
        .insert({email: email, name: name, attraction: attraction, location: location, city: city})
        if(error){
            alert(error.message)
        }
        if(data){
            console.log(data)
        }
    }
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const formData = new FormData(e.currentTarget)
        const attraction = formData.get("attraction") as string
        const location = formData.get("location") as string
        
        try{
            await insertSuggest({email: user?.email as string, name: user?.name as string, attraction: attraction, location: location, city: city})
            setShowSubmit(false)
            alert("推薦成功")
        }
        catch{
            alert("推薦失敗，請重新提交")
        }
    }

    return(
        <>
            <div className="fixed inset-0 bg-gray-400/80 flex justify-center items-center">
                <form className="bg-white p-6 rounded-xl w-80 shadow-lg" onSubmit={(e)=>handleSubmit(e)}>
                    <h2 className="text-xl mb-4">推薦景點</h2>
                    <input className="border p-2 w-full mb-3" name="attraction"/>
                    <h2 className="text-xl mb-4">景點地址</h2>
                    <input className="border p-2 w-full mb-3" name="location"/>
                    <div className="flex justify-end gap-2">
                        <button className="bg-gray-400 px-3 py-1 rounded" onClick={()=>setShowSubmit(false)}>取消</button>
                        <button className="bg-blue-500 text-white px-3 py-1 rounded" type="submit">送出</button>
                    </div>
                </form>
            </div>

        </>
    )
}

export default SubmitSuggest