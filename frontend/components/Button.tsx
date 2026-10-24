interface buttonProps{
    id:string,
    text: string,
    tamano: string,
    functionActivate: () => void
}

const focus = "focus-visible:outline-none focus-visible:shadow-focus";
const btn = `inline-flex h-12  px-5 items-center justify-center whitespace-nowrap rounded-md border-2 text-button transition-all duration-300 disabled:cursor-not-allowed disabled:shadow-none ${focus}`;

export function ButtonPrincipal(prop:buttonProps){
    return(
        <button id={prop.id} onClick={prop.functionActivate} className={` ${btn} ${prop.tamano} border-transparent bg-eco-700 hover:bg-eco-800 active:bg-eco-900 disabled:border-line-soft disabled:bg-line-soft disabled:text-disabled text-white`}>
            {prop.text}
        </button>
    )
}

export function ButtonSecundario(prop:buttonProps){
    return(
        <button id={prop.id} onClick={prop.functionActivate} className={`${btn} ${prop.tamano} border-eco-700 hover:bg-eco-100 active:bg-eco-200 focus:border-eco-900 text-eco-700 disabled:border-line-soft disabled:text-disabled`}>
            {prop.text}
        </button>
    )
}

export function ButtonTexto(prop:buttonProps){
    return (
        <button id={prop.id} onClick={prop.functionActivate} className={`${btn} ${prop.tamano} h-12 border-transparent text-eco-700 hover:bg-eco-100 active:bg-eco-200  disabled:border-line-soft disabled:bg-line-soft disabled:text-disabled group`}>
            <p className="border-b-2 border-b-eco-700 group-disabled:border-transparent transition-all duration-300">{prop.text}</p> 
        </button>
    )
}

export function ButtonDestructivo(prop:buttonProps){
    return (
        <button id={prop.id} onClick={prop.functionActivate} className={`${btn} ${prop.tamano} h-12 border-transparent bg-danger hover:bg-danger-hover active:bg-danger-active text-white  disabled:border-line-soft disabled:bg-line-soft disabled:text-disabled `}>
            {prop.text}
        </button>
    )
}