# 💕 Página de Amor para Mi Novia

Una página web romántica y personalizada para expresar tu amor a través de mensajes y fotos.

## ✨ Características

### 💌 Sección de Mensajes
- **Escribir mensajes de amor**: Área de texto para escribir mensajes románticos
- **Contador de caracteres**: Límite de 500 caracteres por mensaje
- **Historial de mensajes**: Todos los mensajes se guardan y muestran en orden cronológico
- **Eliminar mensajes**: Opción para eliminar mensajes no deseados
- **Persistencia**: Los mensajes se guardan en el navegador

### 📸 Collage de Fotos
- **Subir múltiples fotos**: Arrastra o haz clic para seleccionar fotos
- **Vista de collage**: Las fotos se muestran en un hermoso grid responsive
- **Modal de vista**: Haz clic en cualquier foto para verla en tamaño completo
- **Eliminar fotos**: Opción para eliminar fotos del collage
- **Almacenamiento local**: Las fotos se guardan en el navegador

### 🎵 Reproductor de Música
- **Controles de música**: Botones para reproducir, pausar y cambiar canción
- **Lista de canciones románticas**: Incluye canciones populares de amor
- **Interfaz intuitiva**: Diseño fácil de usar

### ✨ Efectos Visuales
- **Corazones flotantes**: Animación continua de corazones que flotan
- **Rastro de corazones**: Los corazones aparecen al mover el mouse
- **Efectos de entrada**: Animaciones suaves al cargar la página
- **Notificaciones**: Mensajes de confirmación con animaciones
- **Diseño responsive**: Se adapta a diferentes tamaños de pantalla

## 🚀 Cómo Usar

### Instalación
1. Descarga todos los archivos en una carpeta
2. Abre el archivo `index.html` en tu navegador web
3. ¡Listo! La página está lista para usar

### Escribir Mensajes
1. Ve a la sección "Mis Mensajes Para Ti"
2. Escribe tu mensaje en el área de texto
3. Haz clic en "Agregar Mensaje" o presiona Ctrl+Enter
4. Tu mensaje aparecerá en la lista de mensajes

### Agregar Fotos
1. Ve a la sección "Nuestros Momentos Especiales"
2. Haz clic en el área de subida de fotos
3. Selecciona una o múltiples fotos de tu computadora
4. Las fotos aparecerán automáticamente en el collage

### Reproducir Música
1. Ve a la sección "Música Para Nuestro Amor"
2. Usa los botones para controlar la reproducción
3. Las canciones se reproducirán en secuencia

## 🎨 Personalización

### Cambiar el Título
Edita el archivo `index.html` y cambia el texto en:
```html
<h1 class="main-title">
    <i class="fas fa-heart"></i>
    Para Mi Amor
    <i class="fas fa-heart"></i>
</h1>
```

### Cambiar Colores
Edita el archivo `styles.css` y modifica las variables de color en el gradiente principal:
```css
body {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}
```

### Agregar Más Canciones
Edita el archivo `script.js` y agrega más canciones al array `romanticSongs`:
```javascript
const romanticSongs = [
    { title: "Tu Canción Favorita", url: "https://youtube.com/watch?v=..." },
    // ... más canciones
];
```

## 💾 Almacenamiento

- **Mensajes**: Se guardan en el localStorage del navegador
- **Fotos**: Se guardan como base64 en el localStorage
- **Datos persistentes**: Los datos se mantienen entre sesiones

## 🌟 Características Especiales

### Fechas Especiales
La página detecta automáticamente fechas especiales como:
- San Valentín (14 de febrero)
- Navidad (25 de diciembre)

En estas fechas se activan efectos especiales de confeti.

### Efectos de Mouse
- Mover el mouse crea un rastro de corazones
- Los corazones flotan continuamente en la pantalla

### Notificaciones
- Mensajes de confirmación al agregar/eliminar contenido
- Diferentes tipos de notificaciones (éxito, advertencia, info)

## 📱 Compatibilidad

- ✅ Chrome
- ✅ Firefox
- ✅ Safari
- ✅ Edge
- ✅ Dispositivos móviles

## 🛠️ Tecnologías Utilizadas

- **HTML5**: Estructura de la página
- **CSS3**: Estilos y animaciones
- **JavaScript**: Funcionalidad interactiva
- **Font Awesome**: Iconos
- **Google Fonts**: Tipografías

## 💝 Ideas para Personalizar

1. **Cambiar el mensaje de bienvenida** en la función `addWelcomeMessage()`
2. **Agregar más efectos visuales** como partículas o fuegos artificiales
3. **Incluir un contador de días** desde que se conocieron
4. **Agregar una sección de citas románticas**
5. **Crear un calendario de fechas especiales**
6. **Incluir un reproductor de música real** con archivos MP3

## 📞 Soporte

Si tienes alguna pregunta o necesitas ayuda para personalizar la página, no dudes en contactarme.

---

**Hecho con ❤️ para expresar el amor de la manera más especial** 