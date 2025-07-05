// Variables globales
let letters = JSON.parse(localStorage.getItem('loveLetters')) || [];
let photos = JSON.parse(localStorage.getItem('lovePhotos')) || [];
let moments = JSON.parse(localStorage.getItem('loveMoments')) || [];

// Elementos del DOM
const loveLetter = document.getElementById('loveLetter');
const saveLetterBtn = document.getElementById('saveLetterBtn');
const clearLetterBtn = document.getElementById('clearLetterBtn');
const lettersList = document.getElementById('lettersList');
const letterDate = document.getElementById('letterDate');

const galleryInput = document.getElementById('galleryInput');
const uploadArea = document.getElementById('uploadArea');
const galleryGrid = document.getElementById('galleryGrid');

const addMomentBtn = document.getElementById('addMomentBtn');
const momentsTimeline = document.getElementById('momentsTimeline');
const momentModal = document.getElementById('momentModal');
const momentForm = document.getElementById('momentForm');

const photoModal = document.getElementById('photoModal');
const modalImage = document.getElementById('modalImage');
const modalDate = document.getElementById('modalDate');
const closeModal = document.querySelector('.close-modal');

// Inicialización
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
    updateLetterDate();
    createWelcomeLetter();
});

function initializeApp() {
    displayLetters();
    displayPhotos();
    displayMoments();
    setupEventListeners();
}

// Event Listeners
function setupEventListeners() {
    // Cartas de amor
    saveLetterBtn.addEventListener('click', saveLetter);
    clearLetterBtn.addEventListener('click', clearLetter);
    loveLetter.addEventListener('input', autoSave);

    // Galería de fotos
    uploadArea.addEventListener('click', () => galleryInput.click());
    uploadArea.addEventListener('dragover', handleDragOver);
    uploadArea.addEventListener('drop', handleDrop);
    galleryInput.addEventListener('change', handlePhotoUpload);

    // Momentos especiales
    addMomentBtn.addEventListener('click', openMomentModal);
    momentForm.addEventListener('submit', saveMoment);

    // Modales
    closeModal.addEventListener('click', closePhotoModal);
    photoModal.addEventListener('click', function(e) {
        if (e.target === photoModal) {
            closePhotoModal();
        }
    });

    // Cerrar modal de momentos
    document.querySelectorAll('.close-modal').forEach(btn => {
        btn.addEventListener('click', function() {
            this.closest('.modal').style.display = 'none';
        });
    });

    // Efectos especiales
    document.addEventListener('mousemove', createHeartTrail);
    createFloatingHearts();
}

// Funcionalidad de cartas de amor
function updateLetterDate() {
    const today = new Date();
    const options = { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
    };
    letterDate.textContent = today.toLocaleDateString('es-ES', options);
}

function saveLetter() {
    const text = loveLetter.value.trim();
    if (text === '') {
        showNotification('Por favor escribe algo en tu carta de amor 💕', 'warning');
        return;
    }

    const letter = {
        id: Date.now(),
        title: generateLetterTitle(text),
        content: text,
        date: new Date().toLocaleString('es-ES', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        }),
        timestamp: Date.now()
    };

    letters.unshift(letter);
    saveLetters();
    displayLetters();
    clearLetter();
    
    showNotification('Carta de amor guardada con éxito ❤️', 'success');
    createHeartBurst();
}

function generateLetterTitle(text) {
    const words = text.split(' ').slice(0, 5);
    return words.join(' ') + (text.length > 50 ? '...' : '');
}

function clearLetter() {
    loveLetter.value = '';
    localStorage.removeItem('draftLetter');
}

function autoSave() {
    localStorage.setItem('draftLetter', loveLetter.value);
}

