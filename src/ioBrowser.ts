import { lTrim, rTrim } from "./val";

function firstString(str:String,checkStr:String):boolean
{
    let a=str.substring(0,checkStr.length);
    let b=checkStr.toString().toLowerCase().trim();
    a=a.toString().toLowerCase().trim();
    const hasil=a===b;   
    return hasil;
}

export function getBaseHref():string
{
    let base = document.getElementsByTagName('base');
    return (base && base.length > 0 && base[0].href)?base[0].href:undefined;
}

export function toUrlWithBaseHref(yourUrl:string):URL
{
    return new URL(yourUrl,getBaseHref());
}

export function getBaseName():string
{
    let browserPath = null;
    let base = document.getElementsByTagName('base');
    if (base && base.length > 0 && base[0].href) {
        let bwPath = base[0].href;
        const is_https=firstString(bwPath,'https://');
        const is_http=firstString(bwPath,'http://');
        const is_protocol=is_http||is_https;       

        if(is_protocol){
            const protocol=is_https?'https://':'http://';
            const domain_path=bwPath.substr(protocol.length,bwPath.length);
            let sp=domain_path.split('/');
            let domain=sp[0];
            let protocolDomain=protocol+domain+'/';
            let sisa_string=bwPath.substr(protocolDomain.length,bwPath.length);
            sp=sisa_string.length>0?sisa_string.split("/"):[];           
            browserPath=sp.length>0?sp.join("/"):"/";         
        }        
    }

    if (!browserPath) {
        browserPath = window.location.pathname.split('/');
        browserPath.pop();
        browserPath = browserPath.join('/');
    }
    return browserPath;
}

export function pathIsMatch(pathname:string,paths:string|string[]):boolean
{
    if(pathname==='/' && typeof paths==='string' && paths==='/') return true;    
    pathname=lTrim(rTrim(pathname,'/'),'/');  

    if(Array.isArray(paths))
    {
        for(let i=0; i<paths.length; i++)
        {
            const hasil:boolean=pathIsMatch(pathname,paths[i]);
            if(hasil) return hasil;
        }
    }
    else 
    if(typeof paths==='string')
    {
        paths=lTrim(rTrim(paths,'/'),'/');
        let base=getBaseName();
        base=lTrim(rTrim(base,'/'),'/');        
        let split=pathname.split('/');
        if(split[0]===base)
        {
            split.shift();
        }
        let split2=paths.split('/');
        return split.join('/')===split2.join('/');
    }
    return false;
}


interface IcalculateProps {
    alignment:"top" | "middle" | "bottom"
    offsetY:number
}

export function calculateScrollOffset(elem:HTMLElement,props?:IcalculateProps):number
{
    props=props || {} as IcalculateProps;
    const body=document.body;
    const html=document.documentElement;
    const elemRect=elem.getBoundingClientRect();
    const clientHeight=html.clientHeight;
    const documentHeight=Math.max(body.scrollHeight,body.offsetHeight,html.clientHeight,html.scrollHeight,html.offsetHeight);
    const additionalOffset=typeof props.offsetY==="number"?props.offsetY:0;
    let scrollPosition:number=0;
    if(props.alignment==="bottom")
    {
        scrollPosition=elemRect.bottom - clientHeight;
    }
    else
    if(props.alignment==="middle")
    {
        scrollPosition=elemRect.bottom - clientHeight / 2 - elemRect.height / 2;
    }
    else {
        scrollPosition=elemRect.top;
    }

    const maxScrollPosition=documentHeight - clientHeight;
    return Math.min(scrollPosition + additionalOffset + window.pageYOffset,maxScrollPosition);
}


export function calculatePercentageInViewport(element:HTMLElement):number
{
    const viewport = {
        top: window.pageYOffset,
        bottom: window.pageYOffset + window.innerHeight
    };
    const elementBoundingRect = element.getBoundingClientRect();
    const elementPos = {
        top: elementBoundingRect.y + window.pageYOffset,
        bottom: elementBoundingRect.y + elementBoundingRect.height + window.pageYOffset
    };
    if (viewport.top > elementPos.bottom || viewport.bottom < elementPos.top) {
        return 0;
    }
    // Element is fully within viewport
    if (viewport.top < elementPos.top && viewport.bottom > elementPos.bottom) {
        return 100;
    }
    // Element is bigger than the viewport
    if (elementPos.top < viewport.top && elementPos.bottom > viewport.bottom) {
        return 100;
    }

    const elementHeight = elementBoundingRect.height;
    let elementHeightInView = elementHeight;

    if (elementPos.top < viewport.top) {
        elementHeightInView = elementHeight - (window.pageYOffset - elementPos.top);
    }

    if (elementPos.bottom > viewport.bottom) {
        elementHeightInView = elementHeightInView - (elementPos.bottom - viewport.bottom);
    }

    const percentageInView = (elementHeightInView / window.innerHeight) * 100;

    return Math.round(percentageInView);
}