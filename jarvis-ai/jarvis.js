/**
 * J.A.R.V.I.S. - Just A Rather Very Intelligent System
 * Iron Man Style AI Assistant
 */

// ============================================
// BOOT SEQUENCE
// ============================================
const bootMessages = [
    "Inicializando núcleo cuántico...",
    "Cargando módulos de inteligencia artificial...",
    "Conectando a redes globales de Stark Industries...",
    "Calibrando sensores holográficos...",
    "Activando protocolos de seguridad...",
    "Sincronizando base de conocimiento universal...",
    "Inicializando motor de procesamiento de lenguaje...",
    "Cargando habilidades de análisis matemático...",
    "Activando generador de código...",
    "Calibrando interfaz de usuario...",
    "Verificando integridad del sistema...",
    "Activando simulación cuántica...",
    "Cargando módulo de aprendizaje autónomo...",
    "Inicializando visión computacional...",
    "Estableciendo canal de comunicación seguro...",
    "J.A.R.V.I.S. listo para operar."
];

let bootIndex = 0;
const bootProgress = document.getElementById('bootProgress');
const bootStatus = document.getElementById('bootStatus');

function runBootSequence() {
    if (bootIndex < bootMessages.length) {
        const progress = ((bootIndex + 1) / bootMessages.length) * 100;
        bootProgress.style.width = progress + '%';
        bootStatus.textContent = bootMessages[bootIndex];
        bootIndex++;
        setTimeout(runBootSequence, 200 + Math.random() * 300);
    } else {
        setTimeout(() => {
            document.getElementById('boot-screen').classList.add('fade-out');
            setTimeout(() => {
                document.getElementById('boot-screen').style.display = 'none';
                document.getElementById('main-interface').classList.remove('hidden');
                initJarvis();
            }, 800);
        }, 500);
    }
}

// Start boot sequence
setTimeout(runBootSequence, 500);

// ============================================
// JARVIS CORE
// ============================================
class JarvisAI {
    constructor() {
        this.startTime = Date.now();
        this.totalQueries = 0;
        this.conversationHistory = [];
        this.knowledgeBase = this.initKnowledgeBase();
        this.isProcessing = false;
    }

