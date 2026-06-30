# Hydrox B&R AI — Contexto del Proyecto

## ¿Qué es Hydrox B&R AI?
Sistema de búsqueda automatizada de propiedades en Guatemala. El cliente llena un formulario web, el sistema busca simultáneamente en 4+ plataformas inmobiliarias (Facebook Marketplace GT, Encuentra24, Immobili Studio, CBR Guatemala), Claude AI selecciona el Top 3, y el resultado llega al Telegram del cliente en 2–5 minutos.

**Propietarios:** Moises + Timo  
**Estado actual:** v1.0 — en operación, creciendo  
**Repositorio:** moises1388/Hydrox-br  
**Rama de trabajo:** claude/hydrox-brai-review-tx04j9

---

## Stack técnico

| Capa | Tecnología |
|------|-----------|
| Sitio web | HTML + CSS + JS vanilla — GitHub Pages o hosting estático |
| Automatización | Make.com (escenario id 5473661) |
| Scraping FB | Apify actor `U5DUNxhH3qKt5PnCf` |
| Scraping otras fuentes | HTTP GET + HTMLToText (Encuentra24, Immobili, CBR) |
| IA | Anthropic API — claude-sonnet-4-6 |
| Entrega | Telegram Bot (conexión Make.com id 4059287) |
| Webhook búsqueda | `https://hook.us2.make.com/z7bc9jug7fqt51x61ku8uyon9vijjovw` |
| Webhook asesores | `https://hook.us2.make.com/i4elgx9w0k64dmqkclu8lybym1x61gsx` |

---

## Planes actuales

| Plan | Precio | Búsquedas/mes | Canal |
|------|--------|---------------|-------|
| Básico | $29–49 | 15 | Telegram |
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

## Lógica de cliente (localStorage)
- `hx_user_code` — Código único del usuario (formato HX-XXXXXX)
- `hx_search_count` — Contador de búsquedas del mes
- `hx_telegram_chat_id` — Chat ID guardado para no re-ingresar

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
- Plan Básico: 15 búsquedas × $0.10 costo ≈ $1.50 costo de operación vs $29–49 ingreso → margen amplio
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
- Agregar manejo de "sin resultados" en el prompt de Claude para que no falle silenciosamente
- Implementar notificación de error a Telegram si el escenario falla
- Explorar Browserless o Playwright como alternativa al HTTP GET para sitios que requieren JS

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

---

## Decisiones de diseño importantes

- **no-cors en fetch**: Los webhooks de Make.com se envían con `mode: 'no-cors'` y `application/x-www-form-urlencoded` porque Make.com rechaza `application/json` en solicitudes sin preflight. Esto es intencional.
- **localStorage para estado del cliente**: No hay backend propio — el estado del usuario (código, contador) vive en localStorage del browser. Esto funciona para el MVP pero tiene limitaciones (se pierde si el usuario limpia cache o cambia dispositivo).
- **Tailwind vs CSS vanilla**: El proyecto usa CSS vanilla con variables CSS (`:root` tokens). No cambiar a frameworks hasta que el sitio crezca.
