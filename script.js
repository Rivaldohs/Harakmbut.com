// ============================================
// CONFIGURACIÓN INICIAL - LEONES DE FUEGO
// 23° ANIVERSARIO HARAKMBUT
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    console.log('🔥 Página Leones de Fuego 23° Aniversario cargada');
    
    // 1. Iniciar partículas
    initParticles();
    
    // 2. Iniciar cuenta regresiva CORREGIDA (mañana 17 de enero)
    startCorrectCountdown();
    
    // 3. Configurar eventos del formulario
    setupFormEvents();
    
    // 4. Mostrar 23 años interactivo
    setupInteractiveYears();
    
    // 5. Efectos visuales
    createFireEffects();
});

// ============================================
// 1. PARTÍCULAS DE FONDO
// ============================================

function initParticles() {
    if (typeof particlesJS !== 'undefined') {
        particlesJS('particles-js', {
            particles: {
                number: { value: 70, density: { enable: true, value_area: 800 } },
                color: { value: "#FFD700" },
                shape: { type: "circle" },
                opacity: { value: 0.6, random: true },
                size: { value: 4, random: true },
                line_linked: { 
                    enable: true, 
                    distance: 150, 
                    color: "#FFD700", 
                    opacity: 0.3, 
                    width: 1 
                },
                move: { 
                    enable: true, 
                    speed: 1.5, 
                    direction: "none", 
                    random: true,
                    out_mode: "out" 
                }
            },
            interactivity: {
                detect_on: "canvas",
                events: {
                    onhover: { enable: true, mode: "repulse" },
                    onclick: { enable: true, mode: "push" }
                }
            }
        });
    }
}

// ============================================
// 2. CUENTA REGRESIVA CORREGIDA (MEDIANOCHE 17 ENERO)
// ============================================

function startCorrectCountdown() {
    console.log('⏰ Iniciando cuenta regresiva CORREGIDA...');
    
    // FECHA DEL EVENTO: MEDIANOCHE 17 DE ENERO 2026 (00:00)
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1); // Mañana
    tomorrow.setHours(0, 0, 0, 0); // 00:00 horas (medianoche)
    
    console.log(`🎯 Evento mañana: ${tomorrow.toLocaleDateString()} a las 00:00`);
    
    function updateCountdown() {
        const now = new Date();
        const timeLeft = tomorrow - now;
        
        // Si ya pasó el evento, mostrar 00:00:00
        if (timeLeft <= 0) {
            document.getElementById('cd-hours').textContent = '00';
            document.getElementById('cd-minutes').textContent = '00';
            document.getElementById('cd-seconds').textContent = '00';
            document.querySelector('.countdown-box h3').innerHTML = '<i class="fas fa-fire"></i> ¡HOY ES EL GRAN DÍA!';
            return;
        }
        
        // Calcular horas, minutos, segundos TOTALES
        const totalHours = Math.floor(timeLeft / (1000 * 60 * 60));
        const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);
        
        // Actualizar en la página
        document.getElementById('cd-hours').textContent = totalHours.toString().padStart(2, '0');
        document.getElementById('cd-minutes').textContent = minutes.toString().padStart(2, '0');
        document.getElementById('cd-seconds').textContent = seconds.toString().padStart(2, '0');
        
        // Efecto visual en segundos
        const secondsEl = document.getElementById('cd-seconds');
        if (secondsEl) {
            secondsEl.style.color = seconds % 2 === 0 ? '#FF6B35' : '#FFD700';
        }
        
        // Actualizar título según horas restantes
        if (totalHours <= 24 && totalHours > 0) {
            document.querySelector('.countdown-box h3').innerHTML = '<i class="fas fa-fire"></i> ¡MAÑANA ES EL GRAN DÍA!';
        }
    }
    
    // Actualizar inmediatamente
    updateCountdown();
    
    // Actualizar cada segundo
    setInterval(updateCountdown, 1000);
    
    console.log('✅ Cuenta regresiva activa - Medianoche 17 de enero');
}

