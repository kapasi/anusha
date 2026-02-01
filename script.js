// Rain effect variables
let rainInterval;

function createRain() {
    const rainOverlay = document.getElementById('rainOverlay');
    
    // Clear existing raindrops
    rainOverlay.innerHTML = '';
    
    // Create multiple raindrops
    for (let i = 0; i < 100; i++) {
        const raindrop = document.createElement('div');
        raindrop.className = 'raindrop';
        raindrop.style.left = Math.random() * 100 + '%';
        raindrop.style.animationDuration = (Math.random() * 1 + 0.5) + 's';
        raindrop.style.animationDelay = Math.random() * 2 + 's';
        raindrop.style.height = (Math.random() * 50 + 10) + 'px';
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
    // Start rain effect
    startRain();
    
    // Shake the modal
    shakeModal();
    
    // Show error content after a brief delay
    setTimeout(() => {
        document.getElementById('questionContent').style.display = 'none';
        document.getElementById('errorContent').style.display = 'block';
    }, 300);
    
    // Add some dramatic sound effect (optional - browser will handle this)
    // You could add an audio element here if desired
}

function handleYes() {
    // Hide question content
    document.getElementById('questionContent').style.display = 'none';
    
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
    // Stop rain
    stopRain();
    
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