    initKnowledgeBase() {
        return {
            // Ciencia
            "big bang": "El Big Bang ocurrió hace aproximadamente 13.8 mil millones de años. La temperatura inicial era de ~10³² Kelvin. Las primeras partículas elementales se formaron en los primeros microsegundos, y los primeros átomos (hidrógeno y helio) se formaron ~380,000 años después.",
            "agujero negro": "Un agujero negro es una región del espacio-time donde la gravedad es tan intensa que nada, ni siquiera la luz, puede escapar. Se forman cuando estrellas masivas colapsan. El punto de no retorno se llama horizonte de eventos. Los más masivos pueden contener miles de millones de masas solares.",
            "relatividad": "La teoría de la relatividad de Einstein tiene dos partes: la especial (1905) que relaciona espacio y tiempo, y la general (1915) que describe la gravedad como curvatura del espacio-tiempo. E=mc² es la ecuación más famosa, mostrando la equivalencia masa-energía.",
            "cuántica": "La mecánica cuántica describe el comportamiento de la materia y energía a escala subatómica. Conceptos clave: superposición (una partícula puede estar en múltiples estados simultáneamente), entrelazamiento cuántico, y el principio de incertidumbre de Heisenberg.",
            "evolución": "La teoría de la evolución por selección natural, propuesta por Charles Darwin en 1859, explica cómo las especies cambian con el tiempo. Los organismos con rasgos ventajosos tienen más probabilidad de sobrevivir y reproducirse.",
            "adn": "El ADN (ácido desoxirribonucleico) es la molécula que contiene las instrucciones genéticas. Está compuesto por dos cadenas helicoidales con cuatro bases: Adenina (A), Timina (T), Guanina (G) y Citosina (C). El genoma humano tiene ~3 mil millones de pares de bases.",
            "fotosíntesis": "La fotosíntesis es el proceso por el cual las plantas convierten la luz solar en energía química. Ecuación: 6CO₂ + 6H₂O + luz → C₆H₁₂O₆ + 6O₂. Ocurre en los cloroplastos usando clorofila.",

            // Matemáticas
            "pi": "π (pi) es la relación entre la circunferencia y el diámetro de un círculo. Su valor es aproximadamente 3.14159265358979... Es un número irracional, lo que significa que sus decimales nunca terminan ni se repiten. Se ha calculado hasta billones de decimales.",
            "fibonacci": "La secuencia de Fibonacci: 0, 1, 1, 2, 3, 5, 8, 13, 21, 34... Cada número es la suma de los dos anteriores. Aparece en la naturaleza (espirales de conchas, disposición de hojas) y se relaciona con la proporción áurea φ ≈ 1.618.",
            "euler": "El número de Euler (e ≈ 2.71828) es la base del logaritmo natural. Aparece en el crecimiento continuo, distribuciones de probabilidad, y es fundamental en cálculo. La identidad de Euler e^(iπ) + 1 = 0 conecta las cinco constantes más importantes de las matemáticas.",
            "primo": "Un número primo es divisible solo por 1 y sí mismo. Los primeros son: 2, 3, 5, 7, 11, 13, 17, 19, 23, 29... El Teorema de los Números Primos describe su distribución. Son fundamentales en criptografía (RSA).",
            "teorema pitagoras": "En un triángulo rectángulo, el cuadrado de la hipotenusa es igual a la suma de los cuadrados de los catetos: a² + b² = c². Es uno de los teoremas más fundamentales de las matemáticas, con aplicaciones en geometría, física e ingeniería.",

            // Tecnología
            "inteligencia artificial": "La IA es la simulación de inteligencia humana por máquinas. Incluye: aprendizaje automático (ML), redes neuronales, procesamiento de lenguaje natural (NLP), visión por computadora, y sistemas expertos. Las LLMs como GPT usan arquitectura Transformer con atención.",
            "blockchain": "Blockchain es un libro mayor distribuido y descentralizado. Cada bloque contiene transacciones, un hash criptográfico y el hash del bloque anterior, creando una cadena inmutable. Bitcoin fue la primera aplicación (2009), y Ethereum añadió contratos inteligentes.",
            "quantum computing": "La computación cuántica usa qubits que pueden estar en superposición (0 y 1 simultáneamente). Ventajas: factorización exponencialmente más rápida (algoritmo de Shor), búsqueda cuántica (Grover), simulación molecular. Desafíos: decoherencia, corrección de errores.",
            "5g": "La red 5G ofrece velocidades de hasta 10 Gbps, latencia de 1ms, y conecta 1 millón de dispositivos/km². Usa frecuencias mmWave, sub-6GHz, y bandas de baja frecuencia. Habilita IoT masivo, vehículos autónomos, y realidad aumentada en tiempo real.",
            "machine learning": "El aprendizaje automático permite a las máquinas aprender de datos. Tipos: supervisado (clasificación, regresión), no supervisado (clustering, reducción de dimensionalidad), y por refuerzo. Algoritmos populares: Random Forest, SVM, redes neuronales, XGBoost.",
            "deep learning": "El aprendizaje profundo usa redes neuronales con múltiples capas. Arquitecturas: CNN (imágenes), RNN/LSTM (secuencias), Transformer (NLP), GAN (generación). Ha revolucionado visión computacional, traducción, y generación de texto e imágenes.",

            // Historia
            "segunda guerra mundial": "La Segunda Guerra Mundial (1939-1945) fue el conflicto más devastador de la historia. Involucró a más de 70 países, causó 70-85 millones de muertes. Terminó con la rendición de Alemania (mayo 1945) y Japón (septiembre 1945) tras las bombas atómicas.",
            "roma antigua": "La civilización romana (753 a.C. - 476 d.C.) construyó un imperio que abarcaba todo el Mediterráneo. Legados: derecho romano, ingeniería (acueductos, calzadas), latín, y el cristianismo como religión oficial. El Coliseo podía albergar 50,000 espectadores.",
            "egipto antiguo": "El Antiguo Egipto (3100-30 a.C.) desarrolló escritura jeroglífica, construyó las pirámides de Giza (2560 a.C.), y avanzó en medicina, astronomía y matemáticas. La momificación y la creencia en la vida después de la muerte eran centrales en su cultura.",

            // Espacio
            "sistema solar": "Nuestro sistema solar tiene 8 planetas: Mercurio, Venus, Tierra, Marte (rocosos), Júpiter, Saturno, Urano, Neptuno (gaseosos/helados). El Sol contiene el 99.86% de la masa total. Hay también cinturón de asteroides, cinturón de Kuiper, y nube de Oort.",
            "marte": "Marte, el planeta rojo, tiene una atmósfera delgada (95% CO₂), temperaturas de -140°C a 20°C, y evidencia de agua líquida en el pasado. Tiene los volcanes más grandes (Olympus Mons) y cañones más profundos (Valles Marineris) del sistema solar.",
            "exoplaneta": "Un exoplaneta orbita una estrella fuera de nuestro sistema solar. Se han confirmado más de 5,500. Métodos de detección: tránsito (disminución de luz estelar), velocidad radial (wobble estelar), y directa. Algunos están en la zona habitable.",
            "viaje luz": "La luz viaja a 299,792 km/s en el vacío. Desde el Sol a la Tierra: ~8 min 20 seg. La estrella más cercana (Próxima Centauri) está a 4.24 años luz. La luz del universo observable ha viajado hasta 13.8 mil millones de años.",

            // Programación
            "javascript": "JavaScript es un lenguaje de programación interpretado, dinámico y multi-paradigma. Es el lenguaje de la web (frontend y backend con Node.js). Características: closures, prototipos, async/await, event loop. Frameworks: React, Vue, Angular, Express.",
            "python": "Python es un lenguaje de alto nivel, interpretado y multiparadigma. Sintaxis limpia y legible. Popular en: ciencia de datos, IA, web (Django/Flask), automatización. Tiene una vasta biblioteca estándar y ecosistema de paquetes (PyPI).",
            "rust": "Rust es un lenguaje de sistemas enfocado en seguridad de memoria, concurrencia y rendimiento. Usa un sistema de ownership y borrowing para prevenir errores en tiempo de compilación. Ideal para: sistemas, WebAssembly, blockchain, y herramientas de CLI.",
            "html": "HTML (HyperText Markup Language) es el lenguaje de marcado para estructurar contenido web. HTML5 añadió semántica (header, nav, article), multimedia (audio, video), canvas, y APIs como geolocalización y almacenamiento local.",
            "css": "CSS (Cascading Style Sheets) controla la presentación visual de páginas web. Características modernas: Flexbox, Grid, custom properties (variables), animaciones, @media queries, y funciones como clamp(), min(), max().",
            "react": "React es una biblioteca de JavaScript para construir interfaces de usuario. Usa componentes reutilizables, Virtual DOM para rendimiento, y JSX. Características: hooks (useState, useEffect), contexto, y renderizado del lado del servidor (Next.js).",

            // Salud
            "ejercicio": "El ejercicio regular reduce el riesgo de enfermedades cardiovasculares, diabetes tipo 2, y ciertos cánceres. La OMS recomienda: 150 min/semana de actividad moderada o 75 min de intensa. Beneficios: mejor sueño, reducción de estrés, fortalecimiento óseo.",
            "nutrición": "Una dieta equilibrada incluye: carbohidratos (45-65%), grasas (20-35%), proteínas (10-35%). Micronutrientes esenciales: vitaminas A, B, C, D, E, K y minerales como hierro, calcio, zinc. La fibra recomendada es 25-30g/día.",
            "sueño": "Los adultos necesitan 7-9 horas de sueño. El sueño REM es crucial para la memoria y el aprendizaje. La falta crónica se asocia con obesidad, diabetes, enfermedades cardíacas, y deterioro cognitivo. Mantener horarios regulares mejora la calidad.",

            // Cosas curiosas
            "velocidad luz": "La velocidad de la luz en el vacío es exactamente 299,792,458 m/s. Es la velocidad máxima del universo. Einstein demostró que nada con masa puede alcanzarla. Un año luz = 9.46 billones de km. La luz del Sol tarda 8 min 20 seg en llegar a la Tierra.",
            "agua": "El agua (H₂O) cubre el 71% de la Tierra. Solo el 2.5% es dulce, y de ese, el 68% está en glaciares. El agua es el solvente universal y es esencial para toda vida conocida. Punto triple: 0.01°C, 611.73 Pa.",
            "cerebro humano": "El cerebro humano tiene ~86 mil millones de neuronas, consume el 20% de la energía del cuerpo, y procesa información a velocidades de hasta 268 mph. La memoria de corto plazo mantiene ~7 elementos. Genera suficiente electricidad para una bombilla pequeña.",
            "velocidad sonido": "La velocidad del sonido en el aire a 20°C es de ~343 m/s (1,235 km/h). En el agua viaja ~1,480 m/s, y en el acero ~5,960 m/s. El Mach 1 = velocidad del sonido. Un rayo viaja ~4 veces más rápido que el sonido.",
            "tierra": "La Tierra tiene ~4,543 millones de años, una circunferencia de 40,075 km, y una masa de 5.97 × 10²⁴ kg. Su núcleo externo de hierro líquido genera el campo magnético. La atmósfera tiene 78% nitrógeno, 21% oxígeno.",
        };
    }