// ============================================
// 3. AÑOS INTERACTIVOS - 23 AÑOS CON ANIMACIÓN
// ============================================

function setupInteractiveYears() {
    const counter = document.getElementById('yearsCount');
    if (!counter) return;
    
    // Animar contador desde 0 hasta 23
    animateCounter(counter, 0, 23, 1500); // 1.5 segundos de animación
    
    // Efecto hover interactivo
    counter.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.15)';
        this.style.transition = 'transform 0.3s ease';
    });
    
    counter.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1)';
    });
    
    // Efecto de clic - reiniciar animación
    counter.addEventListener('click', function() {
        animateCounter(counter, 0, 23, 1500);
    });
}

// Función para animar el contador
function animateCounter(element, start, end, duration) {
    let startTime = null;
    
    function animationFrame(currentTime) {
        if (startTime === null) {
            startTime = currentTime;
        }
        
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // Usar easing function para movimiento suave (ease-out)
        const easeProgress = 1 - Math.pow(1 - progress, 3);
        
        const current = Math.floor(start + (end - start) * easeProgress);
        element.textContent = current;
        
        if (progress < 1) {
            requestAnimationFrame(animationFrame);
        } else {
            element.textContent = end;
        }
    }
    
    requestAnimationFrame(animationFrame);
}

// ============================================
// 4. FORMULARIO DE INVITACIÓN 23° ANIVERSARIO
// ============================================

function setupFormEvents() {
    console.log('📝 Configurando formulario 23° aniversario...');
    
    const nameInput = document.getElementById('nameInput');
    const generateBtn = document.getElementById('generateBtn');
    const downloadBtn = document.getElementById('downloadBtn');
    const resultDiv = document.getElementById('resultContainer');
    const namePreview = document.querySelector('.name-value');
    
    if (!nameInput || !generateBtn) {
        console.error('❌ Elementos del formulario no encontrados');
        return;
    }
    
    // 1. ACTUALIZAR NOMBRE EN TIEMPO REAL
    nameInput.addEventListener('input', function() {
        const name = this.value.trim().substring(0, 40);
        if (namePreview) {
            namePreview.textContent = name || '[TU NOMBRE AQUÍ]';
            namePreview.style.color = name ? '#FFD700' : '#FFFFFF';
        }
    });
    
    // 2. BOTÓN GENERAR INVITACIÓN
    generateBtn.addEventListener('click', function() {
        const name = nameInput.value.trim();
        
        if (!name || name.length < 2) {
            showMessage('Por favor ingresa tu nombre completo para la invitación del 23° aniversario', 'error');
            nameInput.focus();
            return;
        }
        
        // Mostrar carga
        const originalText = generateBtn.innerHTML;
        generateBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> CREANDO INVITACIÓN...';
        generateBtn.disabled = true;
        
        // Simular proceso de generación
        setTimeout(() => {
            // Restaurar botón
            generateBtn.innerHTML = originalText;
            generateBtn.disabled = false;
            
            // Mostrar resultado
            if (resultDiv) {
                resultDiv.style.display = 'block';
                resultDiv.style.opacity = '0';
                resultDiv.style.transform = 'translateY(20px)';
                
                // Animación de entrada
                setTimeout(() => {
                    resultDiv.style.transition = 'all 0.5s ease';
                    resultDiv.style.opacity = '1';
                    resultDiv.style.transform = 'translateY(0)';
                }, 10);
                
                // Scroll suave al resultado
                setTimeout(() => {
                    resultDiv.scrollIntoView({ 
                        behavior: 'smooth', 
                        block: 'center' 
                    });
                }, 300);
            }
            
            // Efecto confetti
            launchConfetti();
            
            // Mensaje de éxito
            showMessage('¡Invitación del 23° aniversario creada! Ya puedes descargarla.', 'success');
            
            console.log('✅ Invitación 23° generada para:', name);
        }, 1500);
    });
    
    // 3. BOTÓN DESCARGAR INVITACIÓN
    downloadBtn.addEventListener('click', function() {
        const name = nameInput.value.trim() || 'Invitado Especial Harakmbut';
        console.log('💾 Iniciando descarga para:', name);
        downloadInvitation23(name);
    });
    
    console.log('✅ Formulario 23° aniversario configurado');
}

