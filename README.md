---

# EduTrack

**EduTrack** es una innovadora plataforma educativa diseñada para mejorar el aprendizaje de estudiantes escolares mediante gamificación, seguimiento personalizado del rendimiento académico y orientación vocacional. La plataforma está estructurada para ofrecer experiencias adaptativas que motiven a los estudiantes y faciliten la labor docente.

---

## Descripción del Proyecto

EduTrack aborda problemas comunes en el sistema educativo actual, como la falta de motivación, la dificultad para realizar un seguimiento constante del desempeño estudiantil y la necesidad de herramientas tecnológicas modernas en las aulas. La solución propuesta integra:

* Paneles específicos para profesores y estudiantes.
* Gestión centralizada de preguntas, evaluaciones y resultados.
* Orientación vocacional basada en habilidades demostradas.
* Gamificación para incentivar el aprendizaje activo.

---

## Características Principales

1. **Panel de Profesores:**

   * Gestión de preguntas por asignatura.
   * Visualización de estadísticas de desempeño estudiantil.
   * Herramientas para evaluar el progreso individual y grupal.

2. **Panel de Estudiantes:**

   * Resolución de preguntas por materia.
   * Quiz rápidos para evaluación instantánea.
   * Seguimiento de puntajes y orientación vocacional personalizada.

3. **Tecnología:**

   * **Frontend:** React.js para una experiencia de usuario moderna y fluida.
   * **Backend:** Node.js con Express, siguiendo la arquitectura MVC.
   * **Bases de Datos:** MongoDB para datos persistentes y Redis para caché.
   * **Despliegue:** Plataforma Render, con contenedores Docker.

4. **Seguridad:**

   * Gestión de sesiones y autenticación con JSON Web Tokens (JWT).
   * Comunicación segura con HTTPS.

---

## Instalación

Sigue estos pasos para instalar y ejecutar el proyecto localmente:

### Requisitos previos

* **Node.js** (versión 14 o superior)
* **MongoDB** (versión 4.4 o superior)
* **Redis** (versión 6 o superior)
* **Docker** (opcional, para despliegue con contenedores)

### Clonar el repositorio

```bash
git clone https://github.com/usuario/edutrack.git
cd edutrack
```

### Configurar el entorno

Crea un archivo `.env` en el directorio raíz con las siguientes variables:

```env
PORT=4000
MONGO_URI=mongodb://localhost:27017/edutrack
REDIS_URI=redis://localhost:6379
JWT_SECRET=tu_secreto
```

### Instalar dependencias

```bash
npm install
```

### Iniciar el servidor

```bash
npm start
```

El servidor estará disponible en [http://localhost:4000](http://localhost:4000).

---

## Uso

1. Accede a la plataforma desde un navegador web.
2. Inicia sesión como estudiante o profesor.
3. Explora las funcionalidades según el rol seleccionado.

---

## Contribución

Contribuciones al proyecto son bienvenidas. Para contribuir:

1. Haz un fork del repositorio.
2. Crea una nueva rama para tus cambios:

   ```bash
   git checkout -b feature/nueva-funcionalidad
   ```
3. Realiza tus cambios y sube la rama:

   ```bash
   git push origin feature/nueva-funcionalidad
   ```
4. Abre un Pull Request en el repositorio original.

---

## Contacto

Para consultas o soporte técnico, contacta a:

* **Nombre:** Equipo de Desarrollo EduTrack
* **Email:** [maximiliano.pena.h@gmail.com](mailto:maximiliano.pena.h@gmail.com)
* **GitHub:** [https://github.com/demoonx/edutrack](https://github.com/demoonx/edutrack)

---

## Licencia

Este proyecto está licenciado bajo la Licencia MIT. Consulta el archivo `LICENSE` para más información.

---
