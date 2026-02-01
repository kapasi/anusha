// Rain effect variables
let rainInterval;

function createRain() {
    const rainOverlay = document.getElementById('rainOverlay');
    
    // Clear existing raindrops
    rainOverlay.innerHTML = '';
    
    // Create multiple raindrops with varying intensities
    for (let i = 0; i < 200; i++) {
        const raindrop = document.createElement('div');
        const isHeavy = Math.random() > 0.7;
        raindrop.className = isHeavy ? 'raindrop heavy-raindrop' : 'raindrop';
        raindrop.style.left = Math.random() * 100 + '%';
        raindrop.style.animationDuration = (Math.random() * 0.8 + 0.3) + 's';
        raindrop.style.animationDelay = Math.random() * 2 + 's';
        raindrop.style.height = (Math.random() * 80 + 20) + 'px';
        rainOverlay.appendChild(raindrop);
    }
}

function startRain() {
    const rainOverlay = document.getElementById('rainOverlay');
    createRain();
    rainOverlay.classList.add('active');
}

function stopRain() {
    const rainOverlay = document.getElementById('rainOverlay');
    rainOverlay.classList.remove('active');
    setTimeout(() => {
        rainOverlay.innerHTML = '';
    }, 500);
}

function shakeModal() {
    const modal = document.getElementById('modal');
    modal.classList.add('shake');
    setTimeout(() => {
        modal.classList.remove('shake');
    }, 500);
}

function handleNo() {
    // Change page to sad/blue mode
    document.body.classList.add('sad-mode');
    
    // Start dramatic rain effect
    startRain();
    
    // Shake the modal
    shakeModal();
    
    // Show custom sad image
    setCustomNoImage('sad.png');
    
    // Show error content after a brief delay
    setTimeout(() => {
        document.getElementById('questionContent').style.display = 'none';
        document.getElementById('errorContent').style.display = 'block';
    }, 300);
}

function handleYes() {
    // Hide question content
    document.getElementById('questionContent').style.display = 'none';
    
    // Show custom happy image
    setCustomYesImage('happy.png');
    
    // Show success content
    document.getElementById('successContent').style.display = 'block';
    
    // Stop rain if it's active
    stopRain();
    
    // Add some celebration effects
    setTimeout(() => {
        createConfetti();
    }, 500);
}

function goBack() {
    // Remove sad mode
    document.body.classList.remove('sad-mode');
    
    // Stop rain
    stopRain();
    
    // Hide custom images
    document.getElementById('customNoImage').style.display = 'none';
    
    // Hide error content
    document.getElementById('errorContent').style.display = 'none';
    
    // Show original question
    document.getElementById('questionContent').style.display = 'block';
}

// Confetti effect for success
function createConfetti() {
    const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#feca57', '#ff9ff3', '#54a0ff'];
    
    for (let i = 0; i < 50; i++) {
        const confetti = document.createElement('div');
        confetti.style.position = 'fixed';
        confetti.style.left = Math.random() * 100 + 'vw';
        confetti.style.top = '-10px';
        confetti.style.width = '10px';
        confetti.style.height = '10px';
        confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.borderRadius = '50%';
        confetti.style.pointerEvents = 'none';
        confetti.style.zIndex = '1000';
        confetti.style.animation = `confettiFall ${Math.random() * 3 + 2}s linear forwards`;
        
        document.body.appendChild(confetti);
        
        // Remove confetti after animation
        setTimeout(() => {
            if (confetti.parentNode) {
                confetti.parentNode.removeChild(confetti);
            }
        }, 5000);
    }
}

// Add confetti animation to CSS dynamically
const style = document.createElement('style');
style.textContent = `
    @keyframes confettiFall {
        0% {
            transform: translateY(-10px) rotate(0deg);
            opacity: 1;
        }
        100% {
            transform: translateY(100vh) rotate(360deg);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Add some hover effects
document.addEventListener('DOMContentLoaded', function() {
    // Add hover effect to buttons
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px) scale(1.05)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // Add floating animation to the modal
    const modal = document.getElementById('modal');
    setInterval(() => {
        if (!modal.classList.contains('shake')) {
            modal.style.transform = 'translateY(' + Math.sin(Date.now() / 1000) * 5 + 'px)';
        }
    }, 50);
});

// Functions to handle custom images
function setCustomYesImage(imagePath) {
    const customYesImage = document.getElementById('customYesImage');
    const img = customYesImage.querySelector('.custom-image');
    img.src = imagePath;
    customYesImage.style.display = 'block';
}

function setCustomNoImage(imagePath) {
    const customNoImage = document.getElementById('customNoImage');
    const img = customNoImage.querySelector('.custom-image');
    img.src = imagePath;
    customNoImage.style.display = 'block';
}

// Example usage (you can call these functions when you have the images):
// Images are now automatically loaded when buttons are clicked
// happy.png will show when "Yes" is clicked
// sad.png will show when "No" is clicked