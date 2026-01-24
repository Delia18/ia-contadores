# IA Contadores 🤖💼

[![Netlify Status](https://api.netlify.com/api/v1/badges/405bddb6-5ad2-4dd4-b76c-204b3862e00e/deploy-status)](https://app.netlify.com/projects/deliagreen-aicontadores/deploys)
![React](https://img.shields.io/badge/React-18-61dafb?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178c6?logo=typescript)
![Vite](https://img.shields.io/badge/Vite-5-646cff?logo=vite)
![License](https://img.shields.io/badge/license-MIT-green)

**Dashboard educativo interactivo sobre Inteligencia Artificial aplicada a la contabilidad peruana y latinoamericana.**

🔗 **Demo en vivo:** [deliagreen-aicontadores.netlify.app](https://deliagreen-aicontadores.netlify.app)

<img width="1407" height="784" alt="image" src="https://github.com/user-attachments/assets/3a7f64d1-a281-419d-893f-4a4343beb82b" />


---

## 📖 Sobre el Proyecto

**IA Contadores** es un recurso educativo **gratuito** diseñado para profesionales de contabilidad que buscan entender cómo la Inteligencia Artificial está transformando la profesión contable en Perú y Latinoamérica.

Este no es un software de contabilidad ni una solución SaaS, es un **prototipo conceptual y dashboard educativo** para explorar casos de uso, tendencias y aplicaciones prácticas de IA en el sector contable.

### 🎯 ¿Para Quién Es Este Recurso?

- 👨‍💼 **Contadores profesionales** interesados en IA y automatización
- 📊 **Controllers y CFOs** explorando transformación digital
- 🎓 **Estudiantes de contabilidad** que quieren estar al día con tecnología
- 🌎 **Profesionales en LATAM** buscando aplicaciones locales de IA
- 💡 **Emprendedores** en fintech y soluciones contables

---

## ✨ Características

### 🧠 Contenido Educativo
- Exploración de casos de uso de IA en contabilidad
- Análisis de herramientas y tecnologías disponibles
- Aplicaciones específicas para el contexto peruano (SUNAT, regulaciones locales)
- Recursos sobre automatización y transformación digital

### 🎨 Dashboard Interactivo
- Interfaz moderna y responsiva
- Visualización de conceptos de IA en contabilidad
- Ejemplos prácticos y demostraciones
- Navegación intuitiva para explorar temas

### 📚 Temas Cubiertos
- **IA Generativa:** Claude, ChatGPT, Gemini para contadores
- **Automatización:** RPA, APIs, integración de sistemas
- **Compliance:** Aplicaciones de IA para cumplimiento SUNAT
- **Análisis de Datos:** ML para análisis financiero y auditoría
- **Fintech:** Soluciones digitales para PYMEs peruanas
- **Transformación Digital:** Modernización de procesos contables

---

## 🚀 Cómo Usar IA Contadores

### 📱 Acceso Rápido (Recomendado)

La forma más fácil de explorar el proyecto:

1. **Visita la demo en vivo:** [deliagreen-aicontadores.netlify.app](https://deliagreen-aicontadores.netlify.app)
2. **Explora el dashboard:** Navega por las diferentes secciones educativas
3. **Aprende sobre IA:** Lee casos de uso y aplicaciones prácticas
4. **Comparte:** Ayuda a otros contadores a descubrir estos recursos

### 💻 Instalación Local (Para Desarrolladores)

Si quieres explorar el código o contribuir al proyecto:

#### Prerequisitos
- Node.js 18+ ([Descargar aquí](https://nodejs.org))
- npm (viene con Node.js) o pnpm

#### Pasos de Instalación

```bash
# 1. Clonar el repositorio
git clone https://github.com/Delia18/ia-contadores.git
cd ia-contadores

# 2. Instalar dependencias
npm install
# o si prefieres pnpm (más rápido)
pnpm install

# 3. Iniciar servidor de desarrollo
npm run dev
# o
pnpm dev

# 4. Abrir en navegador
# El proyecto estará disponible en http://localhost:5173
```

#### Comandos Disponibles

```bash
# Desarrollo
npm run dev          # Inicia servidor de desarrollo con hot reload

# Producción
npm run build        # Crea build optimizado en /dist
npm run preview      # Preview del build de producción

# Calidad de código
npm run lint         # Revisa errores de ESLint
```

### 📖 Guía de Uso

#### Para Contadores que Quieren Aprender

1. **Empieza con los fundamentos:**
   - Explora qué es la IA y cómo funciona
   - Revisa casos de uso en contabilidad

2. **Descubre herramientas:**
   - Claude, ChatGPT, y otros LLMs para contadores
   - Herramientas de automatización disponibles

3. **Aplica a tu trabajo:**
   - Identifica procesos automatizables en tu práctica
   - Aprende sobre compliance y IA (SUNAT, regulaciones)

4. **Mantente actualizado:**
   - Suscríbete a [DeliaTech Semanal](https://deliatech.substack.com) para actualizaciones

#### Para Desarrolladores que Quieren Contribuir

1. **Familiarízate con el código:**
   - Revisa la estructura del proyecto
   - Lee la documentación de componentes

2. **Identifica áreas de mejora:**
   - Revisa los [Issues abiertos](https://github.com/Delia18/ia-contadores/issues)
   - Propón nuevas características

3. **Haz tu contribución:**
   - Lee [CONTRIBUTING.md](CONTRIBUTING.md)
   - Envía un Pull Request

---

## 🛠️ Tecnologías Utilizadas

Este proyecto está construido con tecnologías modernas:

| Tecnología | Propósito | Versión |
|------------|-----------|---------|
| **React** | Framework de UI | 18+ |
| **TypeScript** | Tipado estático | 5.0+ |
| **Vite** | Build tool ultrarrápido | 5.x |
| **CSS Modules** | Estilos encapsulados | - |
| **ESLint** | Linting de código | Latest |

### Distribución de Lenguajes
- JavaScript/TypeScript: 98.0%
- CSS: 1.3%
- HTML: 0.7%

---

## 📂 Estructura del Proyecto

```
ia-contadores/
├── public/              # Assets estáticos
│   ├── screenshots/     # Capturas de pantalla
│   └── favicon.ico      # Ícono del sitio
├── src/                 # Código fuente
│   ├── components/      # Componentes React reutilizables
│   ├── pages/           # Componentes de página
│   ├── assets/          # Recursos (imágenes, iconos, logos)
│   ├── styles/          # Estilos CSS globales y módulos
│   ├── utils/           # Funciones utilitarias
│   ├── types/           # Definiciones de TypeScript
│   ├── App.tsx          # Componente raíz de la aplicación
│   └── main.tsx         # Punto de entrada
├── index.html           # Plantilla HTML
├── package.json         # Dependencias y scripts
├── vite.config.ts       # Configuración de Vite
├── tsconfig.json        # Configuración de TypeScript
├── eslint.config.js     # Configuración de ESLint
└── README.md            # Este archivo
```

---

## 🌐 Demo en Vivo

**🔗 URL:** [deliagreen-aicontadores.netlify.app](https://deliagreen-aicontadores.netlify.app)

El sitio se actualiza **automáticamente** con cada push a la rama `main` gracias a la integración continua de Netlify.

### Estado del Deploy

El badge arriba muestra el estado actual:
- 🟢 **Success** = Sitio actualizado y funcionando
- 🟡 **Building** = Desplegando nueva versión
- 🔴 **Failed** = Error en el deploy (se mantiene versión anterior)

---

## 🤝 Contribuciones

¡Las contribuciones son bienvenidas! Este es un proyecto educativo abierto para la comunidad.

### Formas de Contribuir

#### 🐛 Reportar Bugs
¿Encontraste un error? [Abre un Issue](https://github.com/Delia18/ia-contadores/issues/new) con:
- Descripción clara del problema
- Pasos para reproducirlo
- Screenshots si es posible
- Información del navegador/sistema

#### 💡 Sugerir Features
¿Tienes una idea? [Abre un Issue](https://github.com/Delia18/ia-contadores/issues/new) con:
- Descripción de la funcionalidad
- Por qué sería útil
- Ejemplos de uso

#### 🔧 Contribuir Código

1. **Fork** el proyecto
2. **Crea una rama** para tu feature:
   ```bash
   git checkout -b feature/nombre-descriptivo
   ```
3. **Realiza tus cambios** siguiendo las guías de estilo
4. **Haz commit** con mensajes descriptivos:
   ```bash
   git commit -m "feat: Agregar sección sobre IA en auditoría"
   ```
5. **Push** a tu fork:
   ```bash
   git push origin feature/nombre-descriptivo
   ```
6. **Abre un Pull Request** describiendo tus cambios

### Guía de Estilo para Commits

Usamos [Conventional Commits](https://www.conventionalcommits.org/):

- `feat:` Nueva funcionalidad
- `fix:` Corrección de bugs
- `docs:` Cambios en documentación
- `style:` Formato, espacios (no afecta código)
- `refactor:` Refactorización de código
- `test:` Agregar o modificar tests
- `chore:` Tareas de mantenimiento

**Ejemplo:** `feat: Add interactive AI tools comparison section`

### Ideas de Contribución

- 📝 Agregar más casos de uso de IA en contabilidad
- 🌐 Mejorar contenido bilingüe (Español/Inglés)
- 🎨 Mejorar diseño y experiencia de usuario
- 📊 Agregar visualizaciones de datos interactivas
- 🔗 Integrar recursos externos (APIs, datasets públicos)
- 📱 Optimizar para dispositivos móviles
- ♿ Mejorar accesibilidad (a11y)
- 🐛 Corregir bugs y mejorar performance

Para más detalles, lee [CONTRIBUTING.md](CONTRIBUTING.md).

---

## 📊 Roadmap

### ✅ Completado
- [x] Dashboard inicial con React + Vite
- [x] Deploy automático en Netlify
- [x] Estructura de proyecto profesional
- [x] README comprehensivo
- [x] Configuración de TypeScript y ESLint

### 🚧 En Progreso
- [ ] Sección de casos de uso detallados
- [ ] Guías interactivas paso a paso
- [ ] Recursos descargables (PDFs, plantillas)

### 🔮 Futuro
- [ ] Integración con APIs de IA (demos en vivo)
- [ ] Versión bilingüe completa (ES/EN)
- [ ] Blog educativo integrado
- [ ] Comunidad y foro de discusión
- [ ] Cursos y talleres interactivos
- [ ] Newsletter integrada en el sitio
- [ ] Sistema de búsqueda de recursos

---

## 📄 Licencia

Este proyecto está bajo la licencia **MIT License**.

**Esto significa que:**
- ✅ Puedes usar este código para cualquier propósito
- ✅ Puedes modificarlo como quieras
- ✅ Puedes distribuirlo libremente
- ✅ Puedes usarlo comercialmente
- ⚠️ Debes incluir el aviso de copyright original
- ⚠️ El software se proporciona "tal cual", sin garantías

Ver el archivo [LICENSE](LICENSE) para el texto legal completo.

---

## 👤 Autora

<div align="center">

### **Delia Green**

*Especialista en Transformación Digital Financiera | Data Science | IA en Contabilidad*

</div>

#### 💼 Experiencia Profesional
- **Associate Manager, Financial Reporting** @ Prudential Financial
- 15+ años en empresas Fortune 500
- Reducción de ciclos de cierre de 7 a 3 días mediante automatización
- 99%+ precisión en reportes a través de IA
- Ahorro de seis cifras anuales por mejoras impulsadas por IA

#### 🎓 Educación
- **MS in Data Science & Analytics** - Rutgers University
- **Perplexity AI Business Fellowship** - Graduate
- **Bilingual Professional** - Español e Inglés

#### 🌎 Alcance
- Mercados: USA 🇺🇸 y Latinoamérica 🌎
- Experiencia cross-cultural en transformación financiera
- Puente entre tecnología y práctica contable

#### 📰 Contenido Educativo
Creadora de **[DeliaTech Semanal](https://deliatech.substack.com)**
- Newsletter bilingüe sobre fintech, IA y contabilidad
- Cobertura de temas para audiencias en USA y LATAM
- Tips prácticos de automatización y tecnología contable

### 📞 Conéctate

<div align="center">

[![LinkedIn](https://img.shields.io/badge/LinkedIn-Delia_Green-0077B5?style=for-the-badge&logo=linkedin)](https://linkedin.com/in/tu-perfil)
[![Newsletter](https://img.shields.io/badge/Newsletter-DeliaTech_Semanal-FF6719?style=for-the-badge&logo=substack)](https://deliatech.substack.com)
[![GitHub](https://img.shields.io/badge/GitHub-@Delia18-181717?style=for-the-badge&logo=github)](https://github.com/Delia18)
[![Email](https://img.shields.io/badge/Email-Contacto-EA4335?style=for-the-badge&logo=gmail)](mailto:tu-email@ejemplo.com)

</div>

---

## 🌟 Proyecto Relacionado

Este dashboard educativo es **independiente** 

---

## 🙏 Agradecimientos

Este proyecto no sería posible sin:

- 🎓 **Comunidad de contadores** que han compartido feedback y casos de uso
- 🤖 **[Anthropic](https://anthropic.com)** por Claude y APIs de IA
- ⚛️ **[React Team](https://react.dev)** por el increíble framework
- ⚡ **[Vite](https://vitejs.dev)** por la velocidad de desarrollo
- 🎨 **Comunidad open-source** por herramientas y recursos
- 🚀 **[Netlify](https://netlify.com)** por hosting y CI/CD gratuitos
- 💡 **Lectores de DeliaTech Semanal** por su apoyo continuo y feedback

---

## 📞 Contacto y Soporte

### ¿Tienes Preguntas?

- 🐛 **Bug o error:** [Reportar Issue](https://github.com/Delia18/ia-contadores/issues/new?template=bug_report.md)
- 💡 **Sugerencia de feature:** [Proponer Feature](https://github.com/Delia18/ia-contadores/issues/new?template=feature_request.md)
- 💬 **Pregunta general:** [Iniciar Discusión](https://github.com/Delia18/ia-contadores/discussions)
- 📧 **Contacto directo:** [tu-email@ejemplo.com](mailto:tu-email@ejemplo.com)

### Para Oportunidades de Colaboración

¿Interesado en colaborar en proyectos relacionados con IA y contabilidad?

- 💼 **LinkedIn:** [Envíame un mensaje](https://www.linkedin.com/in/delia-green-mbs-a442b734/)
- 📰 **Newsletter:** [Suscríbete](https://deliatech.substack.com) para estar al día

---

## 📈 Estadísticas del Proyecto

![GitHub stars](https://img.shields.io/github/stars/Delia18/ia-contadores?style=social)
![GitHub forks](https://img.shields.io/github/forks/Delia18/ia-contadores?style=social)
![GitHub watchers](https://img.shields.io/github/watchers/Delia18/ia-contadores?style=social)

![Last Commit](https://img.shields.io/github/last-commit/Delia18/ia-contadores)
![Issues](https://img.shields.io/github/issues/Delia18/ia-contadores)
![Pull Requests](https://img.shields.io/github/issues-pr/Delia18/ia-contadores)

---

<div align="center">

### ⭐ **Si este recurso te resultó útil, ¡dale una estrella en GitHub!** ⭐

**Hecho con ❤️ para la comunidad contable en Latinoamérica**

---

**© 2026 Delia Green. Este proyecto está bajo licencia MIT.**

*Última actualización: Enero 2026*

</div>