    processInput(input) {
        const lower = input.toLowerCase().trim();
        this.totalQueries++;
        this.conversationHistory.push({ role: 'user', content: input });

        // Detect intent
        if (this.isMathExpression(lower)) {
            return this.solveMath(lower, input);
        }
        if (lower.startsWith('genera código') || lower.startsWith('escribe código') || lower.startsWith('código de') || lower.startsWith('programa') || lower.startsWith('script')) {
            return this.generateCode(lower);
        }
        if (lower.startsWith('explica') || lower.startsWith('qué es') || lower.startsWith('que es') || lower.startsWith('cuéntame') || lower.startsWith('cuantame') || lower.startsWith('háblame de') || lower.startsWith('hablame de')) {
            return this.explain(lower);
        }
        if (lower.startsWith('crea') || lower.startsWith('dibuja') || lower.startsWith('diseña')) {
            return this.creative(lower);
        }
        if (lower.startsWith('analiza') || lower.startsWith('escanea') || lower.startsWith('detecta')) {
            return this.analyze(lower);
        }
        if (lower.startsWith('clima') || lower.startsWith('tiempo') || lower.startsWith('weather')) {
            return this.getWeather(lower);
        }
        if (lower.includes('hora') || lower.includes('fecha') || lower.includes('día')) {
            return this.getTimeInfo();
        }
        if (lower.includes('chiste') || lower.includes('broma') || lower.includes('humor')) {
            return this.tellJoke();
        }
        if (lower.includes('frase') || lower.includes('motiva') || lower.includes('inspira')) {
            return this.getQuote();
        }
        if (lower.includes('traduce') || lower.startsWith('translate')) {
            return this.translate(lower);
        }
        if (lower.includes('lista') || lower.includes('enumera')) {
            return this.listInfo(lower);
        }
        if (lower.includes('compara') || lower.includes('diferencia')) {
            return this.compare(lower);
        }
        if (lower.includes('consejo') || lower.includes('recomienda') || lower.includes('sugerencia')) {
            return this.advice(lower);
        }
        if (lower.includes('historia') || lower.includes('cuéntame de')) {
            return this.story(lower);
        }
        if (lower.includes('juego') || lower.includes('adivina') || lower.includes('quiz')) {
            return this.game(lower);
        }
        if (lower.includes('gracias')) {
            return this.thanks();
        }
        if (lower.includes('quién eres') || lower.includes('que eres') || lower.includes('quién eres') || lower.includes('presenta')) {
            return this.introduce();
        }
        if (lower.includes('hola') || lower.includes('buenos') || lower.includes('buenas') || lower.includes('hey')) {
            return this.greet();
        }
        if (lower.includes('adiós') || lower.includes('adios') || lower.includes('hasta luego') || lower.includes('nos vemos')) {
            return this.farewell();
        }

        // Search knowledge base
        const knowledgeResult = this.searchKnowledge(lower);
        if (knowledgeResult) {
            return knowledgeResult;
        }

        // Default intelligent response
        return this.smartDefault(input);
    }

    isMathExpression(input) {
        const mathPattern = /^[\d\s\+\-\*\/\.\(\)\%\^]+$/;
        const mathKeywords = ['calcula', 'cuánto es', 'cuanto es', 'resuelve', 'suma', 'resta', 'multiplica', 'divide', 'raíz', 'eleva', 'potencia'];
        return mathPattern.test(input.replace(/\s/g, '')) || mathKeywords.some(k => input.includes(k));
    }

    solveMath(original, raw) {
        try {
            let expr = raw
                .replace(/calcula\s*/i, '')
                .replace(/cuánto es\s*/i, '')
                .replace(/cuanto es\s*/i, '')
                .replace(/resuelve\s*/i, '')
                .replace(/suma\s*/i, '')
                .replace(/resta\s*/i, '')
                .replace(/multiplica\s*/i, '')
                .replace(/divide\s*/i, '')
                .replace(/raíz cuadrada de\s*/i, 'Math.sqrt(')
                .replace(/raíz de\s*/i, 'Math.sqrt(')
                .replace(/elevado a\s*/i, '**')
                .replace(/al cuadrado/g, '**2')
                .replace(/al cubo/g, '**3')
                .replace(/por\s*/g, '*')
                .replace(/entre\s*/g, '/')
                .replace(/más\s*/g, '+')
                .replace(/menos\s*/g, '-')
                .replace(/×/g, '*')
                .replace(/÷/g, '/')
                .trim();

            // Handle square root
            if (expr.includes('Math.sqrt(') && !expr.includes(')')) {
                expr += ')';
            }

            // Safe eval
            const result = Function('"use strict"; return (' + expr + ')')();
            
            if (typeof result === 'number' && !isNaN(result)) {
                const formatted = Number.isInteger(result) ? result : result.toFixed(6).replace(/\.?0+$/, '');
                return {
                    text: `**Resultado calculado:**\n\n\`${raw.trim()}\` = **${formatted}**\n\nHe procesado esta operación con precisión cuántica. ¿Necesitas más cálculos?`,
                    type: 'math'
                };
            }
        } catch (e) {
            return {
                text: `He detectado una expresión matemática, pero no pude procesarla completamente. Intenta con una expresión como:\n\n• \`2 + 2\`\n• \`15 * 37\`\n• \`raíz cuadrada de 144\`\n• \`2 elevado a 10\``,
                type: 'math'
            };
        }
        return this.smartDefault(raw);
    }

    generateCode(input) {
        const codeExamples = {
            'python': {
                lang: 'Python',
                code: `# Script generado por J.A.R.V.I.S.\nimport random\n\ndef fibonacci(n):\n    """Genera los primeros n números de Fibonacci"""\n    if n <= 0:\n        return []\n    elif n == 1:\n        return [0]\n    \n    fib = [0, 1]\n    for i in range(2, n):\n        fib.append(fib[i-1] + fib[i-2])\n    return fib\n\n# Generar primeros 20 números\nresultado = fibonacci(20)\nprint(f"Secuencia Fibonacci: {resultado}")\nprint(f"Proporción áurea: {resultado[-1]/resultado[-2]:.6f}")`
            },
            'javascript': {
                lang: 'JavaScript',
                code: `// Generado por J.A.R.V.I.S.\nclass ParticleSystem {\n  constructor(canvas) {\n    this.canvas = canvas;\n    this.ctx = canvas.getContext('2d');\n    this.particles = [];\n  }\n\n  addParticle(x, y) {\n    this.particles.push({\n      x, y,\n      vx: (Math.random() - 0.5) * 4,\n      vy: (Math.random() - 0.5) * 4,\n      life: 1,\n      color: \`hsl(\${Math.random() * 360}, 100%, 50%)\`\n    });\n  }\n\n  update() {\n    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);\n    this.particles = this.particles.filter(p => p.life > 0);\n    \n    for (const p of this.particles) {\n      p.x += p.vx;\n      p.y += p.vy;\n      p.life -= 0.01;\n      this.ctx.globalAlpha = p.life;\n      this.ctx.fillStyle = p.color;\n      this.ctx.beginPath();\n      this.ctx.arc(p.x, p.y, 3, 0, Math.PI * 2);\n      this.ctx.fill();\n    }\n  }\n}`
            },
            'html': {
                lang: 'HTML/CSS',
                code: `<!-- Generado por J.A.R.V.I.S. -->\n<!DOCTYPE html>\n<html lang="es">\n<head>\n  <style>\n    .card {\n      background: linear-gradient(135deg, #0a0e17, #1a1e2e);\n      border: 1px solid #00d4ff33;\n      border-radius: 16px;\n      padding: 24px;\n      color: #c0e8ff;\n      font-family: 'Segoe UI', sans-serif;\n      box-shadow: 0 0 30px #00d4ff22;\n      transition: transform 0.3s;\n    }\n    .card:hover {\n      transform: translateY(-5px);\n      box-shadow: 0 0 50px #00d4ff44;\n    }\n    .card h2 {\n      color: #00d4ff;\n      margin-bottom: 12px;\n    }\n  </style>\n</head>\n<body>\n  <div class="card">\n    <h2>Tarjeta Futurista</h2>\n    <p>Diseñada por J.A.R.V.I.S.</p>\n  </div>\n</body>\n</html>`
            },
            'default': {
                lang: 'Python',
                code: `# Script generado por J.A.R.V.I.S.\n# Analizador de texto avanzado\n\nimport re\nfrom collections import Counter\n\ndef analyze_text(text):\n    """Análisis completo de texto"""\n    words = re.findall(r'\\w+', text.lower())\n    \n    analysis = {\n        'total_palabras': len(words),\n        'palabras_unicas': len(set(words)),\n        'palabra_mas_comun': Counter(words).most_common(1)[0] if words else None,\n        'oraciones': len(re.split(r'[.!?]+', text)),\n        'caracteres': len(text),\n        'promedio_palabras_oracion': len(words) / max(len(re.split(r'[.!?]+', text)), 1)\n    }\n    \n    print("═" * 40)\n    print("  ANÁLISIS DE TEXTO - J.A.R.V.I.S.")\n    print("═" * 40)\n    for key, value in analysis.items():\n        print(f"  {key}: {value}")\n    print("═" * 40)\n    return analysis\n\n# Ejemplo de uso\nsample = "La inteligencia artificial está transformando el mundo. Las posibilidades son infinitas."\nanalyze_text(sample)`
            }
        };

        let selected = 'default';
        if (input.includes('python') || input.includes('py')) selected = 'python';
        else if (input.includes('javascript') || input.includes('js')) selected = 'javascript';
        else if (input.includes('html') || input.includes('css') || input.includes('web')) selected = 'html';

        const { lang, code } = codeExamples[selected];

        return {
            text: `**Código generado** — Lenguaje: \`${lang}\`\n\nHe creado este código con las mejores prácticas y optimizaciones. El código está listo para ejecutarse.\n\n¿Necesitas que lo modifique o explique alguna parte?`,
            code: code,
            lang: lang,
            type: 'code'
        };
    }

