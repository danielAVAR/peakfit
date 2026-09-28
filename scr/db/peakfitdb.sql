-- INDICE DE BASES DE DATOS 
--  1. cliente
--  2. plan_entrenamiento
--  3. contrato               
--  4. seguimiento_fisico
--  5. foto_seguimiento
--  6. plan_alimentacion
--  7. alimento
--  8. registro_alimento
--  9. categoria_movimiento
-- 10. movimiento_financiero 
CREATE DATABASE IF NOT EXISTS gimnasio CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE gimnasio;

-- 1. CLIENTE
CREATE TABLE cliente (
    id                  INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    nombre              VARCHAR(100) NOT NULL,
    fecha_nacimiento    DATE NOT NULL,
    telefono            VARCHAR(20)  NOT NULL,
    correo_electronico  VARCHAR(120) NOT NULL UNIQUE,
    activo              BOOLEAN NOT NULL DEFAULT TRUE,
    created_at          TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;

-- 2. PLAN DE ENTRENAMIENTO

CREATE TABLE plan_entrenamiento (
    id             INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    nombre_plan    VARCHAR(100) NOT NULL UNIQUE,
    duracion_dias  SMALLINT UNSIGNED NOT NULL CHECK (duracion_dias > 0),
    metas_fisicas  TEXT NOT NULL,
    nivel          ENUM('PRINCIPIANTE','INTERMEDIO','AVANZADO') NOT NULL,
    precio_base    DECIMAL(10,2) NOT NULL CHECK (precio_base >= 0)
) ENGINE=InnoDB;

-- 3. CONTRATO 
CREATE TABLE contrato (
    id                  INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    cliente_id          INT UNSIGNED NOT NULL,
    plan_id             INT UNSIGNED NOT NULL,
    condiciones         TEXT NOT NULL,
    precio              DECIMAL(10,2) NOT NULL CHECK (precio >= 0),
    fecha_inicio        DATE NOT NULL,
    fecha_fin           DATE NOT NULL,
    estado              ENUM('ACTIVO','RENOVADO','CANCELADO','FINALIZADO') NOT NULL DEFAULT 'ACTIVO',
    contrato_origen_id  INT UNSIGNED NULL,
    created_at          TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CHECK (fecha_fin > fecha_inicio),
    FOREIGN KEY (cliente_id)         REFERENCES cliente(id),
    FOREIGN KEY (plan_id)            REFERENCES plan_entrenamiento(id),
    FOREIGN KEY (contrato_origen_id) REFERENCES contrato(id),
    UNIQUE KEY uq_contrato_cliente (id, cliente_id)   -- respalda la FK compuesta de movimiento_financiero
) ENGINE=InnoDB;

-- 4. SEGUIMIENTO FÍSICO

CREATE TABLE seguimiento_fisico (
    id              INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    contrato_id     INT UNSIGNED NOT NULL,
    fecha           DATE NOT NULL,
    peso_kg         DECIMAL(5,2) NOT NULL CHECK (peso_kg > 0),
    grasa_corporal  DECIMAL(4,1) CHECK (grasa_corporal BETWEEN 0 AND 100),
    cintura_cm      DECIMAL(5,1) CHECK (cintura_cm > 0),
    pecho_cm        DECIMAL(5,1) CHECK (pecho_cm > 0),
    cadera_cm       DECIMAL(5,1) CHECK (cadera_cm > 0),
    brazo_cm        DECIMAL(5,1) CHECK (brazo_cm > 0),
    muslo_cm        DECIMAL(5,1) CHECK (muslo_cm > 0),
    comentarios     TEXT,
    puntuaje        TINYINT UNSIGNED CHECK (puntuaje BETWEEN 1 AND 10),
    UNIQUE KEY uq_seguimiento_fecha (contrato_id, fecha),
    FOREIGN KEY (contrato_id) REFERENCES contrato(id)
) ENGINE=InnoDB;

-- 5. FOTO DE SEGUIMIENTO (una medición puede tener varias fotos -> 1FN)
CREATE TABLE foto_seguimiento (
    id              INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    seguimiento_id  INT UNSIGNED NOT NULL,
    url             VARCHAR(255) NOT NULL,
    FOREIGN KEY (seguimiento_id) REFERENCES seguimiento_fisico(id) ON DELETE CASCADE
) ENGINE=InnoDB;

-- 6. PLAN DE ALIMENTACIÓN

CREATE TABLE plan_alimentacion (
    id           INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    contrato_id  INT UNSIGNED NOT NULL,
    nombre       VARCHAR(100) NOT NULL,
    descripcion  TEXT,
    FOREIGN KEY (contrato_id) REFERENCES contrato(id)
) ENGINE=InnoDB;

-- 7. ALIMENTO (catálogo; las calorías dependen solo del alimento)
CREATE TABLE alimento (
    id                   INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    nombre               VARCHAR(100) NOT NULL UNIQUE,
    unidad               VARCHAR(20)  NOT NULL,
    calorias_por_unidad  DECIMAL(7,2) NOT NULL CHECK (calorias_por_unidad >= 0)
) ENGINE=InnoDB;

-- 8. REGISTRO DE ALIMENTOS POR DÍA
CREATE TABLE registro_alimento (
    id                    INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    plan_alimentacion_id  INT UNSIGNED NOT NULL,
    alimento_id           INT UNSIGNED NOT NULL,
    fecha                 DATE NOT NULL,
    tipo_comida           ENUM('DESAYUNO','ALMUERZO','CENA','SNACK') NOT NULL,
    cantidad              DECIMAL(7,2) NOT NULL CHECK (cantidad > 0),
    FOREIGN KEY (plan_alimentacion_id) REFERENCES plan_alimentacion(id) ON DELETE CASCADE,
    FOREIGN KEY (alimento_id)          REFERENCES alimento(id)
) ENGINE=InnoDB;

-- 9. CATEGORÍA DE MOVIMIENTO

CREATE TABLE categoria_movimiento (
    id      TINYINT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    nombre  VARCHAR(40) NOT NULL UNIQUE,
    tipo    ENUM('INGRESO','EGRESO') NOT NULL
) ENGINE=InnoDB;

INSERT INTO categoria_movimiento (nombre, tipo) VALUES
    ('Mensualidad',        'INGRESO'),
    ('Sesión individual',  'INGRESO'),
    ('Servicios',          'EGRESO'),
    ('Suplementos',        'EGRESO'),
    ('Gasto operativo',    'EGRESO');

-- 10. MOVIMIENTO FINANCIERO (ingresos y egresos)

CREATE TABLE movimiento_financiero (
    id            INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    categoria_id  TINYINT UNSIGNED NOT NULL,
    cliente_id    INT UNSIGNED NULL,
    contrato_id   INT UNSIGNED NULL,
    descripcion   VARCHAR(200),
    monto         DECIMAL(10,2) NOT NULL CHECK (monto > 0),
    fecha         DATE NOT NULL,
    FOREIGN KEY (categoria_id) REFERENCES categoria_movimiento(id),
    FOREIGN KEY (cliente_id)   REFERENCES cliente(id),
    FOREIGN KEY (contrato_id, cliente_id) REFERENCES contrato(id, cliente_id)
) ENGINE=InnoDB;

