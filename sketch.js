const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Body = Matter.Body;
const Composites = Matter.Composites;
const Composite = Matter.Composite;
var ground,rope,fruit,link
let engine;
let world;

function setup() 
{
  createCanvas(500,windowHeight - 10);
  engine = Engine.create();
  world = engine.world;
 
  ground = new Ground(250,height - 20,500,20)
  rope = new Rope(6,{x:245,y:30})
  fruit = Bodies.circle(300,300,15)
  Composite.add(rope.body,fruit)
  link = new Link(rope,fruit)

  rectMode(CENTER);
  ellipseMode(RADIUS);
  imageMode(CENTER);
  textSize(50)
}

function draw() 
{
  background(51);
  Engine.update(engine);
  ground.display()
  rope.show()
  ellipse(fruit.position.x,fruit.position.y,15,15)
}