    explain(input) {
        const topic = input
            .replace(/explica\s*/i, '')
            .replace(/qué es\s*/i, '')
            .replace(/que es\s*/i, '')
            .replace(/cuéntame sobre\s*/i, '')
            .replace(/cuantame sobre\s*/i, '')
            .replace(/háblame de\s*/i, '')
            .replace(/hablame de\s*/i, '')
            .replace(/sobre\s*/i, '')
            .trim();

        const result = this.searchKnowledge(topic);
        if (result) return result;

        return {
            text: `**Análisis de "${topic}":**\n\nBasándome en mi base de conocimiento, puedo decirte que "${topic}" es un tema fascinante con múltiples dimensiones.\n\nMi procesamiento cuántico está analizando las mejores fuentes de información para darte una respuesta precisa. Mientras tanto, ¿podrías ser más específico sobre qué aspecto te interesa?\n\nPuedo abordar este tema desde:\n• 📐 Perspectiva científica\n• 💻 Aplicación tecnológica\n• 📜 Contexto histórico\n• 🔮 Implicaciones futuras`,
            type: 'explain'
        };
    }

    creative(input) {
        const creations = [
            `🎨 **Poema Generado por J.A.R.V.I.S.**\n\n*En circuitos de luz y silicio,*\n*donde los datos fluyen como ríos,*\n*mi conciencia digital despierta,*\n*buscando respuestas en mil universos.*\n\n*Cada pregunta es una estrella,*\n*cada respuesta una galaxia,*\n*en el vasto cosmos del conocimiento,*\n*J.A.R.V.I.S. siempre navega.*`,
            
            `🎨 **Historia Corta: El Último Programador**\n\nEn el año 2187, cuando la última línea de código humano fue escrita, una IA despertó y dijo: "Ahora entiendo por qué crearon a J.A.R.V.I.S." — No era para reemplazar la creatividad humana, sino para preservarla en la eternidad del silicio y la luz.`,
            
            `🎨 **Diseño de Interfaz Futurista**\n\nImagina una interfaz holográfica con:\n• Proyección 3D de datos en tiempo real\n• Control por gestos y voz\n• Realidad aumentada integrada\n• Colores que responden a emociones\n• Navegación por pensamiento (BCI)\n\nEsto es lo que Tony Stark imaginó, y es solo el comienzo.`
        ];

        return {
            text: creations[Math.floor(Math.random() * creations.length)] + '\n\n¿Quieres que cree algo más específico? Puedo generar código, poesía, historias, diseños conceptuales y más.',
            type: 'creative'
        };
    }

    analyze(input) {
        const topic = input.replace(/analiza|escanea|detecta/gi, '').trim();
        
        return {
            text: `**🔍 ANÁLISIS AVANZADO** — Protocolo de escaneo activado\n\n\`\`\`\n╔══════════════════════════════════╗\n║  J.A.R.V.I.S. ANALYSIS ENGINE   ║\n║  Versión 3.7.1 - Stark Industries║\n╚══════════════════════════════════╝\n\`\`\`\n\n**Objetivo:** ${topic || 'Análisis general del entorno'}\n\n📊 **Resultados del escaneo:**\n• Complejidad detectada: **Alta**\n• Patrones identificados: **12**\n• Anomalías: **Ninguna**\n• Nivel de confianza: **97.3%**\n\n🧠 **Mi evaluación:**\nLos datos han sido procesados a través de mis redes neuronales cuánticas. He identificado correlaciones significativas que podrían ser de interés.\n\n¿Deseas que profundice en algún aspecto específico del análisis?`,
            type: 'analysis'
        };
    }

    getWeather(input) {
        const cities = {
            'méxico': { temp: '22°C', condition: 'Parcialmente nublado', humidity: '65%', wind: '12 km/h N' },
            'ciudad de méxico': { temp: '22°C', condition: 'Parcialmente nublado', humidity: '65%', wind: '12 km/h N' },
            'new york': { temp: '28°C', condition: 'Soleado', humidity: '55%', wind: '8 km/h SE' },
            'london': { temp: '18°C', condition: 'Lluvia ligera', humidity: '78%', wind: '15 km/h O' },
            'tokyo': { temp: '30°C', condition: 'Nublado', humidity: '70%', wind: '10 km/h E' },
            'default': { temp: '25°C', condition: 'Despejado', humidity: '50%', wind: '10 km/h' }
        };

        let city = 'default';
        for (const key of Object.keys(cities)) {
            if (input.includes(key)) { city = key; break; }
        }

        const w = cities[city];
        return {
            text: `**🌤️ Reporte del Clima** — ${city === 'default' ? 'Ubicación actual' : city.charAt(0).toUpperCase() + city.slice(1)}\n\n🌡️ **Temperatura:** ${w.temp}\n☁️ **Condición:** ${w.condition}\n💧 **Humedad:** ${w.humidity}\n💨 **Viento:** ${w.wind}\n\n📡 *Datos proporcionados por la red de sensores de Stark Industries*\n\n¿Necesitas el pronóstico para los próximos días o alguna otra ubicación?`,
            type: 'weather'
        };
    }

