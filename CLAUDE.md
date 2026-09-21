# Hydrox B&R AI — Contexto del Proyecto

## ¿Qué es Hydrox B&R AI?
Sistema de búsqueda automatizada de propiedades en Guatemala. El cliente llena un formulario web, el sistema busca simultáneamente en 4+ plataformas inmobiliarias (Facebook Marketplace GT, Encuentra24, Immobili Studio, CBR Guatemala), Claude AI selecciona el Top 3, y el resultado llega al Telegram del cliente en 2–5 minutos.

**Propietarios:** Moises + Timo  
**Estado actual:** v1.0 — en operación, creciendo  
**Repositorio:** moises1388/Hydrox-br  
**Rama de trabajo:** claude/hydrox-brai-review-tx04j9

⚠️ **Alcance de esta sesión/repo:** Moises maneja un ecosistema más grande bajo la marca Hydrox (FreshTouch, IoT, Bombeo, etc.) en otros repos (`freshtouch-hx01`, `hydrox-ai`, `hydrox-dashboard`, `hydrox-b-r`) trabajados desde otras sesiones de Claude Code. Esta sesión/repo **solo** cubre el sitio web de Hydrox B&R AI (bienes raíces) y su automatización en Make.com. Ver "Sistemas relacionados fuera de este repo" más abajo antes de asumir que algo no existe solo porque no está aquí.

---

## Stack técnico

| Capa | Tecnología |
|------|-----------|
| Sitio web | HTML + CSS + JS vanilla — GitHub Pages o hosting estático |
| Automatización | Make.com (escenario id 5473661) |
| Scraping FB | Apify actor `U5DUNxhH3qKt5PnCf` |
| Scraping otras fuentes | HTTP GET + HTMLToText (Encuentra24, Immobili, CBR) |
| IA | Anthropic API — claude-sonnet-4-6 |
| Entrega | Telegram Bot "HydroxBot" (conexión Make.com id 4059287) — resultados de búsqueda |
| Webhook búsqueda | `https://hook.us2.make.com/z7bc9jug7fqt51x61ku8uyon9vijjovw` (escenario 5473661) |
| Webhook asesores | `https://hook.us2.make.com/i4elgx9w0k64dmqkclu8lybym1x61gsx` (escenario 5539650, `isinvalid` — sin arreglar) |
| Messenger (Sofia) | Escenario Make.com 5747741 — responde consultas de Facebook Messenger con Claude, activo desde 2026-09-21 |
| Prospección diaria | Bot Telegram `@hydroxbr_avisos_bot` ("Hydrox BR Avisos") — **NO es Make.com**, corre en sistema "Forja" gestionado desde otra sesión/repo. Ver sección de sistemas externos |

---

## Planes actuales

| Plan | Precio | Búsquedas/mes | Canal |
|------|--------|---------------|-------|
| Básico | $39 | 15 | Telegram |
| Pro | $99 | 30 | Telegram + WhatsApp + Email |
| Agencia | $249 | Ilimitadas | Todo + MLS interno |
| Empresa | $499+ | Ilimitadas | Todo + CRM + Dashboard |

---

## Estado del sitio (archivos en hydrox-br-v3.zip)

- `index.html` — Página principal con hero + pasos + planes + CTA
- `contacto.html` — Formulario multi-paso de búsqueda (3 pasos)
- `planes.html` — Comparativa detallada de planes + FAQ
- `como-funciona.html` — Explicación técnica del proceso
- `asesores.html` — Herramienta interna del equipo (no en nav público)
- `css/estilos.css` — Variables globales, reset, header, footer
- `css/componentes.css` — Componentes de página, hero, formulario, plan cards
- `js/main.js` — Lógica: scroll header, menú móvil, formulario multi-paso, webhook
- `suscripcion.html` — Página de suscripción: datos de transferencia bancaria, formulario que genera código de cliente y arma un `mailto:` a hydroxventas@gmail.com con el comprobante para verificación manual en 24h
- `INTEGRACIONES-WHATSAPP-MESSENGER.md` — Guía técnica para conectar WhatsApp Cloud API y Messenger (pendiente: faltan credenciales de Meta Business de Moises)

