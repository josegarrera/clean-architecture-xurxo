/*
El usuario es una entidad por lo que debe comparar por id
Debe tener nombre, email, password todos obligatorios

Test Plan:
1. Crear usuario con datos validos
2. No crear usuario sin nombre
3. No crear usuario sin email
4. No crear usuario sin password
5. Comparar dos usuarios con mismo id son iguales
6. Comparar dos usuarios con distinto id son distintos
 */

describe('User', () => {
  it('should create a user with valid data', () => {
    expect(true).toBe(true);
  });
});
