function init() {
  var c = document.getElementsByTagName("canvas")[0];
  var body = document.querySelector("body");
  var NO_BUTTON = document.getElementById("no");
  var YES_BUTTON = document.getElementById("yes");
  var a = c.getContext("2d");
  var p = [];
  var j = 0, k = 0, u = 0, m = Math;
  var q = function (e, b) { return ~~(m.random() * (b - e + 1) + e); };
  var d = "Infinity";
  
  window.isDevice = (/android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(((navigator.userAgent || navigator.vendor || window.opera)).toLowerCase()));

  const mobile = window.isDevice;
  let hoverSpeedMultiplier = 1;

  function resizeCanvas() {
    c.width = window.innerWidth;
    c.height = window.innerHeight;
  }
  resizeCanvas();
  window.addEventListener("resize", resizeCanvas);

  function handleMovement(e) {
    e.preventDefault();
    if (e.type === 'touchmove') {
      j = m.floor(e.touches[0].pageX - c.width / 2);
      k = m.floor(e.touches[0].pageY - c.height / 2);
    } else {
      j = m.floor(e.pageX - c.width / 2);
      k = m.floor(e.pageY - c.height / 2);
    }
    var angle = -(-k / -j);
    u = m.floor(m.atan(angle) * (180 / m.PI));
    if (j < 0 && k < 0) u += 180;
    if (j < 0 && k > 0) u += 180;
    if (j > 0 && k > 0) u += 360;
    if (k < 0 && angle == "-" + d) u = 90;
    if (k > 0 && angle == d) u = 270;
    if (j < 0 && angle == "0") u = 180;
    if (isNaN(u)) u = 0;
  }

  body.addEventListener('mousemove', handleMovement);
  body.addEventListener('touchmove', handleMovement);

  // Increase speed on NO button hover
  NO_BUTTON.addEventListener("mouseover", () => {
    hoverSpeedMultiplier = 4; 
  });
  YES_BUTTON.addEventListener("mouseover", () => {
    hoverSpeedMultiplier = 0.3;
  });
  NO_BUTTON.addEventListener("onclick", () => {
    hoverSpeedMultiplier = 4; 
  });
  
  YES_BUTTON.addEventListener("mouseout", () => {
    hoverSpeedMultiplier = 1.5;
  });
  
  function drawParticles() {
    a.clearRect(0, 0, c.width, c.height);
    var maxParticles = (!mobile) ? Math.min(200, (c.width * c.height) / 5000) : Math.min(50, (c.width * c.height) / 5000); 
  
    if (p.length < maxParticles) {
      for (var i = maxParticles - p.length; i--; ) {
        p.push({
          a: q(25, 350) / 100,
          x: c.width / 2,
          y: c.height / 2,
          d: q(0, 360),
          b: q(-75, 75) / 100,
          c: q(-10, 10),
        });
      }
    }

    for (var e = p.length - 1; e >= 0; e--) {
      var particle = p[e];
      a.beginPath();
      a.arc(particle.x, particle.y, particle.a, 0, 2 * m.PI);
      a.moveTo(c.width / 2, c.height / 2);
      a.lineTo(particle.x, particle.y);
      a.fillStyle = "hsl(" + (0 + particle.c) + ", 100%, 20%)";
      a.fill();
      a.strokeStyle = "hsla(" + (0 + particle.c) + ", 100%, 20%, .05)";
      a.stroke();

      var angleRad = (particle.d * m.PI) / 180;
      var speedX = (m.cos(angleRad) * particle.b + (j * particle.a) / 175) * hoverSpeedMultiplier;
      var speedY = (m.sin(angleRad) * particle.b + (k * particle.a) / 175) * hoverSpeedMultiplier;
      particle.x += speedX;
      particle.y += speedY;
      particle.a -= 0.02;

      if (
        particle.y - particle.a > c.height || particle.y < -particle.a ||
        particle.x > c.width + particle.a || particle.x < -particle.a ||
        particle.a <= 0
      ) {
        p.splice(e, 1);
      }
    }
  }

  function animate() {
    drawParticles();
    requestAnimationFrame(animate);
  }

  animate();
}
if(window.isloaded) init();
else window.addEventListener("load", init);
