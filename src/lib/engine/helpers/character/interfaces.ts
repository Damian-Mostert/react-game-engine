export interface ContainerAttributes {
    minHeight?: number;
    minWidth?: number;
    [key: string]: any;
  }
  
  export interface BoxAttributes {
    width?: string|number;
    height?: string|number;
    left?: string|number;
    top?: string|number;
    objectPosition?: string;
    objectFit?: string;
    [key: string]: any;
  }
  
  export interface CharacterAttributes {
    strength: number;
    speed: number;
    weight: number|string;
    health: number|string;
    ap: number;
    jump: boolean;
    run: boolean;
    walk: boolean;
    slide: boolean;
    attack: boolean;
    jumpAttack: boolean;
    maxVelocity: number;
  }
  
  export interface Action {
    callback: string;
    slug: string;
    frames: number;
    override?: {
      container?: ContainerAttributes;
      box?: BoxAttributes;
    };
  }
  
  export interface CharacterConfig {
    name: string;
    width: number|string;
    height: number|string;
    container: ContainerAttributes;
    box: BoxAttributes;
    attributes: CharacterAttributes;
    actions: Action[];
  }
  