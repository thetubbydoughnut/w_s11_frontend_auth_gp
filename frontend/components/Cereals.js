import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

export default function Cereals() {
  const [cereals, setCereals] = useState([])
  const navigate = useNavigate()

  const logout = () => {
    // wipe the token from local storage
    localStorage.removeItem('token')
    // redirecting user to login
    navigate('/')
  }

  useEffect(() => {
    // grab token from local storage
    const token = localStorage.getItem('token')
    // if not there, navigate user back to login
    if (!token) {
      navigate('/')
    } else {
      const fetchCereals = async () => {
        try {
          const response = await axios.get(
            'api/cereals',
            { headers: { Authorization: token}}
          )
          setCereals(response.data)
        } catch (error) {
          if (error?.resposne?.status == 401) logout()
        }
        // GET cereals, appending token to Authorization header
        // if response is a 401 Unauthorized perform a logout
        // if response is OK set the cereals in component state
      }
      fetchCereals()
    }
  }, [])

  return (
    <div className="container">
      <h3>Cereals List <button onClick={logout}>Logout</button></h3>
      {cereals.length > 0 ? (
        <div>
          {cereals.map((cereal) => (
            <div key={cereal.id} style={{ marginBottom: '20px' }} className="cereal">
              <h4>{cereal.name}</h4>
              <p>Brand: {cereal.brand}</p>
              <p>Sugar content: {cereal.sugarContent}</p>
              <p>{cereal.history}</p>
            </div>
          ))}
        </div>
      ) : (
        <p>No cereals found.</p>
      )}
    </div>
  )
}