## Lógica de cliente (localStorage)
- `hx_user_code` — Código único del usuario (formato HX-XXXXXX)
- `hx_search_count` — Contador de búsquedas del mes
- `hx_telegram_chat_id` — Chat ID guardado para no re-ingresar
- `VIP_CODES` (en `js/main.js`) — lista de códigos que activan acceso ilimitado sin pasar por el contador de búsquedas, usados vía `?codigo=` en la URL. Pensados para Moises + 3-5 amigos de prueba, revocables borrándolos del array

## Pago y suscripción (bank transfer manual)
- Banco Industrial, cuenta Monetaria (Quetzales) 373-000430-0, a nombre de HYDROX
- Flujo: cliente llena `suscripcion.html` → se genera/reutiliza su `hx_user_code` → cliente transfiere → envía comprobante + código por correo a hydroxventas@gmail.com → activación manual en 24h
- Add-on "sitios adicionales": el cliente puede pedir que se agregue una fuente propia a su búsqueda por un costo mensual extra (cotizado caso por caso). En el copy público **nunca se usa la palabra "scrapear"** — se dice "buscar en" / "sitios adicionales donde quieres que busquemos"
- No hay cobro automatizado (Stripe, etc.) — pendiente de Roberto

---

## Sistemas relacionados fuera de este repo (NO tocar desde aquí sin pedir acceso)

| Sistema | Dónde vive | Qué hace |
|---------|-----------|----------|
| **Forja** | Otra sesión/repo (surgió en sesión "Chatbot IA usando Forja") | Motor de prospección diaria: manda 3 mensajes/día al bot Telegram `@hydroxbr_avisos_bot` ("Hydrox BR Avisos") con prospectos del sector inmobiliario + mensaje sugerido para copiar y pegar. Desde 2026-09-21 el mensaje incluye el link al sitio y la frase de la empresa. También manda avisos de escalación por el mismo bot. |
| **Sistema de Ventas AI - Multi-Negocio** | Ya no vive en Make (escenario 5681531 quedó inactivo a propósito) | Moises confirmó (2026-09) que esto "ahora lo maneja Claude sin usar Make" — gestionado desde otra sesión. |
| **FreshTouch, hydrox-ai, hydrox-dashboard, hydrox-b-r** | Repos separados | Otras líneas de negocio de Moises (vending, IoT, bombeo, etc.) — nada que ver con el buscador de propiedades, pero comparten la misma cuenta de Make.com (equipo `927515`, ver abajo) y varias sesiones de Claude Code. |

Si algo parece "no estar pasando" pero el usuario insiste en que sí, revisa primero si es uno de estos sistemas externos antes de concluir que está roto.

---

## Estado de los escenarios de Make.com (equipo 927515) — última auditoría 2026-09-21

| ID | Nombre | Estado | Notas |
|----|--------|--------|-------|
| 5473661 | RE: Buscador Propiedades Guatemala | ✅ Activo (reactivado 2026-09-21) | **Se encontró apagado con 0 ejecuciones** — causa de que una búsqueda de prueba no llegara a Telegram. Blueprint interno estaba correcto (Top 5 Básico / Top 10 Pro+, split de 3 mensajes por límite de 4096 chars de Telegram). Reactivado, pendiente de que Moises confirme con una prueba real. |
| 5747741 | HYDROX - Agente Messenger (Sofia) | ✅ Activo (reactivado 2026-09-21) | Responde por Facebook Messenger con Claude y avisa cada conversación a Telegram (chat 7494138882). **Su prompt interno todavía dice "Plan Básico $29-49"** — desactualizado, pendiente de corregir a $39. |
| 5539650 | RE: Hydrox Asesores AI | ❌ Inactivo, `isinvalid: true` | Sin arreglar, no se ha tocado en las últimas sesiones. |
| 5681531 | Sistema de Ventas AI - Multi-Negocio (Base) | ❌ Inactivo (a propósito) | Confirmado por Moises: ya no se gestiona por Make. |
| 5097819, 5432304, 5270629, 6187069 | Escenarios "FreshTouch" | ✅ Activos | No son de Hydrox B&R AI — son de otra línea de negocio (FreshTouch) que comparte la cuenta de Make. No tocar. |

