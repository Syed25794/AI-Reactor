export const constants = {
    LanthanidesSeriesFirstElementSymbol : 'La',
    ActinidesSeriesFirstElementSymbol : 'Ac',
    selectedElementsLimits : 10,
    minSelectedElements : 1,
    Gemini_Modal : "gemini-1.5-pro",
    responseMimeTypeTextPlain : "text/plain",
    responseMimeTypeJSON : "application/json",
    temperatureUnit: 'Kalvin',
    pressureUnit: 'atm',
    blackColor:'#000000',
    whiteColor: '#ffffff',
    maxReactants: 6,
    temperature : 1,
    topP : 0.95,
    topK: 64,
    maxOutputTokens: 8192
}

// Hydrogen (Ligquid), Sodium (Solid) 
export const elementsWithStateArrayToString = (elements) => {
    let elementsString = elements.map((element) => {
        return `${element.name}(${element.formula}) (${element.state})`;
    }).join(', ');

    return elementsString;
}