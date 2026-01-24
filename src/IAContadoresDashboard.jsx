

import React, { useState, useEffect } from 'react';

const storage = {
  async get(key) {
    const v = localStorage.getItem(key);
    return v ? { value: v } : null;
  },
  async set(key, value) {
    localStorage.setItem(key, value);
  },
  async delete(key) {
    localStorage.removeItem(key);
  }
};


const IAContadoresDashboard = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const [showLogin, setShowLogin] = useState(true);
  const [showAdmin, setShowAdmin] = useState(false);
  const [activeSection, setActiveSection] = useState('dashboard');
  const [progress, setProgress] = useState({ resources: [], projects: [] });
  const [allUsers, setAllUsers] = useState([]);
  const [loginForm, setLoginForm] = useState({ name: '', email: '', role: 'contador' });
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState({ show: false, message: '' });
  const [activeFilter, setActiveFilter] = useState('all');

  const DEMO_ADMIN_PASSWORD = 'demo';
  const LINKEDIN_URL = 'https://www.linkedin.com/in/delia-green-mbs-a442b734/';

  // ============ ALL RESOURCES DATA - LINKS ACTUALIZADOS ============
  const peruResources = [
    { id: 'pe1', type: 'govt', title: 'Talento Digital - PCM + Microsoft', desc: 'Cursos de IA sin registro, acceso inmediato. IA básica, desarrollo con IA, productividad.', url: 'https://www.gob.pe/talentodigital', duration: 'Varios', badge: 'free' },
    { id: 'pe2', type: 'govt', title: 'CAPACÍTA-T - Ministerio de Trabajo', desc: '94+ cursos gratuitos. IA, habilidades digitales, emprendimiento. Certificación MTPE.', url: 'https://mtpe.trabajo.gob.pe/capacitacionlaboral/', duration: '94 cursos', badge: 'free' },
    { id: 'pe3', type: 'govt', title: 'PerúEduca - MINEDU', desc: 'MentorIA Perú, Ciudadanía Digital (60h), Pensamiento Computacional. Constancia oficial.', url: 'https://campus.perueduca.pe/', duration: '60-80h', badge: 'free' },
    { id: 'pe4', type: 'govt', title: 'PRODUCE - Aula Virtual para MYPES', desc: 'IA para negocios: videos publicitarios con IA, logística inteligente. Para empresarios.', url: 'https://aulavirtual.produce.gob.pe/', duration: 'Varios', badge: 'free' },
    { id: 'pe5', type: 'course', title: 'UNI - Programa PIT (78 cursos)', desc: 'Machine Learning, Ciencia de Datos + IA, Excel + IA, IA para Gestión Pública. Cert. S/40.', url: 'https://matricula.pit-virtual.uni.edu.pe/', duration: '78 cursos', badge: 'essential' },
    { id: 'pe6', type: 'course', title: 'Platzi - Intro IA (con módulo Finanzas)', desc: 'Incluye "Análisis Financiero con IA". 15 clases, certificado. 4.8/5 estrellas.', url: 'https://platzi.com/cursos/introduccion-ai/', duration: '4 horas', badge: 'essential' },
    { id: 'pe7', type: 'course', title: 'Coursera - IA Para Todos (Andrew Ng)', desc: 'DeepLearning.AI en español. Estrategia IA para directivos. Modo audit gratuito.', url: 'https://www.coursera.org/learn/ai-for-everyone-es', duration: '6 horas', badge: 'free' },
    { id: 'pe8', type: 'course', title: 'Google Cloud - IA Generativa (Español)', desc: 'Introducción a LLMs, IA Responsable. Insignias digitales verificables gratuitas.', url: 'https://www.cloudskillsboost.google/paths/118?locale=es', duration: '31 horas', badge: 'free' },
    { id: 'pe9', type: 'course', title: 'Microsoft Learn - Centro de IA', desc: 'Azure AI Fundamentals, Copilot, desarrollo con IA. Preparación certificación AI-900.', url: 'https://learn.microsoft.com/es-es/ai/', duration: 'Varios', badge: 'free' },
    { id: 'pe10', type: 'course', title: 'IBM SkillsBuild - IA en Español', desc: 'Plan desde introducción hasta ML avanzado. Credencial digital Credly incluida.', url: 'https://skillsbuild.org/es/adult-learners/explore-learning/artificial-intelligence', duration: '10 semanas', badge: 'free' },
    { id: 'pe11', type: 'course', title: 'BID - IA Generativa para Función Pública', desc: 'Para Latinoamérica. Fundamentos, riesgos, uso responsable, herramientas prácticas.', url: 'https://cursos.iadb.org/es/temas/desarrollo-instituciones/inteligencia-artificial-generativa-funcion-publica', duration: 'Autoguiado', badge: 'free' },
    { id: 'pe12', type: 'course', title: 'AWS re/Start Perú - 14 semanas', desc: 'Con Manantial Tecnológico. Cloud + IA + certificación + conexión con empleadores.', url: 'https://aws.amazon.com/training/restart/', duration: '14 semanas', badge: 'essential' },
    { id: 'pe13', type: 'course', title: 'Oracle ONE - 12 meses formación', desc: 'Data Science con IA, Lógica con Prompts. Red de empresas para egresados.', url: 'https://www.oracle.com/latam/education/oracle-next-education/', duration: '12 meses', badge: 'free' },
    { id: 'pe14', type: 'course', title: 'Santander + Google - IA y Productividad', desc: 'Curso con Gemini. Certificado gratuito incluido. 100% en español.', url: 'https://www.santanderopenacademy.com/', duration: 'Varios', badge: 'free' },
    { id: 'pe15', type: 'course', title: 'DeepLearning.AI - Cursos Cortos Gratuitos', desc: 'Prompt Engineering, ChatGPT para desarrolladores. Contenido de Andrew Ng.', url: 'https://www.deeplearning.ai/short-courses/', duration: '1-2h c/u', badge: 'free' },
    { id: 'pe16', type: 'course', title: 'Tec de Monterrey - 30 cursos gratis', desc: 'Incluye IA para Negocios en edX. Alta calidad académica latinoamericana.', url: 'https://conecta.tec.mx/es/noticias/nacional/educacion/cursos-gratis-en-linea-del-tec', duration: '30 cursos', badge: 'free' },
    { id: 'pe17', type: 'course', title: 'UNAM - Especialización IA (8 cursos)', desc: 'Programa completo de la Universidad Nacional Autónoma de México. Audit disponible.', url: 'https://www.coursera.org/specializations/inteligencia-artificial', duration: '8 cursos', badge: 'free' },
    { id: 'pe18', type: 'govt', title: 'Colegio de Contadores de Lima', desc: 'Capacitaciones tributarias y contables. Webinars gratuitos para colegiados.', url: 'https://www.ccpl.org.pe', duration: 'Webinars', badge: 'recommended' },
    { id: 'pe19', type: 'course', title: 'Coursera - IA: Interacciones y Prompts', desc: 'Universidad de Palermo. Curso práctico sobre ChatGPT y prompt engineering.', url: 'https://www.coursera.org/learn/inteligencia-artificial-interacciones-y-prompts', duration: '4 horas', badge: 'free' },
    { id: 'pe20', type: 'course', title: 'Google Activate - Cursos IA', desc: 'Fundamentos de IA, Marketing Digital con IA. Certificaciones Google gratuitas.', url: 'https://grow.google/intl/es/courses-and-tools/', duration: 'Varios', badge: 'free' },
  ];

  const fundamentosResources = [
    { id: 'f1', type: 'video', title: '¿Qué es la Inteligencia Artificial? - DotCSV', desc: 'Canal líder en español sobre IA', url: 'https://www.youtube.com/watch?v=KytW151dpqU', duration: '15 min', badge: 'essential' },
    { id: 'f2', type: 'course', title: 'IA para Todos - Andrew Ng (Español)', desc: 'Coursera - DeepLearning.AI', url: 'https://www.coursera.org/learn/ai-for-everyone-es', duration: '6 horas', badge: 'essential' },
    { id: 'f3', type: 'video', title: '¿Qué es Machine Learning? - Platzi', desc: 'Explicación clara y práctica', url: 'https://www.youtube.com/watch?v=1vkb7BCMQd0', duration: '20 min', badge: 'recommended' },
    { id: 'f4', type: 'course', title: 'Prompt Engineering - DeepLearning.AI', desc: 'Curso gratuito oficial', url: 'https://www.deeplearning.ai/short-courses/chatgpt-prompt-engineering-for-developers/', duration: '1.5 horas', badge: 'essential' },
    { id: 'f5', type: 'video', title: 'El Futuro del Trabajo con IA - TED', desc: 'Andrew McAfee - Conferencia TED', url: 'https://www.youtube.com/watch?v=cdiD-9MMpb0', duration: '14 min', badge: 'recommended' },
    { id: 'f6', type: 'article', title: 'El Estado de la IA - McKinsey', desc: 'Reporte anual de adopción empresarial', url: 'https://www.mckinsey.com/featured-insights/artificial-intelligence', duration: '45 min', badge: 'recommended' },
    { id: 'f7', type: 'course', title: 'Google AI Essentials', desc: 'Google - Fundamentos gratuitos', url: 'https://grow.google/intl/es/courses-and-tools/', duration: '5 horas', badge: 'advanced' },
    { id: 'f8', type: 'video', title: 'ChatGPT Explicado - Modelos de Lenguaje', desc: 'Explicación simplificada', url: 'https://www.youtube.com/watch?v=R9OHn5ZF4Uo', duration: '5 min', badge: 'essential' },
  ];

  const contabilidadResources = [
    { id: 'c1', type: 'video', title: 'ChatGPT para Contadores', desc: 'Aplicaciones prácticas en contabilidad', url: 'https://www.youtube.com/watch?v=LgKllNkhTIM', duration: '45 min', badge: 'essential' },
    { id: 'c2', type: 'tool', title: 'ChatGPT para Análisis Financiero', desc: 'OpenAI - Prompts especializados para contabilidad', url: 'https://chat.openai.com', duration: 'Práctica', badge: 'essential' },
    { id: 'c3', type: 'course', title: 'Power Query para Contadores - Udemy', desc: 'Transformación de datos contables automatizada', url: 'https://www.udemy.com/course/power-query-en-excel/', duration: '8 horas', badge: 'essential' },
    { id: 'c4', type: 'course', title: 'IA para Finanzas - LinkedIn Learning', desc: 'Cursos especializados', url: 'https://www.linkedin.com/learning/topics/artificial-intelligence', duration: '4 horas', badge: 'essential' },
    { id: 'c5', type: 'course', title: 'Power BI Completo - Udemy', desc: 'Dashboards financieros', url: 'https://www.udemy.com/course/power-bi-desktop/', duration: '8 horas', badge: 'recommended' },
    { id: 'c6', type: 'article', title: 'Futuro de la Profesión Contable - IFAC', desc: 'Federación Internacional de Contadores', url: 'https://www.ifac.org/knowledge-gateway/preparing-future-ready-professionals', duration: '1 hora', badge: 'recommended' },
    { id: 'c7', type: 'tool', title: 'Portal NIIF/IFRS Oficial', desc: 'Estándares internacionales de información financiera', url: 'https://www.ifrs.org/issued-standards/list-of-standards/', duration: 'Referencia', badge: 'essential' },
    { id: 'c8', type: 'tool', title: 'Macro Conciliación Bancaria Excel', desc: 'Automatización paso a paso - Excel Negocios', url: 'https://www.excelnegocios.com/conciliacion-bancaria-automatica-macro-excel/', duration: 'Descarga', badge: 'recommended' },
  ];

  const tributarioResources = [
    { id: 't1', type: 'tool', title: 'Portal SUNAT Oficial', desc: 'Superintendencia Nacional de Aduanas y Administración Tributaria', url: 'https://www.sunat.gob.pe', duration: 'Portal', badge: 'essential' },
    { id: 't2', type: 'video', title: 'Canal Oficial SUNAT YouTube', desc: 'Tutoriales y webinars oficiales', url: 'https://www.youtube.com/@SUNATOficial', duration: 'Varios', badge: 'essential' },
    { id: 't3', type: 'tool', title: 'Consulta RUC - SUNAT', desc: 'Verificación de contribuyentes en línea', url: 'https://www.gob.pe/565-consultar-el-estado-del-ruc', duration: 'Tool', badge: 'essential' },
    { id: 't4', type: 'tool', title: 'ChatGPT para Consultas Tributarias', desc: 'Prompts especializados SUNAT', url: 'https://chat.openai.com', duration: 'Práctica', badge: 'essential' },
    { id: 't5', type: 'article', title: 'Legislación Tributaria SUNAT', desc: 'Resoluciones y normativa vigente', url: 'https://www.sunat.gob.pe/legislacion/superin/index.html', duration: 'Referencia', badge: 'essential' },
    { id: 't6', type: 'tool', title: 'Tipo de Cambio SUNAT', desc: 'Consulta oficial diaria', url: 'https://www.sunat.gob.pe/cl-at-ittipcam/tcS01Alias', duration: 'Tool', badge: 'recommended' },
    { id: 't7', type: 'tool', title: 'Operaciones en Línea SOL - SUNAT', desc: 'Declaraciones, pagos y trámites virtuales', url: 'https://www.sunat.gob.pe/sol.html', duration: 'Tool', badge: 'essential' },
    { id: 't8', type: 'course', title: 'Colegio de Contadores de Lima', desc: 'Capacitaciones tributarias', url: 'https://www.ccpl.org.pe', duration: 'Cursos', badge: 'recommended' },
  ];

  // Herramientas ACTUALIZADAS (sin Perplexity, Notion, Claude, Gamma)
  const herramientas = [
    { id: 'h1', icon: '🤖', title: 'ChatGPT / GPT-4', desc: 'Análisis, redacción de informes y automatización de tareas contables.', tags: ['Análisis', 'Redacción'], url: 'https://chat.openai.com' },
    { id: 'h2', icon: '📊', title: 'Microsoft Copilot', desc: 'IA integrada en Excel, Word y PowerPoint para productividad.', tags: ['Excel', 'Office'], url: 'https://copilot.microsoft.com' },
    { id: 'h3', icon: '📈', title: 'Power BI', desc: 'Dashboards inteligentes con visualización de datos financieros.', tags: ['Dashboards', 'KPIs'], url: 'https://powerbi.microsoft.com' },
    { id: 'h4', icon: '📄', title: 'Adobe Acrobat AI', desc: 'Extracción de datos de PDFs y OCR inteligente.', tags: ['PDFs', 'OCR'], url: 'https://www.adobe.com/acrobat/online.html' },
    { id: 'h5', icon: '🐍', title: 'Python + Pandas', desc: 'Automatización y análisis de grandes volúmenes de datos.', tags: ['Automatización', 'Big Data'], url: 'https://pandas.pydata.org' },
    { id: 'h6', icon: '🔗', title: 'Zapier', desc: 'Automatización de flujos e integración de sistemas.', tags: ['Integración', 'Workflows'], url: 'https://zapier.com' },
    { id: 'h7', icon: '💬', title: 'Otter.ai', desc: 'Transcripción automática de reuniones y entrevistas.', tags: ['Transcripción', 'Reuniones'], url: 'https://otter.ai' },
    { id: 'h8', icon: '📧', title: 'Google Gemini', desc: 'Asistente de Google para análisis y redacción inteligente.', tags: ['Google', 'Workspace'], url: 'https://gemini.google.com' },
  ];

  const projects = [
    {
      id: 'A', title: '📊 Proyecto A: Sistema de Conciliación Bancaria Automatizada',
      desc: 'Crea un sistema que automatice la conciliación bancaria usando Excel + ChatGPT',
      duration: '10-12h', tools: 'Excel + IA', level: 'Intermedio', color: '#10B981',
      steps: [
        { id: 'pa1', title: 'Preparación de Datos', desc: 'Descarga el estado de cuenta bancario (PDF o CSV) y el libro mayor de bancos. Limpia los datos eliminando filas vacías y estandarizando formatos de fecha (DD/MM/YYYY). Entregable: Dos archivos Excel limpios con columnas: Fecha, Descripción, Monto, Referencia.', duration: '1.5h' },
        { id: 'pa2', title: 'Crear Prompts de Categorización', desc: 'Usa ChatGPT para crear reglas de categorización. Prompt: "Analiza estas transacciones bancarias y clasifícalas en: Ventas, Compras, Nómina, Impuestos, Gastos Operativos, Otros." Entregable: Documento con 10-15 reglas de categorización automática.', duration: '2h' },
        { id: 'pa3', title: 'Implementar Fórmulas de Matching', desc: 'En Excel, crea fórmulas BUSCARV/XLOOKUP para emparejar transacciones por monto y fecha (+/- 3 días). Usa formato condicional: Verde=Conciliado, Amarillo=Revisar, Rojo=Sin match. Entregable: Hoja "Conciliación" con fórmulas funcionando.', duration: '2.5h' },
        { id: 'pa4', title: 'Crear Dashboard de Control', desc: 'Diseña un dashboard con: Total conciliado vs pendiente, Gráfico de partidas por antigüedad, Top 10 partidas pendientes por monto, Indicador de % de conciliación. Entregable: Hoja "Dashboard" con 4 gráficos/indicadores interactivos.', duration: '2h' },
        { id: 'pa5', title: 'Automatizar con IA', desc: 'Usa ChatGPT para analizar las partidas no conciliadas. Prompt: "Estas son partidas bancarias sin match contable. Sugiere posibles causas y acciones para cada una." Entregable: Reporte con análisis IA de partidas pendientes.', duration: '1.5h' },
        { id: 'pa6', title: 'Documentación Final', desc: 'Crea un manual de usuario (1-2 páginas) explicando cómo usar el sistema: pasos para cargar nuevos datos, cómo interpretar el dashboard, proceso de revisión de excepciones. Entregable: Manual PDF + archivo Excel completo.', duration: '1.5h' },
      ]
    },
    {
      id: 'B', title: '🏛️ Proyecto B: Asistente Virtual Tributario SUNAT',
      desc: 'Desarrolla un sistema de prompts optimizados para consultas tributarias peruanas',
      duration: '12-15h', tools: 'ChatGPT', level: 'Intermedio', color: '#A855F7',
      steps: [
        { id: 'pb1', title: 'Investigar Marco Normativo', desc: 'Recopila las principales normas tributarias peruanas: Código Tributario, Ley del IGV, Ley del IR, Regímenes MYPE. Organízalas en un documento de referencia con links a SUNAT. Entregable: Documento "Marco Normativo" con 20+ normas organizadas por tema.', duration: '3h' },
        { id: 'pb2', title: 'Crear Biblioteca de Prompts Base', desc: 'Desarrolla 10 prompts especializados para: cálculo de IGV, retenciones, detracciones, Renta de 4ta categoría, Renta de 5ta, RUS, REMYPE, infracciones y multas. Entregable: Documento con 10 prompts probados y optimizados.', duration: '2.5h' },
        { id: 'pb3', title: 'Desarrollar Sistema de Contexto', desc: 'Crea un "system prompt" que defina el rol del asistente: experto en tributación peruana, siempre cita fuentes SUNAT, advierte sobre actualizaciones normativas. Entregable: System prompt de 500-800 palabras optimizado.', duration: '2h' },
        { id: 'pb4', title: 'Crear Casos de Prueba', desc: 'Desarrolla 15 casos de prueba reales: 5 fáciles (consultas básicas), 5 intermedios (cálculos), 5 complejos (situaciones con múltiples normas). Documenta la respuesta correcta para cada uno. Entregable: Banco de 15 casos con preguntas y respuestas verificadas.', duration: '3h' },
        { id: 'pb5', title: 'Validar y Optimizar', desc: 'Prueba tu sistema con los 15 casos. Mide: precisión de respuestas, calidad de citas, claridad de explicación. Ajusta prompts según resultados. Meta: 80%+ de precisión. Entregable: Reporte de validación con métricas y prompts finales.', duration: '2.5h' },
        { id: 'pb6', title: 'Crear Guía de Usuario', desc: 'Documenta cómo usar el asistente: tipos de consultas soportadas, formato de preguntas recomendado, limitaciones, disclaimers legales. Incluye 5 ejemplos de uso. Entregable: Guía PDF (3-5 páginas) + colección de prompts.', duration: '2h' },
      ]
    },
    {
      id: 'C', title: '🔍 Proyecto C: Dashboard de Auditoría con Detección de Riesgos',
      desc: 'Construye un panel en Power BI con alertas automáticas de riesgos financieros',
      duration: '15-18h', tools: 'Power BI + IA', level: 'Avanzado', color: '#EF4444',
      steps: [
        { id: 'pc1', title: 'Definir Indicadores de Riesgo', desc: 'Investiga y define 10 indicadores clave de riesgo (KRIs): variaciones inusuales >20%, transacciones fuera de horario, proveedores nuevos con montos altos, duplicados, secuencia de documentos. Entregable: Documento con 10 KRIs, fórmulas de cálculo y umbrales de alerta.', duration: '2.5h' },
        { id: 'pc2', title: 'Preparar Dataset de Prueba', desc: 'Crea o adapta un dataset con datos contables de ejemplo (puedes usar datos simulados). Incluye: 1000+ transacciones, múltiples cuentas, varios períodos, algunos casos anómalos intencionales. Entregable: Archivo Excel/CSV con dataset limpio y documentado.', duration: '3h' },
        { id: 'pc3', title: 'Construir Modelo de Datos en Power BI', desc: 'Importa datos a Power BI, crea relaciones entre tablas, desarrolla medidas DAX para cada KRI. Implementa lógica de semáforo (verde/amarillo/rojo) para cada indicador. Entregable: Modelo Power BI con 10 medidas DAX funcionando.', duration: '4h' },
        { id: 'pc4', title: 'Diseñar Visualizaciones', desc: 'Crea 3 páginas: Resumen Ejecutivo (KPIs principales), Análisis de Riesgos (detalle por área), Drill-down de Transacciones (lista filtrable). Usa iconos de alerta y colores consistentes. Entregable: Dashboard con 3 páginas interactivas y navegación.', duration: '3.5h' },
        { id: 'pc5', title: 'Integrar Análisis con IA', desc: 'Exporta las transacciones de alto riesgo y usa ChatGPT para generar análisis narrativo. Prompt: "Analiza estas transacciones marcadas como riesgo alto y genera un memo de auditoría con hallazgos y recomendaciones." Entregable: Proceso documentado de integración IA + memo ejemplo.', duration: '2.5h' },
        { id: 'pc6', title: 'Documentar y Presentar', desc: 'Crea documentación técnica del dashboard: fuentes de datos, lógica de KRIs, guía de interpretación. Prepara presentación ejecutiva de 5 slides explicando el valor del sistema. Entregable: Archivo .pbix final + documentación + presentación PPT.', duration: '2.5h' },
      ]
    }
  ];

  const totalResources = peruResources.length + fundamentosResources.length + contabilidadResources.length + tributarioResources.length;
  const totalProjectSteps = projects.reduce((sum, p) => sum + p.steps.length, 0);
  const totalItems = totalResources + totalProjectSteps;

  useEffect(() => { loadData(); }, []);

  const loadData = async () => {
    try {
      const usersResult = await storage.get('dg_users_v3', true);
      if (usersResult?.value) setAllUsers(JSON.parse(usersResult.value));
      const sessionResult = await storage.get('dg_session_v3', false);
      if (sessionResult?.value) {
        const session = JSON.parse(sessionResult.value);
        setCurrentUser(session.user);
        setProgress(session.progress || { resources: [], projects: [] });
        setShowLogin(false);
      }
    } catch (e) { console.log('Loading fresh'); }
    setLoading(false);
  };

  const handleRegister = async () => {
    if (!loginForm.name || !loginForm.email) { showToastMsg('Por favor completa todos los campos'); return; }
    const newUser = { id: Date.now().toString(), name: loginForm.name, email: loginForm.email, role: loginForm.role, registeredAt: new Date().toISOString(), lastLogin: new Date().toISOString(), visits: 1 };
    const existingUser = allUsers.find(u => u.email === loginForm.email);
    let updatedUsers, userToSet;
    if (existingUser) {
      updatedUsers = allUsers.map(u => u.email === loginForm.email ? { ...u, lastLogin: new Date().toISOString(), visits: (u.visits || 0) + 1 } : u);
      userToSet = { ...existingUser, lastLogin: new Date().toISOString(), visits: (existingUser.visits || 0) + 1 };
      try { const userProgress = await storage.get(`dg_progress_v3_${existingUser.id}`, true); if (userProgress?.value) setProgress(JSON.parse(userProgress.value)); } catch (e) {}
    } else { updatedUsers = [...allUsers, newUser]; userToSet = newUser; }
    await storage.set('dg_users_v3', JSON.stringify(updatedUsers), true);
    await storage.set('dg_session_v3', JSON.stringify({ user: userToSet, progress: existingUser ? progress : { resources: [], projects: [] } }), false);
    setAllUsers(updatedUsers); setCurrentUser(userToSet); setShowLogin(false);
    showToastMsg(`¡Bienvenido ${userToSet.name}!`);
  };

  const handleLogout = async () => { await storage.delete('dg_session_v3', false); setCurrentUser(null); setShowLogin(true); setProgress({ resources: [], projects: [] }); setShowAdmin(false); };

  const toggleResource = async (resourceId) => {
    const newProgress = { ...progress };
    const index = newProgress.resources.indexOf(resourceId);
    if (index === -1) { newProgress.resources.push(resourceId); showToastMsg('¡Progreso guardado!'); } else { newProgress.resources.splice(index, 1); }
    setProgress(newProgress);
    if (currentUser) { await storage.set(`dg_progress_v3_${currentUser.id}`, JSON.stringify(newProgress), true); await storage.set('dg_session_v3', JSON.stringify({ user: currentUser, progress: newProgress }), false); }
  };

  const toggleProjectStep = async (stepId) => {
    const newProgress = { ...progress };
    const index = newProgress.projects.indexOf(stepId);
    if (index === -1) { newProgress.projects.push(stepId); showToastMsg('¡Paso completado!'); } else { newProgress.projects.splice(index, 1); }
    setProgress(newProgress);
    if (currentUser) { await storage.set(`dg_progress_v3_${currentUser.id}`, JSON.stringify(newProgress), true); await storage.set('dg_session_v3', JSON.stringify({ user: currentUser, progress: newProgress }), false); }
  };

  const showToastMsg = (message) => { setToast({ show: true, message }); setTimeout(() => setToast({ show: false, message: '' }), 3000); };
  const calculateProgress = () => Math.round(((progress.resources.length + progress.projects.length) / totalItems) * 100);
  const getTypeIcon = (type) => ({ video: '🎬', course: '🎓', tool: '🛠️', article: '📄', govt: '🏛️' }[type] || '📖');
  const getTypeColor = (type) => ({ video: 'bg-red-600/20', course: 'bg-green-600/20', tool: 'bg-yellow-600/20', article: 'bg-purple-600/20', govt: 'bg-blue-600/20' }[type] || 'bg-slate-600/20');
  const getBadgeStyle = (badge) => ({ free: 'bg-green-600/20 text-green-400', essential: 'bg-yellow-600/20 text-yellow-400', recommended: 'bg-blue-600/20 text-blue-400', advanced: 'bg-purple-600/20 text-purple-400' }[badge] || 'bg-slate-600/20 text-slate-400');
  const getBadgeText = (badge) => ({ free: '100% Gratis', essential: '⭐ Esencial', recommended: 'Recomendado', advanced: 'Avanzado' }[badge] || badge);

  const ResourceList = ({ resources, title, filters = ['all', 'video', 'course', 'tool', 'article', 'govt'] }) => {
    const filteredResources = activeFilter === 'all' ? resources : resources.filter(r => r.type === activeFilter);
    return (
      <div className="bg-slate-800 rounded-xl overflow-hidden border border-slate-700">
        <div className="p-4 bg-slate-700/50 flex flex-wrap justify-between items-center gap-3">
          <h3 className="text-lg font-bold text-white">{title}</h3>
          <div className="flex gap-2 flex-wrap">
            {filters.filter(f => f === 'all' || resources.some(r => r.type === f)).map(filter => (
              <button key={filter} onClick={() => setActiveFilter(filter)} className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${activeFilter === filter ? 'bg-blue-600 text-white' : 'bg-slate-600 text-slate-300 hover:bg-slate-500'}`}>
                {filter === 'all' ? 'Todos' : filter === 'video' ? 'Videos' : filter === 'course' ? 'Cursos' : filter === 'tool' ? 'Tools' : filter === 'article' ? 'Artículos' : filter === 'govt' ? 'Gobierno' : filter}
              </button>
            ))}
          </div>
        </div>
        <div className="divide-y divide-slate-700">
          {filteredResources.map(resource => (
            <div key={resource.id} className="flex items-center gap-4 p-4 hover:bg-slate-700/30 transition-colors">
              <button onClick={() => toggleResource(resource.id)} className={`w-7 h-7 rounded-lg border-2 flex items-center justify-center text-sm transition-all flex-shrink-0 ${progress.resources.includes(resource.id) ? 'bg-green-500 border-green-500 text-white' : 'border-slate-500 text-transparent hover:border-slate-400'}`}>✓</button>
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-xl flex-shrink-0 ${getTypeColor(resource.type)}`}>{getTypeIcon(resource.type)}</div>
              <div className="flex-1 min-w-0">
                <a href={resource.url} target="_blank" rel="noopener noreferrer" className="text-white font-semibold hover:text-blue-400 transition-colors block truncate">{resource.title}</a>
                <p className="text-slate-400 text-sm truncate">{resource.desc}</p>
              </div>
              <span className="text-slate-500 text-sm hidden sm:block">{resource.duration}</span>
              <span className={`px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap ${getBadgeStyle(resource.badge)}`}>{getBadgeText(resource.badge)}</span>
              <a href={resource.url} target="_blank" rel="noopener noreferrer" className="w-9 h-9 bg-slate-700 rounded-lg flex items-center justify-center text-blue-400 hover:bg-blue-600 hover:text-white transition-all flex-shrink-0">↗</a>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const AdminPanel = () => {
    const [adminPass, setAdminPass] = useState('');
    const [isAuth, setIsAuth] = useState(false);
    if (!isAuth) return (
      <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
        <div className="bg-slate-800 p-8 rounded-2xl max-w-md w-full">
          <h2 className="text-2xl font-bold text-white mb-4">🔐 Panel de Administración</h2>
          <input type="password" placeholder="Contraseña" value={adminPass} onChange={(e) => setAdminPass(e.target.value)} className="w-full p-3 rounded-lg bg-slate-700 text-white mb-4" />
          <div className="flex gap-3">
            <button onClick={() => adminPass === ADMIN_PASSWORD ? setIsAuth(true) : showToastMsg('Contraseña incorrecta')} className="flex-1 bg-blue-600 text-white py-3 rounded-lg font-semibold">Entrar</button>
            <button onClick={() => setShowAdmin(false)} className="flex-1 bg-slate-600 text-white py-3 rounded-lg">Cancelar</button>
          </div>
        </div>
      </div>
    );
    return (
      <div className="fixed inset-0 bg-black/90 overflow-auto z-50">
        <div className="max-w-6xl mx-auto p-6">
          <div className="flex justify-between items-center mb-6 flex-wrap gap-4">
            <h2 className="text-2xl font-bold text-white">📊 Panel Admin - Delia Green</h2>
            <button onClick={() => setShowAdmin(false)} className="bg-red-600 text-white px-4 py-2 rounded-lg">Cerrar ✕</button>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-gradient-to-br from-blue-600 to-blue-800 p-5 rounded-xl"><div className="text-3xl font-bold text-white">{allUsers.length}</div><div className="text-blue-200 text-sm">Usuarios</div></div>
            <div className="bg-gradient-to-br from-green-600 to-green-800 p-5 rounded-xl"><div className="text-3xl font-bold text-white">{allUsers.filter(u => new Date(u.lastLogin).toDateString() === new Date().toDateString()).length}</div><div className="text-green-200 text-sm">Hoy</div></div>
            <div className="bg-gradient-to-br from-purple-600 to-purple-800 p-5 rounded-xl"><div className="text-3xl font-bold text-white">{allUsers.filter(u => u.role === 'contador').length}</div><div className="text-purple-200 text-sm">Contadores</div></div>
            <div className="bg-gradient-to-br from-orange-600 to-orange-800 p-5 rounded-xl"><div className="text-3xl font-bold text-white">{allUsers.reduce((s, u) => s + (u.visits || 1), 0)}</div><div className="text-orange-200 text-sm">Visitas Total</div></div>
          </div>
          <div className="bg-slate-800 rounded-xl overflow-hidden">
            <div className="p-4 bg-slate-700"><h3 className="text-lg font-bold text-white">👥 Usuarios Registrados</h3></div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-slate-700"><tr><th className="text-left p-3 text-slate-300">Nombre</th><th className="text-left p-3 text-slate-300">Email</th><th className="text-left p-3 text-slate-300">Rol</th><th className="text-left p-3 text-slate-300">Registro</th><th className="text-left p-3 text-slate-300">Última</th><th className="text-left p-3 text-slate-300">Visitas</th></tr></thead>
                <tbody>{allUsers.map((user, i) => (
                  <tr key={user.id} className={i % 2 === 0 ? 'bg-slate-800' : 'bg-slate-800/50'}>
                    <td className="p-3 text-white font-medium">{user.name}</td><td className="p-3 text-slate-300">{user.email}</td>
                    <td className="p-3"><span className={`px-2 py-1 rounded-full text-xs ${user.role === 'contador' ? 'bg-blue-600' : user.role === 'estudiante' ? 'bg-green-600' : 'bg-purple-600'} text-white`}>{user.role}</span></td>
                    <td className="p-3 text-slate-400">{new Date(user.registeredAt).toLocaleDateString()}</td><td className="p-3 text-slate-400">{new Date(user.lastLogin).toLocaleString()}</td><td className="p-3 text-white font-bold">{user.visits || 1}</td>
                  </tr>
                ))}</tbody>
              </table>
            </div>
            {allUsers.length === 0 && <div className="p-8 text-center text-slate-400">No hay usuarios aún</div>}
          </div>
        </div>
      </div>
    );
  };

  if (loading) return <div className="min-h-screen bg-slate-900 flex items-center justify-center"><div className="text-white text-xl">Cargando...</div></div>;

  if (showLogin) return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 flex items-center justify-center p-4">
      <div className="bg-slate-800/90 backdrop-blur p-8 rounded-3xl max-w-md w-full shadow-2xl border border-slate-700">
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-gradient-to-br from-blue-600 to-blue-800 rounded-2xl flex items-center justify-center text-3xl font-bold text-white mx-auto mb-4 shadow-lg">DG</div>
          <h1 className="text-2xl font-bold text-white mb-2">IA Para Contadores Perú</h1>
          <p className="text-slate-400">Delia Green</p>
        </div>
        <div className="space-y-4">
          <div><label className="text-slate-300 text-sm mb-1 block">Nombre completo</label><input type="text" placeholder="Tu nombre" value={loginForm.name} onChange={(e) => setLoginForm({ ...loginForm, name: e.target.value })} className="w-full p-4 rounded-xl bg-slate-700 text-white border border-slate-600 focus:border-blue-500 outline-none" /></div>
          <div><label className="text-slate-300 text-sm mb-1 block">Correo electrónico</label><input type="email" placeholder="tu@email.com" value={loginForm.email} onChange={(e) => setLoginForm({ ...loginForm, email: e.target.value })} className="w-full p-4 rounded-xl bg-slate-700 text-white border border-slate-600 focus:border-blue-500 outline-none" /></div>
          <div><label className="text-slate-300 text-sm mb-1 block">¿Cuál es tu rol?</label><select value={loginForm.role} onChange={(e) => setLoginForm({ ...loginForm, role: e.target.value })} className="w-full p-4 rounded-xl bg-slate-700 text-white border border-slate-600 outline-none"><option value="contador">👔 Contador</option><option value="estudiante">📚 Estudiante</option><option value="empresario">💼 Empresario</option><option value="otro">🌟 Otro</option></select></div>
          <button onClick={handleRegister} className="w-full bg-gradient-to-r from-blue-600 to-blue-800 text-white py-4 rounded-xl font-bold text-lg hover:from-blue-700 hover:to-blue-900 transition-all shadow-lg">Comenzar 🚀</button>
        </div>
        <p className="text-center text-slate-500 text-sm mt-6">Tu progreso se guardará automáticamente</p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-900">
      {showAdmin && <AdminPanel />}
      {toast.show && <div className="fixed bottom-6 right-6 bg-green-600 text-white px-6 py-4 rounded-xl shadow-xl z-50">🎉 {toast.message}</div>}
      
      <header className="bg-slate-800 border-b border-slate-700 p-4 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto flex justify-between items-center flex-wrap gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-blue-800 rounded-xl flex items-center justify-center text-xl font-bold text-white cursor-pointer" onClick={() => setShowAdmin(true)}>DG</div>
            <div><h1 className="text-xl font-bold text-white">IA Para Contadores Perú</h1><span className="text-slate-400 text-sm">Delia Green</span></div>
          </div>
          <div className="flex items-center gap-3">
            <div className="bg-slate-700 px-3 py-2 rounded-lg text-center"><div className="text-lg font-bold text-blue-400">{calculateProgress()}%</div><div className="text-xs text-slate-400">Progreso</div></div>
            <div className="bg-slate-700 px-3 py-2 rounded-lg text-center"><div className="text-lg font-bold text-cyan-400">{progress.resources.length + progress.projects.length}/{totalItems}</div><div className="text-xs text-slate-400">Items</div></div>
            <div className="flex items-center gap-2 bg-slate-700 px-3 py-2 rounded-lg"><span className="text-white text-sm">{currentUser?.name}</span><button onClick={handleLogout} className="text-red-400 hover:text-red-300 text-sm">Salir</button></div>
          </div>
        </div>
      </header>

      <nav className="bg-slate-800/50 border-b border-slate-700 p-2 sticky top-16 z-30 overflow-x-auto">
        <div className="max-w-7xl mx-auto flex gap-2">
          {[{id:'dashboard',icon:'📊',label:'Dashboard'},{id:'recursos-peru',icon:'🇵🇪',label:'Perú'},{id:'fundamentos',icon:'🎯',label:'Fundamentos'},{id:'contabilidad',icon:'📚',label:'Contabilidad'},{id:'tributario',icon:'🏛️',label:'Tributario'},{id:'herramientas',icon:'🛠️',label:'Herramientas'},{id:'proyectos',icon:'🏆',label:'Proyectos'}].map(s => (
            <button key={s.id} onClick={() => {setActiveSection(s.id); setActiveFilter('all');}} className={`px-4 py-2 rounded-lg whitespace-nowrap transition-all flex items-center gap-2 ${activeSection === s.id ? 'bg-blue-600 text-white' : 'text-slate-400 hover:bg-slate-700'}`}><span>{s.icon}</span><span className="hidden sm:inline">{s.label}</span></button>
          ))}
        </div>
      </nav>

      <main className="max-w-7xl mx-auto p-4 sm:p-6">
        {activeSection === 'dashboard' && (
          <div className="space-y-6">
            <div className="bg-gradient-to-r from-blue-600 via-blue-700 to-purple-600 rounded-2xl p-6 sm:p-8 text-white">
              <h2 className="text-2xl sm:text-3xl font-bold mb-2">¡Bienvenido {currentUser?.name}! 🚀</h2>
              <p className="opacity-90 mb-6">Tu camino hacia la transformación digital contable</p>
              <div className="flex items-center gap-6 sm:gap-8 flex-wrap">
                <div className="relative w-24 h-24 sm:w-28 sm:h-28">
                  <svg className="w-full h-full transform -rotate-90"><circle cx="50%" cy="50%" r="42%" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="8" /><circle cx="50%" cy="50%" r="42%" fill="none" stroke="#06B6D4" strokeWidth="8" strokeDasharray={`${calculateProgress() * 2.64} 264`} strokeLinecap="round" /></svg>
                  <div className="absolute inset-0 flex items-center justify-center"><span className="text-xl sm:text-2xl font-bold">{calculateProgress()}%</span></div>
                </div>
                <div className="grid grid-cols-2 gap-4 sm:gap-6">
                  <div className="text-center"><div className="text-2xl sm:text-3xl font-bold text-cyan-300">{progress.resources.length}/{totalResources}</div><div className="text-sm opacity-80">Recursos</div></div>
                  <div className="text-center"><div className="text-2xl sm:text-3xl font-bold text-cyan-300">{progress.projects.length}/{totalProjectSteps}</div><div className="text-sm opacity-80">Pasos Proyecto</div></div>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-slate-800 rounded-xl p-4 sm:p-6 border border-slate-700"><div className="text-3xl sm:text-4xl mb-2">📖</div><div className="text-2xl sm:text-3xl font-bold text-white">{totalResources}</div><div className="text-slate-400 text-sm">Recursos Curados</div></div>
              <div className="bg-slate-800 rounded-xl p-4 sm:p-6 border border-slate-700"><div className="text-3xl sm:text-4xl mb-2">⏱️</div><div className="text-2xl sm:text-3xl font-bold text-white">150+</div><div className="text-slate-400 text-sm">Horas Contenido</div></div>
              <div className="bg-slate-800 rounded-xl p-4 sm:p-6 border border-slate-700"><div className="text-3xl sm:text-4xl mb-2">🇵🇪</div><div className="text-2xl sm:text-3xl font-bold text-white">{peruResources.length}</div><div className="text-slate-400 text-sm">Recursos Perú</div></div>
              <div className="bg-slate-800 rounded-xl p-4 sm:p-6 border border-slate-700"><div className="text-3xl sm:text-4xl mb-2">🏆</div><div className="text-2xl sm:text-3xl font-bold text-white">{projects.length}</div><div className="text-slate-400 text-sm">Proyectos</div></div>
            </div>
          </div>
        )}

        {activeSection === 'recursos-peru' && <><h2 className="text-2xl font-bold text-white mb-4">🇵🇪 Recursos Educativos Gratuitos - Perú</h2><p className="text-slate-400 mb-6">Cursos de IA 100% gratuitos del gobierno peruano, universidades y plataformas internacionales</p><ResourceList resources={peruResources} title="📚 Recursos" filters={['all','govt','course']} /></>}
        {activeSection === 'fundamentos' && <><h2 className="text-2xl font-bold text-white mb-4">🎯 Módulo 1: Fundamentos de IA</h2><p className="text-slate-400 mb-6">Comprende los conceptos esenciales de Inteligencia Artificial</p><ResourceList resources={fundamentosResources} title="📚 Recursos" filters={['all','video','course','article']} /></>}
        {activeSection === 'contabilidad' && <><h2 className="text-2xl font-bold text-white mb-4">📚 Módulo 2: IA en Contabilidad</h2><p className="text-slate-400 mb-6">Automatización de procesos contables con IA</p><ResourceList resources={contabilidadResources} title="📚 Recursos" filters={['all','video','course','tool','article']} /></>}
        {activeSection === 'tributario' && <><h2 className="text-2xl font-bold text-white mb-4">🏛️ Módulo 3: IA Tributaria SUNAT</h2><p className="text-slate-400 mb-6">Cumplimiento fiscal automatizado para Perú</p><ResourceList resources={tributarioResources} title="📚 Recursos" filters={['all','tool','video','article','course']} /></>}

        {activeSection === 'herramientas' && (
          <><h2 className="text-2xl font-bold text-white mb-4">🛠️ Módulo 4: Herramientas de IA</h2><p className="text-slate-400 mb-6">Domina las mejores herramientas para contadores</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {herramientas.map(tool => (
              <div key={tool.id} className="bg-slate-800 rounded-xl p-5 border border-slate-700 hover:border-cyan-500 transition-all">
                <div className="w-14 h-14 bg-gradient-to-br from-blue-600 to-blue-800 rounded-xl flex items-center justify-center text-2xl mb-4">{tool.icon}</div>
                <h3 className="text-white font-bold text-lg mb-2">{tool.title}</h3>
                <p className="text-slate-400 text-sm mb-3">{tool.desc}</p>
                <div className="flex flex-wrap gap-2 mb-4">{tool.tags.map(tag => <span key={tag} className="text-xs bg-slate-700 text-slate-300 px-2 py-1 rounded">{tag}</span>)}</div>
                <a href={tool.url} target="_blank" rel="noopener noreferrer" className="text-cyan-400 font-semibold hover:text-cyan-300 transition-colors">Acceder →</a>
              </div>
            ))}
          </div></>
        )}

        {activeSection === 'proyectos' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-white mb-2">🏆 Proyectos Prácticos de Certificación</h2>
            <p className="text-slate-400 mb-6">Completa los pasos de cada proyecto para demostrar tus habilidades</p>
            {projects.map(project => {
              const completedSteps = project.steps.filter(s => progress.projects.includes(s.id)).length;
              const pct = Math.round((completedSteps / project.steps.length) * 100);
              return (
                <div key={project.id} className="bg-slate-800 rounded-xl overflow-hidden border border-slate-700">
                  <div className="p-5 sm:p-6" style={{ background: `linear-gradient(135deg, ${project.color}, ${project.color}88)` }}>
                    <h3 className="text-lg sm:text-xl font-bold text-white mb-1">{project.title}</h3>
                    <p className="text-white/80 text-sm mb-3">{project.desc}</p>
                    <div className="flex gap-4 sm:gap-6 text-white/90 text-sm flex-wrap"><span>⏱️ {project.duration}</span><span>🛠️ {project.tools}</span><span>📊 {project.level}</span></div>
                  </div>
                  <div className="p-4 sm:p-6 space-y-3">
                    {project.steps.map((step, i) => (
                      <div key={step.id} className="flex items-start gap-3 sm:gap-4 p-3 sm:p-4 bg-slate-900 rounded-xl">
                        <button onClick={() => toggleProjectStep(step.id)} className={`w-8 h-8 rounded-full border-2 flex items-center justify-center text-sm transition-all flex-shrink-0 mt-1 ${progress.projects.includes(step.id) ? 'bg-green-500 border-green-500 text-white' : 'border-slate-500 text-transparent hover:border-slate-400'}`}>✓</button>
                        <div className="flex-1 min-w-0"><h4 className="text-white font-semibold">Paso {i + 1}: {step.title}</h4><p className="text-slate-400 text-sm mt-1">{step.desc}</p></div>
                        <span className="text-slate-500 text-xs bg-slate-800 px-2 py-1 rounded whitespace-nowrap">{step.duration}</span>
                      </div>
                    ))}
                    <div className="pt-4"><div className="h-3 bg-slate-900 rounded-full overflow-hidden"><div className="h-full bg-gradient-to-r from-green-500 to-cyan-500 transition-all duration-500" style={{ width: `${pct}%` }} /></div><div className="flex justify-between mt-2 text-sm text-slate-400"><span>Progreso</span><span>{completedSteps}/{project.steps.length} pasos</span></div></div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </main>

      <footer className="bg-slate-800 border-t border-slate-700 p-6 mt-12">
        <div className="max-w-7xl mx-auto flex justify-between items-center flex-wrap gap-4">
          <div className="flex items-center gap-3"><div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-800 rounded-xl flex items-center justify-center text-sm font-bold text-white">DG</div><div><div className="text-white font-semibold">Delia Green</div><div className="text-slate-400 text-sm">Transformación Digital para Contadores</div></div></div>
          <a href={LINKEDIN_URL} target="_blank" rel="noopener noreferrer" className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
            LinkedIn
          </a>
        </div>
      </footer>
    </div>
  );
};

export default IAContadoresDashboard;