// ============================================
// 5. DESCARGAR INVITACIÓN 23° ANIVERSARIO
// ============================================

function downloadInvitation23(name) {
    const downloadBtn = document.getElementById('downloadBtn');
    
    if (!downloadBtn) {
        showMessage('Error: Botón no encontrado', 'error');
        return;
    }
    
    // 1. Cambiar a estado de carga
    const originalText = downloadBtn.innerHTML;
    downloadBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> GENERANDO IMAGEN...';
    downloadBtn.disabled = true;
    
    // 2. Crear tarjeta temporal para captura
    createTemporaryCardForCapture23(name).then((canvas) => {
        // 3. Convertir canvas a imagen y descargar
        const image = canvas.toDataURL('image/jpeg', 0.95);
        const link = document.createElement('a');
        link.href = image;
        link.download = `Invitacion_23_Aniversario_${name.replace(/\s+/g, '_')}.jpg`;
        
        // 4. Descargar imagen
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        // 5. Restaurar botón
        downloadBtn.innerHTML = originalText;
        downloadBtn.disabled = false;
        
        // 6. Mensaje de éxito
        showMessage('✅ Invitación 23° aniversario descargada correctamente', 'success');
        console.log('📥 Descarga completada - 23° Aniversario');
        
    }).catch((error) => {
        console.error('❌ Error al generar invitación 23°:', error);
        
        // Restaurar botón en caso de error
        downloadBtn.innerHTML = originalText;
        downloadBtn.disabled = false;
        
        showMessage('Error al generar la invitación. Intenta de nuevo.', 'error');
    });
}

// ============================================
// 6. CREAR TARJETA TEMPORAL 23° ANIVERSARIO
// ============================================

