function GoTopFunction() {
    const handleGoTop =():void=> {
        window.scrollTo({ top: 0, left:0, behavior: 'smooth' })
    }

    return handleGoTop()
}

export default GoTopFunction