class Character {
  constructor(objects) {
    this.name = objects.name;
  }
}

const Plank = new Character({
  name: "",
  width: "",
  height: "",
  normal: "",
  jumping: "",
  fall: "",
  fallPush: "",
  left: "",
  leftRuning: "",
  right: "",
  rightRuning: "",
});

export default Plank;
