const can = document.getElementById('paper');
const ctx = can.getContext('2d');

can.width = window.innerWidth;
can.height = window.innerHeight;

//Physics

function point(x, y, c) {
  this.x = x;
  this.y = y;
  this.c = c;
}

const T = 2;

point.prototype.shake = function() {
  this.x = this.x + (Math.random() - 0.5) * T;
  this.y = this.y + (Math.random() - 0.5) * T;
}

const emulator = {
  data: [],
  paper: ctx,
  add: function(p) {
    this.data.push(p);
  },
  draw: function(dx, dy) {
    for (let i in this.data) {
      // console.log(`rgba(${this.data[i].c[0]}, ${this.data[i].c[1]}, ${this.data[i].c[2]}, 1)`);
      this.paper.fillStyle = `rgba(${this.data[i].c[0]}, ${this.data[i].c[1]}, ${this.data[i].c[2]}, 1)`;
      // ctx.beginPath();
      ctx.moveTo(dx + this.data[i].x, dy + this.data[i].y);
      ctx.arc(dx + this.data[i].x, dy + this.data[i].y, 1, 0, Math.PI * 2, false);
      // ctx.fill();
    }
  },
  shake: function() {
    for (let i in this.data) {
      this.data[i].shake();
      // console.log(i);
    }
    // console.log(2);
  },
  update: function(dx, dy) {
    // console.log(1);
    this.shake();
    ctx.clearRect(dx, dy, 400, 200);
    
    ctx.beginPath();
    this.draw(dx, dy);
    ctx.fill();
    requestAnimationFrame(() => this.update(dx, dy));
  }
};
//End

function getPoint(d, x, y) {
  const b = (y * d.width + x) * 4;
  return [d.data[b], d.data[b + 1], d.data[b + 2], d.data[b + 3]];
}

let img = new Image();
img.src = "./assets/banner3.JPG";
img.height = 10;
img.width = 10;
img.sizes = "20px";
img.onload = () => {
  ctx.drawImage(img, 30, 30, 1200, 400);

  const wi = 400, he = 200;
  let data = ctx.getImageData(100, 100, wi, he);
  // console.log(data);

  // ctx.putImageData(data, 30, 450);

  const dx = 30, dy = 450;
  for (let y = 0; y < he; y += 2) {
    for (let x = 0; x < wi; x += 2) {
      let d = getPoint(data, x, y);
      if (((Math.max(d[0], d[1], d[2]) + Math.min(d[0], d[1], d[2])) / 2) < 230)
      emulator.add(new point(x, y, d));
    }
  }

  emulator.update(500,500);
  // setInterval(() => emulator.update(500,500), 100);
};

