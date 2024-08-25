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
    orientation:Orientation,
    amount:number
}

export interface Orientation {
    vertical?: boolean;       // Indicates a vertical slope
    horizontal?: boolean;     // Indicates a horizontal slope
    left?: boolean;           // Indicates a slope going to the left
    right?: boolean;          // Indicates a slope going to the right
    bottomLeft?: boolean;     // Indicates a slope going from top-right to bottom-left
    bottomRight?: boolean;    // Indicates a slope going from top-left to bottom-right
}

export interface keys{
    w?:boolean,
    a?:boolean,
    d?:boolean,
    s?:boolean,
    e?:boolean
}
