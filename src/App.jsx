import { useEffect, useState } from "react";
import { object } from "prop-types";
import { generarId } from "./helpers";
import Header from "./components/Header";
import Modal from "./components/Modal";
import ListadoGastos from "./components/ListadoGastos";
import IconoNuevoGasto from "./img/nuevo-gasto.svg";
import Filtros from "./components/Filtros";

function App() {
  const [presupuesto, setPresupuesto] = useState(
    Number(localStorage.getItem('Presupuesto')?? 0)
  );
  const [isValidPresupuesto, setIsValidPresupuesto] = useState(false);
  const [modal, setModal] = useState(false);
  const [animarModal, setAnimarModal] = useState(false);
  const [gastos, setGastos] = useState(
    localStorage.getItem('gastos') ? JSON.parse(localStorage.getItem('gastos')):[]
  )
const [gastoEditar, setGastoEditar] = useState({});
const [filtro, setFiltro] =useState('')
const [gastosFiltrados, setGastosFiltrados] =useState([])

  useEffect(() => {
    if (Object.keys(gastoEditar).length > 0) {
    setModal(true);
    setTimeout(() => {
    setAnimarModal(true);
    }, 300);
    }
  }, [gastoEditar]);
//Verificar si hay un presupuesto valido para no mostrar la pantalla de inicio
  useEffect(() => {
    const presupuestoLS = Number(localStorage.getItem('Presupuesto')?? 0)
    if(presupuestoLS>=0){
      setIsValidPresupuesto(true)
    }
  }, []);
//Guardar en LocalStorage los gastos
  useEffect(() => {
    localStorage.setItem('gastos', JSON.stringify(gastos)?? [])
  }, [gastos]);
///Guardar en LocalStorage el Presupuesto
  useEffect(() => {
    localStorage.setItem('Presupuesto', presupuesto ?? 0)
  }, [presupuesto]);
//para filtrar gastos
  useEffect(() => {
    if(filtro){
      //Filtrar gastos por categoria
      const gastosFiltrados= gastos.filter(gasto => gasto.categoria === filtro)
      setGastosFiltrados(gastosFiltrados)
    }
  }, [filtro]);
//Para abrir el modal con nuevo gasto
  const handleNuevoGasto = () => {
    setModal(true);
    setGastoEditar({})
    setTimeout(() => {
    setAnimarModal(true);
    }, 300);
  };
// para guardar un nuevo gasto
  const guardarGasto = (gasto) => {
    //para actualizar un gasto
    if(gasto.id){
      const gastosActualizados = gastos.map(gastoState=> gastoState.id === gasto.id ? gasto : gastoState)
      setGastos(gastosActualizados)
      setGastoEditar({})
    }else{ //sino guarda uno nuevo
      gasto.id = generarId();
      gasto.fecha = Date.now();
      setGastos([...gastos, gasto]);
    }
    
    setAnimarModal(false);
    setTimeout(() => {
      setModal(false);
    }, 300);
  };

  const eliminarGasto = id =>{
    console.log('Eliminando ', id)
      const gastosActualizados = gastos.filter(gasto => gasto.id !== id)
      setGastos(gastosActualizados)
  }
  return (
    <div className={modal ? "fijar" : ""}>
      <Header
        gastos={gastos}
        setGastos={setGastos}
        presupuesto={presupuesto}
        setPresupuesto={setPresupuesto}
        isValidPresupuesto={isValidPresupuesto}
        setIsValidPresupuesto={setIsValidPresupuesto}
      />
      {isValidPresupuesto && (
        <>
          <main>
            <Filtros
              filtro={filtro}
              setFiltro={setFiltro}
            />
            <ListadoGastos 
            gastos={gastos} 
            setGastoEditar={setGastoEditar} 
            eliminarGasto={eliminarGasto}
            filtro={filtro}
            gastosFiltrados={gastosFiltrados}
            />
          </main>
          <div className="nuevo-gasto">
            <img
              src={IconoNuevoGasto}
              alt="IconoNuevoGasto"
              onClick={handleNuevoGasto}
            />
          </div>
        </>
      )}
      {modal && (
        <Modal
          setModal={setModal}
          animarModal={animarModal}
          setAnimarModal={setAnimarModal}
          guardarGasto={guardarGasto}
          gastoEditar={gastoEditar}
          setGastoEditar={setGastoEditar}
        />
      )}
    </div>
  );
}

export default App;
