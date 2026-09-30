### COMO SE INTREGA FACTORY AL PROYECTO 


La funcion de factories es crear un objeto para despues declarar su informacion con reposity. 

#### Lo que factory es:

- Una fabrica de objetos vacios 
- crea una plantilla funcional donde se define su tipo de informacion y sus reglas 

#### Lo que NO es:

- no es un metodo que inserta o actualiza el objeto 



```
                    USUARIO
                       │
                       ▼
                  INTERFAZ / CLI
                       │
                       ▼
                    SERVICE
                       │
              "Necesito crear
                un contrato"
                       │
                       ▼
              ContratoFactory
                       │
          recibe los parámetros
                       │
          ┌────────────┼────────────┐
          ▼            ▼            ▼
      cliente_id      plan      fecha_inicio
                       │
                       ▼
              APLICA REGLAS
                       │
          ┌────────────┼─────────────┐
          ▼            ▼             ▼
       precio       fecha_fin      estado
     del plan      calculada       ACTIVO
          │            │             │
          └────────────┼─────────────┘
                       ▼
                new Contrato(...)
                       │
                       ▼
                    return
                       │
                       ▼
                    SERVICE
                       │
                       ▼
             ContratoRepository
                       │
                       ▼
                     MySQL
```

# FLUJO





## EJECUCION 4

1. PRIMER PASO: Se importa el modelo requerido 

2. SEGUNDO PASO: se crea el export class para que otros archivos llamen al contratoFactory class

3. TERCER PASO: se crear el metodo static crear para crear el objeto de contrato con los parametros (cliente, plan, fecha_inicio, contrato_origen_id = null)

Aqui hay dos puntos importantes. Static y los parametros: 

#### static:
 el objetivo de static es que al llamar este metodo,que no sea necesario tener que instancear. es decir que el metodo pertenece a la clase en si, no al objeto creado de la clase 

porque use static?

este metodo de la clase no tiene la necesidad de recordar datos especificos. solo crear los campos para despues se asginados por el modelo.


#### parametros:

 el proposito de los parametros es agarrar la informacion del cliente para poder crear el contrato, asignando los parametros a los campos. para despues con RETURN enviarlo a services. 