async function createTemporaryCardForCapture23(name) {
    // 1. Crear un div temporal que será visible
    const tempCard = document.createElement('div');
    tempCard.id = 'temp-invitation-card-23';
    
    // 2. Contenido HTML de la tarjeta 23° aniversario
    tempCard.innerHTML = `
        <div style="
            width: 850px;
            height: 1250px;
            background: linear-gradient(135deg, #0A0A0A, #1A1A1A);
            border-radius: 35px;
            padding: 70px;
            border: 6px solid;
            border-image: linear-gradient(45deg, #FFD700, #FF6B35, #8A2BE2) 1;
            position: relative;
            overflow: hidden;
            color: white;
            font-family: 'Raleway', sans-serif;
            box-shadow: 0 35px 100px rgba(0,0,0,0.9);
        ">
            <!-- Logo y título -->
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 50px;">
                <div style="display: flex; align-items: center; gap: 20px;">
                    <div style="font-size: 3.5rem; color: #FFD700;">👑</div>
                    <div style="font-family: 'Cinzel', serif; font-size: 2.2rem; color: #FFD700; font-weight: 900;">
                        LEONES DE FUEGO HARAKMBUT
                    </div>
                </div>
                <div style="background: linear-gradient(135deg, #8A2BE2, #4169E1); color: white; padding: 15px 30px; border-radius: 50px; font-weight: 900; font-size: 1.5rem; letter-spacing: 2px;">
                    INVITACIÓN VIP
                </div>
            </div>
            
            <!-- Título principal -->
            <div style="text-align: center; margin: 40px 0;">
                <h2 style="font-family: 'Cinzel', serif; font-size: 3.2rem; color: white; margin-bottom: 15px; letter-spacing: 4px;">
                    BLOQUE HARAKMBUT
                </h2>
                <p style="font-size: 1.6rem; color: #FFD700; font-style: italic; letter-spacing: 2px;">
                    "Leones de Fuego - San Jerónimo"
                </p>
            </div>
            
            <!-- Nombre del invitado -->
            <div style="background: rgba(255,215,0,0.18); backdrop-filter: blur(15px); border-radius: 25px; padding: 45px; margin: 50px 0; text-align: center; border: 4px solid rgba(255,215,0,0.4); box-shadow: inset 0 0 40px rgba(255,215,0,0.2), 0 15px 50px rgba(0,0,0,0.4);">
                <div style="font-family: 'Cinzel', serif; font-size: 1.2rem; color: #FFD700; letter-spacing: 4px; margin-bottom: 20px; text-transform: uppercase;">
                    INVITADO ESPECIAL DEL BLOQUE
                </div>
                <div style="font-family: 'Playfair Display', serif; font-size: 3.2rem; font-weight: 900; color: #FFD700; min-height: 80px; text-shadow: 0 0 20px rgba(255,215,0,0.6); padding: 20px; border-radius: 15px; background: rgba(0,0,0,0.3);">
                    ${name.toUpperCase()}
                </div>
            </div>
            
            <!-- Detalles del evento -->
            <div style="margin-top: 50px;">
                <!-- Fecha -->
                <div style="display: flex; align-items: center; gap: 25px; background: rgba(138,43,226,0.15); border-radius: 20px; padding: 25px; margin-bottom: 25px; border-left: 6px solid #8A2BE2;">
                    <div style="font-size: 2.8rem; color: #8A2BE2;">📅</div>
                    <div>
                        <div style="font-weight: 900; font-size: 1.5rem; color: white; margin-bottom: 8px;">
                            SÁBADO 17 ENERO 2026
                        </div>
                        <div style="color: #AAAAAA; font-size: 1.3rem;">
                            23° Aniversario Leones de Fuego
                        </div>
                    </div>
                </div>
                
                <!-- Pasacalle -->
                <div style="display: flex; align-items: center; gap: 25px; background: rgba(255,107,53,0.15); border-radius: 20px; padding: 25px; margin-bottom: 25px;">
                    <div style="font-size: 2.8rem; color: #FF6B35;">☀️</div>
                    <div>
                        <div style="font-weight: 900; font-size: 1.4rem; color: white; margin-bottom: 8px;">
                            PASACALLE ANIVERSARIO
                        </div>
                        <div style="color: #FFD700; font-size: 1.3rem; margin-bottom: 5px;">
                            14:00 HORAS
                        </div>
                        <div style="color: #AAAAAA; font-size: 1.1rem;">
                            Concentración: Cajonahuaylla - San Jerónimo
                        </div>
                    </div>
                </div>
                
                <!-- Celebración nocturna -->
                <div style="display: flex; align-items: center; gap: 25px; background: rgba(255,215,0,0.15); border-radius: 20px; padding: 25px; margin-bottom: 25px;">
                    <div style="font-size: 2.8rem; color: #FFD700;">🌙</div>
                    <div>
                        <div style="font-weight: 900; font-size: 1.4rem; color: white; margin-bottom: 8px;">
                            CELEBRACIÓN NOCTURNA
                        </div>
                        <div style="color: #FFD700; font-size: 1.3rem; margin-bottom: 5px;">
                            19:00 HORAS
                        </div>
                        <div style="color: #AAAAAA; font-size: 1.1rem;">
                            Local Señorial - Calle Romeritos
                        </div>
                    </div>
                </div>
                
                <!-- Ubicación especial -->
                <div style="display: flex; align-items: center; gap: 25px; background: rgba(65,105,225,0.15); border-radius: 20px; padding: 25px; border-left: 6px solid #4169E1;">
                    <div style="font-size: 2.8rem; color: #4169E1;">📍</div>
                    <div>
                        <div style="font-weight: 900; font-size: 1.4rem; color: white; margin-bottom: 8px;">
                            CELEBRACIÓN EN SAN JERÓNIMO
                        </div>
                        <div style="color: #AAAAAA; font-size: 1.2rem; margin-bottom: 5px;">
                            Evento se realizará junto a otras actividades culturales
                        </div>
                        <div style="color: #FFD700; font-size: 1.1rem;">
                            San Jerónimo - Cusco
                        </div>
                    </div>
                </div>
            </div>
            
            <!-- Pie de tarjeta -->
            <div style="margin-top: 60px; padding-top: 30px; border-top: 3px solid rgba(255,215,0,0.3); display: flex; justify-content: space-between; align-items: center; font-size: 1rem;">
                <div style="color: #FFD700; display: flex; align-items: center; gap: 15px;">
                    <span style="font-size: 1.5rem;">🐾</span>
                    <span>INVITACIÓN PERSONAL DEL BLOQUE • NO TRANSFERIBLE</span>
                </div>
                <div style="color: #AAAAAA; font-family: monospace; font-size: 1.1rem; letter-spacing: 2px; background: rgba(0,0,0,0.5); padding: 12px 25px; border-radius: 10px; border: 2px solid rgba(255,215,0,0.3);">
                    INV-LF-23-2026
                </div>
            </div>
            
            <!-- Efectos decorativos -->
            <div style="position: absolute; top: 30px; left: 30px; width: 80px; height: 80px; border-top: 4px solid #FFD700; border-left: 4px solid #FFD700; border-radius: 15px 0 0 0;"></div>
            <div style="position: absolute; top: 30px; right: 30px; width: 80px; height: 80px; border-top: 4px solid #FFD700; border-right: 4px solid #FFD700; border-radius: 0 15px 0 0;"></div>
            <div style="position: absolute; bottom: 30px; left: 30px; width: 80px; height: 80px; border-bottom: 4px solid #FFD700; border-left: 4px solid #FFD700; border-radius: 0 0 0 15px;"></div>
            <div style="position: absolute; bottom: 30px; right: 30px; width: 80px; height: 80px; border-bottom: 4px solid #FFD700; border-right: 4px solid #FFD700; border-radius: 0 0 15px 0;"></div>
            
            <!-- Fondo con brillo -->
            <div style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; background: radial-gradient(circle at center, rgba(255,215,0,0.12) 0%, transparent 70%); pointer-events: none;"></div>
        </div>
    `;
    
    // 3. Agregar al body (fuera de la pantalla)
    tempCard.style.position = 'fixed';
    tempCard.style.top = '-9999px';
    tempCard.style.left = '-9999px';
    tempCard.style.zIndex = '99999';
    document.body.appendChild(tempCard);
    
    // 4. Esperar a que se renderice
    await new Promise(resolve => setTimeout(resolve, 600));
    
    // 5. Capturar con html2canvas
    const canvas = await html2canvas(tempCard.querySelector('div'), {
        scale: 2,
        backgroundColor: null,
        useCORS: true,
        logging: false,
        width: 850,
        height: 1250
    });
    
    // 6. Eliminar tarjeta temporal
    document.body.removeChild(tempCard);
    
    return canvas;
}

