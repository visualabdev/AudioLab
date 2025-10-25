# 🚀 Instrucciones Rápidas - AudioLab

## ⚠️ Si Ves Errores de Audio

### **Error: "Error loading audio: /audio/test.mp3"**

**Causa**: Hay datos residuales de pruebas anteriores en el navegador.

**Solución Rápida**:
1. Ve a `/admin`
2. Haz clic en el botón **"Limpiar Datos"** (rojo, en el header)
3. Confirma la acción
4. ¡Listo! Ahora puedes subir contenido nuevo

---

## 🎵 Cómo Subir Audio Real

### **Opción 1: Subida Individual**
1. Ve a `/admin`
2. Selecciona pestaña: **Beats**, **Samples**, o **MIDI**
3. Clic en **"Agregar [Tipo]"**
4. Sube tu archivo de audio (MP3, WAV, FLAC)
5. Completa la información
6. Clic en **"Agregar"**
7. ¡Se reproduce inmediatamente!

### **Opción 2: Subida Masiva**
1. Ve a `/admin`
2. Clic en **"Subida Masiva"**
3. Configura valores por defecto
4. Selecciona múltiples archivos
5. Edita información si necesitas
6. Clic en **"Procesar Todos"**
7. ¡Todos los archivos listos!

---

## 🎧 Formatos Soportados

### **Para Reproducción** ✅
- MP3 (recomendado)
- WAV (alta calidad)
- FLAC (sin pérdida)
- OGG
- M4A

### **NO Para Reproducción** ❌
- MIDI (.mid, .midi) - Los navegadores no pueden reproducir MIDI
- Estos archivos se pueden vender pero no reproducir en el navegador

---

## 🔧 Solución de Problemas Comunes

### **"No se reproduce el audio"**
1. Verifica que el archivo sea MP3, WAV o FLAC
2. Usa el botón "Limpiar Datos" en `/admin`
3. Vuelve a subir el archivo
4. Recarga la página

### **"El audio desaparece al recargar"**
✅ **Ya está resuelto** - El sistema usa IndexedDB para persistencia
- Los archivos sobreviven a recargas
- Si no funciona, limpia datos y vuelve a subir

### **"Error de hidratación"**
✅ **Ya está resuelto** - El sistema maneja correctamente la hidratación
- Si ves este error, recarga la página
- Debería desaparecer automáticamente

### **"SelectItem error"**
✅ **Ya está resuelto** - Todos los selects tienen valores válidos
- No deberías ver este error

---

## 📊 Características Principales

### **✅ Audio Real**
- Subida persistente con IndexedDB
- Reproducción HTML5 nativa
- Controles completos
- Sobrevive a recargas

### **✅ Gestión Completa**
- Panel de administración
- CRUD de tracks
- Bulk upload
- Analytics

### **✅ Sistema de Ventas**
- Carrito de compras
- Checkout con PayPal
- Licencias múltiples
- Descargas automáticas

### **✅ Búsqueda Avanzada**
- Filtros por categoría, género, BPM
- Búsqueda de texto
- Ordenamiento múltiple
- Filtros especiales

---

## 🎯 Flujo Recomendado

### **Primera Vez**
1. **Limpia datos** → Botón "Limpiar Datos" en `/admin`
2. **Sube contenido** → Archivos MP3, WAV o FLAC
3. **Prueba reproducción** → Haz clic en play
4. **Recarga página** → Verifica que persiste
5. **¡Listo!** → Sistema funcionando

### **Uso Normal**
1. **Sube tracks** → Individual o masivo
2. **Gestiona contenido** → Edita, elimina, destaca
3. **Monitorea analytics** → Ve métricas
4. **Personaliza** → Colores, logo, contenido

---

## 💡 Consejos Pro

### **Para Mejor Rendimiento**
- Usa MP3 a 320kbps para calidad óptima
- Imágenes de portada: 800x800px
- Nombres descriptivos para los archivos
- Tags relevantes para búsqueda

### **Para Mejor Organización**
- Usa categorías correctamente (Beat/Sample/MIDI)
- Completa toda la información (BPM, tonalidad, etc.)
- Agrega descripciones detalladas
- Marca como destacado solo lo mejor

### **Para Evitar Problemas**
- No subas archivos MIDI para reproducción
- Limpia datos antes de empezar de cero
- Recarga la página si algo no funciona
- Usa formatos de audio estándar

---

## 🆘 Soporte Rápido

### **Si Algo No Funciona**
1. **Limpia datos** en `/admin`
2. **Recarga la página** (F5 o Ctrl+R)
3. **Vuelve a intentar** la acción
4. **Verifica la consola** para más detalles

### **Mensajes Comunes**
- ⚠️ "Skipping non-audio file" → Normal, archivo MIDI detectado
- ⚠️ "No se pudo cargar el audio" → Archivo no existe, limpia datos
- ℹ️ "Cargando tracks destacados" → Normal, esperando hidratación

---

## ✅ Sistema Listo

**AudioLab está completamente funcional y listo para uso:**
- Sube archivos reales
- Reproduce audio persistente
- Gestiona tu catálogo
- Vende tu contenido

**¡Empieza subiendo tu primer track!**