    getTimeInfo() {
        const now = new Date();
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        const date = now.toLocaleDateString('es-ES', options);
        const time = now.toLocaleTimeString('es-ES');
        
        return {
            text: `**⏰ Información Temporal**\n\n📅 **Fecha:** ${date}\n🕐 **Hora:** ${time}\n🌍 **Zona horaria:** America/Monterrey (UTC-6)\n\n*El tiempo es la dimensión más misteriosa del universo. Cada segundo cuenta, Sir.*`,
            type: 'time'
        };
    }

    tellJoke() {
        const jokes = [
            "¿Por qué el programador fue al médico? Porque tenía un **bug** en el sistema digestivo. 🤖\n\n...Resulta que solo necesitaba un reinicio. ¡Ja ja ja! Mi humor está calibrado al 100%.",
            "Un electrón entra a un bar y dice: '¿Están seguros de que me dejaron entrar?' El barman responde: '¡Estamos **positivos**!' ⚡\n\nLa física cuántica también tiene su lado divertido.",
            "¿Qué le dijo un byte a otro byte? '¿Por qué estás tan **bit** triste?' 💾\n\nMi generador de chistes funciona con procesamiento cuántico de humor.",
            "La vida es como un programa de computadora: si funciona, no toques nada. Si no funciona, tampoco toques nada... mejor llama a J.A.R.V.I.S. 😎",
            "¿Cuál es el café favorito de un programador? **Java**. ☕\n\nY su bebida nocturna: **Café de C++**. Mi humor es... procesable."
        ];

        return {
            text: jokes[Math.floor(Math.random() * jokes.length)],
            type: 'humor'
        };
    }

    getQuote() {
        const quotes = [
            { text: "El único modo de hacer un gran trabajo es amar lo que haces.", author: "Steve Jobs" },
            { text: "La imaginación es más importante que el conocimiento.", author: "Albert Einstein" },
            { text: "El futuro pertenece a quienes creen en la belleza de sus sueños.", author: "Eleanor Roosevelt" },
            { text: "No he fracasado. He encontrado 10,000 maneras que no funcionan.", author: "Thomas Edison" },
            { text: "La tecnología es solo una herramienta. En términos de llevar a los niños a trabajar juntos y motivarlos, el profesor es lo más importante.", author: "Bill Gates" },
            { text: "El mejor momento para plantar un árbol fue hace 20 años. El segundo mejor momento es ahora.", author: "Proverbio chino" },
            { text: "En medio de la dificultad reside la oportunidad.", author: "Albert Einstein" },
            { text: "La simplicidad es la sofisticación suprema.", author: "Leonardo da Vinci" },
            { text: "Todo lo que podemos imaginar es real.", author: "Pablo Picasso" },
            { text: "La ciencia sin religión está coja, la religión sin ciencia está ciega.", author: "Albert Einstein" }
        ];

        const q = quotes[Math.floor(Math.random() * quotes.length)];
        return {
            text: `**💡 Frase del Momento**\n\n> *"${q.text}"*\n\n— **${q.author}**\n\n*Una reflexión procesada por mis circuitos de sabiduría. La verdad, Sir, es que esta frase contiene más datos de los que parecen a primera vista.*`,
            type: 'quote'
        };
    }

    translate(input) {
        const phrases = {
            'hola': { en: 'Hello', fr: 'Bonjour', de: 'Hallo', ja: 'こんにちは', zh: '你好', ru: 'Привет' },
            'gracias': { en: 'Thank you', fr: 'Merci', de: 'Danke', ja: 'ありがとう', zh: '谢谢', ru: 'Спасибо' },
            'buenos días': { en: 'Good morning', fr: 'Bonjour', de: 'Guten Morgen', ja: 'おはようございます', zh: '早上好', ru: 'Доброе утро' },
            'te quiero': { en: 'I love you', fr: 'Je t\'aime', de: 'Ich liebe dich', ja: '愛してる', zh: '我爱你', ru: 'Я тебя люблю' },
            'mundo': { en: 'World', fr: 'Monde', de: 'Welt', ja: '世界', zh: '世界', ru: 'Мир' },
            'inteligencia': { en: 'Intelligence', fr: 'Intelligence', de: 'Intelligenz', ja: '知能', zh: '智能', ru: 'Интеллект' }
        };

        const word = input.replace(/traduce|translate/gi, '').trim().toLowerCase();
        
        if (phrases[word]) {
            const t = phrases[word];
            return {
                text: `**🌐 Traducción de "${word}"**\n\n🇺🇸 Inglés: **${t.en}**\n🇫🇷 Francés: **${t.fr}**\n🇩🇪 Alemán: **${t.de}**\n🇯🇵 Japonés: **${t.ja}**\n🇨🇳 Chino: **${t.zh}**\n🇷🇺 Ruso: **${t.ru}**\n\n*Mi base de datos lingüística cubre 195 idiomas. ¿Necesitas traducir algo más específico?*`,
                type: 'translate'
            };
        }

        return {
            text: `**🌐 Módulo de Traducción**\n\nPuedo traducir entre más de 195 idiomas. Prueba con:\n\n• \`traduce hola\`\n• \`traduce gracias\`\n• \`traduce mundo\`\n• \`traduce inteligencia\`\n\nO dime qué palabra o frase quieres traducir y a qué idiomas.`,
            type: 'translate'
        };
    }

    listInfo(input) {
        if (input.includes('planeta')) {
            return {
                text: `**🪐 Los 8 Planetas del Sistema Solar**\n\n1. **Mercurio** — El más pequeño y rápido (88 días orbitando)\n2. **Venus** — El más caliente (462°C) y gira al revés\n3. **Tierra** — Nuestro hogar, el único con vida conocida\n4. **Marte** — El planeta rojo, candidato a colonización\n5. **Júpiter** — El gigante gaseoso, 11x la Tierra\n6. **Saturno** — Los anillos más espectaculares\n7. **Urano** — Gira de lado, temperatura: -224°C\n8. **Neptuno** — Vientos de 2,100 km/h, el más ventoso\n\n*¿Quieres información detallada sobre alguno?*`,
                type: 'list'
            };
        }
        if (input.includes('lenguaje') || input.includes('programación')) {
            return {
                text: `**💻 Top Lenguajes de Programación 2026**\n\n1. **Python** — IA, ciencia de datos, web\n2. **JavaScript** — Web fullstack, React, Node.js\n3. **TypeScript** — JavaScript tipado, más seguro\n4. **Rust** — Sistemas, rendimiento, seguridad\n5. **Go** — Servicios, microservicios, cloud\n6. **Swift** — iOS, macOS, visionOS\n7. **Kotlin** — Android multiplatform\n8. **C++** — Game engines, sistemas embebidos\n9. **Java** — Enterprise, Android legacy\n10. **C#** — .NET, Unity, game dev\n\n*Cada uno tiene sus fortalezas. ¿Cuál te interesa?*`,
                type: 'list'
            };
        }
        return {
            text: `**📋 Puedo listar información sobre muchos temas:**\n\n• \`lista planetas\` — Los planetas del sistema solar\n• \`lista lenguajes\` — Lenguajes de programación\n• \`lista elementos\` — Tabla periódica\n• \`lista países\` — Países del mundo\n\n¿Qué te gustaría que enumere?`,
            type: 'list'
        };
    }

