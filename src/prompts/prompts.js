import { elementsWithStateArrayToString } from "../constant/constants";
const modelResponse = {
    possibleReactions: [
        { 
            reactants: [{ name: '', state: '', formula: '', color:'#XXXXXX'}],
            environmentFactors : { temperature: '[Value] K', pressure: '[Value] atm',light: '[sunLight, normalEnvironment,moonLight]', catalysts: [{ name: '', state: '',formula:''}] },
            products : [{ name: '', state: '', formula:'',color: '#XXXXXX'}],
            safetyPrecautions : ''
        }
    ]
}

export const elementToReactantPrompt = (elements, language) => {
    return `Predict possible reactants formable from the following elements and their states (l: liquid, s: solid, g: gas).Provide your response as a JSON object with this structure: ${JSON.stringify(modelResponse)}. The elements are as follows with their states:${elementsWithStateArrayToString(elements)}. Give elements name and safetyPrecautions in ${language === 'hi' ? 'Hindi' : language === 'ur' ? 'Urdu' : 'English'} language.`;
}

export const getCorrectNameAndFormulaOfReactant = ( element, language ) => {
    return `Provide the correct name, formula, state, and color of the element described by: name: ${element?.name},formula: ${element?.formula},state: ${element?.state}.Respond using *only* this JSON format:{"name": "Name", "formula": "[Chemical Formula]", "state": "[s, l, g]", "color": "#XXXXXX"}. Give elements name and safetyPrecautions in ${language === 'hi' ? 'Hindi' : language === 'ur' ? 'Urdu' : 'English'} language.`;
}