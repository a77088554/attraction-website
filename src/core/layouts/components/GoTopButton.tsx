function GoTopButton() {
    const handleGoTop =():void=> {
        window.scrollTo({ top: 0, left:0, behavior: 'smooth' })
    }

    return (
        <button onClick={handleGoTop} className="fixed bottom-5 right-5 bg-gray-500 text-white p-2 rounded-full hover:bg-gray-700 duration-300">
            Top
        </button>
    )
}

export default GoTopButton