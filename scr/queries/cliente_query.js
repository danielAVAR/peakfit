export const clienteQueries = {

    create: `
        INSERT INTO cliente (
            nombre,
            fecha_nacimiento,
            telefono,
            correo_electronico
        )
        VALUES (?, ?, ?, ?)
    `,

    findAll: `
        SELECT
            id,
            nombre,
            fecha_nacimiento,
            telefono,
            correo_electronico,
            activo,
            created_at
        FROM cliente
        ORDER BY id DESC
    `,

    findById: `
        SELECT
            id,
            nombre,
            fecha_nacimiento,
            telefono,
            correo_electronico,
            activo,
            created_at
        FROM cliente
        WHERE id = ?
    `,

    update: `
        UPDATE cliente
        SET
            nombre = ?,
            fecha_nacimiento = ?,
            telefono = ?,
            correo_electronico = ?,
            activo = ?
        WHERE id = ?
    `,

    delete: `
        DELETE FROM cliente
        WHERE id = ?
    `,

    deactivate: `
        UPDATE cliente
        SET activo = 0
        WHERE id = ?
    `

};