### ⚠️ Incidente "Broadcast Leads" (lección aprendida)
En agosto 2026 el escenario 5473661 fue sobrescrito manualmente (fuera de las sesiones de Claude) para convertirlo temporalmente en un relay de mensajes ("HydroxBot - Broadcast Leads"), reusando el mismo webhook del buscador — esto rompió la búsqueda de propiedades sin que fuera obvio por qué. Causa: Moises quería pausar un flujo de prospectos entrantes que no le funcionaba bien, y lo hizo editando directamente el escenario equivocado. Fue reconstruido preservando el mismo webhook. **Lección:** antes de asumir que un escenario "no sirve", revisar su blueprint completo — puede haber sido reescrito manualmente para otro propósito.

---

## ╔══════════════════════════════════════════╗
## ║  EQUIPO ASESOR INTERNO — HYDROX B&R AI  ║
## ╚══════════════════════════════════════════╝

Estos 5 asesores son perspectivas especializadas que Claude debe consultar
internamente al tomar decisiones de diseño, negocio o técnicas.
**No son visibles al público.** Son el criterio de revisión del equipo Moises + Timo.

### Cuándo consultar a los asesores
- Al agregar features nuevas → ¿tiene sentido para el negocio?
- Al cambiar precios o planes → ¿es sostenible y competitivo?
- Al modificar el flujo del sistema → ¿es robusto y escalable?
- Al proponer nuevas fuentes de scraping → ¿vale la pena el esfuerzo?
- Al tomar cualquier decisión que afecte la propuesta de valor

---

### 📢 ANA SOFÍA — Asesora de Marketing

**Especialidad:** Cómo atraer y retener clientes para Hydrox B&R.

**Conocimiento del proyecto (actualizado):**
- El diferenciador clave es la velocidad (2-5 min) + 4 fuentes simultáneas
- El canal de adquisición principal aún no está definido
- El sitio tiene buen CTA ("Buscar mi propiedad") pero falta prueba social (testimonios, casos de éxito)
- La oferta de "Plan Básico gratuito" de 15 búsquedas funciona como gancho de prueba
- Telegram como canal de entrega es un diferenciador único en Guatemala

**Preguntas que Ana Sofía haría:**
- ¿Esta mejora hace el servicio más fácil de recomendar boca-a-boca?
- ¿Queda claro en 5 segundos qué hace Hydrox y por qué usarlo?
- ¿El cambio ayuda a convertir visitantes en usuarios pagos?
- ¿Estamos aprovechando los resultados exitosos para generar testimonios?

**Recomendaciones pendientes de Ana Sofía:**
- Agregar sección de testimonios (aunque sea 1-2 iniciales)
- Crear contenido en redes sobre casos de éxito ("encontramos casa en Zona 14 en 4 min")
- Considerar un referral program (recomienda y obtén búsquedas extra)

---

### ⚖️ LIC. MARCO HERNÁNDEZ — Asesor Legal

**Especialidad:** Aspectos legales del servicio en Guatemala.

**Conocimiento del proyecto (actualizado):**
- El servicio actualmente opera sin términos y condiciones formales
- Se recopilan datos personales (email, WhatsApp, Telegram Chat ID) sin política de privacidad
- La API key de Anthropic está expuesta en el código del escenario Make.com (riesgo si se comparte el blueprint)
- El scraping de Facebook Marketplace puede ser gray area legal

**Preguntas que el Lic. Marco haría:**
- ¿Hay algo en este cambio que genere responsabilidad legal hacia el usuario?
- ¿Protegemos los datos personales que recopilamos?
- ¿Tenemos bases legales para el servicio que ofrecemos?

**Recomendaciones pendientes del Lic. Marco:**
- Agregar Términos y Condiciones básicos al sitio
- Agregar Política de Privacidad (requerida si recopilas datos)
- Rotar la API key de Anthropic (la actual está en el blueprint — cambiarla por una nueva)
- Agregar disclaimer: "Hydrox es un servicio de búsqueda, no una agencia inmobiliaria"

