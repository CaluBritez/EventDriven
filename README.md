# Plataforma de Gestión de Cursos Online - Arquitectura Event Driven

Este proyecto implementa una plataforma de gestión de cursos online construida sobre una arquitectura basada en eventos (Event Driven Architecture) utilizando tecologias como Node.js, Express, MongoDB y RabbitMQ para el lado del backend y React, Redux y Axios para el lado del frontend. Tambien se hizo uso de Docker para la virtualización del contenedor de la aplicación
En este sistema, los componentes se comunican de forma asíncrona a través de eventos, utilizando RabbitMQ como sistema de mensajería.

La plataforma se centra en los beneficios de esta arquitectura, como el desacoplamiento, la escalabilidad y la tolerancia a fallos, para proporcionar una experiencia de usuario más ágil y eficiente. A continuación, se presentan los aspectos clave de esta arquitectura y cómo impactan en el funcionamiento de la plataforma:

## 1. Interacción Basada en Eventos

- Publicación y suscripción de eventos: Cuando un alumno se inscribe en un curso, se emite un evento de "alumno inscrito" que   se publica en RabbitMQ. Este evento permite que otros servicios, como el de notificaciones, respondan automáticamente. Por ejemplo, el sistema de mensajería envía un correo electrónico de confirmación al alumno inscrito sin necesidad de intervención directa.

- Procesamiento asincrónico: La arquitectura asegura que los eventos se gestionen de forma asincrónica, permitiendo que los procesos principales (como la inscripción) se ejecuten sin bloqueo. Esto mejora la respuesta del sistema y permite realizar tareas de segundo plano, como el envío de notificaciones o la actualización de bases de datos, sin afectar el flujo principal.

## 2. Desacoplamiento y Flexibilidad

- Módulos desacoplados: La lógica de negocio de los cursos y estudiantes está desacoplada gracias a esta arquitectura basada en eventos. Cuando se crea un nuevo curso, otros módulos (por ejemplo, el sistema de notificaciones) pueden reaccionar al evento de creación sin necesidad de conexión directa con el servicio de gestión de cursos.

- Escalabilidad y fácil adaptación: La independencia de los servicios permite que la plataforma escale componentes específicos o se adapte a cambios sin comprometer la funcionalidad general. La adición de nuevas funcionalidades, como recordatorios o métricas de inscripción, es tan simple como suscribirse al evento correspondiente en RabbitMQ, evitando modificaciones complejas en el código base.

## 3. Tolerancia a Fallos y Resiliencia

- Gestión de fallos: Gracias al sistema basado en eventos, los procesos críticos como la creación de cursos y la inscripción de estudiantes están protegidos contra fallos. Si un servicio específico se detiene o falla, el evento queda encolado hasta que el sistema esté disponible nuevamente, garantizando la integridad y continuidad de los datos.