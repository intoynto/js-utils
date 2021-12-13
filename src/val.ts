export function toUtf8String(value:string){
    let val='';
    value=value?value:'';
    for(let i=0; i<value.length; i++){
        const ichar = value.charCodeAt(i);
        if(ichar<=127){
            val+=value.charAt(i);
        }
    }
    return val;
}

export function toStr(value:string|number|null|undefined,usingUtf8:boolean=true){
    if(value===null || value===undefined) return '';

    value=typeof value==="string" || typeof value==="number"?value.toString():"";
    value=usingUtf8?toUtf8String(value):value.toString();
    return value;
}

export function toInt(value:any,def:number|undefined=0){
    def=def===null || def===undefined || isNaN(value)?0:def;
    if(typeof value==="number") return value;

    if(typeof value==="string"){
        const test=parseInt(value);
        return !isNaN(test)?test:def;
    }    
    return def;
}


export function toParseFloat(value:any,def:number|undefined=0){
    def=def===null || def===undefined?0:def;    

    if(typeof value==="number") return value;
   
    if(typeof value==="string"){
        const test=parseFloat(value);
        return !isNaN(test)?test:def;
    }   
    
    return def;
}

export function toFloat(value:any)
{
    if(value===null || value===undefined) return 0;
    if(typeof value==="number")
    {
        return value;
    }

    if(typeof value==="string")
    {
        let val=parseFloat(value);
        val=isNaN(val)?0:val;
        return val;
    }

    return 0;
}


export function toNum(value:any,digit:number=2)
{
    if(value===null || value===undefined) return 0;

    if(typeof value==="number")
    {
        return parseFloat(value.toFixed(digit));
    }

    if(typeof value==="string")
    {
        let val=parseFloat(value);
        val=isNaN(val)?0:parseFloat(val.toFixed(digit));
        return val;
    }

    return 0;
}

export function toUcWords(str:string|number,isPerson=true){
    str=typeof str==="string"?str:typeof str==="number"?str.toString():"";
    const isCamel=(s:string)=>{
        s=s.toString().toLowerCase().trim();
        const camels=["dan","atau","dengan"];
        return camels.indexOf(s)>=0;
    };
    return str.toLowerCase().split(' ').map((s)=>
    {
        if(isPerson && isCamel(s)) return s; //skip dont to ucwords

        /// else ucwords this
        return s.charAt(0).toUpperCase()+s.substring(1);
    }).join(' ');
}

export function toFileSize(bytes:string | number | null | undefined,digit:number=2)
{
    if(bytes===null || bytes===undefined) return '0 byte';

    const sizes=['byte', 'Kb', 'Mb', 'Gb', 'Tb'];
    const val:number=toFloat(bytes) as number;
    const dm=digit<0?0:digit;
    const nol=Math.floor(Math.log(val) / Math.log(1024));

    if(nol===-Infinity) return '0 byte';

    const i=parseInt(nol.toString());
    return Math.round(val/Math.pow(1024,i)).toFixed(dm)+' '+sizes[i];
}

export function toEscapeString(str:string,char:string="'")
{
    let val=toStr(str,true).trim();
    if(str.length<1){
        return val;
    }

    val=strReplace(val,char,'"'); //replace char to double quote
    val=val.replace(/\\r/g, ""); //replace \r to empty string
    val=val.replace(/\\n/g, ""); //replace new line to empty string
    val=val.replace(/\\t/g, ""); //replace tab to empty string
    val=val.replace(/\\/g, "");  //replace back slash to empty string
    return val;
}

function checkAndGetNumString(value:string|number):number{
    let val=typeof value==="string"?parseFloat(value):typeof value==="number"?value:0;
    if(isNaN(val)) val=0;
    return val as number;
}

