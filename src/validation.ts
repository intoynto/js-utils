export function isBase64Image(test:string){
    let str=typeof test==="string" && test.trim().length>0?test.trim():"";
    if(str.length<1) return false;
    //const rgx=/^\s*data:image\/([a-z]+\/[a-z]+(;[a-z\-]+\=[a-z\-]+)?)?(;base64)?,[a-z0-9\!\$\&\'\,\(\)\*\+\,\;\=\-\.\_\~\:\@\/\?\%\s]*\s*$/i
    const rgx=/^\s*data:image\/([a-zA-Z]*);base64,[a-z0-9\!\$\&\'\,\(\)\*\+\,\;\=\-\.\_\~\:\@\/\?\%\s]*\s*$/i
    return str.match(rgx);
}