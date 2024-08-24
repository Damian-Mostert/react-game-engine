export interface Position{
    top?:number,
    left?:number
}

export interface Size{
    width?:number;
    height?:number;
}


export interface BotProps{
    name:string,
    actions:any,
    id?:number
}

export interface Bot{
    key:number,
    health:number,
    isBot?:true,
    addHp:(number:number)=>{},
    removeHp:(number:number)=>{},
    setMessage:(message:string|null)=>{}
}    



export interface boundaryActions{
    inRange?: ($this: BoundaryProps, bot: Bot) => BoundaryProps;
    outRange?: ($this: BoundaryProps, bot: Bot) => BoundaryProps;
}

export interface BoundaryProps{
    texture:string;
    size:Size,
    position:Position,
    actions:boundaryActions,
}

export interface BoundaryPropsResult{
    texture:string;
    size:Size,
    position:Position,
    actions:boundaryActions,
    type:string,
    generateArray:any
}

export interface CoinsProps{
    position:Position,
    orientation:orientation,
    amount:number
}

export interface orientation{
    vertical?:true,
    horizontal?:true
}

export interface keys{
    w?:boolean,
    a?:boolean,
    d?:boolean,
    s?:boolean,
    e?:boolean
}
