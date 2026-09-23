# PEAK-FIT 💪

Es un programa de consultas que puede ser utilizado por gimnasios o por entrenadores personales al manejar sus clientes
ya sea en sus planes de:

- ENTRENAMIENTO
- NUTRICION



--- 




# DESCRIPCION DEL PROYECTO

## Objetivo Principal:

Crear una aplicación de linea de comandos donde permita a un entrenador o gymnasio (en este caso PEAKFIT) gestionar a sus clientes, por medio de:



USOS PRINCIPALES:

- planes de entrenamiento
- seguimiento de su proceso 
- alimentación personalizada 
- pagos

USOS SECUNDARIAS:

- registrar contratos 
- asociar rutinas con fechas limite
- registrar avances
- llevar control financiero (ingresos por mensualidades, egresos por servicios asociados)

#### IMPORTANTES DATOS A SEGUIR:

1. Estar desarrollada completamente en NODE.JS 
2. Aplicar **PROGRAMACIÓN ORIENTADA A OBJETOS.**
3. Aplicar principios **SOLID Y *ALMENOS 2* PATRONES DE DISEÑO** 
4. USAR LIBRERIAS: 
- **CHALK:** para mejorar la visualización del terminal 
- I**NQUIRERJS**: librería que ofrece una interfaz interactiva para el terminal 
- Contar con una carpeta especifica / models con la definicion del modelo de datos, usando objetos Javascript que incluyan validaciones por campo (tipo de dato, requeridos, formatos, rangos, etc.).


#### FUNCIONALIDADES y MENUS


1. **GESTION DE CLIENTES** 
A. crear clientes 
B. Listar Clientes 
C. Actualizar Clientes 
D. Eliminar Clientes 

**nota: asociar clientes a uno o varios planes de entrenamiento (relación de uno a mucho)**

2. **GESTION DE PLANES DE ENTRENAMIENTO** 
A. Crear Plan (nombre, duración, metas físicas, nivel(principiante, intermedio, avanzado))
B. Renovar Plan
C. Cancelar Plan (roll back del seguimiento y contrato)
D. Finalizar Plan


**NOTA:** 
- **Asociar a uno o varios clientes *(PREGUNTAR A QUE SE REFIERE A ESO)***
- **Registrar contrato al asignar el plan a un cliente. AUTOMATICAMENTE AL CREAR EL CONTRATO. EL CONTRATO TENDRA  LOS SIGUIENTES CAMPOS:
 Condiciones
 Duración
 precio
 fecha inicio/fin


3.  **SEGUIMIENTO FISICO**

A. Registrar avances semanales (peso, grasa corporal, medidas, fotos, comentarios)
**FLUJO**

- selecionar *REGISTRAR AVANCES SEMANALES*
- selecionar que cliente 
- registrar avances de : peso, grasa corporal, medidas, fotos, comentarios y fecha, Puntuaje 

B. Visualizar progreso 
**FLUJO**
- selecionar Visualizar progreso
- selecionar que cliente 

C. ELIMINAR REGISTROS 
**FLUJO**

- Selecionar Eliminar Registros 
- selecionar cliente 



4. **NUTRICION** 
A. crear plan de alimentación (asociado al cliente y plan)
**FLUJO**
- seleccionar crear plan de alimentación 
- seleccionar cliente 
- seleccionar plan 
- registrar plan (nombre, descripción, alimentos por día)
B. Consultar reporte semanal 
**FLUJO**
- selecionar consultar reporte semanal 
- selecionar cliente 
- seleccionar plan 
- consultar 


5. **CONTRATOS** 
- Contrato generado automáticamente al asignar un plan.
- Campos: condiciones, duración, precio, fecha inicio/fin.
- Asociado al cliente y plan correspondiente.


6. GESTION FINANCIERAS 
A. Registros de ingresos: cada vez que hay un registro de plan entrenamiento o nutricional se agrega al balance 

B. Registros de egresos: como puedo perder dinero si soy yo el que ofrece servicio?
C. Consultas de balance financiero por cliente



TECNOLOGIAS:

- NodeJs
- Javascript 
- Json 
- MySQL 


### ⚠️ Requisitos especiales

- El contrato debe generarse de forma automática al asignar un plan.
- Si un cliente **cancela un plan de entrenamiento**, debe haber rollback de su seguimiento y el contrato.
- Los pagos se manejan con **transacciones reales** (transacción se hace al registrar?).
- Se debe evidenciar en el código qué acciones son críticas y cómo se asegura la consistencia de los datos.

# INSTRUCCIONES DE INSTALACION Y USO 







# ESTRUCTURA DEL PROYECTO 






# PRINCIPIOS SOLID APLICADOS 





# PATRONES DE DISEÑO USADO Y SU JUSTIFICACION 



# 



PREGUNTAS

- si el sistema se concentra en planes, como cabe la funcion de sesiones individuales?
- el readme file de documentacion es differente al documento de planificacion?
