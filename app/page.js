"use client"

import { useEffect } from "react";

export default function Home() {
  useEffect(() => {
    const canvas = document.getElementById("canvas");
    const context = canvas.getContext("2d");

    // Set Canvas to Full Screen
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Resize Canvas when window resizes
    window.addEventListener("resize", () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    });

    // Rockets and Sparkles arrays
    let fireRocketsArray = [];
    let fireRocketsSparklesArray = [];

    function FireRockets() {
      this.x = Math.floor(Math.random() * window.innerWidth);
      this.y = window.innerHeight;
      this.color = `hsl(${Math.floor(Math.random() * 360)},70%,50%)`;
      this.size = Math.floor(Math.random() * 5 + 5);
      this.speedY = Math.random() * 5 + 5;
      this.crackRocketY = Math.floor(
        window.innerHeight - (Math.random() * window.innerHeight + 100)
      );

      this.update = () => {
        this.y -= this.speedY;
      };

      this.draw = () => {
        context.fillStyle = this.color;
        context.beginPath();
        context.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        context.fill();
      };
    }

    function FireRocketsSparkles(x, y, color) {
      this.x = x;
      this.y = y;
      this.color = color;
      this.size = Math.floor(Math.random() * 3 + 6);
      this.speedY = Math.random() * 2 - 2;
      this.speedX = Math.round((Math.random() - 0.5) * 10);
      this.velocity = Math.random() / 5;

      this.update = () => {
        if (this.size > 0.2) {
          this.size -= 0.1;
        }
        this.y += this.speedY;
        this.x += this.speedX;
        this.speedY += this.velocity;
      };

      this.draw = () => {
        context.fillStyle = this.color;
        context.beginPath();
        context.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        context.fill();
      };
    }

    function renderFireRockets() {
      for (let i = 0; i < fireRocketsArray.length; i++) {
        fireRocketsArray[i].draw();
        fireRocketsArray[i].update();
        if (fireRocketsArray[i].y <= fireRocketsArray[i].crackRocketY) {
          for (let index = 0; index < 20; index++) {
            fireRocketsSparklesArray.push(
              new FireRocketsSparkles(
                fireRocketsArray[i].x,
                fireRocketsArray[i].y,
                fireRocketsArray[i].color
              )
            );
          }
          fireRocketsArray.splice(i, 1);
          i--;
        }
      }
    }

    function renderFireRocketsSparkles() {
      for (let i = 0; i < fireRocketsSparklesArray.length; i++) {
        fireRocketsSparklesArray[i].draw();
        fireRocketsSparklesArray[i].update();
        if (fireRocketsSparklesArray[i].size <= 0.2) {
          fireRocketsSparklesArray.splice(i, 1);
          i--;
        }
      }
    }

    function animate() {
      context.fillStyle = `rgba(24,28,31,.2)`;
      context.fillRect(0, 0, canvas.width, canvas.height);
      context.fillStyle = `white`;
      renderFireRockets();
      renderFireRocketsSparkles();
      requestAnimationFrame(animate);
    }

    animate();

    setInterval(() => {
      for (let i = 0; i < 4; i++) {
        fireRocketsArray.push(new FireRockets());
      }
    }, 600);
  }, []);

  return (
    <div>
      <canvas id="canvas" className="absolute inset-0"></canvas>
      <div className="heading flex flex-col items-center justify-center bg-slate-500/55 rounded-3xl p-10 text-center">
        <h1>HAPPY NEW YEAR!!!</h1>
        <span>2025</span>
      </div>
    </div>
  );
}