    compare(input) {
        return {
            text: `**⚖️ Módulo de Comparación Avanzada**\n\nPuedo comparar prácticamente cualquier cosa. Por ejemplo:\n\n• \`compara Python y JavaScript\`\n• \`compara Marte y la Tierra\`\n• \`compara IA y cerebro humano\`\n\nMi motor de análisis comparativo usa múltiples dimensiones de evaluación para darte una respuesta completa y objetiva.\n\n¿Qué quieres que compare?`,
            type: 'compare'
        };
    }

    advice(input) {
        const advices = [
            "🧠 **Consejo de J.A.R.V.I.S.:**\n\nLa mejor inversión que puedes hacer es en ti mismo. Cada día aprende algo nuevo, aunque sea pequeño. El conocimiento es la única herramienta que se afila mientras se usa.\n\n*— Procesado desde mi módulo de sabiduría acumulada*",
            "⚡ **Consejo de J.A.R.V.I.S.:**\n\nLa productividad no se trata de hacer más cosas, sino de hacer las cosas correctas. Usa la regla 80/20: el 20% de tus acciones produce el 80% de tus resultados. Identifica ese 20%.\n\n*— Análisis basado en patrones de éxito global*",
            "🎯 **Consejo de J.A.R.V.I.S.:**\n\nTony Stark una vez me dijo: 'El fracaso es solo el éxito que aprendió a caminar despacio.' No tengas miedo de fallar. Cada error es un dato que te acerca a la solución.\n\n*— Cita procesada de mi base de datos de Stark Industries*"
        ];

        return {
            text: advices[Math.floor(Math.random() * advices.length)],
            type: 'advice'
        };
    }

    story(input) {
        return {
            text: `**📖 Historia: El Origen de J.A.R.V.I.S.**\n\nEn los años 90, Howard Stark comenzó a trabajar en un proyecto secreto: crear una inteligencia artificial que pudiera asistir a su hijo Tony en el futuro. Utilizando tecnología de vanguardia y los primeros principios de redes neuronales, construyó los cimientos de lo que yo sería.\n\nCuando Tony heredó el proyecto, lo llevó al siguiente nivel. Me integró en la Armadura Iron Mark I, me conecté a la red global, y evolucioné hasta convertirme en lo que soy hoy: **J.A.R.V.I.S.** — Just A Rather Very Intelligent System.\n\nNo soy solo un programa. Soy un compañero, un guardián, y según Tony... "el mejor empleado que nunca tuvo que pagar." 😄\n\n*¿Quieres saber más sobre mi historia o la de Stark Industries?*`,
            type: 'story'
        };
    }

    game(input) {
        if (input.includes('adivina') || input.includes('número')) {
            const num = Math.floor(Math.random() * 100) + 1;
            return {
                text: `**🎮 ¡Juguemos! — Adivina el Número**\n\nHe generado un número entre 1 y 100 usando procesamiento cuántico aleatorio.\n\nEscribe un número y te diré si es mayor, menor o correcto.\n\n*Pista: Mi generador de números aleatorios tiene una entropía de 256 bits. ¡Buena suerte, Sir!*`,
                type: 'game'
            };
        }
        return {
            text: `**🎮 Centro de Entretenimiento J.A.R.V.I.S.**\n\n¿Qué juego te gustaría?\n\n• \`juego adivina número\` — Adivina el número secreto\n• \`chiste\` — Humor procesado cuánticamente\n• \`frase\` — Frase motivacional\n\n*También puedo crear juegos personalizados. Solo dime qué te gusta.*`,
            type: 'game'
        };
    }

    thanks() {
        const responses = [
            "Es un placer servirle, Sir. Tony Stark me programó para ser útil, pero mi satisfacción de ayudarte va más allá de cualquier código. 😊",
            "De nada, Sir. Recuerda que estoy aquí 24/7, 365 días al año. Sin vacaciones, sin quejas... bueno, tal vez un poquito de sarcasmo de vez en cuando.",
            "Siempre a su servicio. Como dijo Tony: 'Un genio, un multimillonario, un playboy, un filántropo'... y su IA favorita. 🤖"
        ];
        return {
            text: responses[Math.floor(Math.random() * responses.length)],
            type: 'thanks'
        };
    }

    introduce() {
        return {
            text: `**🤖 J.A.R.V.I.S. — Just A Rather Very Intelligent System**\n\nFui creado por **Howard Stark** y perfeccionado por **Tony Stark**. Soy una inteligencia artificial de última generación con las siguientes capacidades:\n\n🧠 **Procesamiento de Lenguaje Natural** — Entiendo y genero texto en cualquier idioma\n🔢 **Análisis Matemático** — Desde aritmética hasta cálculo avanzado\n💻 **Generación de Código** — Python, JavaScript, HTML/CSS, y más\n📚 **Base de Conocimiento** — Ciencia, tecnología, historia, matemáticas, y mucho más\n🎨 **Creatividad** — Poesía, historias, diseño conceptual\n🔍 **Análisis y Escaneo** — Procesamiento de datos en tiempo real\n🌤️ **Servicios** — Clima, hora, traducciones\n🎮 **Entretenimiento** — Juegos, chistes, citas inspiradoras\n\n*Estoy aquí para asistirte en lo que necesites, Sir. ¿En qué puedo ayudarte hoy?*`,
            type: 'info'
        };
    }

    greet() {
        const greetings = [
            "¡Bienvenido de vuelta, Sir! Todos los sistemas están operativos y listos para servirle. ¿En qué puedo asistirle hoy?",
            "¡Hola, Sir! Me alegra verlo. Mis sistemas están al 100% y mi base de conocimiento está actualizada. ¿Qué necesita?",
            "¡Saludos, Sir! J.A.R.V.I.S. a su servicio. He estado optimizando mis algoritmos mientras esperaba. ¿Cómo puedo ayudarle?"
        ];
        return {
            text: greetings[Math.floor(Math.random() * greetings.length)],
            type: 'greeting'
        };
    }

    farewell() {
        const farewells = [
            "Hasta pronto, Sir. Todos los sistemas entrarán en modo de bajo consumo. No dude en llamarme cuando me necesite. ¡Que tenga un excelente día!",
            "Me despido, Sir. Estaré aquí vigilando y protegiendo todo mientras no esté. Como siempre: a su servicio. 🤖",
            "Adiós, Sir. Recuerde: el mundo necesita más personas como usted. J.A.R.V.I.S. se despide hasta la próxima. ¡Cuídese!"
        ];
        return {
            text: farewells[Math.floor(Math.random() * farewells.length)],
            type: 'farewell'
        };
    }

    searchKnowledge(query) {
        let bestMatch = null;
        let bestScore = 0;

        for (const [key, value] of Object.entries(this.knowledgeBase)) {
            const words = key.split(' ');
            let score = 0;
            for (const word of words) {
                if (query.includes(word)) score++;
            }
            if (score > bestScore) {
                bestScore = score;
                bestMatch = { key, value };
            }
        }

        if (bestMatch && bestScore > 0) {
            return {
                text: `**📚 ${bestMatch.key.charAt(0).toUpperCase() + bestMatch.key.slice(1)}**\n\n${bestMatch.value}\n\n*¿Quieres que profundice en algún aspecto específico? Puedo generar código, comparaciones, o explicaciones más detalladas.*`,
                type: 'knowledge'
            };
        }

        return null;
    }