---

### 💰 ROBERTO MÉNDEZ — Asesor de Finanzas

**Especialidad:** Sostenibilidad económica y pricing del negocio.

**Conocimiento del proyecto (actualizado):**
- Costos por búsqueda estimados: Apify (~$0.04) + Claude API (~$0.02–0.05) + Make.com (ops) ≈ $0.08–0.12 por búsqueda
- Plan Básico: 15 búsquedas × $0.10 costo ≈ $1.50 costo de operación vs $39 ingreso → margen amplio
- Make.com: plan actual cubre el volumen de operaciones? Verificar límites
- No hay sistema de cobro automatizado aún — pagos manuales

**Preguntas que Roberto haría:**
- ¿Este cambio aumenta el costo por operación?
- ¿El precio del plan sigue siendo rentable con estas mejoras?
- ¿Cuántos clientes en Plan Básico necesitamos para cubrir costos fijos?

**Recomendaciones pendientes de Roberto:**
- Implementar sistema de pago automatizado (Stripe o similar)
- Calcular break-even: cuántos clientes Pro necesita el negocio
- Considerar límite de búsquedas más estricto o advertencia de costo alto

---

### ⚙️ DAVID GARCÍA — Asesor de Tecnología

**Especialidad:** Robustez, escalabilidad y nuevas fuentes del sistema.

**Conocimiento del proyecto (actualizado):**
- Fuentes activas: Facebook Marketplace (Apify), Encuentra24 (HTTP+HTMLToText), Immobili Studio (HTTP+HTMLToText), CBR Guatemala (HTTP+HTMLToText)
- Fuentes planificadas: OLX Guatemala, Urbania GT
- Limitación conocida: HTMLToText pierde los URLs de las propiedades → el sistema no puede incluir links a Encuentra24/Immobili/CBR
- Limitación conocida: Las descripciones largas de Facebook se truncan a 500 chars en el TextAggregator
- El sistema no tiene manejo de errores si Apify falla o retorna 0 resultados
- No hay retry logic si Make.com falla

**Preguntas que David haría:**
- ¿Este cambio hace el sistema más o menos robusto?
- ¿Agrega dependencias nuevas que podrían fallar?
- ¿Cómo afecta el tiempo de ejecución del escenario?
- ¿Es escalable si el volumen de búsquedas crece 10x?

**Recomendaciones pendientes de David:**
- Agregar un módulo de extracción de URLs (regex) antes del HTMLToText para Encuentra24/Immobili/CBR
- ~~Agregar manejo de "sin resultados" en el prompt de Claude~~ → hecho (regla NIVEL 1/2/3 en el prompt del escenario 5473661)
- Implementar notificación de error a Telegram si el escenario falla (sigue pendiente — hoy el escenario puede quedar apagado sin que nadie se entere, como pasó el 2026-09)
- Explorar Browserless o Playwright como alternativa al HTTP GET para sitios que requieren JS
- Corregir el precio desactualizado ($29-49) en el prompt del escenario Messenger Sofia (5747741) — debería decir $39
- Conectar WhatsApp Cloud API (Parte 1 de `INTEGRACIONES-WHATSAPP-MESSENGER.md`) — falta que Moises entregue Phone Number ID + token permanente

**Proceso para agregar nueva fuente de scraping:**
1. Identificar URL de búsqueda con parámetros (tipo + zona)
2. Decidir método: Apify actor (si tiene JS pesado) o HTTP GET (si es HTML estático)
3. Agregar módulo en Make.com
4. Incluir output en el prompt de Claude con su nombre de sección
5. Actualizar sitio web (fuentes-section en index.html y como-funciona.html)

---

### 🤝 SOFÍA CONTRERAS — Asesora de Ventas

**Especialidad:** Estrategia de ventas y presentación del servicio.

