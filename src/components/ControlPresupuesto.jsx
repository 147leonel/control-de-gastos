import React from 'react'
import { useState, useEffect } from 'react'
import { CircularProgressbar, buildStyles} from 'react-circular-progressbar'
import 'react-circular-progressbar/dist/styles.css'




const ControlPresupuesto = ({
  gastos,
  setGastos,
  presupuesto, 
  setPresupuesto,
  setIsValidPresupuesto
}) => {
const [disponible, setDisponible]=useState(0)
const [gastado, setGastado]= useState(0)
const [porcentaje, setPorcentaje] = useState(0)
useEffect(() => {
    const totalGastado= gastos.reduce((total, gasto)=> gasto.cantidad + total, 0)
    setGastado(totalGastado)
    const totalDisponible = presupuesto - totalGastado
    const nuevoPorcentaje = ((presupuesto - totalDisponible)/ presupuesto * 100).toFixed(2)
    setDisponible(totalDisponible)
    setTimeout(() => {
      setPorcentaje(nuevoPorcentaje)
    }, 700);

  }, [gastos]);

  const formatearCantidad = (cantidad)=>{
    return cantidad.toLocaleString('es-GT', {
      style: 'currency',
      currency:'GTQ'
    })
  }

  const handleResetApp = ()=>{
    const resultado = confirm('¿Deseas reiniciar presupuesto y gastos?')
    if (resultado) {
      setGastos([])
      setPresupuesto(0)
      setIsValidPresupuesto(false)
    }
  }
  return (
    <div className='contenedor-presupuesto contenedor sombra dos-columnas'>
        <div>
            < CircularProgressbar 
            value={porcentaje} 
            styles={buildStyles({
              //para modificar valores del estilo
              pathColor: porcentaje>100 ? 'red' : ''
            })}
            text={`${porcentaje}% gastado` }
            />
        </div>
        <div className='contenido-presupuesto'>
          <button 
          className='reset-app' 
          type='button'
          onClick={handleResetApp}
          >Resetear app</button>
            <p>
                <span>Presupuesto: </span>{formatearCantidad(presupuesto)}
            </p>
            <p className={`${disponible <0 ? 'negativo' : '' }`}>
                <span>Disponible: </span>{formatearCantidad(disponible)}
            </p>
            <p>
                <span>Gastado: </span>{formatearCantidad(gastado)}
            </p>

        </div>

    </div>
  )
}

export default ControlPresupuesto