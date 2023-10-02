import React from "react";
import "../App.css"
import {IoMdClose} from 'react-icons/io'

export const Formtable = ({handleSubmit, handleOnChange, handleClose, rest}) => {
    return (
        <div className="addContainer">
            <form onSubmit={handleSubmit}>
              <div className='close-btn' onClick={handleClose}><IoMdClose/></div>
              <label htmlFor="vendorName">Vendor Name : *</label>
              <input type="text" id="vendorName" name="vendorName" onChange={handleOnChange} value={rest.vendorName} required/>

              <label htmlFor="bankAccountNo">Bank Account Number : *</label>
              <input type="number" id="bankAccountNo" name="bankAccountNo" onChange={handleOnChange} value={rest.bankAccountNo} required/>

              <label htmlFor="bankName">Bank Name : *</label>
              <input type="text" id="bankName" name="bankName" onChange={handleOnChange} value={rest.bankName} required/>

              <label htmlFor="addressLine1">Address Line 1 : </label>
              <input type="text" id="addressLine1" name="addressLine1" onChange={handleOnChange} value={rest.addressLine1}/>

              <label htmlFor="addressLine2">Address Line 2 : </label>
              <input type="text" id="addressLine2" name="addressLine2" onChange={handleOnChange} value={rest.addressLine2}/>

              <label htmlFor="city">City : </label>
              <input type="text" id="city" name="city" onChange={handleOnChange} value={rest.city}/>

              <label htmlFor="country">Country : </label>
              <input type="text" id="country" name="country" onChange={handleOnChange} value={rest.country}/>

              <label htmlFor="zipCode">ZipCode : </label>
              <input type="number" id="zipCode" name="zipCode" onChange={handleOnChange} value={rest.zipCode}/>

              <button className="btn">Submit</button>

            </form>
          </div>
    )
}