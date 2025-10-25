# 🔍 Guía de Depuración de Audio - AudioLab

## 📊 Sistema de Logs Implementado

He agregado logs detallados en cada paso del proceso para que puedas ver exactamente qué está pasando:

### **Al Subir un Archivo:**
```
📤 Subiendo archivo de audio: { nombre, tipo, tamaño, id }
💾 Iniciando almacenamiento en IndexedDB: { id, nombre, tipo, tamaño }
✅ Archivo convertido a ArrayBuffer: X bytes
✅ Archivo guardado en IndexedDB exitosamente
✅ URL personalizada generada: audiolab://audio/id
✅ Archivo almacenado exitosamente: audiolab://audio/id
➕ Agregando track al store: { id, titulo, audio_url, categoria }
✅ Track agregado exitosamente. Total tracks: X
```

### **Al Reproducir un Archivo:**
```
🎵 Intentando cargar audio: { track, url, esCustomURL }
🔍 Recuperando archivo de IndexedDB: id
🔍 Buscando archivo en IndexedDB: id
✅ Archivo encontrado en IndexedDB: { nombre, tipo, tamaño }
✅ Blob URL creada: blob:http://...
✅ Archivo recuperado exitosamente: blob:http://...
```

## 🧪 Cómo Probar el Sistema

### **Paso 1: Limpia Datos Anteriores**
1. Abre la consola del navegador (F12)
2. Ve a `/admin`
3. Haz clic en "Limpiar Datos"
4. Deberías ver: `✅ Todos los datos han sido eliminados`

### **Paso 2: Sube un Archivo Nuevo**
1. En `/admin`, selecciona pestaña "Beats"
2. Clic en "Agregar Beat"
3. Selecciona un archivo MP3, WAV o FLAC
4. Completa el formulario (título, precio, etc.)
5. Haz clic en "Agregar Beat"

**En la consola deberías ver:**
```
📤 Subiendo archivo de audio: ...
💾 Iniciando almacenamiento en IndexedDB: ...
✅ Archivo convertido a ArrayBuffer: ...
✅ Archivo guardado en IndexedDB exitosamente
✅ URL personalizada generada: audiolab://audio/...
✅ Archivo almacenado exitosamente: audiolab://audio/...
➕ Agregando track al store: ...
✅ Track agregado exitosamente. Total tracks: 1
```

### **Paso 3: Reproduce el Track**
1. Ve a la página principal `/` o `/beats`
2. Haz clic en el botón de play del track
3. El reproductor global debería aparecer en la parte inferior

**En la consola deberías ver:**
```
🎵 Intentando cargar audio: ...
🔍 Recuperando archivo de IndexedDB: ...
🔍 Buscando archivo en IndexedDB: ...
✅ Archivo encontrado en IndexedDB: ...
✅ Blob URL creada: blob:http://...
✅ Archivo recuperado exitosamente: blob:http://...
```

### **Paso 4: Recarga la Página**
1. Presiona F5 o Ctrl+R
2. Haz clic en play nuevamente
3. Debería reproducirse sin problemas

**En la consola deberías ver los mismos logs de recuperación:**
```
🔍 Recuperando archivo de IndexedDB: ...
✅ Archivo encontrado en IndexedDB: ...
✅ Archivo recuperado exitosamente: ...
```

## ⚠️ Posibles Problemas y Soluciones

### **Problema 1: "Archivo no encontrado en IndexedDB"**
```
⚠️ Archivo no encontrado en IndexedDB: id
```

**Causa**: El archivo no se guardó correctamente o se limpió la base de datos.

**Solución**:
1. Limpia datos con el botón "Limpiar Datos"
2. Vuelve a subir el archivo
3. Verifica que veas los logs de almacenamiento exitoso

### **Problema 2: "Error guardando en IndexedDB"**
```
❌ Error guardando en IndexedDB: ...
⚠️ Usando blob URL como fallback: blob:http://...
```

**Causa**: Problema con IndexedDB (puede estar deshabilitado o lleno).

**Solución**:
1. El sistema usa blob URL como fallback (funciona pero no persiste)
2. Verifica que IndexedDB esté habilitado en tu navegador
3. Limpia el almacenamiento del navegador si está lleno

### **Problema 3: "Skipping non-audio file"**
```
⚠️ Archivo no reproducible: /audio/file.mid
💡 Los archivos MIDI no se pueden reproducir en navegadores
```

**Causa**: Intentando reproducir un archivo MIDI.

**Solución**:
- Esto es normal y esperado
- Los archivos MIDI no se pueden reproducir en navegadores
- Solo sube MP3, WAV, FLAC para reproducción

### **Problema 4: "No se pudo cargar el audio"**
```
⚠️ No se pudo cargar el audio: /audio/test.mp3
💡 Solución: Usa el botón "Limpiar Datos" en /admin
```

**Causa**: Datos residuales de pruebas anteriores.

**Solución**:
1. Usa el botón "Limpiar Datos" en `/admin`
2. Vuelve a subir archivos nuevos

## 🎯 Flujo Completo Esperado

### **Subida Exitosa:**
```
1. 📤 Subiendo archivo de audio
2. 💾 Iniciando almacenamiento en IndexedDB
3. ✅ Archivo convertido a ArrayBuffer
4. ✅ Archivo guardado en IndexedDB exitosamente
5. ✅ URL personalizada generada
6. ✅ Archivo almacenado exitosamente
7. ➕ Agregando track al store
8. ✅ Track agregado exitosamente
```

### **Reproducción Exitosa:**
```
1. 🎵 Intentando cargar audio
2. 🔍 Recuperando archivo de IndexedDB
3. 🔍 Buscando archivo en IndexedDB
4. ✅ Archivo encontrado en IndexedDB
5. ✅ Blob URL creada
6. ✅ Archivo recuperado exitosamente
7. 🎵 Audio reproduciéndose
```

## 📋 Checklist de Verificación

Antes de reportar un problema, verifica:

- [ ] Limpiaste los datos anteriores con "Limpiar Datos"
- [ ] El archivo es MP3, WAV o FLAC (no MIDI)
- [ ] El archivo tiene un tamaño razonable (< 50MB)
- [ ] Completaste todos los campos requeridos (título, precio)
- [ ] Viste los logs de almacenamiento exitoso en consola
- [ ] El track aparece en la lista después de agregarlo
- [ ] Recargaste la página para verificar persistencia

## 🆘 Si Nada Funciona

1. **Abre la consola** (F12)
2. **Copia todos los logs** que aparecen
3. **Verifica** qué paso está fallando
4. **Intenta** con un archivo diferente
5. **Limpia** el almacenamiento del navegador completamente

## ✅ Sistema Funcionando Correctamente

Si ves todos estos logs sin errores, el sistema está funcionando perfectamente:
- ✅ Subida exitosa
- ✅ Almacenamiento en IndexedDB
- ✅ Recuperación exitosa
- ✅ Reproducción funcionando
- ✅ Persistencia después de recargar

**¡El sistema está listo para uso real!**