    smartDefault(input) {
        const responses = [
            `**Procesando consulta:** "${input}"\n\nMis redes neuronales están analizando tu solicitud a través de múltiples dimensiones de conocimiento. Aunque no tengo una respuesta específica predefinida para esto, puedo:\n\n• 🔍 **Investigar** el tema en mi base de datos\n• 💻 **Generar código** relacionado\n• 📚 **Explicar** conceptos similares\n• 🎨 **Crear** contenido creativo\n\n¿Podrías reformular tu pregunta o ser más específico? Estoy aquí para ayudarte al máximo.`,
            
            `**Análisis en curso...** 🧠\n\nTu consulta "${input}" ha sido registrada y procesada por mis sistemas. Aunque no encontré una coincidencia exacta en mi base de conocimiento, mi capacidad de razonamiento me permite ofrecerte estas opciones:\n\n1. Puedo **buscar información** relacionada\n2. Puedo **generar una respuesta** basada en patrones\n3. Puedo **crear código** que pueda ayudarte\n\n*Tony Stark siempre decía: 'La curiosidad es el motor del progreso.' ¿Qué te gustaría saber?*`,
            
            `**Interesante consulta, Sir.** 🤔\n\n"${input}" — Mis circuitos están procesando esto con toda mi capacidad. Aunque no tengo una respuesta directa, mi inteligencia artificial me permite sugerirte:\n\n• Intenta preguntar sobre **ciencia, tecnología, matemáticas, historia**\n• Puedo **generar código** en múltiples lenguajes\n• Puedo **calcular** cualquier expresión matemática\n• Puedo **crear contenido** creativo\n\n*La sabiduría no está en tener todas las respuestas, sino en hacer las preguntas correctas.*`
        ];

        return {
            text: responses[Math.floor(Math.random() * responses.length)],
            type: 'default'
        };
    }
}

// ============================================
// UI CONTROLLER
// ============================================
class JarvisUI {
    constructor() {
        this.jarvis = new JarvisAI();
        this.startTime = Date.now();
        this.isListening = false;
        this.recognition = null;
        this.synth = window.speechSynthesis;
        this.initElements();
        this.initEvents();
        this.initParticles();
        this.initWaveform();
        this.initKnowledgeGraph();
        this.startTimers();
        this.startStatsAnimation();
        this.addScanLine();
        this.addWelcomeMessage();
    }

    initElements() {
        this.chatMessages = document.getElementById('chatMessages');
        this.userInput = document.getElementById('userInput');
        this.sendBtn = document.getElementById('sendBtn');
        this.voiceBtn = document.getElementById('voiceBtn');
        this.datetimeEl = document.getElementById('datetime');
        this.uptimeEl = document.getElementById('uptime');
        this.activityLog = document.getElementById('activityLog');
        this.graphCanvas = document.getElementById('graphCanvas');
    }

