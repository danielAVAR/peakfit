# PEAK-FIT 💪

Es un programa de consultas que puede ser utilizado por gimnasios o por entrenadores personales al manejar sus clientes
ya sea en sus planes de:

- ENTRENAMIENTO
- NUTRICION


SCRUM

https://app.clickup.com/9014755542/v/l/t/9014755542



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


# 10 funciones que prodria agregar propuestas para PeakFit

Ideas preparadas para la tarea de mañana, verificadas contra tu repo actual (rama `main`, commit `b1b9b40`).
Cada una indica el tema de la imagen al que corresponde, el riesgo de conflicto, y trae el código completo
listo para copiar y pegar. Ninguna modifica el comportamiento de lo que ya tienes: todas son **código nuevo**,
salvo donde se indica explícitamente una línea a agregar en un archivo existente.

**Énfasis pedido:** más ideas de SOLID / Patrones de diseño (4) y Persistencia en BD relacional (2, incluida
la tabla nueva), y al menos una de Herencia/Polimorfismo e Interfaces/Relaciones, ya que marcaste los 4 temas
como posibles.

**Nivel de riesgo de cada idea:**
- 🟢 **Aislada** — archivos 100% nuevos, cero riesgo de romper algo existente.
- 🟡 **Una línea** — cero archivos nuevos modificados en su lógica, solo una línea de registro/conexión.

---

## Índice

| # | Tema de la imagen | Idea | Riesgo |
|---|---|---|---|
| 1 | Entornos de Ejecución | Comando "Verificar entorno" | 🟡 |
| 2 | POO (propiedades calculadas) | Edad calculada del cliente | 🟢 |
| 3 | Herencia y Polimorfismo | Ingreso / Egreso como subclases | 🟢 |
| 4 | Interfaces y relaciones entre clases | Interfaz `Notificable` (duck typing) | 🟢 |
| 5 | SOLID — SRP / OCP | `ServicioReportes` (exportar CSV) | 🟢 |
| 6 | SOLID — DIP | Inyectar el notificador en vez de crearlo | 🟡 |
| 7 | Patrones de diseño — Observer | Avisar cuando se registra un pago | 🟢 |
| 8 | Patrones de diseño — Strategy | Descuentos intercambiables al asignar plan | 🟡 |
| 9 | Persistencia de datos (general) | Respaldo de clientes a JSON | 🟢 |
| 10 | Persistencia en BD relacional | Tabla nueva `empleado` + CRUD completo | 🟢 |

---

## 1. Comando "Verificar entorno"
**Tema:** Entornos de Ejecución
**Qué resuelve:** confirma que `.env` cargó bien y que MySQL responde, antes de usar la app. Útil como demo
de "entornos de ejecución" (development/production) con `process.env.NODE_ENV`.

**Archivo nuevo:** `scr/utils/entorno.js`
```js
// Verifica el entorno de ejecucion: variables .env, conexion a MySQL y version de Node.
import db from '../config/database.js';
import { exito, error, info, titulo } from './consola.js';

export async function verificarEntorno() {
    titulo('Environment check');
    info(`Node.js: ${process.version}`);
    info(`NODE_ENV: ${process.env.NODE_ENV ?? 'no definido (se asume development)'}`);

    const variables = ['DB_HOST', 'DB_USER', 'DB_NAME'];
    for (const v of variables) {
        if (process.env[v]) exito(`${v} cargado`);
        else error(`${v} falta en el archivo .env`);
    }

    try {
        await db.query('SELECT 1');
        exito('Conexion a MySQL: OK');
    } catch (e) {
        error(`Conexion a MySQL fallo: ${e.message}`);
    }
}
```

**Para conectarlo al menú**, en `scr/utils/menus.js` agrega el import junto a los demás:
```js
import { verificarEntorno } from './entorno.js';
```
Y una opción más en `main_menu()`, antes de `EXIT`:
```js
{ name: '+  ENVIRONMENT CHECK', value: () => ejecutar(verificarEntorno) },
```

---

## 2. Edad calculada del cliente
**Tema:** Introducción a la POO (propiedades derivadas, no solo almacenadas)
**Qué resuelve:** un valor que no se guarda en la base de datos, se **calcula** a partir de otro campo. Es un
ejemplo clásico de POO: el objeto expone comportamiento, no solo datos.

**Modificación mínima en `scr/models/cliente.js`:** agregar un getter que no es parte del esquema (por lo
tanto no se valida ni se guarda, solo se calcula al vuelo):
```js
import dayjs from 'dayjs';

// ... dentro de la clase Cliente, despues de "static esquema = {...}"
get edad() {
    return dayjs().diff(dayjs(this.fecha_nacimiento), 'year');
}
```
**Uso en cualquier prompt:**
```js
const cliente = await servicioClientes.obtener(id);
console.log(`Edad: ${cliente.edad} años`);
```
No requiere cambios en la base de datos ni en el repositorio: la edad nunca se guarda, siempre se recalcula.

---

## 3. Ingreso / Egreso como subclases de `MovimientoFinanciero`
**Tema:** Herencia y Polimorfismo en JavaScript
**Qué resuelve:** hoy `MovimientoFinanciero` es una sola clase para ingresos y egresos. Esta idea crea dos
subclases que heredan de ella y **sobrescriben el mismo método** de forma distinta (polimorfismo real).

