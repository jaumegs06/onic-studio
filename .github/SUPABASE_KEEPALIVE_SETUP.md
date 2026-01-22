# 🔄 Configuración del GitHub Action Keep-Alive para Supabase

## ¿Qué hace esto?

Este GitHub Action hace ping automático a tu base de datos Supabase cada **lunes y jueves**, lo que evita que se pause por inactividad (el plan gratuito pausa proyectos después de 7 días sin actividad).

## 📋 Instrucciones de Configuración

### Paso 1: Añadir los Secrets en GitHub

1. **Ve a tu repositorio en GitHub** (https://github.com/tu-usuario/onic-studio)

2. **Navega a:** `Settings` → `Secrets and variables` → `Actions`

3. **Haz clic en "New repository secret"** y añade estos 2 secrets:

   **Secret 1:**
   - **Name:** `SUPABASE_URL`
   - **Value:** Tu URL de Supabase (ejemplo: `https://xxxxx.supabase.co`)
   
   **Secret 2:**
   - **Name:** `SUPABASE_ANON_KEY`
   - **Value:** Tu clave anónima de Supabase (la clave pública que empieza con `eyJ...`)

### Paso 2: Hacer Push del Código

```bash
git add .github/
git commit -m "Add GitHub Action to keep Supabase alive"
git push
```

### Paso 3: Verificar que Funciona

1. **Ve a tu repositorio en GitHub**
2. **Navega a:** `Actions` (pestaña superior)
3. **Verás el workflow** "Keep Supabase Alive"
4. **Para probarlo manualmente:** Haz clic en el workflow → `Run workflow` → `Run workflow`

Si ves un ✅ verde, ¡funciona correctamente!

## 📅 Calendario de Ejecución

- **Lunes a las 00:00 UTC** (01:00 hora española)
- **Jueves a las 00:00 UTC** (01:00 hora española)

Esto garantiza que nunca pasen más de 3-4 días sin actividad.

## 🔧 Personalización

Si quieres cambiar la frecuencia, edita la línea del `cron` en [`.github/workflows/keep_alive.yml`](file:///c:/Users/Jaume/Documents/onic-studio/.github/workflows/keep_alive.yml):

```yaml
# Ejemplos de otras frecuencias:
- cron: '0 0 * * *'      # Todos los días a medianoche
- cron: '0 0 * * 1,3,5'  # Lunes, miércoles y viernes
- cron: '0 12 * * 1'     # Solo los lunes al mediodía
```

## 💰 Costes

**100% GRATUITO** - GitHub Actions incluye 2,000 minutos gratis al mes. Este workflow usa menos de 1 minuto cada vez que se ejecuta, así que nunca llegarás al límite.

## ❓ Preguntas Frecuentes

**¿Dónde encuentro mi SUPABASE_URL y SUPABASE_ANON_KEY?**
- Ve a tu proyecto en Supabase
- Settings → API
- Ahí encontrarás ambos valores

**¿Puedo probarlo sin esperar al lunes?**
- Sí, ve a Actions → Keep Supabase Alive → Run workflow (botón verde)

**¿Qué pasa si me olvido de configurar los secrets?**
- El workflow fallará, pero te llegará un email de GitHub avisándote

---

**¡Listo!** Una vez configurado, nunca más tendrás que reanudar manualmente tu proyecto de Supabase. 🎉
