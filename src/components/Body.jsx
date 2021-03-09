import React, { useState, useEffect } from 'react'
import axios from 'axios'

const Body = () => {
  const [userId, setUserId] = useState('')
  const [brand, setBrand] = useState('')
  const [model, setModel] = useState('')
  const [color, setColor] = useState('')
  const [licensePlate, setlicensePlate] = useState('')
  const [carsList, setCarsList] = useState([])
  const [updateStyle, setUpdateStyle] = useState(null)

  useEffect(() => {
    const getCars = async () => {
      await axios.get('http://localhost:3001/cars') 
      .then(response => {
          setCarsList(response.data)
      }).catch(error => {
          console.log(error)
      })
    }
    getCars()   
  }, [setCarsList])

  const getCars = async () => {
    await axios.get('http://localhost:3001/cars') 
    .then(response => {
        setCarsList(response.data)
    }).catch(error => {
        console.log(error)
    })
  }

  const getData = async (id) => {
    await axios.get(`http://localhost:3001/cars/${id}`)
      .then(response => {
          console.log(response.data)
          const {brand, model, color, license_plate} = response.data
          setUpdateStyle(true)
          setBrand(brand)
          setModel(model)
          setColor(color)
          setlicensePlate(license_plate)
          setUserId(id)
      }).catch(error => {
          console.log(error)
      })
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    setBrand('')
    setModel('')
    setColor('')
    setlicensePlate('')

    await axios('http://localhost:3001/cars', {
      method: 'POST',
      data: {
        brand: brand,
        model: model,
        color: color,
        license_plate: licensePlate
      },
      headers: {
        'accept': 'application/json'
      },
      }).then(response => {
        console.log(response.data)
        getCars()
        alert('Has registrado un automóvil con éxito')
      }).catch(error => {
        console.log(error)
    })   
  }
  
  const handleDelete = async (id) => {
    await axios(`http://localhost:3001/cars/${id}`, {
      method: 'DELETE',
    }).then(response => {
      console.log(response.data);
      getCars()
    }).catch(error => {
      console.log(error)
    })   
  }

  const handleUpdate = async (e) => {
    e.preventDefault()

    setBrand('')
    setModel('')
    setColor('')
    setlicensePlate('')

    await axios(`http://localhost:3001/cars/${userId}`, {
      method: 'PUT',
      data: {
        brand: brand,
        model: model,
        color: color,
        license_plate: licensePlate
      },
      headers: {
        'accept': 'application/json'
      },
    }).then(response => {
      console.log(response.data);
      setUpdateStyle(false)
      getCars()
    }).catch(error => {
      console.log(error)
    })
  }   
  

  return (
    <div className='app-body'>
      <form className='form-group' onSubmit= { updateStyle ? handleUpdate : handleSubmit}>
        <input 
          onChange={(e)=>{setBrand(e.target.value)}} 
          className='form-control mb-3' 
          type='text' 
          placeholder='Introduce la marca'
          value={brand}
          required
        />
        <input 
          onChange={(e)=>{setModel(e.target.value)}} 
          className='form-control mb-3' 
          type='text' 
          placeholder='Introduce el modelo'
          value={model}
          required
        />
        <input 
          onChange={(e)=>{setColor(e.target.value)}} 
          className='form-control mb-3' 
          type='text' 
          placeholder='Introduce el color'
          value={color}
          required
        />
        <input 
          onChange={(e)=>{setlicensePlate(e.target.value)}} 
          className='form-control mb-3' 
          type='text' 
          placeholder='Introduce la patente'
          value={licensePlate}
          required
        />
        {updateStyle ? 
          ( <input className='btn btn-info btn-block' type='submit' value='Actualizar Auto'/>
          )   
          : 
          ( <input className='btn btn-info btn-block' type='submit' value='Registrar Auto'/>
          ) 
        } 
      </form>
      <div className='col'>
        <ul className='list-grow'>
          {carsList.length!==0 ? (
            carsList.map(item =>
              <li key={item.id} className='list-group-item'>
                {item.brand} | {item.model} | {item.color} | {item.license_plate}
                  <button className='btn btn-outline-danger float-right btn-sm' 
                    onClick={(id)=> (handleDelete(item.id))}>
                      Borrar 
                  </button>
                  <button className='btn btn-outline-warning float-right btn-sm'
                    onClick={(id)=> (getData(item.id))}>
                    Actualizar 
                  </button>
              </li>
            )
          ) : 
          ( 
            <span> No hay automóviles que mostrar </span>
          )
          }
        </ul>
      </div>
    </div>
  )
}

export default Body