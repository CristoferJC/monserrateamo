// Variables globales
let messages = JSON.parse(localStorage.getItem('loveMessages')) || [];
let photos = JSON.parse(localStorage.getItem('lovePhotos')) || [];
let currentSongIndex = 0;

// Elementos del DOM
const messageInput = document.getElementById('messageInput');
const charCount = document.getElementById('charCount');
const addMessageBtn = document.getElementById('addMessageBtn');
const messagesList = document.getElementById('messagesList');
const photoInput = document.getElementById('photoInput');
const uploadBox = document.getElementById('uploadBox');
const photoCollage = document.getElementById('photoCollage');
const photoModal = document.getElementById('photoModal');
const modalImage = document.getElementById('modalImage');
const closeModal = document.querySelector('.close');
const floatingHearts = document.getElementById('floatingHearts');

// Inicialización
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
    createFloatingHearts();
});

function initializeApp() {
    displayMessages();
    displayPhotos();
    setupEventListeners();
    addWelcomeMessage();
}

// Event Listeners
function setupEventListeners() {
    // Mensajes
    messageInput.addEventListener('input', updateCharCount);
    addMessageBtn.addEventListener('click', addMessage);
    messageInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter' && e.ctrlKey) {
            addMessage();
        }
    });

    // Fotos
    uploadBox.addEventListener('click', () => photoInput.click());
    photoInput.addEventListener('change', handlePhotoUpload);
    closeModal.addEventListener('click', closePhotoModal);
    photoModal.addEventListener('click', function(e) {
        if (e.target === photoModal) {
            closePhotoModal();
        }
    });

    // Música
    document.getElementById('playBtn').addEventListener('click', playMusic);
    document.getElementById('pauseBtn').addEventListener('click', pauseMusic);
    document.getElementById('nextBtn').addEventListener('click', nextSong);

    // Efectos especiales
    document.addEventListener('mousemove', createHeartTrail);
}

// Funcionalidad de mensajes
function updateCharCount() {
    const count = messageInput.value.length;
    charCount.textContent = `${count}/500`;
    
    if (count > 450) {
        charCount.style.color = '#ff6b6b';
    } else {
        charCount.style.color = 'rgba(255, 255, 255, 0.8)';
    }
}

function addMessage() {
    const text = messageInput.value.trim();
    if (text === '') {
        showNotification('Por favor escribe un mensaje 💕', 'warning');
        return;
    }

    const message = {
        id: Date.now(),
        text: text,
        date: new Date().toLocaleString('es-ES', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        }),
        timestamp: Date.now()
    };

    messages.unshift(message);
    saveMessages();
    displayMessages();
    messageInput.value = '';
    updateCharCount();
    
    showNotification('Mensaje de amor agregado ❤️', 'success');
    createHeartBurst();
}

function displayMessages() {
    messagesList.innerHTML = '';
    
    if (messages.length === 0) {
        messagesList.innerHTML = `
            <div class="message-card" style="text-align: center; color: #666;">
                <i class="fas fa-heart" style="font-size: 2rem; color: #ff6b6b; margin-bottom: 10px;"></i>
                <p>No hay mensajes aún. ¡Escribe el primero! 💕</p>
            </div>
        `;
        return;
    }

    messages.forEach(message => {
        const messageCard = document.createElement('div');
        messageCard.className = 'message-card';
        messageCard.innerHTML = `
            <button class="delete-message" onclick="deleteMessage(${message.id})">
                <i class="fas fa-times"></i>
            </button>
            <div class="message-text">${message.text}</div>
            <div class="message-date">${message.date}</div>
        `;
        messagesList.appendChild(messageCard);
    });
}

function deleteMessage(id) {
    if (confirm('¿Estás seguro de que quieres eliminar este mensaje de amor? 💔')) {
        messages = messages.filter(msg => msg.id !== id);
        saveMessages();
        displayMessages();
        showNotification('Mensaje eliminado 💔', 'info');
    }
}

function saveMessages() {
    localStorage.setItem('loveMessages', JSON.stringify(messages));
}

