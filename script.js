window.addEventListener('load', function () {
    const canvas = document.getElementById('canvas1');
    const ctx = canvas.getContext('2d');
    canvas.width = 200;
    canvas.height = 200;

    class Particle {
        constructor(effect, x, y, color) {
            this.effect = effect;
            this.x = Math.random() * this.effect.width;
            this.y = 0;
            this.size = this.effect.gap;
            this.originX = Math.floor(x);
            this.originY = Math.floor(y);
            this.color = color;
            this.vx = 0;
            this.vy = 0;
            this.friction = 0.8;
            this.ease = 0.02;
            this.dx = 0;
            this.dy = 0;
            this.distance = 0;
            this.force = 0;
            this.angle = 0;
        }
        draw(context) {
            context.fillStyle = this.color;
            context.fillRect(this.x, this.y, this.size, this.size);
        }
        update() {
            this.dx = this.effect.mouse.x - this.x;
            this.dy = this.effect.mouse.y - this.y;
            this.distance = this.dx * this.dx + this.dy * this.dy;
            this.force = -this.effect.mouse.radius / this.distance;

            if (this.distance < this.effect.mouse.radius) {
                this.angle = Math.atan2(this.dy, this.dx);
                this.vx += this.force * Math.cos(this.angle);
                this.vy += this.force * Math.sin(this.angle);
            }

            this.x += (this.vx *= this.friction) + (this.originX - this.x) * this.ease;
            this.y += (this.vy *= this.friction) + (this.originY - this.y) * this.ease;
        }
        warp() {
            this.x = Math.random() * this.effect.width;
            this.y = Math.random() * this.effect.height;
            this.ease = 0.05;
        }
    }

    class Effect {
        constructor(width, height) {
            this.width = width;
            this.height = height;
            this.particlesArray = [];
            this.image = document.getElementById('image1');
            this.centerX = this.width * 0.5;
            this.centerY = this.height * 0.5;
            this.x = this.centerX - this.image.width * 0.5;
            this.y = this.centerY - this.image.height * 0.5;
            this.gap = 1;
            this.mouse = {
                radius: 160,
                x: undefined,
                y: undefined
            }
            window.addEventListener('mousemove', event => {
                this.mouse.x = event.x;
                this.mouse.y = event.y;
            });
        }
        init(context) {
            const aspectRatio = this.image.width / this.image.height;
            const newWidth = this.width;
            const newHeight = this.width / aspectRatio;
            this.x = (this.width - newWidth) / 2;
            this.y = (this.height - newHeight) / 2;
            context.drawImage(this.image, this.x, this.y, newWidth, newHeight);
            const pixels = context.getImageData(this.x, this.y, newWidth, newHeight).data;
            for (let y = 0; y < newHeight; y += this.gap) {
                for (let x = 0; x < newWidth; x += this.gap) {
                    const index = (y * this.width + x) * 4;
                    const red = pixels[index];
                    const green = pixels[index + 1];
                    const blue = pixels[index + 2];
                    const alpha = pixels[index + 3];
                    const color = 'rgb(' + red + ',' + green + ',' + blue + ')';

                    if (alpha > 0) {
                        this.particlesArray.push(new Particle(this, x, y, color));
                    }
                }
            }
        }
        draw(context) {
            this.particlesArray.forEach(particle => particle.draw(context));
        }
        update() {
            this.particlesArray.forEach(particle => particle.update());
        }
        warp() {
            this.particlesArray.forEach(particle => particle.warp());
        }
    }

    const effect = new Effect(canvas.width, canvas.height);
    effect.init(ctx);

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        effect.draw(ctx);
        effect.update();
        requestAnimationFrame(animate);
    }
    animate();

});

var typed = new Typed(".auto-type", {
    strings: ["Hey There! 😁✌️", "Introducing Hazim Danish"],
    typeSpeed: 100,
    backSpeed: 10,
    loop: true
})