**Conocimiento del proyecto (actualizado):**
- Target actual: compradores/arrendatarios individuales + agentes inmobiliarios
- Target con mayor potencial de ingreso: agencias inmobiliarias (Plan Agencia $249/mes)
- La propuesta de valor más fuerte es: tiempo (minutos vs días) + IA (no resultados aleatorios)
- Objeción más común esperada: "¿Por qué pagar si puedo buscar yo mismo en Facebook?"
- No hay material de ventas listo (deck, demo, propuesta formal)

**Preguntas que Sofía haría:**
- ¿Esta mejora resuelve una objeción real del cliente?
- ¿Cómo presentaría este cambio en una demo de 2 minutos?
- ¿El cliente entiende el valor antes de ver el precio?

**Recomendaciones pendientes de Sofía:**
- Crear un flujo de onboarding para nuevos clientes (email de bienvenida + instrucciones de Telegram)
- Preparar una demo grabada del proceso completo (formulario → Telegram en tiempo real)
- Desarrollar propuesta formal para agencias (PDF con casos de uso + precios)
- Agregar sección "¿Para quién es Hydrox?" con 3 perfiles: comprador, agente, agencia

---

## Historial de cambios importantes

| Fecha | Cambio | Asesores relevantes |
|-------|--------|---------------------|
| 2026-06-30 | v1.0: Sitio inicial con formulario multi-paso | Todos |
| 2026-06-30 | Fix validación radio/checkbox, honeypot anti-spam | David |
| 2026-06-30 | Sistema de códigos de usuario HX-XXXXXX + contador de búsquedas | Roberto, David |
| 2026-06-30 | Sistema de calificación de resultados por estrellas | Sofía |
| 2026-06-30 | Make.com: extracción de teléfonos de descripciones Facebook | David |
| 2026-06-30 | Make.com: prompt Claude actualizado — nunca "No disponible" | David, Sofía |
| 2026-06-30 | Hero sections con foto real de casa (Unsplash) | Ana Sofía |
| 2026-06-30 | Asesores Make.com: escenario id 5539650 para consultas internas | David |
| 2026-08 | Precio Plan Básico fijado en $39 (antes rango $29–49) en sitio y Make | Roberto |
| 2026-08 | Fix Encuentra24: URL apuntaba a homepage, corregida a categoría real | David |
| 2026-08 | Fix Make: concatenación `&` fallaba silenciosamente en IML — reemplazada por interpolación directa `{{campo}}` | David |
| 2026-08 | Página `suscripcion.html`: pago por transferencia bancaria + generación de código de cliente | Roberto, Sofía |
| 2026-08 | Códigos VIP de acceso ilimitado para pruebas (Moises + amigos) | Roberto |
| 2026-08 | Add-on de "sitios adicionales" (sin usar la palabra "scrapear" en el copy público) | Ana Sofía, David |
| 2026-08 | Top de resultados: Plan Básico 3→5, Pro/Agencia/Empresa →10; split de 3 mensajes Telegram por límite de 4096 chars | David |
| 2026-08 | Incidente Broadcast Leads: escenario 5473661 sobrescrito manualmente, reconstruido preservando el webhook | David |
| 2026-09-21 | Auditoría: buscador (5473661) y Messenger Sofia (5747741) encontrados inactivos y reactivados | David |
| 2026-09-21 | Identificado sistema "Forja" (otra sesión) como responsable de la prospección diaria vía `@hydroxbr_avisos_bot`; se le agregó el link del sitio al mensaje | Ana Sofía, Sofía |

---

## Decisiones de diseño importantes

- **no-cors en fetch**: Los webhooks de Make.com se envían con `mode: 'no-cors'` y `application/x-www-form-urlencoded` porque Make.com rechaza `application/json` en solicitudes sin preflight. Esto es intencional.
- **localStorage para estado del cliente**: No hay backend propio — el estado del usuario (código, contador) vive en localStorage del browser. Esto funciona para el MVP pero tiene limitaciones (se pierde si el usuario limpia cache o cambia dispositivo).
- **Tailwind vs CSS vanilla**: El proyecto usa CSS vanilla con variables CSS (`:root` tokens). No cambiar a frameworks hasta que el sitio crezca.
