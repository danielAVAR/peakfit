# PEAK-FIT 💪

Es un programa de consultas que puede ser utilizado por gimnasios o por entrenadores personales al manejar sus clientes
ya sea en sus planes de:

- ENTRENAMIENTO
- NUTRICION



--- 
## VIDEO YOUTUBE

https://youtu.be/Tuy8HB9Hao0




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


```bash
# 1. Instalar  
npm install

# 2. Crear la base de datos con sus tablas y datos iniciales
mysql -u root -p --default-character-set=utf8mb4 < scr/db/peakfitdb.sql

# 3. Configurar credenciales: 
cp .env.example .env     

# 4. Ejecutar la aplicacion
npm start

```


# ESTRUCTURA DE DATOS 

![alt text](image.png)


# ESTRUCTURA DEL PROYECTO
```bash
peakfit/
├── app.js                         
├── package.json                   
├── .env.example                  
├── .gitignore                      
├── README.md                      
├── IMAGES/
│   └── image.js             
└── scr/
    ├── contenedor.js          
    ├── config/
    │   └── database.js             
    ├── db/
    │   └── peakfitdb.sql           
    ├── models/                  
    │   ├── modelo.js             
    │   ├── cliente.js
    │   ├── plan_entrenamiento.js
    │   ├── contrato.js
    │   ├── seguimiento_fisico.js
    │   ├── foto_seguimiento.js
    │   ├── plan_alimentacion.js
    │   ├── alimento.js
    │   ├── registro_alimento.js
    │   ├── categoria_movimiento.js
    │   └── movimiento_financiero.js
    ├── validators/                
    │   └── validador.js          
    ├── repositories/              
    │   ├── repositorio_base.js    
    │   ├── cliente_repo.js
    │   ├── plan_entrenamiento_repo.js
    │   ├── contrato_repo.js
    │   ├── seguimiento_repo.js
    │   ├── nutricion_repo.js
    │   └── finanzas_repo.js  automatica
    │   ├── contrato_factory.js    
    │   └── movimiento_factory.js   
    ├── services/              
    │   ├── service_clientes.js         
    │   ├── service_planes.js            
    │   ├── service_seguimiento_fisico.js  
    │   ├── service_nutricion.js         
    │   └── service_finanzas.js           
    ├── prompts/               
    │   ├── comunes.js
    │   ├── clientes.js
    │   ├── planes.js
    │   ├── seguimiento.js
    │   ├── nutricion.js
    │   └── finanzas.js
    └── utils/
        ├── menus.js            
        ├── transaccion.js        
        ├── consola.js             
        └── errores.js            
  
```

Flujo de una accion: **menu -> prompt -> service -> repository -> MySQL**. Cada capa solo conoce a la siguiente.

---

# PRINCIPIOS SOLID APLICADOS

- **S (Responsabilidad unica):** modelos validan, repositorios hacen SQL, servicios aplican reglas de negocio, prompts piden datos, menus navegan.
- **O (Abierto/cerrado):** agregar una opcion al menu es agregar un objeto a una lista; agregar un campo al modelo es agregar una linea al esquema.
- **L (Sustitucion de Liskov):** todos los modelos extienden `Modelo` y todos los repositorios extienden `RepositorioBase` y se usan de forma intercambiable.
- **I (Segregacion de interfaces):** un repositorio y un servicio por dominio (clientes, planes, seguimiento, nutricion, finanzas), en vez de una clase gigante.
- **D (Inversion de dependencias):** los servicios reciben sus repositorios por el constructor (`contenedor.js`); no los crean ellos mismos.

---

# PATRONES DE DISEÑO USADOS Y SU JUSTIFICACION

1. **Repository** (`scr/repositories/`): aisla todo el SQL. Los servicios piden "buscarPorId" sin saber como se guarda. Si se cambiara MySQL por otra base, solo cambian los repositorios.
2. **Factory** (`scr/factories/`): `ContratoFactory` construye el contrato automaticamente (fecha fin = inicio + duracion, precio del plan, condiciones) y `MovimientoFactory` construye el ingreso que le corresponde. Garantiza que TODO contrato nace con las mismas reglas.
3. *(complementarios)* **Inyeccion de dependencias** (`contenedor.js`) y una **funcion de Unit of Work** (`conTransaccion`) que agrupa operaciones en una transaccion.