document.addEventListener('DOMContentLoaded', function () {
    const startButton = document.getElementById('startButton');

    startButton.addEventListener('click', function () {
        const aboutSection = document.getElementById('about');

        if (aboutSection) {
            aboutSection.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

document.addEventListener('DOMContentLoaded', function () {
    const value1 = document.getElementById('value-1');

    value1.addEventListener('click', function () {
        const aboutSection = document.getElementById('about');

        if (aboutSection) {
            aboutSection.scrollIntoView({ behavior: 'smooth' });
        }
    });
});
document.addEventListener('DOMContentLoaded', function () {
    const workButton = document.getElementById('value-2');

    workButton.addEventListener('click', function () {
        const workSection = document.getElementById('my-works');

        if (workSection) {
            workSection.scrollIntoView({ behavior: 'smooth' });
        }
    });
});
document.addEventListener('DOMContentLoaded', function () {
    const contactButton = document.getElementById('value-3');

    contactButton.addEventListener('click', function () {
        const contactSection = document.getElementById('card4');

        if (contactSection) {
            contactSection.scrollIntoView({ behavior: 'smooth' });
        }
    });
});
const coords = { x: 0, y: 0 };
const circles = document.querySelectorAll(".circle");

const colors = [
  "#ffb56b",
  "#fdaf69",
  "#f89d63",
  "#f59761",
  "#ef865e",
  "#ec805d",
  "#e36e5c",
  "#df685c",
  "#d5585c",
  "#d1525c",
  "#c5415d",
  "#c03b5d",
  "#b22c5e",
  "#ac265e",
  "#9c155f",
  "#950f5f",
  "#830060",
  "#7c0060",
  "#680060",
  "#60005f",
  "#48005f",
  "#3d005e"
];

circles.forEach(function (circle, index) {
  circle.x = 0;
  circle.y = 0;
  circle.style.backgroundColor = "cyan"; // colors[index % colors.length];
});

window.addEventListener("mousemove", function(e){
  coords.x = e.clientX;
  coords.y = e.clientY;
  
});

function animateCircles() {
  
  let x = coords.x;
  let y = coords.y;
  
  circles.forEach(function (circle, index) {
    circle.style.left = x - 12 + "px";
    circle.style.top = y - 12 + "px";
    
    circle.style.scale = (circles.length - index) / circles.length;
    
    circle.x = x;
    circle.y = y;

    const nextCircle = circles[index + 1] || circles[0];
    x += (nextCircle.x - x) * 0.3;
    y += (nextCircle.y - y) * 0.3;
  });
 
  requestAnimationFrame(animateCircles);
}

animateCircles();

function showModal(title, imageSrc, description) {
    var modal = document.getElementById("myModal");
    var modalTitle = document.getElementById("modalTitle");
    var modalImage = document.getElementById("modalImage");
    var modalDescription = document.getElementById("modalDescription");

    modalTitle.innerText = title;
    modalImage.src = imageSrc;
    modalDescription.innerText = description;

    modal.style.display = "block";
  }

  // Function to close the modal
  function closeModal() {
    var modal = document.getElementById("myModal");
    modal.style.display = "none";
  }

  // Close the modal when clicking outside the modal
  window.addEventListener("click", function (event) {
    var modal = document.getElementById("myModal");
    if (event.target === modal) {
      closeModal();
    }
  });

  function showWorks(buttonNumber) {
    var works = document.getElementsByClassName("card3");
    for (var i = 0; i < works.length; i++) {
      works[i].style.display = "none";
    }
    var button1 = document.getElementById("button1");
    var button2 = document.getElementById("button2");
    if (buttonNumber === 1) {
      button1.classList.add("active");
      button2.classList.remove("active");
      var work1 = document.getElementsByClassName("work1");
      var work2 = document.getElementsByClassName("work6");
      var work7 = document.getElementsByClassName("work7");
      var work8 = document.getElementsByClassName("work8");
      var work9 = document.getElementsByClassName("work9");
      var work10 = document.getElementsByClassName("work10");
      
      work1[0].style.display = "block";
      work2[0].style.display = "block";
      work7[0].style.display = "block";
      work8[0].style.display = "block";
      work9[0].style.display = "block";
      work10[0].style.display = "block";
      
    } else if (buttonNumber === 2) {
      button1.classList.remove("active");
      button2.classList.add("active");
      var work5 = document.getElementsByClassName("work5");
      var work4 = document.getElementsByClassName("work4");
      var work3 = document.getElementsByClassName("work3");
      var work6 = document.getElementsByClassName("work2");
      var work11 = document.getElementsByClassName("work11");
      var work12 = document.getElementsByClassName("work12");
      work3[0].style.display = "block";
      work4[0].style.display = "block";
      work5[0].style.display = "block";
      work6[0].style.display = "block";
      work11[0].style.display = "block";
      work12[0].style.display = "block";
    }
  }