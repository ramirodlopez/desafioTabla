import logo from './logo.svg';
import './App.css';
import axios from "axios";
import React, { useState, useEffect } from 'react';

function App() {
    const [loading, setLoading] = useState(true)
    const [tableData, setTableData] = useState([])
    const [auxTableData, setAuxTableData] = useState([])
    const [estaClickeadoFI, setEstaClickeadoFI] = useState(true)
    const [estaClickeadoTW, setEstaClickeadoTW] = useState(true)
    const [estaClickeadoTH, setEstaClickeadoTH] = useState(true)
    

        useEffect(() => {
        const fetchData = async () => {
            const { data } = await axios.get("https://rickandmortyapi.com/api/character");
            setTableData(data.results);
            setAuxTableData(data.results);
            setLoading(false);
        };
    
        fetchData();
     }, []);

      const onFirstFilter = () => {
          if (estaClickeadoFI) {
            const filteredData = tableData.filter(dato => dato.status === "Alive");
            setTableData(filteredData);
            setEstaClickeadoFI(false);
        } else {
          
            setTableData(auxTableData);
            setEstaClickeadoFI(true);
            
        }

              
      }

      const onSecondFilter = () => {
        if (estaClickeadoTW) {
            const filteredData = tableData.filter(dato => dato.species === "Human");
            setTableData(filteredData);
            setEstaClickeadoTW(false);
        } else {
            setTableData(auxTableData);
            setEstaClickeadoTW(true);
            
        }

    }

    const onThirdFilter = () => {
        if (estaClickeadoTH) {
            const filteredData = tableData.filter(dato => dato.gender === "Male");
            setTableData(filteredData);
            setEstaClickeadoTH(false);
        } else {
            setTableData(auxTableData);
            setEstaClickeadoTH(true);
            
        }

    }



    if (loading) {
        return <p className='spinner'></p>
    }

    return <div>
              <h2>DESAFIO TABLAS</h2>
              <div className='container-btn'>
                  <button className={`btn ${!estaClickeadoFI ? 'black' : ''}`} onClick={onFirstFilter}>STATUS</button>
                  <button className={`btn ${!estaClickeadoTW ? 'black' : ''}`} onClick={onSecondFilter}>SPECIES</button>
                  <button className={`btn ${!estaClickeadoTH ? 'black' : ''}`} onClick={onThirdFilter}>GENDER</button> 
              </div>
              <div className='container'>
              <table>
                  <tr>
                      <th>Name</th>
                      <th>State</th>
                      <th>Species</th>
                      <th>Gender</th>
                  </tr>
                  {tableData.map(dato =>
                      <tr>
                          <td>{dato.name}</td>
                          <td>{dato.status}</td>
                          <td>{dato.species}</td>
                          <td>{dato.gender}</td>
                      </tr>
                  )}
              </table>
             </div>
          </div>
};

export default App;
