# pbackend_examen_nodeexpress
Este es mi examen para la materia de Programacion Backend

## Tabla de contenidos
1. [Inicializar servidores](#Inicializar-servidores)
2. [Alta, baja, modificacion y consulta de datos](#Alta,-baja,-modificacion-y-consulta-de-datos)

## Inicializar servidores
Para instalar y configurar este proyecto, sigue estos pasos:

```bash
# clonar repositorio
git clone https://github.com/jeronimohuincaman/pbackend_examen_nodeexpress.git

# Navegar hasta el directorio del proyecto
cd pbackend_examen_nodeexpress

# Inicializar backend. Requerido tener levantado xampp en el puerto 3306.
npm run back

# Inicializar front (opcional)
npm run front
```
## Alta, baja, modificacion y consulta de datos

### Consulta
```http
GET localhost:3000/productos
```
| Accion | Parametros     | Description                |
| :-------- | :------- | :------------------------- |
| `(vacio)` | `` | Lista todos los productos |
| `/:idproducto` | `` | Trae un solo producto |
| `/filtrados` | `?categoria=""` | Lista por categorias|
| `/ordenados` | `?sort="(cantidad/precio/nombre)"` | |

### Alta en json
```http
POST localhost:3000/productos
```
#### Payload
```json
{
	"nombre": "Acolchado",
	"precio": 20,
	"cantidad": 40,	
	"categoria": "Hogar"
}
```

### Modificacion en json
```http
PUT localhost:3000/productos/:idproducto
```
#### Payload
```json
{
	"nombre": "Acolchado",
	"precio": 20,
	"cantidad": 40,	
	"categoria": "Hogar"
}
```

### Baja
```http
PUT localhost:3000/productos/:idproducto
```