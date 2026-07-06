# Integración WhatsApp Cloud API + Messenger — Hydrox B&R AI

> Guía para conectar la entrega de resultados por WhatsApp (Plan Pro+) y Messenger,
> manteniendo Telegram como canal del Plan Básico (costo ~$0).

---

## Estrategia de canales por plan

| Plan | Canal de entrega | Costo por mensaje |
|------|-----------------|-------------------|
| Básico | Telegram | $0 |
| Pro | Telegram + **WhatsApp** + Email | ~Q0.04–0.70 por conversación WA |
| Agencia/Empresa | Todo lo anterior + Messenger | Messenger $0 (ventana 24h) |

---

## PARTE 1 — WhatsApp Cloud API (Meta directo, sin Twilio)

### Requisitos previos
1. Una cuenta de **Meta Business** (business.facebook.com) verificada a nombre de Hydrox.
2. Un número de teléfono que NO esté registrado en la app normal de WhatsApp
   (puede ser un chip nuevo o número virtual — se usa solo para la API).

### Pasos de configuración (una sola vez, ~45 min)

1. Entra a **developers.facebook.com** → *My Apps* → *Create App* → tipo **Business**.
2. En el panel de la app, agrega el producto **WhatsApp**.
3. Meta te da automáticamente:
   - Un **número de prueba** (para testear gratis con hasta 5 números).
   - Un **token temporal** (24 h) y luego podrás generar un **token permanente**.
   - El **Phone Number ID** (lo necesita Make).
4. Prueba de humo: en la misma pantalla hay un botón "Send test message" — envíalo a tu celular.
5. Para producción: *WhatsApp → API Setup → Add phone number* → registra el número real
   de Hydrox y completa la verificación del negocio (Meta pide documentos, tarda 1–3 días).
6. Genera el **token permanente**: Business Settings → System Users → crear system user
   → Assign Assets (la app) → Generate Token con permiso `whatsapp_business_messaging`.

### Conexión en Make.com (módulo nuevo en escenario 5473661)

Agregar después del módulo 9 (Telegram) un módulo **HTTP - Make a request**:

- **URL:** `https://graph.facebook.com/v21.0/{PHONE_NUMBER_ID}/messages`
- **Method:** POST
- **Headers:**
  - `Authorization: Bearer {TOKEN_PERMANENTE}`
  - `Content-Type: application/json`
- **Body (raw JSON):**
```json
{
  "messaging_product": "whatsapp",
  "to": "{{1.whatsapp}}",
  "type": "text",
  "text": { "body": "{{respuesta de Claude}}" }
}
```
- **Filtro antes del módulo:** solo ejecutar si `1.whatsapp` tiene valor
  Y el plan del usuario es Pro+ (ver "Detección de plan" abajo).

### Costos WhatsApp (Guatemala, 2026)
- Conversaciones iniciadas por el negocio (utility): ~US$0.005–0.04 c/u.
- Las primeras 1,000 conversaciones/mes son **gratis**.
- Con margen del Plan Pro ($99) el costo es despreciable.

---

## PARTE 2 — Messenger (Meta Send API)

### Cómo funciona
- Messenger es **gratis** pero con regla estricta: solo puedes escribirle a un usuario
  dentro de las **24 horas** posteriores a que ÉL le escribió a tu página.
- Flujo recomendado: el formulario del sitio termina con un botón
  **"Recibir también por Messenger"** → link `m.me/HydroxBR?ref={user_code}` →
  el usuario abre el chat y toca "Empezar" → eso abre la ventana de 24 h →
  Make recibe el evento con el `ref` y ya puede responderle los resultados.

### Pasos de configuración
1. Necesitas una **Página de Facebook** de Hydrox B&R (no perfil personal).
2. En la misma app de developers.facebook.com agrega el producto **Messenger**.
3. Genera el **Page Access Token**.
4. Configura el **webhook de Messenger** apuntando a un webhook nuevo de Make
   (suscripción a `messages` y `messaging_postbacks`).
5. En Make: escenario nuevo que recibe el evento, extrae el `ref` (user_code),
   guarda el PSID del usuario en un Data Store, y responde con la Send API:

```
POST https://graph.facebook.com/v21.0/me/messages?access_token={PAGE_TOKEN}
{
  "recipient": { "id": "{PSID}" },
  "message": { "text": "..." }
}
```

---

## PARTE 3 — Detección de plan en Make

Hoy el sistema no sabe qué plan tiene cada usuario. Opción mínima viable:

1. Crear un **Data Store en Make** ("clientes_hydrox") con: `user_code`, `plan`,
   `whatsapp`, `messenger_psid`, `fecha_alta`.
2. Al inicio del escenario del buscador, buscar el `user_code` en el Data Store.
3. Router:
   - Plan Pro+ → enviar Telegram **y** WhatsApp/Messenger con contacto directo.
   - Plan Básico (o no encontrado) → solo Telegram, con el candado de upsell.
4. Alta de clientes Pro: manual al inicio (tú agregas el registro al cobrar),
   automatizable después con Stripe webhook (recomendación pendiente de Roberto).

---

## Qué necesito de ti para dejarlo conectado

1. **WhatsApp:** el `Phone Number ID` + el token permanente (de los pasos de la Parte 1).
2. **Messenger:** el `Page Access Token` de la página de Facebook de Hydrox.
3. Decisión: ¿el número de WhatsApp será nuevo o el actual del negocio?

Con esas 2 credenciales, el cableado en Make.com toma ~20 minutos.
