export const constants = {
    LanthanidesSeriesFirstElementSymbol : 'La',
    ActinidesSeriesFirstElementSymbol : 'Ac',
    selectedElementsLimits : 8,
    minSelectedElements : 1,
    Gemini_Modal : "gemini-1.5-pro",
    responseMimeTypeTextPlain : "text/plain",
    responseMimeTypeJSON : "application/json",
    temperatureUnit: 'Kalvin',
    pressureUnit: 'atm',
    blackColor:'#000000',
    whiteColor: '#ffffff',
    maxReactants: 6,
    temperature : 0.5,
    topP : 0.95,
    topK: 64,
    maxOutputTokens: 8192,

}
export const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/

// Hydrogen (Liquid), Sodium (Solid) 
export const elementsWithStateArrayToString = (elements) => {
    let elementsString = elements?.map((element) => {
        return `${element.name}(${element.formula}) (${element.state})`;
    })?.join(', ');

    return elementsString;
}

export function hexToRGBAArray(hex) {
    let cleanHex = hex?.replace(/^#/, '');
  
    if (cleanHex.length === 3 || cleanHex.length === 4) {
        cleanHex = cleanHex?.split('')?.map(char => char + char)?.join('');
    }

    let r = parseInt(cleanHex?.substring(0, 2), 16) / 255;
    let g = parseInt(cleanHex?.substring(2, 4), 16) / 255;
    let b = parseInt(cleanHex?.substring(4, 6), 16) / 255;
    let a = cleanHex?.length === 8 ? parseInt(cleanHex?.substring(6, 8), 16) / 255 : 1;

    // Return the RGBA array
    return [r, g, b, a];
}

export function flaskDifferentColors(flaskType, color, state){
    const isWhite = isWhiteVariant(color);
    if( !isWhite ){

        const rgba = hexToRGBAArray(color);
        const bubbleColor = rgba;
        const backgroundColor = rgba;
        bubbleColor[3] = 0.3 ;
        backgroundColor[3] = 0.6; 
      
        if( state === 'g' || state === 'l' ){
          // main liquid color
          flaskType["layers"][6].shapes[0].it[1].c["k"] = rgba;
          // background color
          flaskType["layers"][8].shapes[0].it[1].c["k"] = backgroundColor;
          flaskType["layers"][10].shapes[0].it[4].c["k"] = [1, 0, 0, 1]
        }
      
        if( state === 'g' ){
          // bubbles color ;
          flaskType["assets"][0].layers[0].shapes[0].it[2].c["k"] = bubbleColor; // Bubble 4 in comp_0
          flaskType["assets"][0].layers[1].shapes[0].it[2].c["k"] = bubbleColor; // Bubble 3 in comp_0
          flaskType["assets"][0].layers[2].shapes[0].it[2].c["k"] = bubbleColor; // Bubble 2 in comp_0
          flaskType["assets"][0].layers[3].shapes[0].it[2].c["k"] = bubbleColor; // Bubble 1 in comp_0
          
          flaskType["assets"][0].layers[0].shapes[0].it[2].c["k"] = bubbleColor; // Bubble 1 in assest
          flaskType["assets"][0].layers[1].shapes[0].it[2].c["k"] = bubbleColor; // Bubble 2 in assest
          flaskType["assets"][0].layers[2].shapes[0].it[2].c["k"] = bubbleColor; // Bubble 3 in assest
          flaskType["assets"][0].layers[3].shapes[0].it[2].c["k"] = bubbleColor; // Bubble 4 in assest
          flaskType["layers"][0].layers[0].shapes[0].it[2].c["k"] = bubbleColor; // Bubble 5 in assest
          flaskType["layers"][0].layers[1].shapes[0].it[2].c["k"] = bubbleColor; // Bubble 6 in assest
          flaskType["layers"][0].layers[2].shapes[0].it[2].c["k"] = bubbleColor; // Bubble 7 in assest
          flaskType["layers"][0].layers[3].shapes[0].it[2].c["k"] = bubbleColor; // Bubble 8 in assest
          flaskType["layers"][1].layers[0].shapes[0].it[2].c["k"] = bubbleColor; // Bubble 9 in assest
          flaskType["layers"][1].layers[1].shapes[0].it[2].c["k"] = bubbleColor; // Bubble 10 in assest
          flaskType["layers"][1].layers[2].shapes[0].it[2].c["k"] = bubbleColor; // Bubble 11 in assest
          flaskType["layers"][1].layers[3].shapes[0].it[2].c["k"] = bubbleColor; // Bubble 12 in assest
          flaskType["layers"][2].layers[0].shapes[0].it[2].c["k"] = bubbleColor; // Bubble 13 in assest
          flaskType["layers"][2].layers[1].shapes[0].it[2].c["k"] = bubbleColor; // Bubble 14 in assest
          flaskType["layers"][2].layers[2].shapes[0].it[2].c["k"] = bubbleColor; // Bubble 15 in assest
          flaskType["layers"][2].layers[3].shapes[0].it[2].c["k"] = bubbleColor; // Bubble 16 in assest
        }
    }

    return flaskType;
}
function isWhiteVariant(color) {
    // Convert hex color to RGB
    const r = parseInt(color?.slice(1, 3), 16);
    const g = parseInt(color?.slice(3, 5), 16);
    const b = parseInt(color?.slice(5, 7), 16);
    
    // Set thresholds for determining "white variant"
    const lightnessThreshold = 240;  // Minimum value for R, G, and B channels to be considered light enough
    const maxColorDifference = 15;   // Maximum difference allowed between R, G, and B channels

    // Check if the color is light enough
    if (r >= lightnessThreshold && g >= lightnessThreshold && b >= lightnessThreshold) {
        // Check if the color has low saturation
        const maxChannel = Math.max(r, g, b);
        const minChannel = Math.min(r, g, b);

        if (maxChannel - minChannel <= maxColorDifference) {
            return true;
        }
    }
    
    return false;
}


export const errorMessageGenerator = (error, language) => {
    switch ( error ){
        case 'auth/invalid-credential':
            return language === 'hi' ? 'लॉगिन क्रेडेंशियल्स अमान्य हैं!' : language === 'ur' ? 'لاگ ان کی اسناد غلط ہیں!' : 'Login Credentials are invalid!';
        case 'auth/email-already-in-use':
            return language === 'hi' ? 'उपयोगकर्ता खाता पहले से ही मौजूद है!' : language === 'ur' ? 'صارف کا اکاؤنٹ پہلے ہی موجود ہے!' : 'User Account already exists!';
        case 'auth/too-many-requests' :
            return language === 'hi' ? 'बहुत अधिक प्रयास किए गए। बाद में पुनः प्रयास करें!' : language === 'ur' ? 'بہت زیادہ کوششیں کی گئیں۔ بعد میں دوبارہ کوشش کریں!' : 'Too many attempts. Try again later!';
        case 'auth/weak-password':
            return language === 'hi' ? 'पासवर्ड कम से कम छह वर्ण लंबा होना चाहिए!' : language === 'ur' ? 'پاس ورڈ کم از کم چھ حروف پر مشتمل ہونا چاہئے!' : 'Password should be at least six characters long!';
        case 400:
            return language === 'hi' ? 'अमान्य API कुंजी या अनुरोध बॉडी त्रुटिपूर्ण है!' : language === 'ur' ? 'غلط API کی یا درخواست کا باڈی غلط ہے!' : 'Invalid API Key or request body is malformed!';
        case 403:
            return language === 'hi' ? 'API कुंजी के पास आवश्यक अनुमतियां नहीं हैं!' : language === 'ur' ? 'API کی کے پاس مطلوبہ اجازتیں نہیں ہیں!' : 'API key does not have the required permissions!';
        case 404:
            return language === 'hi' ? 'अनुरोधित संसाधन नहीं मिला!' : language === 'ur' ? 'درخواست شدہ وسیلہ نہیں ملا!' : 'The requested resource was not found!';
        case 429:
            return language === 'hi' ? 'आपने दर सीमा पार कर ली है!' : language === 'ur' ? 'آپ نے شرح کی حد سے تجاوز کر لیا ہے!' : 'You have exceeded the rate limit!';
        case 500:
            return language === 'hi' ? 'गूगल की तरफ से अप्रत्याशित त्रुटि हुई!' : language === 'ur' ? 'گوگل کی طرف سے ایک غیر متوقع خرابی واقع ہوئی ہے!' : `An unexpected error occurred on Google's side!`;
        case 503:
            return language === 'hi' ? 'सेवा अस्थायी रूप से अधिक लोड या डाउन हो सकती है!' : language === 'ur' ? 'سروس عارضی طور پر زیادہ بوجھ یا بند ہو سکتی ہے!' : `The service may be temporarily overloaded or down!`;
        case 'minmaxSelectedLimit':
            return language === 'hi' ? 'अधिकतम रिएक्टेंट सीमा पार हो गई!' : language === 'ur' ? 'کم از کم یا زیادہ سے زیادہ ری ایکٹینٹ کی حد سے تجاوز ہوگیا ہے!' : 'Maximum reactant limit breached!';
        case 'maxReactantLimit':
            return language === 'hi' ? 'अधिकतम रिएक्टेंट सीमा पार हो गई!' : language === 'ur' ? 'زیادہ سے زیادہ ری ایکٹینٹ کی حد سے تجاوز ہوگیا ہے!' : 'Maximum reactant limit exceeded!';
        case 'alreadyExist':
            return language === 'hi' ? 'तत्व पहले से ही चयनित है!' : language === 'ur' ? 'عنصر پہلے ہی منتخب ہوچکا ہے!' : 'Element Already Selected!';
        case 'reactantAlreadyExist':
            return language === 'hi' ? 'रिएक्टेंट पहले से ही मौजूद है!' : language === 'ur' ? 'ری ایکٹینٹ پہلے ہی موجود ہے!' : 'Reactant already exists!';
        case 'ReactantLimitExceeded':
            return language === 'hi' ? 'रिएक्टेंट की अधिकतम सीमा पार हो गई है!' : language === 'ur' ? 'ری ایکٹینٹ کی زیادہ سے زیادہ حد سے تجاوز ہوگیا ہے!' : 'Reactant Maximum Limit exceeded!';
        case 'minSelectedElements':
            return language === 'hi' ? 'कम से कम दो तत्व चुनें!' : language === 'ur' ? 'کم از کم دو عناصر منتخب کریں!' : 'Select Atleast two elements!';
        default:
            return language === 'hi' ? 'कुछ गलत हो गया!' : language === 'ur' ? 'کچھ غلط ہوگیا!' : 'Something went wrong!';
    }
}

export const successMessageGenerator = (message, language) => {
    switch ( message ){
        case 'login':
            return language === 'hi' ? 'उपयोगकर्ता सफलतापूर्वक लॉग इन हुआ!' : language === 'ur' ? 'صارف کامیابی کے ساتھ لاگ ان ہوگیا!' : 'User Successfully logged in!';
        case 'logout':
            return language === 'hi' ? 'उपयोगकर्ता सफलतापूर्वक लॉग आउट हुआ!' : language === 'ur' ? 'صارف کامیابی کے ساتھ لاگ آؤٹ ہوگیا!' : 'User Successfully logged out!';
        case 'signup':
            return language === 'hi' ? 'उपयोगकर्ता खाता सफलतापूर्वक बनाया गया!' : language === 'ur' ? 'صارف کا اکاؤنٹ کامیابی کے ساتھ بنایا گیا!' : 'User account successfully created!';
        case 'resetPassword':
            return language === 'hi' ? 'पासवर्ड रीसेट ईमेल भेजा गया है!' : language === 'ur' ? 'پاس ورڈ ری سیٹ ای میل بھیج دیا گیا ہے!' : 'Password reset email has been sent!';
        case 'reactantCreated':
            return language === 'hi' ? 'रिएक्टेंट सफलतापूर्वक बनाया गया!' : language === 'ur' ? 'ری ایکٹینٹ کامیابی کے ساتھ بنایا گیا!' : 'Reactant Successfully created!';
        case 'performReaction':
            return language === 'hi' ? 'प्रतिक्रिया सफलतापूर्वक बनाई गई है!' : language === 'ur' ? 'ردعمل کامیابی کے ساتھ بنایا گیا ہے!' : 'Reaction has been created successfully!';
        case 'makeReactant':
            return language === 'hi' ? 'रिएक्टेंट सफलतापूर्वक बनाया गया है!' : language === 'ur' ? 'ری ایکٹینٹ کامیابی کے ساتھ بنایا گیا ہے!' : 'Reactant has been made successfully!';
        case 'reactantSelected':
            return language === 'hi' ? 'रिएक्टेंट सफलतापूर्वक चयनित हुआ!' : language === 'ur' ? 'ری ایکٹینٹ کامیابی کے ساتھ منتخب ہوگیا!' : 'Reactant Successfully Selected!';
        case 'reactantRemoved':
            return language === 'hi' ? 'रिएक्टेंट सफलतापूर्वक हटाया गया!' : language === 'ur' ? 'ری ایکٹینٹ کامیابی کے ساتھ ہٹا دیا گیا!' : 'Reactant Successfully Removed!';
        default:
            return language === 'hi' ? 'सबकुछ ठीक है!' : language === 'ur' ? 'سب کچھ ٹھیک ہے!' : 'Everything is fine';
    }
}
