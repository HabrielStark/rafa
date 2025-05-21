// --- JavaScript for dynamic animations and interactions ---

// 1. Dynamic animation delays for list items
document.addEventListener('DOMContentLoaded', function() {
    const listItems = document.querySelectorAll('.qualities li');
    listItems.forEach((item, index) => {
        item.style.setProperty('--delay-index', index);
    });

    // 2. Create floating background elements (stars, hearts, butterflies)
    const bgAnimationContainer = document.getElementById('background-animations');
    if (!bgAnimationContainer) { // Ensure it exists before trying to append
         const newDiv = document.createElement('div');
         newDiv.id = 'background-animations';
         document.body.insertBefore(newDiv, document.body.firstChild); // Add to top of body
         // re-assign bgAnimationContainer if it was created
         bgAnimationContainer = newDiv;
    }


    const numStars = 30;
    const numHearts = 20;
    const numButterflies = 10;

    function createFloatingElements(num, type) {
        for (let i = 0; i < num; i++) {
            const el = document.createElement('div');
            el.classList.add(type);
            
            // Randomize properties for variety
            el.style.left = Math.random() * 100 + 'vw';
            el.style.animationDelay = Math.random() * 10 + 's'; // Stagger start times
            el.style.animationDuration = (5 + Math.random() * 5) + 's'; // Vary speed/duration
            
            if (type === 'star') {
                el.style.fontSize = (10 + Math.random() * 15) + 'px';
            } else if (type === 'heart') {
                el.style.fontSize = (15 + Math.random() * 15) + 'px';
            } else if (type === 'butterfly') {
                el.style.fontSize = (20 + Math.random() * 15) + 'px';
                // Randomly assign butterfly styles
                const bType = Math.ceil(Math.random() * 3);
                el.classList.add('b' + bType);
                el.style.top = (80 + Math.random() * 20) + 'vh'; // Start butterflies lower
                el.style.animationDelay = Math.random() * 15 + 's'; 
                el.style.animationDuration = (7 + Math.random() * 8) + 's';
            }
            bgAnimationContainer.appendChild(el);
        }
    }

    createFloatingElements(numStars, 'star');
    createFloatingElements(numHearts, 'heart');
    createFloatingElements(numButterflies, 'butterfly');
});

// 3. Confetti Surprise!
function triggerConfetti() {
    // Simple confetti using lots of small, colorful, animated divs
    const confettiCount = 150;
    const container = document.querySelector('.container'); // Confine to container or body
    
    for (let i = 0; i < confettiCount; i++) {
        const confettiPiece = document.createElement('div');
        confettiPiece.style.position = 'absolute';
        confettiPiece.style.width = Math.random() * 10 + 5 + 'px';
        confettiPiece.style.height = Math.random() * 10 + 5 + 'px';
        
        const colors = [getComputedStyle(document.documentElement).getPropertyValue('--primary-pink').trim(), 
                        getComputedStyle(document.documentElement).getPropertyValue('--accent-gold').trim(), 
                        getComputedStyle(document.documentElement).getPropertyValue('--light-lavender').trim(), 
                        '#40e0d0', '#ff69b4'];
        confettiPiece.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        
        confettiPiece.style.left = Math.random() * container.offsetWidth + 'px';
        confettiPiece.style.top = Math.random() * -container.offsetHeight + 'px'; // Start above
        confettiPiece.style.opacity = '0';

        // Random shape
        if (Math.random() > 0.5) {
            confettiPiece.style.borderRadius = '50%'; // circle
        } else {
             // rectangle, could add rotation too
        }

        container.appendChild(confettiPiece);

        // Animate it
        confettiPiece.animate([
            { transform: `translateY(0px) rotate(0deg)`, opacity: 1 },
            { transform: `translateY(${container.offsetHeight + 50}px) rotate(${Math.random() * 720}deg)`, opacity: 0 }
        ], {
            duration: Math.random() * 3000 + 2000, // 2-5 seconds
            easing: 'ease-out',
            delay: Math.random() * 500 // Stagger start
        });

        // Remove after animation
        setTimeout(() => {
            confettiPiece.remove();
        }, 5500);
    }
} 