function displayLetters() {
    lettersList.innerHTML = '';
    
    if (letters.length === 0) {
        lettersList.innerHTML = `
            <div class="letter-item" style="text-align: center; color: #718096;">
                <i class="fas fa-heart" style="font-size: 2rem; color: #ff6b9d; margin-bottom: 10px;"></i>
                <p>No hay cartas guardadas aún. ¡Escribe la primera! 💕</p>
            </div>
        `;
        return;
    }

    letters.forEach(letter => {
        const letterItem = document.createElement('div');
        letterItem.className = 'letter-item';
        letterItem.innerHTML = `
            <h4>${letter.title}</h4>
            <div class="letter-preview">${letter.content.substring(0, 100)}...</div>
            <div class="letter-date">${letter.date}</div>
        `;
        letterItem.addEventListener('click', () => viewLetter(letter));
        lettersList.appendChild(letterItem);
    });
}

function viewLetter(letter) {
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.innerHTML = `
        <div class="modal-content moment-modal">
            <span class="close-modal">&times;</span>
            <div class="letter-view">
                <h3>${letter.title}</h3>
                <div class="letter-date">${letter.date}</div>
                <div class="letter-content-view">${letter.content.replace(/\n/g, '<br>')}</div>
                <div class="letter-actions">
                    <button class="elegant-btn secondary" onclick="deleteLetter(${letter.id})">
                        <i class="fas fa-trash"></i> Eliminar
                    </button>
                </div>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    modal.style.display = 'flex';
    
    modal.querySelector('.close-modal').addEventListener('click', () => {
        modal.remove();
    });
    
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.remove();
        }
    });
}

function deleteLetter(id) {
    if (confirm('¿Estás seguro de que quieres eliminar esta carta de amor? 💔')) {
        letters = letters.filter(letter => letter.id !== id);
        saveLetters();
        displayLetters();
        showNotification('Carta eliminada 💔', 'info');
        document.querySelector('.modal').remove();
    }
}

function saveLetters() {
    localStorage.setItem('loveLetters', JSON.stringify(letters));
}

// Funcionalidad de galería de fotos
function handleDragOver(e) {
    e.preventDefault();
    uploadArea.style.borderColor = '#ff6b9d';
    uploadArea.style.transform = 'scale(1.05)';
}

function handleDrop(e) {
    e.preventDefault();
    uploadArea.style.borderColor = '#667eea';
    uploadArea.style.transform = 'scale(1)';
    
    const files = e.dataTransfer.files;
    handleFiles(files);
}

function handlePhotoUpload(event) {
    const files = event.target.files;
    handleFiles(files);
    event.target.value = '';
}

function handleFiles(files) {
    Array.from(files).forEach(file => {
        if (file.type.startsWith('image/')) {
            const reader = new FileReader();
            reader.onload = function(e) {
                const photo = {
                    id: Date.now() + Math.random(),
                    src: e.target.result,
                    name: file.name,
                    date: new Date().toLocaleString('es-ES'),
                    timestamp: Date.now()
                };
                
                photos.push(photo);
                savePhotos();
                displayPhotos();
                showNotification('Foto agregada a la galería 📸', 'success');
            };
            reader.readAsDataURL(file);
        }
    });
}

function displayPhotos() {
    galleryGrid.innerHTML = '';
    
    if (photos.length === 0) {
        galleryGrid.innerHTML = `
            <div style="grid-column: 1 / -1; text-align: center; padding: 60px; color: #718096;">
                <i class="fas fa-images" style="font-size: 4rem; color: #667eea; margin-bottom: 20px;"></i>
                <h3 style="font-family: 'Playfair Display', serif; margin-bottom: 10px;">Galería Vacía</h3>
                <p>No hay fotos aún. ¡Agrega las primeras para crear nuestra historia visual! 📸</p>
            </div>
        `;
        return;
    }

    photos.forEach(photo => {
        const photoItem = document.createElement('div');
        photoItem.className = 'gallery-item';
        photoItem.innerHTML = `
            <img src="${photo.src}" alt="${photo.name}" onclick="openPhotoModal('${photo.src}', '${photo.date}')">
            <div class="gallery-overlay">
                <div class="gallery-actions">
                    <button class="gallery-btn" onclick="downloadPhoto('${photo.src}', '${photo.name}')">
                        <i class="fas fa-download"></i>
                    </button>
                    <button class="gallery-btn" onclick="deletePhoto(${photo.id})">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </div>
            <div class="gallery-info">
                <div>${photo.name}</div>
                <small>${photo.date}</small>
            </div>
        `;
        galleryGrid.appendChild(photoItem);
    });
}

function openPhotoModal(src, date) {
    modalImage.src = src;
    modalDate.textContent = date;
    photoModal.style.display = 'flex';
}

function closePhotoModal() {
    photoModal.style.display = 'none';
}

function downloadPhoto(src, name) {
    const link = document.createElement('a');
    link.href = src;
    link.download = name;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showNotification('Descarga iniciada 📥', 'success');
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

// Funcionalidad de momentos especiales
function openMomentModal() {
    momentModal.style.display = 'flex';
    document.getElementById('momentDate').value = new Date().toISOString().split('T')[0];
}

function closeMomentModal() {
    momentModal.style.display = 'none';
    momentForm.reset();
}

function saveMoment(e) {
    e.preventDefault();
    
    const title = document.getElementById('momentTitle').value.trim();
    const date = document.getElementById('momentDate').value;
    const description = document.getElementById('momentDescription').value.trim();
    
    if (!title || !date || !description) {
        showNotification('Por favor completa todos los campos 💕', 'warning');
        return;
    }
    
    const moment = {
        id: Date.now(),
        title: title,
        date: date,
        description: description,
        formattedDate: new Date(date).toLocaleDateString('es-ES', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        }),
        timestamp: Date.now()
    };
    
    moments.unshift(moment);
    saveMoments();
    displayMoments();
    closeMomentModal();
    
    showNotification('Momento especial guardado ⭐', 'success');
}

function displayMoments() {
    momentsTimeline.innerHTML = '';
    
    if (moments.length === 0) {
        momentsTimeline.innerHTML = `
            <div style="text-align: center; padding: 40px; color: #718096;">
                <i class="fas fa-star" style="font-size: 3rem; color: #ff6b9d; margin-bottom: 15px;"></i>
                <h3 style="font-family: 'Playfair Display', serif; margin-bottom: 10px;">Sin Momentos Especiales</h3>
                <p>¡Agrega nuestros momentos más importantes para recordarlos siempre! ⭐</p>
            </div>
        `;
        return;
    }
    
    moments.forEach(moment => {
        const momentItem = document.createElement('div');
        momentItem.className = 'moment-item';
        momentItem.innerHTML = `
            <div class="moment-content">
                <div class="moment-title">${moment.title}</div>
                <div class="moment-date">${moment.formattedDate}</div>
                <div class="moment-description">${moment.description}</div>
                <button class="elegant-btn secondary" style="margin-top: 15px; padding: 8px 15px; font-size: 0.9rem;" onclick="deleteMoment(${moment.id})">
                    <i class="fas fa-trash"></i> Eliminar
                </button>
            </div>
        `;
        momentsTimeline.appendChild(momentItem);
    });
}

function deleteMoment(id) {
    if (confirm('¿Estás seguro de que quieres eliminar este momento especial? ⭐')) {
        moments = moments.filter(moment => moment.id !== id);
        saveMoments();
        displayMoments();
        showNotification('Momento eliminado ⭐', 'info');
    }
}

function saveMoments() {
    localStorage.setItem('loveMoments', JSON.stringify(moments));
}

// Efectos visuales
function createFloatingHearts() {
    setInterval(() => {
        const heart = document.createElement('div');
        heart.innerHTML = '💕';
        heart.style.cssText = `
            position: fixed;
            left: ${Math.random() * 100}%;
            top: 100vh;
            font-size: ${Math.random() * 1 + 1}rem;
            opacity: 0.7;
            pointer-events: none;
            z-index: 9999;
            animation: floatUp 6s ease-in-out forwards;
        `;
        
        document.body.appendChild(heart);
        
        setTimeout(() => {
            heart.remove();
        }, 6000);
    }, 3000);
}

function createHeartTrail(event) {
    if (Math.random() < 0.05) {
        const heart = document.createElement('div');
        heart.innerHTML = '💖';
        heart.style.cssText = `
            position: fixed;
            left: ${event.clientX}px;
            top: ${event.clientY}px;
            font-size: 1.2rem;
            pointer-events: none;
            z-index: 9999;
            animation: heartTrail 2s ease-out forwards;
        `;
        
        document.body.appendChild(heart);
        
        setTimeout(() => {
            heart.remove();
        }, 2000);
    }
}

function createHeartBurst() {
    for (let i = 0; i < 12; i++) {
        const heart = document.createElement('div');
        heart.innerHTML = '💖';
        heart.style.cssText = `
            position: fixed;
            left: 50%;
            top: 50%;
            font-size: 1.5rem;
            pointer-events: none;
            z-index: 10000;
            animation: heartBurst 1.5s ease-out forwards;
            transform: translate(-50%, -50%);
        `;
        heart.style.setProperty('--angle', `${i * 30}deg`);
        
        document.body.appendChild(heart);
        
        setTimeout(() => {
            heart.remove();
        }, 1500);
    }
}

// Agregar animaciones CSS
const style = document.createElement('style');
style.textContent = `
    @keyframes floatUp {
        0% {
            transform: translateY(0) rotate(0deg);
            opacity: 0;
        }
        10% {
            opacity: 0.7;
        }
        90% {
            opacity: 0.7;
        }
        100% {
            transform: translateY(-100vh) rotate(360deg);
            opacity: 0;
        }
    }
    
    @keyframes heartTrail {
        0% {
            transform: scale(1) rotate(0deg);
            opacity: 1;
        }
        100% {
            transform: scale(0) rotate(180deg);
            opacity: 0;
        }
    }
    
    @keyframes heartBurst {
        0% {
            transform: translate(-50%, -50%) rotate(var(--angle)) translateY(0);
            opacity: 1;
        }
        100% {
            transform: translate(-50%, -50%) rotate(var(--angle)) translateY(-150px);
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
        background: ${type === 'success' ? '#48bb78' : type === 'warning' ? '#ed8936' : type === 'error' ? '#f56565' : '#4299e1'};
        color: white;
        padding: 15px 25px;
        border-radius: 15px;
        box-shadow: 0 10px 30px rgba(0,0,0,0.2);
        z-index: 10000;
        animation: slideInRight 0.4s ease-out;
        max-width: 350px;
        word-wrap: break-word;
        font-weight: 500;
        backdrop-filter: blur(10px);
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.4s ease-in forwards';
        setTimeout(() => {
            notification.remove();
        }, 400);
    }, 4000);
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

// Carta de bienvenida
function createWelcomeLetter() {
    if (letters.length === 0) {
        const welcomeLetter = {
            id: Date.now(),
            title: "Bienvenida a Nuestro Mundo de Amor",
            content: `Querida mía,

Bienvenida a esta página especial que he creado solo para ti. Aquí podrás encontrar todas las cartas de amor que escribo para expresar lo que siento por ti.

Cada palabra, cada pensamiento, cada sentimiento está dedicado a ti. Eres el amor de mi vida y quiero que tengas un lugar especial donde guardar todos nuestros momentos.

Te amo más cada día.

Con todo mi amor...`,
            date: new Date().toLocaleString('es-ES'),
            timestamp: Date.now()
        };
        letters.push(welcomeLetter);
        saveLetters();
        displayLetters();
    }
}

// Cargar borrador guardado
window.addEventListener('load', function() {
    const draft = localStorage.getItem('draftLetter');
    if (draft) {
        loveLetter.value = draft;
    }
});

// Guardar datos automáticamente
window.addEventListener('beforeunload', function() {
    saveLetters();
    savePhotos();
    saveMoments();
});

// Efectos de entrada
window.addEventListener('load', function() {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 1s ease-in';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
}); 
checkSpecialDate(); 