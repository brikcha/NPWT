import React, { useState } from 'react';
import axios from 'axios';
import { Button, Input, Form, FormGroup, Label,CustomInput } from 'reactstrap';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';

const MachineAdd = () => {
  const [machine, setMachine] = useState({
    reference: '',
    etat: '',
    disponiblite: '',
  });
  const [etatError, setEtatError] = useState(''); 

  const handleAdd = async () => {
    try {
      await axios.post(`${process.env.REACT_APP_BACKEND_URL}/machine/addMachine`, machine);
      Swal.fire({
        title: 'Machine',
        text: 'Ajout réussi !',
        icon: 'success',
        confirmButtonText: 'Ok',
      });
    } catch (error) {
      Swal.fire({
        title: 'Machine: Erreur lors de l\'ajout.',
        text: `${error}`,
        icon: 'error',
        confirmButtonText: 'Ok',
      });
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setMachine((prevMachine) => ({
      ...prevMachine,
      [name]: value,
    }));
  };

  const validateEtat = () => {
    const etatValues = ['activee', 'endommagee']; // Liste des valeurs d'état possibles
    if (!etatValues.includes(machine.etat)) {
      setEtatError('État invalide');
    }
  };

  return (
    <div className="d-flex justify-content-center">
      <img
        className="imgForm img-fluid d-none d-lg-block position-absolute"
        alt="..."
        src={require('assets/img/brand/img.jpg')}
        style={{ height: '100vh', width: '100%' }}
      />
      <div className="container align-middle">
        <div className="d-flex justify-content-center">
          <div className="card-body col-lg-12 offset-lg-5">
            <Form>
              <h1 className="text-center mb-2">Ajouter Machine</h1>
              <FormGroup>
                <Label>Référence</Label>
                <Input
                  type="text"
                  name="reference"
                  value={machine.reference}
                  onChange={handleChange}
                  required
                />
              </FormGroup>
                <FormGroup>
                <Label>État</Label>
                <CustomInput
                  type="select"
                  name="etat"
                  value={machine.etat}
                  onChange={handleChange}
                  required
                >
                  <option value="">Sélectionnez l'état</option>
                  <option value="activee">Active</option>
                  <option value="endommagee">Endommagée</option>
                </CustomInput>
              </FormGroup>
              <FormGroup>
                <Label>Disponibilité</Label>
                <CustomInput
                  type="select"
                  name="disponibilite"
                  value={machine.disponibilite}
                  onChange={handleChange}
                  required
                >
                  <option value="">Sélectionnez la disponibilité</option>
                  <option value="disponible">Disponible</option>
                  <option value="non disponible">Non Disponible</option>
                </CustomInput>
              </FormGroup>
              {/* Ajoutez ici le champ de disponibilité de la machine de la même manière que l'état */}
              <div className="text-center">
                <Button color="primary" onClick={handleAdd}>
                  Ajouter la machine
                </Button>
                <Link to="/admin/machines/table">
                  <Button color="outline-primary" className="ms-1">
                    Retour
                  </Button>
                </Link>
              </div>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MachineAdd;