// Funcionalidad de fotos
function handlePhotoUpload(event) {
    const files = event.target.files;
    
    for (let file of files) {
        if (file.type.startsWith('image/')) {
            const reader = new FileReader();
            reader.onload = function(e) {
                const photo = {
                    id: Date.now() + Math.random(),
                    src: e.target.result,
                    name: file.name,
                    date: new Date().toLocaleString('es-ES')
                };
                
                photos.push(photo);
                savePhotos();
                displayPhotos();
                showNotification('Foto agregada 📸', 'success');
            };
            reader.readAsDataURL(file);
        }
    }
    
    event.target.value = '';
}

function displayPhotos() {
    photoCollage.innerHTML = '';
    
    if (photos.length === 0) {
        photoCollage.innerHTML = `
            <div style="grid-column: 1 / -1; text-align: center; padding: 40px; color: #666;">
                <i class="fas fa-images" style="font-size: 3rem; color: #667eea; margin-bottom: 15px;"></i>
                <p>No hay fotos aún. ¡Agrega las primeras! 📸</p>
            </div>
        `;
        return;
    }

    photos.forEach(photo => {
        const photoItem = document.createElement('div');
        photoItem.className = 'photo-item';
        photoItem.innerHTML = `
            <img src="${photo.src}" alt="${photo.name}" onclick="openPhotoModal('${photo.src}')">
            <div class="photo-overlay">
                <button class="delete-photo" onclick="deletePhoto(${photo.id})">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        `;
        photoCollage.appendChild(photoItem);
    });
}

function openPhotoModal(src) {
    modalImage.src = src;
    photoModal.style.display = 'flex';
    photoModal.style.alignItems = 'center';
    photoModal.style.justifyContent = 'center';
}

function closePhotoModal() {
    photoModal.style.display = 'none';
}

function deletePhoto(id) {
    if (confirm('¿Estás seguro de que quieres eliminar esta foto? 📸')) {
        photos = photos.filter(photo => photo.id !== id);
        savePhotos();
        displayPhotos();
        showNotification('Foto eliminada 📸', 'info');
    }
}

function savePhotos() {
    localStorage.setItem('lovePhotos', JSON.stringify(photos));
}

// Funcionalidad de música
const romanticSongs = [
    { title: "Perfect - Ed Sheeran", url: "https://www.youtube.com/watch?v=2Vv-BfVoq4g" },
    { title: "All of Me - John Legend", url: "https://www.youtube.com/watch?v=450p7goxZqg" },
    { title: "A Thousand Years - Christina Perri", url: "https://www.youtube.com/watch?v=rtOvBOTyX00" },
    { title: "Can't Help Falling in Love - Elvis Presley", url: "https://www.youtube.com/watch?v=vGJTaP6anOU" },
    { title: "Just the Way You Are - Bruno Mars", url: "https://www.youtube.com/watch?v=LjhCEhWiKXk" }
];

function playMusic() {
    const song = romanticSongs[currentSongIndex];
    showNotification(`Reproduciendo: ${song.title} 🎵`, 'success');
    // En una implementación real, aquí se reproduciría la música
    document.getElementById('currentSong').textContent = song.title;
}

function pauseMusic() {
    showNotification('Música pausada ⏸️', 'info');
}

function nextSong() {
    currentSongIndex = (currentSongIndex + 1) % romanticSongs.length;
    const song = romanticSongs[currentSongIndex];
    document.getElementById('currentSong').textContent = song.title;
    showNotification(`Siguiente: ${song.title} 🎵`, 'success');
}

// Efectos visuales
function createFloatingHearts() {
    setInterval(() => {
        const heart = document.createElement('div');
        heart.className = 'heart';
        heart.innerHTML = '❤️';
        heart.style.left = Math.random() * 100 + '%';
        heart.style.animationDuration = (Math.random() * 3 + 3) + 's';
        heart.style.fontSize = (Math.random() * 1 + 1) + 'rem';
        
        floatingHearts.appendChild(heart);
        
        setTimeout(() => {
            heart.remove();
        }, 6000);
    }, 2000);
}

