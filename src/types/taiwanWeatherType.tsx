export type TaiwanWeatherResponse = {
    locationName: string,
    weatherElement: Array<{
        elementName: string,
        time: Array<{
            endTime: string,
            parameter: {    
                parameterName: string,
                parameterValue: string
            },
            startTime: string
        }>
    }>     
}