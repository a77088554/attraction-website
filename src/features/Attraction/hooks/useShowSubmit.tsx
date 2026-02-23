import { useState } from "react"

function useShowSubmit(){
    const [showSubmit, setShowSubmit] = useState<boolean>(false)

    return {showSubmit, setShowSubmit}
}

export default useShowSubmit