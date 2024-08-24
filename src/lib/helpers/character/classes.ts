import { CharacterConfig, Action, ContainerAttributes, BoxAttributes, CharacterAttributes } from './interfaces';

export class Character {
  name: string;
  width: number;
  height: number;
  container: ContainerAttributes;
  box: BoxAttributes;
  attributes: CharacterAttributes;
  actions: Action[];

  constructor(config: CharacterConfig) {
    this.name = config.name;
    this.width = config.width;
    this.height = config.height;
    this.container = config.container;
    this.box = config.box;
    this.attributes = config.attributes;
    this.actions = config.actions;
  }
}