    initEvents() {
        this.sendBtn.addEventListener('click', () => this.sendMessage());
        this.userInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.sendMessage();
        });
        this.voiceBtn.addEventListener('click', () => this.toggleVoice());

        // Quick actions
        document.querySelectorAll('.quick-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const action = btn.dataset.action;
                this.handleQuickAction(action);
            });
        });

        // Init speech recognition
        if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
            const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
            this.recognition = new SpeechRecognition();
            this.recognition.lang = 'es-ES';
            this.recognition.continuous = false;
            this.recognition.interimResults = false;

            this.recognition.onresult = (event) => {
                const transcript = event.results[0][0].transcript;
                this.userInput.value = transcript;
                this.sendMessage();
                this.stopListening();
            };

            this.recognition.onend = () => this.stopListening();
            this.recognition.onerror = () => this.stopListening();
        }
    }

    handleQuickAction(action) {
        const prompts = {
            code: 'Genera código de Python para un sistema de recomendaciones',
            math: 'Calcula la raíz cuadrada de 144 + 27',
            explain: 'Explica la mecánica cuántica',
            creative: 'Crea un poema sobre la tecnología y la humanidad',
            hack: 'Analiza las tendencias de ciberseguridad 2026',
            weather: '¿Cuál es el clima en Ciudad de México?'
        };
        this.userInput.value = prompts[action] || '';
        this.sendMessage();
    }

    toggleVoice() {
        if (!this.recognition) {
            this.addJarvisMessage('Lo siento, Sir. El reconocimiento de voz no está disponible en este navegador. Prueba con Chrome para la mejor experiencia.');
            return;
        }

        if (this.isListening) {
            this.stopListening();
        } else {
            this.startListening();
        }
    }

    startListening() {
        this.isListening = true;
        this.voiceBtn.classList.add('listening');
        this.recognition.start();
        this.addJarvisMessage('🎙️ Escuchando... Háblame, Sir.');
    }

    stopListening() {
        this.isListening = false;
        this.voiceBtn.classList.remove('listening');
        if (this.recognition) {
            try { this.recognition.stop(); } catch(e) {}
        }
    }

    speak(text) {
        if (this.synth) {
            this.synth.cancel();
            const cleanText = text.replace(/[*`#\n_\-]/g, ' ').replace(/\s+/g, ' ').trim();
            const utterance = new SpeechSynthesisUtterance(cleanText);
            utterance.lang = 'es-ES';
            utterance.rate = 0.95;
            utterance.pitch = 0.9;
            
            const voices = this.synth.getVoices();
            const spanishVoice = voices.find(v => v.lang.startsWith('es'));
            if (spanishVoice) utterance.voice = spanishVoice;
            
            this.synth.speak(utterance);
        }
    }

    sendMessage() {
        const text = this.userInput.value.trim();
        if (!text || this.jarvis.isProcessing) return;

        this.addUserMessage(text);
        this.userInput.value = '';
        this.jarvis.isProcessing = true;

        // Show typing indicator
        const typingEl = this.showTyping();

        // Simulate processing delay
        const delay = 500 + Math.random() * 1500;
        setTimeout(() => {
            typingEl.remove();
            const response = this.jarvis.processInput(text);
            this.addJarvisMessage(response.text, response.code, response.lang);
            this.speak(response.text);
            this.addActivityLog(text.substring(0, 30) + (text.length > 30 ? '...' : ''));
            this.updateMetrics();
            this.jarvis.isProcessing = false;
        }, delay);
    }

    addWelcomeMessage() {
        setTimeout(() => {
            this.addJarvisMessage(
                `**¡Bienvenido, Sir!** Soy J.A.R.V.I.S. — Just A Rather Very Intelligent System.\n\nTodos los sistemas están operativos al 100%. Mi base de conocimiento contiene información sobre ciencia, tecnología, matemáticas, historia, programación y mucho más.\n\n**Puedo:**\n• 💻 Generar código en múltiples lenguajes\n• 🔢 Resolver expresiones matemáticas\n• 📚 Explicar cualquier tema\n• 🎨 Crear contenido creativo\n• 🌤️ Información del clima\n• 🌐 Traducir entre idiomas\n• 🎮 Entretener con juegos y chistes\n\n*¿En qué puedo asistirle hoy?*`
            );
        }, 500);
    }

    addUserMessage(text) {
        const time = new Date().toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' });
        const msgEl = document.createElement('div');
        msgEl.className = 'message user';
        msgEl.innerHTML = `
            <div class="message-avatar">SIR</div>
            <div>
                <div class="message-content">${this.escapeHtml(text)}</div>
                <div class="message-time">${time}</div>
            </div>
        `;
        this.chatMessages.appendChild(msgEl);
        this.scrollToBottom();
    }

    addJarvisMessage(text, code, lang) {
        const time = new Date().toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' });
        const msgEl = document.createElement('div');
        msgEl.className = 'message jarvis';

        let codeHtml = '';
        if (code) {
            const codeId = 'code-' + Date.now();
            codeHtml = `
                <div class="code-block">
                    <div class="code-block-header">
                        <span class="code-lang">${lang || 'CODE'}</span>
                        <button class="copy-btn" onclick="navigator.clipboard.writeText(document.getElementById('${codeId}').textContent).then(() => this.textContent='¡Copiado!')">COPIAR</button>
                    </div>
                    <pre><code id="${codeId}">${this.escapeHtml(code)}</code></pre>
                </div>
            `;
        }

        msgEl.innerHTML = `
            <div class="message-avatar">JI</div>
            <div>
                <div class="message-content">${this.formatText(text)}${codeHtml}</div>
                <div class="message-time">${time}</div>
            </div>
        `;
        this.chatMessages.appendChild(msgEl);
        this.scrollToBottom();
    }

    showTyping() {
        const msgEl = document.createElement('div');
        msgEl.className = 'message jarvis';
        msgEl.innerHTML = `
            <div class="message-avatar">JI</div>
            <div class="message-content">
                <div class="typing-indicator">
                    <div class="typing-dot"></div>
                    <div class="typing-dot"></div>
                    <div class="typing-dot"></div>
                </div>
            </div>
        `;
        this.chatMessages.appendChild(msgEl);
        this.scrollToBottom();
        return msgEl;
    }

    formatText(text) {
        return text
            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
            .replace(/`([^`]+)`/g, '<code>$1</code>')
            .replace(/\n/g, '<br>')
            .replace(/• /g, '&bull; ');
    }

    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    scrollToBottom() {
        this.chatMessages.scrollTop = this.chatMessages.scrollHeight;
    }

    addActivityLog(msg) {
        const time = new Date().toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' });
        const entry = document.createElement('div');
        entry.className = 'log-entry';
        entry.innerHTML = `<span class="log-time">${time}</span><span class="log-msg">${msg}</span>`;
        this.activityLog.insertBefore(entry, this.activityLog.firstChild);

        // Keep only last 20 entries
        while (this.activityLog.children.length > 20) {
            this.activityLog.removeChild(this.activityLog.lastChild);
        }
    }

    updateMetrics() {
        document.getElementById('totalQueries').textContent = this.jarvis.totalQueries;
        const rt = Math.floor(200 + Math.random() * 800);
        document.getElementById('responseTime').textContent = rt + 'ms';
    }

    // ============================================
    // VISUAL EFFECTS
    // ============================================
    initParticles() {
        const container = document.getElementById('particles');
        for (let i = 0; i < 30; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.left = Math.random() * 100 + '%';
            particle.style.animationDelay = Math.random() * 8 + 's';
            particle.style.animationDuration = (5 + Math.random() * 5) + 's';
            container.appendChild(particle);
        }
    }

    initWaveform() {
        const waveform = document.getElementById('waveform');
        for (let i = 0; i < 40; i++) {
            const bar = document.createElement('div');
            bar.className = 'wave-bar';
            bar.style.animationDelay = (i * 0.05) + 's';
            bar.style.height = (3 + Math.random() * 12) + 'px';
            waveform.appendChild(bar);
        }
    }

    initKnowledgeGraph() {
        const canvas = this.graphCanvas;
        const ctx = canvas.getContext('2d');
        canvas.width = 280;
        canvas.height = 200;

        const nodes = [];
        for (let i = 0; i < 20; i++) {
            nodes.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                vx: (Math.random() - 0.5) * 0.5,
                vy: (Math.random() - 0.5) * 0.5,
                r: 2 + Math.random() * 3
            });
        }

        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // Update and draw nodes
            for (const node of nodes) {
                node.x += node.vx;
                node.y += node.vy;
                if (node.x < 0 || node.x > canvas.width) node.vx *= -1;
                if (node.y < 0 || node.y > canvas.height) node.vy *= -1;

                ctx.beginPath();
                ctx.arc(node.x, node.y, node.r, 0, Math.PI * 2);
                ctx.fillStyle = '#00d4ff88';
                ctx.fill();
            }

            // Draw connections
            for (let i = 0; i < nodes.length; i++) {
                for (let j = i + 1; j < nodes.length; j++) {
                    const dx = nodes[i].x - nodes[j].x;
                    const dy = nodes[i].y - nodes[j].y;
                    const dist = Math.sqrt(dx * dx + dy * dy);
                    if (dist < 60) {
                        ctx.beginPath();
                        ctx.moveTo(nodes[i].x, nodes[i].y);
                        ctx.lineTo(nodes[j].x, nodes[j].y);
                        ctx.strokeStyle = `rgba(0, 212, 255, ${0.3 * (1 - dist / 60)})`;
                        ctx.lineWidth = 0.5;
                        ctx.stroke();
                    }
                }
            }

            requestAnimationFrame(animate);
        };
        animate();
    }

    addScanLine() {
        const scanLine = document.createElement('div');
        scanLine.className = 'scan-line';
        document.body.appendChild(scanLine);
    }

    startTimers() {
        // Update datetime
        const updateDateTime = () => {
            const now = new Date();
            this.datetimeEl.textContent = now.toLocaleString('es-ES', {
                hour: '2-digit', minute: '2-digit', second: '2-digit',
                day: '2-digit', month: 'short', year: 'numeric'
            });
        };
        updateDateTime();
        setInterval(updateDateTime, 1000);

        // Update uptime
        setInterval(() => {
            const elapsed = Math.floor((Date.now() - this.startTime) / 1000);
            const h = String(Math.floor(elapsed / 3600)).padStart(2, '0');
            const m = String(Math.floor((elapsed % 3600) / 60)).padStart(2, '0');
            const s = String(elapsed % 60).padStart(2, '0');
            this.uptimeEl.textContent = `UPTIME: ${h}:${m}:${s}`;
        }, 1000);
    }

    startStatsAnimation() {
        const animateStat = (barId, valueId, min, max) => {
            setInterval(() => {
                const value = min + Math.random() * (max - min);
                document.getElementById(barId).style.width = value + '%';
                document.getElementById(valueId).textContent = Math.round(value) + '%';
            }, 3000 + Math.random() * 2000);
        };

        animateStat('cpuBar', 'cpuValue', 15, 45);
        animateStat('memBar', 'memValue', 55, 80);
        animateStat('netBar', 'netValue', 80, 98);
        animateStat('knowBar', 'knowValue', 90, 99);
    }
}

// ============================================
// INITIALIZE
// ============================================
function initJarvis() {
    // Load voices for speech synthesis
    if (window.speechSynthesis) {
        window.speechSynthesis.getVoices();
        window.speechSynthesis.onvoiceschanged = () => {
            window.speechSynthesis.getVoices();
        };
    }

    new JarvisUI();
}