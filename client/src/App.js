import logo from './logo.svg';
import './App.css';
import {IoMdClose} from "react-icons/io";
import { useState, useEffect } from 'react';
import axios from "axios";
import {Formtable} from './components/Formtable';

axios.defaults.baseURL = "http://localhost:5050/";

function App() {

  const [addSection, setAddSection] = useState(false)
  const [editSection, setEditSection] = useState(false)
  const [formData, setFormData] = useState({

    vendorName : "",
    bankAccountNo: "",
    bankName: "",
    addressLine1: "",
    addressLine2: "",
    city: "",
    country: "",
    zipCode: "",

  })

  const [formDataEdit, setFormDataEdit] = useState({

    vendorName : "",
    bankAccountNo: "",
    bankName: "",
    addressLine1: "",
    addressLine2: "",
    city: "",
    country: "",
    zipCode: "",
    _id: ""

  })
  

  const [dataList, setDataList] = useState([])

  const handleOnChange = (e) => {
    const {value, name} = e.target
    setFormData((preve) => {
      return{
        ...preve,
        [name] : value
      }
    })
  }

  const handleSubmit = async(e) => {
    e.preventDefault()
    
    const data = await axios.post("/create", formData)
    console.log(data)
    if(data.data.success){
      setAddSection(false)
      alert(data.data.message)
      getFetchData()
      setFormData({
        vendorName : "",
        bankAccountNo: "",
        bankName: "",
        addressLine1: "",
        addressLine2: "",
        city: "",
        country: "",
        zipCode: "",

      })
    }
  }

  const getFetchData = async()=>{
    const data = await axios.get("/")
    console.log(data)
    if(data.data.success){
      setDataList(data.data.data)
    }
  }

  useEffect(()=>{
    getFetchData()
  }, [])

  const handleDelete = async(id) => {
    const data = await axios.delete("/delete/"+id)
    
    if(data.data.success){
      getFetchData()
      alert(data.data.message)
    }
  }

  const handleUpdate = async(e) => {

    e.preventDefault()
    const data = await axios.put("/update",formDataEdit)
    if(data.data.success){
      getFetchData()
      alert(data.data.message)
      setEditSection(false)
    }
    
  }
  const handleEditOnChange = async(e) => {
    const {value, name} = e.target
    setFormDataEdit((preve) => {
      return{
        ...preve,
        [name] : value
      }
    })

  }

  const handleEdit = (e1) => {
    setFormDataEdit(e1)
    setEditSection(true)
  }

  return (
    <>
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
      </head>
      
      <div className="container">
      <h1 style={{ textAlign: 'center', color: 'blueviolet'}}>VENDORS MANAGEMENT SYSTEM</h1>
        <button className="btn btn-add" onClick={() => setAddSection(true)}>Create</button>

        {
          addSection && (
            <Formtable 
            handleSubmit={handleSubmit} 
            handleOnChange={handleOnChange} 
            handleClose = {() => setAddSection(false)}
            rest = {formData}
            />

          
          )
        }
        {
          editSection && (
            <Formtable 
            handleSubmit={handleUpdate} 
            handleOnChange={handleEditOnChange} 
            handleClose = {() => setEditSection(false)}
            rest = {formDataEdit}
            />
          )
        }

        <div className='tableContainer'>
          <table>
            <thead>
              <tr>
                <th>Vendor Name</th>
                <th>Bank Account Number</th>
                <th>Bank Name</th>
                <th>Address Line 1</th>
                <th>Address Line 2</th>
                <th>City</th>
                <th>Country</th>
                <th>ZipCode</th>
                <th>
                   
                </th>

              </tr>
            </thead>
            <tbody>
              { dataList[0] ? (
                dataList.map((e1) =>{
                  return(
                    <tr>
                      <td>{e1.vendorName}</td>
                      <td>{e1.bankAccountNo}</td>
                      <td>{e1.bankName}</td>
                      <td>{e1.addressLine1}</td>
                      <td>{e1.addressLine2}</td>
                      <td>{e1.city}</td>
                      <td>{e1.country}</td>
                      <td>{e1.zipCode}</td>
                      <td>
                        <button className='btn btn-edit' onClick={() =>handleEdit(e1)}>Edit</button>
                        <button className='btn btn-delete' onClick={()=>handleDelete(e1._id)}>Delete</button> 
                      </td>
                    </tr>
                  )
                }))
                : (
                  <p style={{textAlign : "center"}}>No data</p>
                )
              }
            </tbody>
          </table>
        </div>
        

      </div>
      <footer>
        Project Done by Priya Agadi - Company JS Tigers
      </footer>
    </>
  );
}

export default App;