function format3Digit(str:string|number){
    let val=typeof str!=="string"?str.toString():str;
    return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export function strReplace(str:string,searchStr:string,replaceStr:string){
    return str.split(searchStr).join(replaceStr);
}

function toDotIndo(strInggris:string){
    let a=strInggris;
    a=strReplace(a,',','^'); //, ke ^
    a=strReplace(a,'.',','); //. ke ,
    a=strReplace(a,'^','.'); //^ ke .
    return a;
}

export function toNumIndo(value:string | number, digit:number=0){
    let val:number=checkAndGetNumString(value);
    let str:any=val.toFixed(digit);
    let test:any=str.split('.');
    if(test.length>1)
    {
        str=test[0];
        str=format3Digit(str);
        str=toDotIndo(str);
        str+=','+test[1];
        return str;
    }
    str=format3Digit(str);
    str=toDotIndo(str);
    return str;
}




export function toDashVal(value:string|number|null|undefined,digit:number=0,after:string=""){
    if(value===null || value===undefined) return '-';
    
    let val=checkAndGetNumString(value);    
    if(val===0) {        
        return '-'
    }    
    return toNumIndo(val,digit)+(after?" "+after:"");
}

type ItodasValOps={
    digit?:number
    strBefore?:string
    strAfter?:string
    strNull?:string
};

export function toDashAutoDigit(value:string|number|null|undefined,props?:ItodasValOps)
{
    props=props||{} as ItodasValOps;
    if(value===null || value===undefined)
    {
        return props.strNull?props.strNull:'-';        
    }
    
    let val=checkAndGetNumString(value);
    if(val===0) return 0;

    let spl:any=val.toString();
    spl=spl.split(".");

    const hasPropsDigit=props.digit!==undefined && props.digit!==null;
    let digit:number=0;
    if(spl.length>1)
    {
        if(hasPropsDigit) return toDashVal(val,props.digit);

        let str:any=spl[1];
        digit=str.length>5?5:str.length;
    }
    return toDashVal(val,hasPropsDigit?props.digit:digit);
}

export function toSecretString(value:string|number|null|undefined,char:string='*'):string
{
    let str=toStr(value);
    let hasil:string='';
    for(let i=0;i<str.length;i++){
        const ra=Math.floor(Math.random()*2);
        let c=str[i];
        if(ra%2===0){
            c=char;
        }
        hasil+=c;
    }
    return hasil;
}

export function tryParseToArrayString(val:any):string[]
{
    if(val===null && val===undefined) return [];


    const plotToStr=function(values:any[]):string[]{
        let vals:string[]=[];
        for(let i=0; i<values.length; i++){
            let r=values[i];
            if(typeof r==="number" || typeof r==="string")
            {
                r=toStr(r).toString().trim();
                if(r.length>0) vals.push(r);
            }
        }
        return vals;
    }
    if(Array.isArray(val) && val.length>=0)
    {
        let vals=plotToStr(val as any[]);
        return vals;
    }

    if(typeof val==="number") return [val.toString()];    

    try {
        const values=JSON.parse(val);
        if(Array.isArray(values) && values.length>0)
        {
            const vals=plotToStr(values as any[]);
            return vals;
        }
        val=toStr(val).toString().trim();

        return val.length>0?[val]:[];
    }
    catch(err)
    {
        return [];
    }
}


export function rTrim(str:string, chr?:string) {
  var rgxtrim = (!chr) ? new RegExp('\\s+$') : new RegExp(chr+'+$');
  return str.replace(rgxtrim, '');
}


export function lTrim(str:string, chr?:string) {
  var rgxtrim = (!chr) ? new RegExp('^\\s+') : new RegExp('^'+chr+'+');
  return str.replace(rgxtrim, '');
}

export function toUnZero(val:number|string,len:number=2,place:string="0")
{
    let str=toStr(val);
    if(str.length<len)
    {
        while(str.length<len)
        {
            str=place+str;
        }
    }
    return str;
}

export function toSlugify(value:any)
{
    let str=toStr(value);
    str = str.replace(/^\s+|\s+$/g, ''); // trim
    str = str.toLowerCase();
  
    // remove accents, swap ñ for n, etc
    var from = "àáäâèéëêìíïîòóöôùúüûñç·/_,:;";
    var to   = "aaaaeeeeiiiioooouuuunc------";
    for (var i=0, l=from.length ; i<l ; i++) {
        str = str.replace(new RegExp(from.charAt(i), 'g'), to.charAt(i));
    }

    str = str.replace(/[^a-z0-9 -]/g, '') // remove invalid chars
        .replace(/\s+/g, '-') // collapse whitespace and replace by -
        .replace(/-+/g, '-'); // collapse dashes

    return str;
}

export function dotenvParseValue(value:any)
{
    const val=toStr(value).toString().trim();

    // Boolean
    if (
        val.toString().toLowerCase() === 'true' ||
        value===true ||
        val.toString().toLowerCase() === 'false' ||
        value===false
    ) {
        return val.toString().toLowerCase() === 'true';
    }


    // if the value is wrapped in bacticks e.g. (`value`) then just return its value
    if(val.indexOf('`')===0 && val.toString().lastIndexOf('`')===val.toString().length-1)
    {
        return value.toString().slice(1,value.toString().length-1);
    }

    // if the value is wrapped in bacticks e.g. ('value') then just return its value
    if(val.indexOf("'")===0 && val.toString().lastIndexOf("'")===val.toString().length-1)
    {
        return value.toString().slice(1,value.toString().length-1);
    }

    // if the value is wrapped in bacticks e.g. ("value") then just return its value
    if(val.indexOf('"')===0 && val.toString().lastIndexOf('"')===val.toString().length-1)
    {
        return value.toString().slice(1,value.toString().length-1);
    }
    // if the value ends in an asterisk then just return its value
    if (
        val.toString().lastIndexOf('*') === val.toString().length - 1 &&
        !val.toString().includes(',')
    ) {
        return val.toString().slice(0, Math.max(0, val.toString().length - 1));
    }

    

    if(!Number.isNaN(Number(val)))
    {
        return Number(val);
    }


    // Array
    if (
        (Array.isArray(value) || typeof value === 'string') && typeof value.includes === 'function' && value.includes(',')
    ) {
        return (value as any).split(',').filter((string:string) => {
            return string !== '';
        })
        .map((string:any) => dotenvParseValue(string));
    }

    return value;
}

export function withoutExtension(value:any)
{
    let str:any=toStr(value);
    str=str.split('.');

    // if has dot remove last after dot
    if(str.length>1)
    {
        str.pop();
    }
    
    return str.join('.');
}