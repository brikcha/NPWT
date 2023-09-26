import React from 'react'
import {  Input,Button } from 'reactstrap';
import './Pagination.css'
import { Link } from 'react-router-dom';
import { FaPlus } from 'react-icons/fa';
export default function HeaderTableUser({limit,changeLimit,handleSearchSubmit,handleSearchTermChange,max }) {
  return (
    <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center" }}>
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center" }}>
      <Input
          type="number"
          placeholder={`${limit}`}
          value={limit}
          onChange={(e) => {
              const newValue = parseInt(e.target.value);
              let updatedValue = newValue;
              const currentValue = parseInt(limit);
              if (newValue < 5) {
                  updatedValue = 5;
              } else if (newValue > max) {
                updatedValue=max;
              }else if(newValue > currentValue){
                updatedValue = Math.ceil(newValue / 5) * 5;
              }else{
                updatedValue = (Math.ceil(newValue / 5)-1) * 5;
              }
              changeLimit({ target: { value: updatedValue } }); 
          }}
          style={{ width: "70px", fontSize: "14px" }}
          className="mr-2 form-control"
          min={5}
          max={max}
      />

        <div className="input-group-append">
        <Link to="/utilisateur/ajouter" style={{ textDecoration: "none", color: "inherit" }}>
      <Button color="success">
        Ajouter <FaPlus />
      </Button>
    </Link>
          
        </div>
      </div>
      <div className="search-container" style={{ position:"absolute", right:"15px" }}>
        <div style={{ margin: "0 auto" }}>
          <div style={{ display:  "flex", alignItems: "flex-end", justifyContent: "flex-end", textAlign: "left"}} >
            <div onSubmit={handleSearchSubmit} style={{ display: "flex", justifyContent: "flex-end", alignItems: "flex-end" }}>
              <input type="text" placeholder="Rechercher" className="form-control mr-2" 
                style={{ borderRadius: "10px", fontSize: "14px", height: "40px", width: "300px", }}
                onChange={handleSearchTermChange}/>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