**Archivo nuevo:** `scr/models/movimiento_tipado.js`
```js
// Subclases de MovimientoFinanciero: mismo padre, comportamiento distinto (polimorfismo).
import { MovimientoFinanciero } from './movimiento_financiero.js';

export class Ingreso extends MovimientoFinanciero {
    describir() {
        return `+ $${Number(this.monto).toFixed(2)}  (ingreso) ${this.descripcion ?? ''}`.trim();
    }
}

export class Egreso extends MovimientoFinanciero {
    describir() {
        return `- $${Number(this.monto).toFixed(2)}  (egreso) ${this.descripcion ?? ''}`.trim();
    }
}
```
**Demostrar el polimorfismo** (por ejemplo en una prueba o en una función de reporte):
```js
import { Ingreso, Egreso } from '../models/movimiento_tipado.js';

const movimientos = [
    new Ingreso({ categoria_id: 1, monto: 40, fecha: '2026-10-05', descripcion: 'Mensualidad' }),
    new Egreso({ categoria_id: 4, monto: 10, fecha: '2026-10-05', descripcion: 'Proteina' })
];

movimientos.forEach((m) => console.log(m.describir()));
// + $40.00  (ingreso) Mensualidad
// - $10.00  (egreso) Proteina
```
Nota: esto es un **envoltorio de presentación** sobre el modelo existente; no reemplaza `MovimientoFinanciero`
en los repositorios, que siguen guardando la tabla `movimiento_financiero` tal cual está.

---

## 4. Interfaz `Notificable` (duck typing)
**Tema:** Interfaces y relaciones entre clases
**Qué resuelve:** JavaScript no tiene `interface` como Java, pero se simula con una clase base que obliga a
implementar un método (si no lo implementas, lanza error). Dos clases **distintas** cumplen el mismo "contrato".

**Archivo nuevo:** `scr/utils/notificable.js`
```js
// "Interfaz" Notificable: cualquier clase que la extienda DEBE implementar notificar().
// Si no lo hace, falla en tiempo de ejecucion (simula una interfaz en JS).
export class Notificable {
    notificar(mensaje) {
        throw new Error(`${this.constructor.name} debe implementar el metodo notificar()`);
    }
}
```

**Archivo nuevo:** `scr/utils/notificadores.js`
```js
import { Notificable } from './notificable.js';
import chalk from 'chalk';

export class NotificadorConsola extends Notificable {
    notificar(mensaje) {
        console.log(chalk.yellow(`🔔 ${mensaje}`));
    }
}

// Implementacion alterna del MISMO contrato: otra clase, mismo metodo notificar().
export class NotificadorSilencioso extends Notificable {
    #historial = [];
    notificar(mensaje) {
        this.#historial.push(mensaje);
    }
    obtenerHistorial() {
        return [...this.#historial];
    }
}
```
**Ejemplo de uso** (avisar contratos por vencer en los próximos 7 días):
```js
import dayjs from 'dayjs';
import { NotificadorConsola } from '../utils/notificadores.js';

export async function avisarContratosPorVencer(repoContratos, notificador = new NotificadorConsola()) {
    const limite = dayjs().add(7, 'day').format('YYYY-MM-DD');
    // (requiere un metodo de repositorio que liste contratos ACTIVOS con fecha_fin <= limite;
    //  si no existe, se agrega un metodo corto al repositorio de contratos, ver idea 6)
    const contratos = await repoContratos.listarPorVencer(limite);
    contratos.forEach((c) => notificador.notificar(`Contrato #${c.id} vence el ${c.fecha_fin}`));
}
```

---

## 5. `ServicioReportes`: un servicio nuevo, sin tocar los existentes
**Tema:** SOLID — Responsabilidad Única (S) y Abierto/Cerrado (O)
**Qué resuelve:** agrega una funcionalidad completamente nueva (exportar clientes a CSV) sin modificar ni una
sola línea de `service_clientes.js`. Es la demostración más clara y rápida de **SRP + OCP** que puedes dar.

**Archivo nuevo:** `scr/services/service_reportes.js`
```js
// SERVICIO DE REPORTES: una responsabilidad nueva (exportar datos), separada de ServicioClientes.
// No modifica service_clientes.js: lo usa por composicion (recibe servicioClientes ya armado).
import { writeFile } from 'node:fs/promises';

export class ServicioReportes {
    constructor(servicioClientes) {
        this.servicioClientes = servicioClientes;
    }

    async exportarClientesCSV(rutaArchivo = './clientes.csv') {
        const clientes = await this.servicioClientes.listar();
        const encabezado = 'id,nombre,fecha_nacimiento,telefono,correo_electronico,activo';
        const filas = clientes.map((c) =>
            [c.id, c.nombre, c.fecha_nacimiento, c.telefono, c.correo_electronico, c.activo ? 1 : 0].join(','));
        const contenido = [encabezado, ...filas].join('\n');
        await writeFile(rutaArchivo, contenido, 'utf-8');
        return { ruta: rutaArchivo, filas: clientes.length };
    }
}
```
**Registrar en `scr/contenedor.js`** (una línea nueva, no se toca ninguna existente):
```js
import { ServicioReportes } from './services/service_reportes.js';
// ...
export const servicioReportes = new ServicioReportes(servicioClientes);
```
**Prompt opcional** (`scr/prompts/reportes.js`):
```js
import { servicioReportes } from '../contenedor.js';
import { exito, titulo } from '../utils/consola.js';