function createHeartTrail(event) {
    if (Math.random() < 0.1) { // 10% de probabilidad
        const heart = document.createElement('div');
        heart.innerHTML = '💕';
        heart.style.position = 'fixed';
        heart.style.left = event.clientX + 'px';
        heart.style.top = event.clientY + 'px';
        heart.style.pointerEvents = 'none';
        heart.style.zIndex = '9999';
        heart.style.fontSize = '1.5rem';
        heart.style.animation = 'float 2s ease-out forwards';
        
        document.body.appendChild(heart);
        
        setTimeout(() => {
            heart.remove();
        }, 2000);
    }
}

function createHeartBurst() {
    for (let i = 0; i < 8; i++) {
        const heart = document.createElement('div');
        heart.innerHTML = '💖';
        heart.style.position = 'fixed';
        heart.style.left = '50%';
        heart.style.top = '50%';
        heart.style.transform = 'translate(-50%, -50%)';
        heart.style.pointerEvents = 'none';
        heart.style.zIndex = '9999';
        heart.style.fontSize = '2rem';
        heart.style.animation = `heartBurst 1s ease-out forwards`;
        heart.style.setProperty('--angle', `${i * 45}deg`);
        
        document.body.appendChild(heart);
        
        setTimeout(() => {
            heart.remove();
        }, 1000);
    }
}

// Agregar animación CSS para el burst de corazones
const style = document.createElement('style');
style.textContent = `
    @keyframes heartBurst {
        0% {
            transform: translate(-50%, -50%) rotate(var(--angle)) translateY(0);
            opacity: 1;
        }
        100% {
            transform: translate(-50%, -50%) rotate(var(--angle)) translateY(-100px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Notificaciones
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#4CAF50' : type === 'warning' ? '#FF9800' : type === 'error' ? '#f44336' : '#2196F3'};
        color: white;
        padding: 15px 20px;
        border-radius: 10px;
        box-shadow: 0 5px 15px rgba(0,0,0,0.3);
        z-index: 10000;
        animation: slideInRight 0.3s ease-out;
        max-width: 300px;
        word-wrap: break-word;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease-in forwards';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

// Agregar animaciones CSS para notificaciones
const notificationStyle = document.createElement('style');
notificationStyle.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
`;
document.head.appendChild(notificationStyle);

// Mensaje de bienvenida
function addWelcomeMessage() {
    if (messages.length === 0) {
        const welcomeMessage = {
            id: Date.now(),
            text: "¡Bienvenida a nuestra página de amor! Aquí puedes leer todos los mensajes que escribo para ti. Te amo más cada día. ❤️",
            date: new Date().toLocaleString('es-ES'),
            timestamp: Date.now()
        };
        messages.push(welcomeMessage);
        saveMessages();
        displayMessages();
    }
}

// Efectos de entrada
window.addEventListener('load', function() {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 1s ease-in';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});

// Guardar datos automáticamente
window.addEventListener('beforeunload', function() {
    saveMessages();
    savePhotos();
});

// Efecto de confeti en fechas especiales
function checkSpecialDate() {
    const today = new Date();
    const month = today.getMonth() + 1;
    const day = today.getDate();
    
    // San Valentín, aniversarios, etc.
    if ((month === 2 && day === 14) || (month === 12 && day === 25)) {
        createConfetti();
    }
}

function createConfetti() {
    const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#feca57', '#ff9ff3'];
    
    for (let i = 0; i < 100; i++) {
        const confetti = document.createElement('div');
        confetti.style.cssText = `
            position: fixed;
            width: 10px;
            height: 10px;
            background: ${colors[Math.floor(Math.random() * colors.length)]};
            left: ${Math.random() * 100}%;
            top: -10px;
            animation: confettiFall 3s linear infinite;
            z-index: 9998;
        `;
        
        document.body.appendChild(confetti);
        
        setTimeout(() => {
            confetti.remove();
        }, 3000);
    }
}

// Agregar animación CSS para confeti
const confettiStyle = document.createElement('style');
confettiStyle.textContent = `
    @keyframes confettiFall {
        to {
            transform: translateY(100vh) rotate(360deg);
        }
    }
`;
document.head.appendChild(confettiStyle);

// Verificar fecha especial al cargar
checkSpecialDate(); 