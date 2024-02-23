export function isObjectEmpty(obj:object){
    for(let key in obj) {
        if(obj.hasOwnProperty(key))
            return false;
    }
    return true;
}

function getObjProp<T, K extends keyof T>(o:T,prop:K):T[K]{
    return o[prop];
}

interface ILooseObj {
    [key:string]:any,
}

export function joinObjectProps(obj:ILooseObj,props:string[],separator:string=" ",cb?:(val:any,f:string)=>void){
    const hasObj=(typeof obj==="object" && Array.isArray(props) && props.length>0);
    
    const s=new Array();    
    if(hasObj){
        for(let i=0; i<props.length; i++){
            const p=props[i];
            let val=getObjProp(obj,p.toString());
            if(typeof cb==='function')
            {
                try {
                    const testVal=cb(val,p);
                    val=testVal;
                }
                catch(noExec)
                {

                }
            }            
            if(val){
                s.push(val);
            }
        }
    }    
    return s.join(separator);
}

export function objectProps(obj:ILooseObj,props:string[]){
    const hasObj=(typeof obj==="object" && Array.isArray(props) && props.length>0);
    const s:ILooseObj={};

    if(hasObj){
        for(let i=0; i<props.length; i++){
            const p=props[i];
            s[p]=obj[p];
        }
    }    
    return s;
}

export function objectFlat(obj:ILooseObj){
    const s:ILooseObj={};
    for(let p in obj){
        if(typeof obj[p]!=="function") s[p]=obj[p];
    }
    return s;
}


export function objectFlatProps(obj:ILooseObj,props?:string[]){
    const hasObj=(typeof obj==="object" && Array.isArray(props) && props.length>0);
    if(!hasObj) return objectFlat(obj);

    const s:ILooseObj={};
    if(props!==undefined && props!==null){
        for(let i=0; i<props.length; i++){
            const p=props[i];
            if(typeof obj[p]!=="function") s[p]=obj[p];        
        }  
    }
    return s;
}


export function objectFlatValuesFromProps(obj:ILooseObj,props?:string[]){
    const s:ILooseObj={};

    if(typeof obj!=="object") {
        return s;
    }

    if(Array.isArray(props) && props.length>0){
        for(let i=0; i<props.length; i++){
            const f=props[i];
            const v=obj[f];
            if(v!==undefined && (typeof v==="string" || typeof v==="number")){
                s[f]=v;
            }
        }
    }
    else{
        for(let p in obj){
            const v=obj[p];
            if(v!==undefined && (typeof v==="string" || typeof v==="number")){
                s[p]=v;
            }
        }
    }

    return s;
}

export function isEqual(value:any,other:any){
    // Get the value type
    let type = Object.prototype.toString.call(value);

    // If the two objects are not the same type, return false
    if (type !== Object.prototype.toString.call(other)) return false;

    if(value===null && other===null) return true;
    if(value===undefined && other===undefined) return true;

    if(value===true && other===true) return true;
    if(value===false && other===false) return true;

    if(typeof value==="number" && typeof other==="number" && value===other) return true;
    if(typeof value==="string" && typeof other==="string" && value===other) return true;

    // If items are not an object or array, return false
    if (['[object Array]', '[object Object]'].indexOf(type) < 0) return false;

    // Compare the length of the length of the two items
    let valueLen = type === '[object Array]' ? value.length : Object.keys(value).length;
    let otherLen = type === '[object Array]' ? other.length : Object.keys(other).length;
    if (valueLen !== otherLen) return false;

    // Compare two items
    let compare = function (item1:any, item2:any) {

        // Get the object type
        let itemType = Object.prototype.toString.call(item1);

        // If an object or array, compare recursively
        if (['[object Array]', '[object Object]'].indexOf(itemType) >= 0) {
            if (!isEqual(item1, item2)) return false;
        }

        // Otherwise, do a simple comparison
        else {

            // If the two items are not the same type, return false
            if (itemType !== Object.prototype.toString.call(item2)) return false;

            // Else if it's a function, convert to a string and compare
            // Otherwise, just compare
            if (itemType === '[object Function]') {
                if (item1.toString() !== item2.toString()) return false;
            } else {
                if (item1 !== item2) return false;
            }

        }
    };

    // Compare properties
    if (type === '[object Array]') {
        for (let i = 0; i < valueLen; i++) {
            if (compare(value[i], other[i]) === false) return false;
        }
    } else {
        for (let key in value) {
            if (value.hasOwnProperty(key)) {
                if (compare(value[key], other[key]) === false) return false;
            }
        }
    }
    // If nothing failed, return true
    return true;
}


export function isClass(func:any){
    return typeof func === 'function' && /^class\s/.test(Function.prototype.toString.call(func));
}