export async function exportarClientes() {
    titulo('Export clients to CSV');
    const { ruta, filas } = await servicioReportes.exportarClientesCSV();
    exito(`${filas} clients exported to ${ruta}`);
}
```

---

## 6. Inyectar el notificador en vez de crearlo (Inversión de Dependencias)
**Tema:** SOLID — Inversión de Dependencias (D)
**Qué resuelve:** conecta la idea 4 con el principio D de SOLID: en vez de que un servicio **cree** su propio
notificador, lo **recibe** por el constructor. Así se puede cambiar `NotificadorConsola` por cualquier otro sin
tocar el servicio.

**Modificación mínima en `scr/services/service_planes.js`:** agregar un parámetro opcional al constructor
(no rompe las llamadas existentes porque tiene valor por defecto):
```js
import { NotificadorConsola } from '../utils/notificadores.js';

export class ServicioPlanes {
    constructor({ repoPlanes, repoContratos, repoClientes, repoFinanzas, repoSeguimiento, notificador = new NotificadorConsola() }) {
        this.repoPlanes = repoPlanes;
        this.repoContratos = repoContratos;
        this.repoClientes = repoClientes;
        this.repoFinanzas = repoFinanzas;
        this.repoSeguimiento = repoSeguimiento;
        this.notificador = notificador;   // <-- nuevo: inyectado, no creado aqui
    }
    // ...
}
```
**Uso dentro de cualquier método del servicio** (por ejemplo, al final de `asignarPlan`):
```js
this.notificador.notificar(`Contrato #${contratoId} creado para el cliente #${clienteId}`);
```
`contenedor.js` no necesita cambios: como el parámetro tiene valor por defecto, `new ServicioPlanes({...})`
sigue funcionando igual que antes. Si más adelante quieres otro notificador, solo se lo pasas ahí.

---

## 7. Patrón Observer: avisar cuando se registra un pago
**Tema:** Patrones de diseño (un tercer patrón, además de Repository y Factory)
**Qué resuelve:** permite "suscribir" varias acciones a un mismo evento (un pago registrado) sin que
`ServicioFinanzas` sepa qué hacen esas acciones. Hoy sería solo imprimir en consola; mañana podría ser enviar
un correo, sin tocar el servicio.

**Archivo nuevo:** `scr/utils/emisor_eventos.js`
```js
// PATRON OBSERVER: una lista de "observadores" (funciones) que se ejecutan cuando ocurre un evento.
// El emisor no sabe que hacen los observadores; solo los llama.
export class EmisorEventos {
    #observadores = {};

