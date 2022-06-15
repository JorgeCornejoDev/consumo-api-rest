### HTTP Status Code
1. Respuesta informativa (100 - 199)
2. Respuesta satisfactoria (200-299)
3. Errores de los clientes (400-499)
4. Errores de los servidores (500-599)

101 -> Switching Protocol
102 -> Processing
103 -> Early Hints

#### Respuestas satisfactorias
GET: El recurso se ha obtenido y se transmite en el cuerpo de mensaje
HEAD: Los encabezados de entidad están en el cuerpo del mensaje
PUT o POST: El recurso que describe el resultado de la acción se transmite en el cuerpo del mensaje
TRACE: El cuerpo del mensaje contiene el mensaje de solicitud recibido por el servidor


200 Respuestas informativas
La solicitud ha tenido éxito. El significado de un éxito varía dependiendo del método HTTP.

201 -> Nosotros mandamos a crear algo y todo va bien
202 -> Todo va bien, pero no se ha terminado de crear

300 Redirecciones


400 Errores del cliente

500 Error de servidor