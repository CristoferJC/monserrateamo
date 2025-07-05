// Variables globales
let photos = JSON.parse(localStorage.getItem('lovePhotos')) || [];
let moments = JSON.parse(localStorage.getItem('loveMoments')) || [];

// Datos de las fotos (puedes agregar más fotos aquí)
const photosData = [
    {
        id: 1,
        title: "Nuestra primera salida",
        date: "3 de Diciembre, 2024",
        description: "Nuestra primera salida juntos",
        image: "fotos/1.jpg"
    },
    {
        id: 2,
        title: "Nuestra segunda salida",
        date: "4 de Diciembre, 2024",
        description: "",
        image: "fotos/2.jpg",
    },
    {
        id: 3,
        title: "En el polvorín",
        date: "7 de Diciembre, 2024",
        description: "",
        image: "fotos/3.jpg"
    },
    {
        id: 4,
        title: "En tu casa",
        date: "9 de Diciembre, 2024",
        description: "Cuando me invitaste por primera vez a tu casa",
        image: "fotos/4.jpg"
    },
    {
        id: 5,
        title: "Mi cumpleaños",
        date: "15 de Diciembre, 2024",
        description: "El día de mi cumpleaños, cuando te invité a mi casa",
        image: "fotos/5.jpg"
    },
    {
        id: 6,
        title: "En mi casa",
        date: "17 de Diciembre, 2024",
        description: "Cuando fuiste a mi casa jiji",
        image: "fotos/6.jpg"
    },
    {
        id: 7,
        title: "Viaje a castro",
        date: "23 de Diciembre, 2024",
        description: "Cuando fuimos a Castro",
        image: "fotos/7.jpg"
    },
    {
        id: 8,
        title: "Paseito",
        date: "28 de Diciembre, 2024",
        description: "Cuando fuimos a pasear a la playa",
        image: "fotos/8.jpg"
    },
    {
        id: 9,
        title: "Feria de las pulgas",
        date: "29 de Diciembre, 2024",
        description: "Creo que fue la primera vez que fuimos a la feria de las pulgas",
        image: "fotos/9.jpg"
    },
    {
        id: 10,
        title: "Año nuevooo",
        date: "31 de Diciembre, 2024",
        description: "Fue mui lindo ese día",
        image: "fotos/10.jpg"
    },
    {
        id: 11,
        title: "Recreación primeras salidas",
        date: "16 de Enero, 2025",
        description: "",
        image: "fotos/11.jpg"
    },
    {
        id: 12,
        title: "Primer San Valentín",
        date: "14 de Febrero, 2025",
        description: "Este fue mi primer San Valentín",
        image: "fotos/12.jpg"
    },
    {
        id: 13,
        title: "Maquillaje",
        date: "15 de Marzo, 2025",
        description: "Cuando hicimos pijamada y me maquillaste",
        image: "fotos/13.jpg"
    },
    {
        id: 14,
        title: "Paseo a rocas",
        date: "19 de Abril, 2025",
        description: "Cuando fuimos de paseo a una rocas jiji",
        image: "fotos/14.jpg"
    },
    {
        id: 15,
        title: "Bailes",
        date: "17 de Mayo, 2025",
        description: "Cuando fuimos a bailes",
        image: "fotos/15.jpg"
    },
    {
        id: 16,
        title: "Nieve",
        date: "28 de Junio, 2025",
        description: "Cuando fuimos a pasear y fuimos a la nieve",
        image: "fotos/16.jpg"
    },
    {
        id: 17,
        title: "Paseito",
        date: "4 de Julio, 2025",
        description: "Nos fuimos a comer sushi",
        image: "fotos/17.jpg"
    },
    {
        id: 18,
        title: "Collage",
        date: "5 de Julio, 2025",
        description: "Fotitos nuestras",
        image: "fotos/18.jpg"
    }
];