    on(evento, callback) {
        (this.#observadores[evento] ??= []).push(callback);
    }

    emitir(evento, datos) {
        (this.#observadores[evento] ?? []).forEach((cb) => cb(datos));
    }
}

export const eventos = new EmisorEventos();   // instancia unica compartida (singleton simple)
```
**Suscribir un observador** (por ejemplo en `app.js`, antes de abrir los menús):
```js
import { eventos } from './scr/utils/emisor_eventos.js';
import chalk from 'chalk';

eventos.on('pago_registrado', ({ monto, clienteId }) => {
    console.log(chalk.green(`🔔 Nuevo pago de $${monto} del cliente #${clienteId}`));
});
```
**Emitir el evento** en `scr/services/service_finanzas.js`, dentro de `registrarSesionIndividual` (al final,
justo antes del `return`):
```js
import { eventos } from '../utils/emisor_eventos.js';
// ...
eventos.emitir('pago_registrado', { monto, clienteId });
```

---

## 8. Patrón Strategy: descuentos intercambiables al asignar un plan
**Tema:** Patrones de diseño (cuarto patrón posible, o alterno al Observer)
**Qué resuelve:** hoy el precio del contrato es siempre `plan.precio_base`. Con Strategy, la forma de calcular
el precio final se vuelve intercambiable sin tocar `ContratoFactory`.

**Archivo nuevo:** `scr/factories/estrategias_precio.js`
```js
// PATRON STRATEGY: distintas formas de calcular el precio, intercambiables.
// Cada estrategia es un objeto con un metodo calcular(). ContratoFactory no sabe cual se usa.
export const SinDescuento = {
    calcular: (precioBase) => precioBase
};

export const DescuentoRenovacion = {
    calcular: (precioBase) => Number((precioBase * 0.9).toFixed(2))   // 10% menos
};

export const DescuentoVIP = {
    calcular: (precioBase) => Number((precioBase * 0.8).toFixed(2))   // 20% menos
};
```
**Modificación mínima en `scr/factories/contrato_factory.js`:** agregar un parámetro opcional con valor por
defecto (no rompe las llamadas existentes):
```js
import { SinDescuento } from './estrategias_precio.js';

static crear({ cliente_id, plan, fecha_inicio, contrato_origen_id = null, estrategiaPrecio = SinDescuento }) {
    // ... (igual que antes)
    const precioFinal = estrategiaPrecio.calcular(plan.precio_base);
    return new Contrato({
        // ...
        precio: precioFinal,   // <-- antes era plan.precio_base directo
        // ...
    });
}
```
**Uso:** `renovarPlan` en `service_planes.js` ya podría pasar `DescuentoRenovacion` en vez de dejarlo por
defecto, sin que `asignarPlan` (que no pasa nada) se vea afectado.

---

## 9. Respaldo de clientes a un archivo JSON
**Tema:** Persistencia de datos (sin ser relacional — otra forma de guardar datos)
**Qué resuelve:** demuestra que "persistencia" no es solo MySQL. Guarda y lee un archivo `.json` con
`fs/promises`, como respaldo fuera de la base de datos.

**Archivo nuevo:** `scr/utils/respaldo.js`
```js
// Persistencia alterna: guarda y lee datos en un archivo JSON (no en MySQL).
import { writeFile, readFile } from 'node:fs/promises';

export async function respaldarClientes(servicioClientes, ruta = './respaldo-clientes.json') {
    const clientes = await servicioClientes.listar();
    await writeFile(ruta, JSON.stringify(clientes, null, 2), 'utf-8');
    return { ruta, total: clientes.length };
}

export async function leerRespaldo(ruta = './respaldo-clientes.json') {
    const contenido = await readFile(ruta, 'utf-8');
    return JSON.parse(contenido);
}
```
**Uso:**
```js
import { respaldarClientes } from '../utils/respaldo.js';
import { servicioClientes } from '../contenedor.js';

const { ruta, total } = await respaldarClientes(servicioClientes);
console.log(`Respaldados ${total} clientes en ${ruta}`);
```

---

## 10. Tabla nueva: `empleado` (CRUD completo)
**Tema:** Persistencia de Datos en Bases de Datos Relacionales
**Qué resuelve:** es la opción preparada para "agregar una tabla nueva y gestionarla con funciones". Modela
a los entrenadores/staff del gimnasio. Es una tabla **100% independiente**: no modifica ninguna tabla existente,
así que no hay riesgo de romper nada ya entregado. Al final se incluye, aparte, cómo enlazarla a `contrato` si
te lo piden.

### 10.1 — SQL (agregar al final de `scr/db/peakfitdb.sql`, o ejecutar aparte)
```sql
CREATE TABLE empleado (
    id              INT AUTO_INCREMENT PRIMARY KEY,
    nombre          VARCHAR(100) NOT NULL,
    puesto          ENUM('ENTRENADOR', 'NUTRICIONISTA', 'RECEPCION', 'ADMIN') NOT NULL,
    correo          VARCHAR(150) NOT NULL UNIQUE,
    telefono        VARCHAR(20),
    activo          BOOLEAN NOT NULL DEFAULT TRUE,
    created_at      TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;

-- datos iniciales (opcional)
INSERT INTO empleado (nombre, puesto, correo, telefono) VALUES
    ('Carlos Mendez', 'ENTRENADOR',    'carlos@peakfit.com', '5555-2222'),
    ('Laura Ramos',   'NUTRICIONISTA', 'laura@peakfit.com',  '5555-3333');
```

### 10.2 — Modelo: `scr/models/empleado.js`
```js
import { Modelo } from './modelo.js';

export const PUESTOS = ['ENTRENADOR', 'NUTRICIONISTA', 'RECEPCION', 'ADMIN'];

export class Empleado extends Modelo {
    static esquema = {
        id:        { tipo: 'entero', min: 1 },
        nombre:    { tipo: 'texto', requerido: true, largoMax: 100 },
        puesto:    { tipo: 'enum', requerido: true, valores: PUESTOS },
        correo:    { tipo: 'correo', requerido: true },
        telefono:  { tipo: 'telefono' },
        activo:    { tipo: 'booleano', porDefecto: true }
    };
}
```

### 10.3 — Repositorio: `scr/repositories/empleado_repo.js`
```js
import { RepositorioBase } from './repositorio_base.js';

export class EmpleadoRepositorio extends RepositorioBase {
    async crear(e, conexion) {
        const r = await this.ejecutar(
            `INSERT INTO empleado (nombre, puesto, correo, telefono) VALUES (?, ?, ?, ?)`,
            [e.nombre, e.puesto, e.correo, e.telefono], conexion);
        return r.insertId;
    }

    async listar({ soloActivos = false } = {}) {
        return this.ejecutar(
            `SELECT * FROM empleado ${soloActivos ? 'WHERE activo = 1' : ''} ORDER BY id DESC`);
    }

    async buscarPorId(id, conexion) {
        const filas = await this.ejecutar(`SELECT * FROM empleado WHERE id = ?`, [id], conexion);
        return filas[0] ?? null;
    }

    async actualizar(id, e, conexion) {
        const r = await this.ejecutar(
            `UPDATE empleado SET nombre = ?, puesto = ?, correo = ?, telefono = ?, activo = ? WHERE id = ?`,
            [e.nombre, e.puesto, e.correo, e.telefono, e.activo ? 1 : 0, id], conexion);
        return r.affectedRows;
    }

    async desactivar(id, conexion) {
        const r = await this.ejecutar(`UPDATE empleado SET activo = 0 WHERE id = ?`, [id], conexion);
        return r.affectedRows;
    }
}
```

### 10.4 — Servicio: `scr/services/service_empleados.js`
```js
// Mismo patron que ServicioClientes: valida con el modelo, traduce errores de MySQL, desactiva en vez de borrar.
import { Empleado } from '../models/empleado.js';
import { ErrorNegocio } from '../utils/errores.js';

export class ServicioEmpleados {
    constructor(repoEmpleados) {
        this.repoEmpleados = repoEmpleados;
    }

    async crear(datos) {
        const empleado = new Empleado(datos);
        try {
            return await this.repoEmpleados.crear(empleado);
        } catch (e) {
            if (e.code === 'ER_DUP_ENTRY') throw new ErrorNegocio('Ya existe un empleado con ese correo.');
            throw e;
        }
    }

    listar(opciones) {
        return this.repoEmpleados.listar(opciones);
    }

    async obtener(id) {
        const empleado = await this.repoEmpleados.buscarPorId(id);
        if (!empleado) throw new ErrorNegocio(`No existe el empleado #${id}.`);
        return empleado;
    }

    async actualizar(id, cambios) {
        const actual = await this.obtener(id);
        const empleado = new Empleado({ ...actual, ...cambios });
        await this.repoEmpleados.actualizar(id, empleado);
    }

    async desactivar(id) {
        await this.obtener(id);
        await this.repoEmpleados.desactivar(id);
    }
}
```

### 10.5 — Registrar en `scr/contenedor.js` (2 líneas nuevas, nada existente cambia)
```js
import { EmpleadoRepositorio } from './repositories/empleado_repo.js';
import { ServicioEmpleados } from './services/service_empleados.js';
// ...
const repoEmpleados = new EmpleadoRepositorio();
export const servicioEmpleados = new ServicioEmpleados(repoEmpleados);
```

### 10.6 — Prompts: `scr/prompts/empleados.js`
```js
import inquirer from 'inquirer';
import { Empleado, PUESTOS } from '../models/empleado.js';
import { servicioEmpleados } from '../contenedor.js';
import { exito, titulo, tabla } from '../utils/consola.js';
import { preguntaModelo, confirmar } from './comunes.js';

export async function crearEmpleado() {
    titulo('Create employee');
    const r = await inquirer.prompt([
        preguntaModelo(Empleado, 'nombre', 'Full name:'),
        { type: 'select', name: 'puesto', message: 'Position:', choices: PUESTOS },
        preguntaModelo(Empleado, 'correo', 'Email:'),
        preguntaModelo(Empleado, 'telefono', 'Phone (optional):')
    ]);
    const id = await servicioEmpleados.crear(r);
    exito(`Employee created with ID ${id}.`);
}

export async function listarEmpleados() {
    titulo('Employees');
    const empleados = await servicioEmpleados.listar();
    tabla(empleados.map((e) => ({
        ID: e.id, Name: e.nombre, Position: e.puesto, Email: e.correo, Active: e.activo ? 'yes' : 'no'
    })));
}
```

### 10.7 — Conectar al menú (opcional, en `scr/utils/menus.js`)
```js
import * as empleados from '../prompts/empleados.js';

const menu_empleados = () => correrMenu('S T A F F', ':]', [
    { nombre: 'CREATE EMPLOYEE', accion: empleados.crearEmpleado },
    { nombre: 'LIST EMPLOYEES',  accion: empleados.listarEmpleados }
]);
```
Y agregar `{ name: '+  STAFF', value: menu_empleados },` en las opciones de `main_menu()`.

### 10.8 — Si piden enlazarla a `contrato` (opcional, no obligatorio)
Esto SÍ toca una tabla existente, pero de forma segura: `NULL` por defecto, no rompe filas actuales.
```sql
ALTER TABLE contrato ADD COLUMN empleado_id INT NULL,
    ADD CONSTRAINT fk_contrato_empleado FOREIGN KEY (empleado_id) REFERENCES empleado(id);
```
Con eso, `ContratoFactory.crear({ ..., empleado_id })` y el `INSERT` de `contrato_repo.js` solo necesitan
agregar ese campo a la lista de columnas e interrogantes, siguiendo el mismo patrón que los demás campos.

---


# Guía: cómo agregar una tabla nueva a PeakFit

Esta guía explica el procedimiento completo para agregar cualquier tabla nueva al proyecto, de forma que
quede integrada en **todas** las capas: base de datos, modelo, repositorio, servicio, contenedor, prompts
y menú. Sigue el mismo orden en que está construido el resto del proyecto: de abajo hacia arriba.

Se usa como ejemplo una tabla llamada `empleado`, ya probada contra MySQL real. Para agregar tu propia tabla,
sustituye `empleado` por el nombre de tu tabla y ajusta los campos.

---

## Mapa de las 8 capas (en orden)

```
 1. SQL           →  crea la tabla en MySQL
 2. Modelo        →  valida los datos antes de guardarlos
 3. Repositorio    →  unico lugar que escribe SQL para esa tabla
 4. Servicio       →  reglas de negocio (y transaccion, si aplica)
 5. Contenedor     →  conecta repositorio + servicio
 6. Prompts        →  preguntas al usuario (inquirer)
 7. Menu           →  navegacion para llegar a esos prompts
 8. Prueba manual  →  correr la app y confirmar que funciona
```

**Regla importante:** siempre se construye en este orden. No tiene sentido escribir el prompt (paso 6) si
el servicio (paso 4) todavía no existe, porque no habría nada que llamar.

---

## Paso 1 — Crear la tabla en MySQL

Agrega el `CREATE TABLE` al final de `scr/db/peakfitdb.sql`, o ejecútalo aparte con `mysql -u root -p peakfit`.

```sql
CREATE TABLE empleado (
    id              INT AUTO_INCREMENT PRIMARY KEY,
    nombre          VARCHAR(100) NOT NULL,
    puesto          ENUM('ENTRENADOR', 'NUTRICIONISTA', 'RECEPCION', 'ADMIN') NOT NULL,
    correo          VARCHAR(150) NOT NULL UNIQUE,
    telefono        VARCHAR(20),
    activo          BOOLEAN NOT NULL DEFAULT TRUE,
    created_at      TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;
```

**Qué decidir aquí:**
- **Nombre de la tabla:** singular y en minúsculas, igual que `cliente`, `contrato`, `plan_entrenamiento`.
- **¿Se relaciona con otra tabla?** Si sí, agrega una columna `FOREIGN KEY` (por ejemplo `cliente_id INT`
  con `REFERENCES cliente(id)`). Si la tabla es independiente, como `empleado`, no hace falta ninguna.
- **¿Se borra o se desactiva?** Si vas a "eliminar" registros, decide si será un `DELETE` real o una columna
  `activo BOOLEAN` como las de `cliente`. El proyecto usa desactivación para conservar historial.

**Si quieres enlazarla a una tabla que ya existe** (por ejemplo, un contrato asignado a un empleado), esa
columna se agrega con `ALTER TABLE` y debe ser `NULL` por defecto para no romper las filas que ya existen:
```sql
ALTER TABLE contrato ADD COLUMN empleado_id INT NULL,
    ADD CONSTRAINT fk_contrato_empleado FOREIGN KEY (empleado_id) REFERENCES empleado(id);
```

---

## Paso 2 — Crear el modelo (`scr/models/<tabla>.js`)

El modelo define, campo por campo, el tipo de dato, si es obligatorio, y su formato o rango. Hereda de la
clase base `Modelo`, que ya sabe validar y guardar: tú solo declaras el `esquema`.

```js
// scr/models/empleado.js
import { Modelo } from './modelo.js';

export const PUESTOS = ['ENTRENADOR', 'NUTRICIONISTA', 'RECEPCION', 'ADMIN'];

export class Empleado extends Modelo {
    static esquema = {
        id:        { tipo: 'entero', min: 1 },
        nombre:    { tipo: 'texto', requerido: true, largoMax: 100 },
        puesto:    { tipo: 'enum', requerido: true, valores: PUESTOS },
        correo:    { tipo: 'correo', requerido: true },
        telefono:  { tipo: 'telefono' },
        activo:    { tipo: 'booleano', porDefecto: true }
    };
}
```

**Tipos disponibles** (ya definidos en `scr/validators/validador.js`, no hay que crear nada nuevo):
`texto`, `entero`, `decimal`, `fecha`, `correo`, `telefono`, `url`, `booleano`, `enum`.

**Checklist de este paso:**
- [ ] Cada columna de la tabla SQL tiene su campo en el esquema (menos `created_at`, que MySQL llena solo).
- [ ] Los campos `NOT NULL` del SQL tienen `requerido: true` en el modelo.
- [ ] Si hay un `ENUM` en SQL, hay un `{ tipo: 'enum', valores: [...] }` que coincide exactamente.

---

## Paso 3 — Crear el repositorio (`scr/repositories/<tabla>_repo.js`)

El repositorio es la **única** capa que escribe SQL para esta tabla. Hereda de `RepositorioBase`, que ya
tiene el método `ejecutar()` para mandar consultas de forma segura (con `?` en vez de pegar valores directo).

```js
// scr/repositories/empleado_repo.js
import { RepositorioBase } from './repositorio_base.js';

export class EmpleadoRepositorio extends RepositorioBase {
    async crear(e, conexion) {
        const r = await this.ejecutar(
            `INSERT INTO empleado (nombre, puesto, correo, telefono) VALUES (?, ?, ?, ?)`,
            [e.nombre, e.puesto, e.correo, e.telefono], conexion);
        return r.insertId;
    }

    async listar({ soloActivos = false } = {}) {
        return this.ejecutar(
            `SELECT * FROM empleado ${soloActivos ? 'WHERE activo = 1' : ''} ORDER BY id DESC`);
    }

    async buscarPorId(id, conexion) {
        const filas = await this.ejecutar(`SELECT * FROM empleado WHERE id = ?`, [id], conexion);
        return filas[0] ?? null;
    }

    async actualizar(id, e, conexion) {
        const r = await this.ejecutar(
            `UPDATE empleado SET nombre = ?, puesto = ?, correo = ?, telefono = ?, activo = ? WHERE id = ?`,
            [e.nombre, e.puesto, e.correo, e.telefono, e.activo ? 1 : 0, id], conexion);
        return r.affectedRows;
    }

    async desactivar(id, conexion) {
        const r = await this.ejecutar(`UPDATE empleado SET activo = 0 WHERE id = ?`, [id], conexion);
        return r.affectedRows;
    }
}
```

**Por qué cada método recibe `conexion` como segundo parámetro (opcional):** si esta operación participa en
una transacción (ver paso 4), se le pasa la conexión de esa transacción. Si no, se deja sin pasar y usa el
pool normal por defecto. Esto es lo que permite que un repositorio funcione igual dentro y fuera de una
transacción.

**Checklist de este paso:**
- [ ] El número de `?` en el SQL coincide exactamente con el número de valores en el arreglo.
- [ ] El orden de las columnas en el `INSERT`/`UPDATE` coincide con el orden de los valores en el arreglo.
- [ ] Cada método acepta `conexion` como último parámetro (aunque no siempre se use).

---

## Paso 4 — Crear el servicio (`scr/services/service_<tabla>.js`)

El servicio tiene la lógica de negocio: valida con el modelo, traduce errores de MySQL a mensajes
entendibles, y decide si una operación necesita transacción.

```js
// scr/services/service_empleados.js
import { Empleado } from '../models/empleado.js';
import { ErrorNegocio } from '../utils/errores.js';

export class ServicioEmpleados {
    constructor(repoEmpleados) {
        this.repoEmpleados = repoEmpleados;
    }

    async crear(datos) {
        const empleado = new Empleado(datos);           // valida todos los campos
        try {
            return await this.repoEmpleados.crear(empleado);
        } catch (e) {
            if (e.code === 'ER_DUP_ENTRY') throw new ErrorNegocio('Ya existe un empleado con ese correo.');
            throw e;
        }
    }

    listar(opciones) {
        return this.repoEmpleados.listar(opciones);
    }

    async obtener(id) {
        const empleado = await this.repoEmpleados.buscarPorId(id);
        if (!empleado) throw new ErrorNegocio(`No existe el empleado #${id}.`);
        return empleado;
    }

    async actualizar(id, cambios) {
        const actual = await this.obtener(id);
        const empleado = new Empleado({ ...actual, ...cambios });   // revalida el resultado final
        await this.repoEmpleados.actualizar(id, empleado);
    }

    async desactivar(id) {
        await this.obtener(id);
        await this.repoEmpleados.desactivar(id);
    }
}
```

### ¿Esta tabla necesita una transacción?

Usa `conTransaccion()` **solo si** una operación debe guardar en más de una tabla a la vez, o si depende del
estado de otra tabla al mismo tiempo (por ejemplo, "solo si el contrato sigue ACTIVO"). Si la tabla es
independiente y cada operación toca solo esa tabla, como `empleado`, **no hace falta transacción**: el
código de arriba es suficiente.

**Si sí la necesita**, el patrón es este (copiado de `service_planes.js`):
```js
import { conTransaccion } from '../utils/transaccion.js';

async crearConAlgoMas(datos) {
    return conTransaccion(async (conexion) => {
        const otraFila = await this.repoOtraTabla.buscarPorId(datos.otroId, conexion, { bloquear: true });
        if (!otraFila) throw new ErrorNegocio('...');
        const id = await this.repoEmpleados.crear(datos, conexion);
        // mas pasos aqui, todos con la misma "conexion"
        return id;
    });
}
```

**Checklist de este paso:**
- [ ] El servicio **nunca** escribe SQL directamente; siempre llama al repositorio.
- [ ] Todo error esperado (duplicado, no encontrado) se convierte en `ErrorNegocio` con un mensaje claro.
- [ ] Si hay transacción, todos los repositorios involucrados reciben la misma `conexion`.

---

## Paso 5 — Registrar en el contenedor (`scr/contenedor.js`)

Aquí es el único lugar donde se "arma" el repositorio y se le entrega al servicio. Son 2 líneas nuevas; no
se toca nada de lo que ya existe.

```js
// al inicio, junto a los demás imports:
import { EmpleadoRepositorio } from './repositories/empleado_repo.js';
import { ServicioEmpleados } from './services/service_empleados.js';

// junto a las demás instancias de repositorios:
const repoEmpleados = new EmpleadoRepositorio();

// junto a los demás "export const servicio...":
export const servicioEmpleados = new ServicioEmpleados(repoEmpleados);
```

**Por qué se hace así (y no que el servicio cree su propio repositorio):** es el principio de Inversión de
Dependencias (la "D" de SOLID). El servicio recibe el repositorio ya armado; no sabe ni le importa cómo se
construyó.

---

## Paso 6 — Crear los prompts (`scr/prompts/<tabla>.js`)

Los prompts son las preguntas al usuario con `inquirer`. Reutiliza `preguntaModelo`, que toma la regla de
validación directamente del esquema del modelo (así el usuario ve el error mientras escribe, con las mismas
reglas del paso 2).

```js
// scr/prompts/empleados.js
import inquirer from 'inquirer';
import { Empleado, PUESTOS } from '../models/empleado.js';
import { servicioEmpleados } from '../contenedor.js';
import { exito, titulo, tabla } from '../utils/consola.js';
import { preguntaModelo, confirmar } from './comunes.js';

export async function crearEmpleado() {
    titulo('Create employee');
    const r = await inquirer.prompt([
        preguntaModelo(Empleado, 'nombre', 'Full name:'),
        { type: 'select', name: 'puesto', message: 'Position:', choices: PUESTOS },
        preguntaModelo(Empleado, 'correo', 'Email:'),
        preguntaModelo(Empleado, 'telefono', 'Phone (optional):')
    ]);
    const id = await servicioEmpleados.crear(r);
    exito(`Employee created with ID ${id}.`);
}

export async function listarEmpleados() {
    titulo('Employees');
    const empleados = await servicioEmpleados.listar();
    tabla(empleados.map((e) => ({
        ID: e.id, Name: e.nombre, Position: e.puesto, Email: e.correo, Active: e.activo ? 'yes' : 'no'
    })));
}

export async function desactivarEmpleado() {
    titulo('Deactivate employee');
    const empleados = await servicioEmpleados.listar({ soloActivos: true });
    if (empleados.length === 0) return console.log('No hay empleados activos.');
    const { id } = await inquirer.prompt([{
        type: 'select', name: 'id', message: 'Select an employee:',
        choices: empleados.map((e) => ({ name: `#${e.id}  ${e.nombre}`, value: e.id }))
    }]);
    if (!(await confirmar('Deactivate this employee?'))) return;
    await servicioEmpleados.desactivar(id);
    exito('Employee deactivated.');
}
```

**Nota:** para campos de tipo `enum` (como `puesto`), usa `{ type: 'select', choices: [...] }` en vez de
`preguntaModelo`, porque el usuario debe elegir de una lista, no escribir texto libre.

---

## Paso 7 — Conectar al menú (`scr/utils/menus.js`)

Agrega el import junto a los demás, al inicio del archivo:
```js
import * as empleados from '../prompts/empleados.js';
```

Define un submenú nuevo, con el mismo patrón que los existentes (`menu_clientes`, `menu_entrenamiento`, etc.):
```js
const menu_empleados = () => correrMenu('S T A F F', ':]', [
    { nombre: 'CREATE EMPLOYEE',     accion: empleados.crearEmpleado },
    { nombre: 'LIST EMPLOYEES',      accion: empleados.listarEmpleados },
    { nombre: 'DEACTIVATE EMPLOYEE', accion: empleados.desactivarEmpleado }
]);
```

Y agrega una opción dentro de `main_menu()`, en la lista de `choices` (antes de `EXIT`):
```js
{ name: '+  STAFF', value: menu_empleados },
```

No hace falta tocar nada más: `correrMenu` es el mismo motor que ya usan todos los demás submenús.

---

## Paso 8 — Probar que funciona

1. Carga la tabla nueva en tu base de datos:
   ```bash
   mysql -u root -p peakfit < scr/db/peakfitdb.sql
   ```
   (o ejecuta solo el `CREATE TABLE` nuevo si no quieres recargar todo).

2. Verifica que no haya errores de sintaxis antes de abrir la app:
   ```bash
   node --check scr/models/empleado.js
   node --check scr/repositories/empleado_repo.js
   node --check scr/services/service_empleados.js
   node --check scr/prompts/empleados.js
   ```

3. Corre la app y navega hasta el menú nuevo:
   ```bash
   npm start
   ```

4. Prueba, en este orden: crear un registro, listarlo, y si tiene desactivar, desactivarlo y confirmar que
   ya no aparece en `listar({ soloActivos: true })`.

---

## Checklist final (resumen de las 8 capas)

- [ ] `scr/db/peakfitdb.sql` — tabla creada con `CREATE TABLE`
- [ ] `scr/models/<tabla>.js` — esquema con validación por campo
- [ ] `scr/repositories/<tabla>_repo.js` — CRUD con SQL parametrizado (`?`)
- [ ] `scr/services/service_<tabla>.js` — valida, traduce errores, decide si usa transacción
- [ ] `scr/contenedor.js` — 2 líneas nuevas: import + instancias
- [ ] `scr/prompts/<tabla>.js` — preguntas con `inquirer`, reutilizando `preguntaModelo`
- [ ] `scr/utils/menus.js` — import + submenú + opción en `main_menu()`
- [ ] Probado manualmente con `npm start`

---

## Errores comunes al seguir estos pasos

| Error | Causa típica |
|---|---|
| `Table 'xxx' already exists` al cargar el SQL | Ya habías cargado esa tabla antes; usa `DROP TABLE IF EXISTS xxx;` antes del `CREATE TABLE`, o carga solo las tablas nuevas. |
| `Unknown column 'xxx' in field list` | El nombre de la columna en el `INSERT`/`UPDATE` del repositorio no coincide con el SQL. Revisa que estén escritos exactamente igual. |
| El formulario no valida nada | Olvidaste usar `preguntaModelo` y escribiste un `{ type: 'input', ... }` a mano, sin `validate`. |
| `servicioEmpleados is not defined` en un prompt | Falta el `export const servicioEmpleados = ...` en `contenedor.js`, o falta el `import` en el archivo del prompt. |
| El menú nuevo no aparece | Falta agregar la opción dentro de la lista `choices` de `main_menu()` en `menus.js`. |
| `ER_DUP_ENTRY` no se traduce a un mensaje claro | Falta el `try/catch` en el método `crear` del servicio (ver paso 4). |

---

## Variante: si la tabla necesita transacción

Si tu tabla nueva depende de otra (por ejemplo, "solo se puede crear un X si el Y sigue ACTIVO", o "al crear
un X también se debe actualizar Y"), el único paso que cambia es el 4 (el servicio). Usa `conTransaccion()`
como se explicó arriba, y revisa `scr/services/service_planes.js` como referencia completa: ahí están los
cuatro ejemplos reales del proyecto (`asignarPlan`, `renovarPlan`, `cancelarPlan`, `finalizarPlan`).

