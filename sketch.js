const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Body = Matter.Body;
const Composites = Matter.Composites;
const Composite = Matter.Composite;
var ground, rope, fruit, link;
var bgImg, fruitImg, bunny, bunnyImg, button, balloon, muteButton, button2, button3, rope2, rope3, link2, link3;
var sad, eating, blinking;
var ropeSound, airSound, sadSound, bgSound, eatingSound
var canW, canH;
var isSad = false
let engine;
let world;

function preload() {
  bgImg = loadImage("./assets/background.png")
  fruitImg = loadImage("./assets/melon.png")
  bunnyImg = loadImage("./assets/Rabbit-01.png")
  sad = loadAnimation("./assets/sad_1.png", "./assets/sad_1.png", "./assets/sad_3.png")
  blinking = loadAnimation("./assets/blink_1.png", "./assets/blink_2.png", "./assets/blink_3.png")
  eating = loadAnimation("./assets/eat_1.png", "./assets/eat_2.png", "./assets/eat_3.png", "./assets/eat_4.png")
  ropeSound = loadSound("./assets/sounds/rope_cut.mp3")
  airSound = loadSound("./assets/sounds/air.wav")
  sadSound = loadSound("./assets/sounds/sad.wav")
  bgSound = loadSound("./assets/sounds/sound1.mp3")
  eatingSound = loadSound("./assets/sounds/eating_sound.mp3")
  sad.playing = true
  blinking.playing = true
  eating.playing = true
  sad.looping = false
  eating.looping = false
}


function setup() {

  isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent)
  if (isMobile) {
    canW = displayWidth
    canH = displayHeight

  } else {
    canW = 600
    canH = windowHeight - 10
  }
  createCanvas(canW, canH);
  engine = Engine.create();
  world = engine.world;

  ground = new Ground(width / 2, height - 20, width, 20)
  rope = new Rope(8, { x: 40, y: 30 })
  rope2 = new Rope(7, { x: width - 130, y: 40 })
  rope3 = new Rope(4, { x: width - 100, y: 225 })

  fruit = Bodies.circle(300, 300, 15)
  Composite.add(rope.body, fruit)
  link = new Link(rope, fruit)
  link2 = new Link(rope2, fruit)
  link3 = new Link(rope3, fruit)
  blinking.frameDelay = 20
  eating.frameDelay = 20
  sad.frameDelay = 20
  bunny = createSprite(width - 100, height - 90)
  bunny.addAnimation("blinking", blinking)
  bunny.addAnimation("sad", sad)
  bunny.addAnimation("eating", eating)
  bunny.scale = 0.2

  button = createImg("./assets/cut_button.png")
  button.size(50, 50)
  button.position(20, 30)
  button.mouseClicked(drop)

  button2 = createImg("./assets/cut_button.png")
  button2.size(50, 50)
  button2.position(width - 170, 35)
  button2.mouseClicked(drop2)

  button3 = createImg("./assets/cut_button.png")
  button3.size(50, 50)
  button3.position(width - 140, 200)
  button3.mouseClicked(drop3)

  bgSound.play()
  bgSound.setVolume(0)

  muteButton = createImg("./assets/mute.png")
  muteButton.size(50, 50)
  muteButton.position(width - 50, 20)
  muteButton.mouseClicked(mute)

  balloon = createImg("./assets/balloon.png")
  balloon.size(150, 100)
  balloon.position(10, 250)
  balloon.mouseClicked(force)

  rectMode(CENTER);
  ellipseMode(RADIUS);
  imageMode(CENTER);
  textSize(50)
}

function draw() {
  background(51);
  image(bgImg, width / 2, height / 2, width, height)
  Engine.update(engine);
  ground.display()
  rope.show()
  rope2.show()
  rope3.show()

  if (fruit != null) {
    image(fruitImg, fruit.position.x, fruit.position.y, 60, 60)
  }
  if (collide(fruit, bunny)) {
    World.remove(world, fruit);
    fruit = null
    bunny.changeAnimation("eating")
    eatingSound.play()
  }
  if (fruit != null && fruit.position.y > bunny.position.y) {
    bunny.changeAnimation("sad")
    if (!isSad) {
      sadSound.play()
      isSad = true
    }

  }
  drawSprites();
}
function drop() {
  rope.break();
  link.detache();
  link = null
  ropeSound.play()
}
function drop2() {
  rope2.break();
  link2.detache();
  link2 = null
  ropeSound.play()
}
function drop3() {
  rope3.break();
  link3.detache();
  link3 = null
  ropeSound.play()
}

function collide(body, sprite) {

  if (body != null) {
    var distance = dist(body.position.x, body.position.y, sprite.position.x, sprite.position.y)
    if (distance < 58) {
      return true
    } else {
      return false
    }
  }
}

function force() {
  if (fruit.position.y < 250) {
    Body.applyForce(fruit, { x: 0, y: 0 }, { x: 0.01, y: 0 })

  }
  airSound.play()
  airSound.setVolume(0.3)
}

function mute() {
  if (bgSound.isPlaying()) {
    bgSound.stop()

  } else {
    bgSound.play()

  }

}