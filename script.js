      // Initialize Text Swiper
      const textSwiper = new Swiper(".swiper-text", {
        effect: "fade",
        fadeEffect: { crossFade: true },
        speed: 500,
        loop: true,
        allowTouchMove: false,
      });

      // Initialize Photo Swiper
      const photoSwiper = new Swiper(".swiper-photo", {
        slidesPerView: 2,
        spaceBetween: 20,
        speed: 500,
        loop: true,
        keyboard: { enabled: true },
        pagination: {
          el: ".custom-dots",
          clickable: true,
        },
      });

      // SYNC: Change text when photo slides
      photoSwiper.on("slideChange", function () {
        textSwiper.slideToLoop(photoSwiper.realIndex);
      });

    // <!-- Feature scripts -->
      const images = {
        plan1: "image/1bedroom.jpg",
        plan2: "image/2bedroom.jpg",
        plan3: "image/3bedroom.jpg",
        plan4: "image/4bedroom.jpg",
        plan5: "image/penth.jpg",
      };

      let isCollapsed = false;

      window.onload = function () {
        const firstButton = document.querySelector('[data-plan="plan1"]');
        if (firstButton) {
          const img = document.getElementById("main-plan-img");
          const text = document.getElementById("area-text");
          img.src = images.plan1;
          text.innerText = firstButton.getAttribute("data-area");
          img.onload = () => {
            img.style.opacity = "1";
          };
          firstButton.classList.add("active");
        }
      };

      function handleTabClick(clickedBtn) {
        const allButtons = document.querySelectorAll(".tab-btn");
        if (isCollapsed && clickedBtn.classList.contains("active")) {
          allButtons.forEach((btn) => {
            btn.classList.remove("hidden");
            btn.style.visibility = "visible";
          });
          isCollapsed = false;
        } else {
          const img = document.getElementById("main-plan-img");
          const text = document.getElementById("area-text");
          img.style.opacity = "0";

          setTimeout(() => {
            const planKey = clickedBtn.getAttribute("data-plan");
            img.src = images[planKey];
            text.innerText = clickedBtn.getAttribute("data-area");
            img.onload = () => {
              img.style.opacity = "1";
            };
          }, 200);

          allButtons.forEach((btn) => {
            btn.classList.remove("active");
            if (btn !== clickedBtn) {
              btn.classList.add("hidden");
              // Use visibility to ensure the space is fully cleared instantly
              setTimeout(() => {
                if (isCollapsed) btn.style.visibility = "hidden";
              }, 500);
            }
          });

          clickedBtn.classList.add("active");
          isCollapsed = true;
        }
      }

    // <!-- Location script -->

      // Set coordinates for d3 (Dubai Design District)
      var map = L.map("map", {
        zoomControl: false, // Hide default zoom buttons
      }).setView([25.186, 55.299], 13);

      // Add Architectural style tiles
      L.tileLayer(
        "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png",
        {
          attribution: "© OpenStreetMap",
        }
      ).addTo(map);

      // Custom Zoom Functions
      function zoomIn() {
        map.zoomIn();
      }

      function zoomOut() {
        map.zoomOut();
      }

//Forms
    
    const scriptURL = 'https://script.google.com/macros/s/AKfycbxbc1GbakB72rwmwDWgMlHhTE1S9UEKq1dhzwC8tZcBGL85tzFTJKfI7G57ek4eZHm30g/exec'; 
    
    const form = document.getElementById('registrationForm');
    const btnText = document.getElementById('btnText');

    form.addEventListener('submit', e => {
      e.preventDefault();
      
      btnText.innerText = 'Sending...';
      btnText.disabled = true;
      
      const formData = new FormData(form);
      const data = Object.fromEntries(formData.entries());
      console.log(data,"the sending data")

        fetch(scriptURL, {
            method: 'POST',
            mode: 'no-cors', 
            body: JSON.stringify(data),
            headers: { 'Content-Type': 'application/json' }
        })
        .then(() => {
            console.log("Request sent");
        })
        .catch(err => console.error("Error:", err))
        .finally(() => {
            form.reset(); 
            btnText.innerText = 'Register';
            btnText.disabled = false;
        });
    });
