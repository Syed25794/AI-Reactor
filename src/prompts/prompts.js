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

export const elementToReactantPrompt = (elements) => {
    return `Predict possible reactants formable from the following elements and their states (l: liquid, s: solid, g: gas).Provide your response as a JSON object with this structure: ${JSON.stringify(modelResponse)}. The elements are as follows with their states:${elementsWithStateArrayToString(elements)}.`;
    // return `You are an expert in Chemistry Chemical Reactions. I will provide you elements with their states ( l, s, g). You have to tell me all the reactants which can be made by the provided elements. You should strictly follw the response structure as in : ${JSON.stringify(modelResponse)} . You should give answer in the unit follows : i pressure - atm ii temperature - Kalvin iii light - sunLight, normalEnvironment iv color - in hash code. The elements are as follows with their states:${elementsWithStateArrayToString(elements)}. Give all reactants which can be made by provided elements.`;
}

export const getCorrectNameAndFormulaOfReactant = ( element ) => {
    // return `You are an expert in Chemistry. Please provide correct name, formula, state and color of :${element?.name}, ${element?.formula}, and ${element?.state}.Answer-{name:'',formula:'',state:'',color:''} format.Don't give other reactants.`;
    return `Provide the correct name, formula, state, and color of the element described by: name: ${element?.name},formula: ${element?.formula},state: ${element?.state}.Respond using *only* this JSON format:{"name": "Name", "formula": "[Chemical Formula]", "state": "[s, l, g]", "color": "#XXXXXX"}`;
}