// Momentos especiales predefinidos con fotos locales
const specialMoments = [
    {
        id: 1,
        title: "Nuestro Primer Encuentro",
        date: "15 de Marzo, 2023",
        description: "El día que nuestros caminos se cruzaron y todo cambió para siempre. Fue como si el universo conspirara para que nos encontráramos.",
        photo: "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=400&h=300&fit=crop"
    },
    {
        id: 2,
        title: "Nuestro Primer Beso",
        date: "20 de Abril, 2023",
        description: "Bajo las estrellas, en ese momento mágico, nuestros labios se encontraron y el tiempo se detuvo. Fue el beso más dulce y perfecto.",
        photo: "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=400&h=300&fit=crop"
    },
    {
        id: 3,
        title: "Nuestro Primer Viaje Juntos",
        date: "10 de Julio, 2023",
        description: "Explorando el mundo juntos, descubriendo nuevos lugares y creando recuerdos que durarán toda la vida. Cada momento fue mágico.",
        photo: "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=400&h=300&fit=crop"
    },
    {
        id: 4,
        title: "Celebrando Nuestro Aniversario",
        date: "15 de Marzo, 2024",
        description: "Un año de amor, risas, aventuras y crecimiento juntos. Cada día a tu lado es un regalo que atesoro con todo mi corazón.",
        photo: "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=400&h=300&fit=crop"
    },
    {
        id: 5,
        title: "Nuestro Futuro Juntos",
        date: "Para Siempre",
        description: "Mirando hacia el futuro, soñando con todos los momentos que aún nos esperan. Contigo quiero construir una vida llena de amor y felicidad.",
        photo: "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=400&h=300&fit=crop"
    }
];

// Elementos del DOM
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
    displayMoments();
    setupEventListeners();
    createFloatingHearts();
    createPhotoCards();
});

function initializeApp() {
    displayPhotos();
    displayMoments();
    setupEventListeners();
}

// Event Listeners
function setupEventListeners() {
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
    
    specialMoments.forEach(moment => {
        const momentItem = document.createElement('div');
        momentItem.className = 'moment-item';
        momentItem.innerHTML = `
            <div class="moment-content">
                <div class="moment-title">${moment.title}</div>
                <div class="moment-date">${moment.date}</div>
                <div class="moment-description">${moment.description}</div>
                <div class="moment-photo" onclick="openPhotoModal('${moment.photo}', '${moment.date}')">
                    <img src="${moment.photo}" alt="${moment.title}">
                </div>
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
    const container = document.querySelector('.container');
    
    for (let i = 0; i < 20; i++) {
        const heart = document.createElement('div');
        heart.innerHTML = '❤️';
        heart.style.position = 'fixed';
        heart.style.left = Math.random() * 100 + 'vw';
        heart.style.top = Math.random() * 100 + 'vh';
        heart.style.fontSize = (Math.random() * 20 + 10) + 'px';
        heart.style.opacity = '0.3';
        heart.style.pointerEvents = 'none';
        heart.style.zIndex = '-1';
        heart.style.animation = `float ${Math.random() * 10 + 10}s ease-in-out infinite`;
        heart.style.animationDelay = Math.random() * 5 + 's';
        
        container.appendChild(heart);
    }
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

// Guardar datos automáticamente
window.addEventListener('beforeunload', function() {
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

// Función para crear las tarjetitas de fotos
function createPhotoCards() {
    const photosGrid = document.getElementById('photosGrid');
    
    photosData.forEach(photo => {
        const photoCard = document.createElement('div');
        photoCard.className = 'photo-card';
        photoCard.onclick = () => openPhotoModal(photo);
        
        photoCard.innerHTML = `
            <div class="photo-image">
                <img src="${photo.image}" alt="${photo.title}" loading="lazy">
                <div class="photo-overlay">
                    <i class="fas fa-heart"></i>
                </div>
            </div>
            <div class="photo-info">
                <h3 class="photo-title">${photo.title}</h3>
                <p class="photo-date">${photo.date}</p>
                <p class="photo-description">${photo.description}</p>
            </div>
        `;
        
        photosGrid.appendChild(photoCard);
    });
}

// Función para abrir el modal de la foto
function openPhotoModal(photo) {
    const modal = document.getElementById('photoModal');
    const modalImage = document.getElementById('modalImage');
    const modalDate = document.getElementById('modalDate');
    
    modalImage.src = photo.image;
    modalImage.alt = photo.title;
    modalDate.textContent = `${photo.title} - ${photo.date}`;
    
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

// Función para cerrar el modal
function closePhotoModal() {
    const modal = document.getElementById('photoModal');
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

// Event listeners
document.addEventListener('DOMContentLoaded', function() {
    // Crear las tarjetitas de fotos
    createPhotoCards();
    
    // Cerrar modal al hacer clic en la X
    const closeModal = document.querySelector('.close-modal');
    closeModal.onclick = closePhotoModal;
    
    // Cerrar modal al hacer clic fuera de la imagen
    const modal = document.getElementById('photoModal');
    modal.onclick = function(event) {
        if (event.target === modal) {
            closePhotoModal();
        }
    };
    
    // Cerrar modal con la tecla Escape
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape') {
            closePhotoModal();
        }
    });
    
    // Efectos de animación al hacer scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observar las tarjetitas de fotos
    const photoCards = document.querySelectorAll('.photo-card');
    photoCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = `all 0.6s ease ${index * 0.1}s`;
        observer.observe(card);
    });
}); 