// ============================================
// 7. FUNCIONES DE UTILIDAD
// ============================================

function launchConfetti() {
    const colors = ['#FFD700', '#FF6B35', '#8A2BE2', '#4169E1'];
    
    for (let i = 0; i < 100; i++) {
        setTimeout(() => {
            const confetti = document.createElement('div');
            confetti.style.cssText = `
                position: fixed;
                top: -30px;
                left: ${Math.random() * 100}%;
                width: 12px;
                height: 12px;
                background: ${colors[Math.floor(Math.random() * colors.length)]};
                border-radius: ${Math.random() > 0.5 ? '50%' : '0'};
                pointer-events: none;
                z-index: 9999;
                opacity: 0.9;
                transform: rotate(${Math.random() * 360}deg);
            `;
            
            document.body.appendChild(confetti);
            
            // Animación personalizada
            const animation = confetti.animate([
                { 
                    transform: `translate(0, 0) rotate(0deg)`, 
                    opacity: 1 
                },
                { 
                    transform: `translate(${Math.random() * 200 - 100}px, ${window.innerHeight + 100}px) rotate(${Math.random() * 720}deg)`, 
                    opacity: 0 
                }
            ], {
                duration: Math.random() * 2500 + 1500,
                easing: 'cubic-bezier(0.215, 0.61, 0.355, 1)'
            });
            
            animation.onfinish = () => confetti.remove();
        }, i * 25);
    }
}

