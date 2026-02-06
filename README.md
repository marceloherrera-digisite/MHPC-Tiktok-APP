# MHPC TikTok Autoupload Tool

Una aplicación web MVP para gestionar y programar la carga automática de videos en TikTok. Incluye autenticación, gestión de cuentas de TikTok y un sistema de administración de clientes.

## 📋 Tabla de Contenidos

- [Características](#características)
- [Stack Tecnológico](#stack-tecnológico)
- [Requisitos Previos](#requisitos-previos)
- [Instalación](#instalación)
- [Desarrollo](#desarrollo)
- [Build y Producción](#build-y-producción)
- [Despliegue en Easypanel](#despliegue-en-easypanel)
- [Estructura del Proyecto](#estructura-del-proyecto)
- [Variables de Entorno](#variables-de-entorno)
- [Contribución](#contribución)

## ✨ Características

- **Autenticación de Usuarios**: Sistema de login con roles (usuario/admin)
- **Gestión de Cuentas**: Vincular y gestionar múltiples cuentas de TikTok
- **Subida de Videos**: Interfaz intuitiva para cargar videos
- **Mis Videos**: Visualizar y gestionar videos subidos
- **Panel de Administración**: Panel exclusivo para administradores
- **Interfaz Moderna**: Diseño dark mode con Tailwind CSS
- **Responsive**: Compatible con dispositivos móviles y desktop

## 🛠️ Stack Tecnológico

### Frontend
- **React 19.2.3**: Librería UI moderna
- **TypeScript 5.9.3**: Tipado estático para JavaScript
- **Vite 7.2.4**: Build tool rápido y moderno
- **Tailwind CSS 4.1.17**: Framework CSS utility-first
- **React Router 7.13.0**: Enrutamiento de aplicación
- **React Hook Form 7.71.1**: Gestión de formularios
- **Lucide React**: Librería de iconos

### Desarrollo
- **Node.js 18**: Runtime de JavaScript
- **npm**: Gestor de paquetes
- **Docker**: Containerización para despliegue

## 📋 Requisitos Previos

- Node.js 18+ instalado
- npm 9+ (incluido con Node.js)
- Git para versionado
- (Opcional) Docker para desarrollo local

## 🚀 Instalación

1. **Clonar el repositorio**:
```bash
git clone https://github.com/marceloherrera-digisite/MHPC-Tiktok-APP.git
cd MHPC-Tiktok-APP
```

2. **Instalar dependencias**:
```bash
npm install
```

3. **Instalar tipos de Node (si es necesario)**:
```bash
npm install --save-dev @types/node
```

## 💻 Desarrollo

Para iniciar el servidor de desarrollo:

```bash
npm run dev
```

La aplicación estará disponible en `http://localhost:5173`

### Características de desarrollo:
- Hot Module Replacement (HMR) para cambios en vivo
- TypeScript en tiempo real
- Tailwind CSS JIT compilation

## 📦 Build y Producción

Para crear una versión de producción:

```bash
npm run build
```

Esto genera:
- Bundle optimizado en la carpeta `dist/`
- Archivos minificados
- Source maps para debugging

Para previsualizar la build:

```bash
npm run preview
```

## 🐳 Despliegue en Easypanel

### Requisitos:
- Repositorio públlico en GitHub (ya configurado)
- Cuenta en Easypanel
- Dockerfile en la raíz del proyecto (incluido)

### Pasos de despliegue:

1. **Conectar repositorio en Easypanel**:
   - Ir a Easypanel Dashboard
   - New Service → Git
   - Seleccionar: `marceloherrera-digisite/MHPC-Tiktok-APP`
   - Rama: `main`

2. **Configuración de build**:
   - Build Type: Docker
   - Dockerfile: `Dockerfile` (detectado automáticamente)
   - Port: `3000`

3. **Deploy automático**:
   - Cada `git push` a `main` dispara un nuevo deploy
   - El dominio se asignará automáticamente
   - HTTPS habilitado por defecto

### Dockerfile incluido:
- Multi-stage build para optimizar tamaño
- Node.js 18 Alpine (imagen ligera)
- Healthcheck configurado
- Servidor HTTP con CORS habilitado

## 📁 Estructura del Proyecto

```
MHPC-Tiktok-APP/
├── src/
│   ├── components/
│   │   └── Sidebar.tsx           # Barra lateral de navegación
│   ├── pages/
│   │   ├── Login.tsx             # Página de autenticación
│   │   ├── MisVideos.tsx         # Listado de videos del usuario
│   │   ├── SubirVideo.tsx        # Formulario de carga de videos
│   │   ├── CuentasTikTok.tsx     # Gestión de cuentas vinculadas
│   │   └── AdminClientes.tsx     # Panel de administración
│   ├── lib/
│   │   └── mockSupabase.tsx      # Mock de Supabase/Autenticación
│   ├── utils/
│   │   └── cn.ts                 # Utilidades CSS
│   ├── App.tsx                   # Componente raíz
│   ├── main.tsx                  # Punto de entrada
│   └── index.css                 # Estilos globales
├── public/
├── Dockerfile                    # Configuración de Docker
├── .dockerignore                 # Archivos a ignorar en Docker
├── .gitignore                    # Archivos a ignorar en Git
├── package.json                  # Dependencias y scripts
├── tsconfig.json                 # Configuración de TypeScript
├── vite.config.ts                # Configuración de Vite
├── tailwind.config.js            # Configuración de Tailwind CSS
└── README.md                      # Este archivo
```

### Rutas principales:
```
/                    → Dashboard (requiere autenticación)
/login               → Página de login
/mis-videos          → Listado de videos del usuario
/subir-video         → Formulario de carga
/cuentas-tiktok      → Gestión de cuentas
/admin/clientes      → Panel de administración (solo admin)
```

## 🔐 Variables de Entorno

Si necesitas variables de entorno, créa un archivo `.env` o `.env.local`:

```env
# Ejemplo de variables que podrías usar
VITE_API_URL=https://api.tu-dominio.com
VITE_SUPABASE_URL=https://tu-proyecto.supabase.co
VITE_SUPABASE_KEY=tu-clave-publica
```

**Nota**: Las variables deben estar prefijadas con `VITE_` para que Vite las incluya en el bundle.

## 🔧 Configuración de TypeScript

- **Target**: ES2020
- **Module**: ESNext
- **Strict Mode**: Habilitado
- **Path Mapping**: Alias `@/` para `src/`

## 🎨 Estilos

- **Tailwind CSS 4.1.17**: Framework CSS utility-first
- **Paleta de colores**: Dark mode con acentos en violeta
- **Responsive**: Mobile-first approach

## 📊 Performance

- **Vite**: Build instant y HMR rápido
- **Code Splitting**: Automático con React Router
- **Tree Shaking**: Eliminación de código no usado
- **Minificación**: En producción automáticamente

## 🧪 Testing

Actualmente no hay tests configurados. Para agregar testing:

```bash
npm install --save-dev vitest @testing-library/react @testing-library/jest-dom
```

## 🤝 Contribución

1. Fork el repositorio
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📝 Licencia

Este proyecto es privado. Todos los derechos reservados © 2026 MHPC.

## 📞 Soporte

Para reportar bugs o sugerencias, contáctate con el equipo de desarrollo.

---

**Última actualización**: 6 de febrero de 2026
**Versión**: 0.0.1
