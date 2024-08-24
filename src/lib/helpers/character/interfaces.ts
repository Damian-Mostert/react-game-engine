export interface ContainerAttributes {
    minHeight?: number;
    minWidth?: number;
    [key: string]: any;
  }
  
  export interface BoxAttributes {
    width?: string;
    height?: string;
    left?: string;
    top?: string;
    objectPosition?: string;
    objectFit?: string;
    [key: string]: any;
  }
  
  export interface CharacterAttributes {
    strength: number;
    speed: number;
    weight: number;
    health: number;
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
    width: number;
    height: number;
    container: ContainerAttributes;
    box: BoxAttributes;
    attributes: CharacterAttributes;
    actions: Action[];
  }
  