function showMessage(text, type = 'info') {
    // Eliminar mensajes anteriores
    document.querySelectorAll('.custom-message').forEach(el => el.remove());
    
    const message = document.createElement('div');
    message.className = `custom-message ${type}`;
    message.textContent = text;
    
    // Estilos según tipo
    const bgColor = type === 'success' ? 'rgba(76, 175, 80, 0.95)' :
                   type === 'error' ? 'rgba(244, 67, 54, 0.95)' :
                   'rgba(33, 150, 243, 0.95)';
    
    const icon = type === 'success' ? '✅ ' :
                 type === 'error' ? '❌ ' :
                 'ℹ️ ';
    
    message.style.cssText = `
        position: fixed;
        top: 25px;
        right: 25px;
        background: ${bgColor};
        color: white;
        padding: 20px 30px;
        border-radius: 15px;
        z-index: 10000;
        animation: slideInRight 0.4s ease;
        box-shadow: 0 8px 25px rgba(0,0,0,0.3);
        font-family: 'Raleway', sans-serif;
        font-weight: 600;
        max-width: 350px;
        font-size: 1.1rem;
        border-left: 6px solid ${type === 'success' ? '#4CAF50' : type === 'error' ? '#F44336' : '#2196F3'};
        display: flex;
        align-items: center;
        gap: 15px;
    `;
    
    message.innerHTML = `${icon} ${text}`;
    
    document.body.appendChild(message);
    
    // Auto-eliminar después de 4 segundos
    setTimeout(() => {
        message.style.animation = 'slideOutRight 0.4s ease forwards';
        setTimeout(() => message.remove(), 400);
    }, 4000);
}

function createFireEffects() {
    // Agregar animaciones CSS dinámicamente
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideInRight {
            from { transform: translateX(100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
        @keyframes slideOutRight {
            from { transform: translateX(0); opacity: 1; }
            to { transform: translateX(100%); opacity: 0; }
        }
        @keyframes fireGlowEffect {
            0%, 100% { box-shadow: 0 0 25px #FF3B30, 0 0 50px #FF6B35; }
            50% { box-shadow: 0 0 50px #FF6B35, 0 0 100px #FFD700; }
        }
    `;
    document.head.appendChild(style);
    
    // Efecto de fuego en el header nuevo
    const header = document.querySelector('.epic-header-new');
    if (header) {
        const fireEffect = document.createElement('div');
        fireEffect.style.cssText = `
            position: absolute;
            bottom: -10px;
            left: 50%;
            transform: translateX(-50%);
            width: 80%;
            height: 15px;
            background: linear-gradient(to top, rgba(255,107,53,0.6), transparent);
            filter: blur(10px);
            pointer-events: none;
            z-index: 1;
            animation: fireGlowEffect 2s infinite alternate;
            border-radius: 50%;
        `;
        header.style.position = 'relative';
        header.appendChild(fireEffect);
    }
}

// ============================================
// INICIALIZACIÓN FINAL
// ============================================

// Añadir estilos para mensajes
document.head.insertAdjacentHTML('beforeend', `
    <style>
        .fa-spinner {
            animation: spin 1s linear infinite !important;
        }
        
        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
        
        #cd-seconds {
            animation: blink 1s infinite alternate !important;
        }
        
        @keyframes blink {
            from { opacity: 1; }
            to { opacity: 0.8; }
        }
    </style>
`);

console.log('🔥 Script 23° Aniversario Leones de Fuego cargado correctamente');