import "./App.css";
import { useEffect, useState } from "react";
import Tracker from "./components/Tracker.jsx";

function App() {
  const [showComponent, setShowComponent] = useState(false);

  const handleClick = () => {
    const elements = ["header", "lowertext", "startbutton"];
    
    elements.forEach((id) => {
      const element = document.getElementById(id);
      element.style.transition = "opacity 2s ease";
      element.style.opacity = 0;
    });
  
    setTimeout(() => {
      setShowComponent(true);
    }, 2000);
  };

  useEffect(() => {
    const canvas = document.getElementById("starCanvas");
    const ctx = canvas.getContext("2d");

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const stars = [];
    const numStars = 200;

    function Star(x, y, radius, velocity) {
      this.x = x;
      this.y = y;
      this.radius = Math.abs(radius);
      this.velocity = velocity;
      this.maxRadius = radius + Math.random() * 3;
      this.minRadius = radius;
      this.twinkle = true;
    }

    Star.prototype.draw = function () {
      ctx.beginPath();
      ctx.arc(this.x, this.y, Math.abs(this.radius), 0, Math.PI * 2, false);
      ctx.fillStyle = "white";
      ctx.fill();
    };

    Star.prototype.update = function () {
      if (this.twinkle) {
        this.radius += this.velocity;
        if (this.radius >= this.maxRadius || this.radius <= this.minRadius) {
          this.velocity = -this.velocity;
        }
      }
      this.draw();
    };

    for (let i = 0; i < numStars; i++) {
      let x = Math.random() * canvas.width;
      let y = Math.random() * canvas.height;
      let radius = Math.abs(Math.random() * 1.5);
      let velocity = Math.random() * 0.02;
      stars.push(new Star(x, y, radius, velocity));
    }

    function animate() {
      requestAnimationFrame(animate);
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (let star of stars) {
        star.update();
      }
    }

    animate();

    window.addEventListener("resize", () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    });

    return () => {
      window.removeEventListener("resize", () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
      });
    };
  }, []);

  return (
    <div className="relative h-screen">
      <canvas
        id="starCanvas"
        className="fixed top-0 left-0 w-full h-full z-0"
      />
      <div className="absolute inset-0 flex justify-center items-center z-10">
        <div className="text-center" id="contentbox">
          <h1 className="font-apple text-6xl" id="header">
            Starlight
          </h1>
          <p className="font-star uppercase" id="lowertext">
            tracking the interational space station
          </p>
          <button
            className="mt-3 px-12 py-30 bg-night border-2 border-solid border-white font-lato uppercase hover:bg-white hover:text-black"
            onClick={handleClick}
            id="startbutton"
          >
            Start
          </button>
          {showComponent && <Tracker />}
        </div>
      </div>
    </div>
  );
}

export default App;
