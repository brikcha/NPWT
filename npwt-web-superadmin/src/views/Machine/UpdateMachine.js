import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Input, Form, FormGroup, Label, CustomInput, FormFeedback } from 'reactstrap';
import { Link, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';

const MachineEdit = () => {
  const { id } = useParams(); // Récupérez l'ID de la machine à partir de l'URL
  const [machine, setMachine] = useState({
    reference: '',
    etat: '',
    disponibilite: '',
    patientAffecte: '', // Ajoutez le champ patientAffecte
    dateDebut: '', // Ajoutez le champ dateDebut
    dateFin: '', // Ajoutez le champ dateFin
    dateFinEtendu: '', // Ajoutez le champ dateFinEtendu
  });
  const [etatError, setEtatError] = useState('');

  useEffect(() => {
    // Chargez les détails de la machine à partir de l'API backend lorsque le composant est monté
    axios.get(`${process.env.REACT_APP_BACKEND_URL}/machine/getMachineDetails/${id}`)
      .then((response) => {
        const machineData = response.data;
        setMachine({
          reference: machineData.reference,
          etat: machineData.etat,
          disponibilite: machineData.disponibilite,
          patientAffecte: machineData.patientAffecte || '', // Assurez-vous de gérer le cas où patientAffecte est null
          dateDebut: machineData.dateDebut || '',
          dateFin: machineData.dateFin || '',
          dateFinEtendu: machineData.dateFinEtendu || '',
        });
      })
      .catch((error) => {
        console.error('Erreur lors du chargement des détails de la machine', error);
      });
  }, [id]);

  const handleUpdate = async () => {
    try {
      await axios.put(`${process.env.REACT_APP_BACKEND_URL}/machine/updateMachine/${id}`, machine);
      Swal.fire({
        title: 'Machine',
        text: 'Mise à jour réussie !',
        icon: 'success',
        confirmButtonText: 'Ok',
      });
    } catch (error) {
      Swal.fire({
        title: 'Machine: Erreur lors de la mise à jour.',
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
    const etatValues = ['activee', 'endommagee'];
    if (!etatValues.includes(machine.etat)) {
      setEtatError('État invalide');
    } else {
      setEtatError(''); // Réinitialisez l'erreur si l'état est valide
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
              <h1 className="text-center mb-2">Modifier Machine</h1>
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
              <div className='row'>
                <FormGroup className='col-6' style={{ marginTop:"-15px" }}>
                  <Label>État</Label>
                  <CustomInput
                    type="select"
                    name="etat"
                    value={machine.etat}
                    onChange={handleChange}
                    onBlur={validateEtat} // Validez l'état lorsque l'utilisateur quitte le champ
                    required
                  >
                    <option value="">Sélectionnez l'état</option>
                    <option value="activee">Active</option>
                    <option value="endommagée">Endommagée</option>
                  </CustomInput>
                  {etatError && <FormFeedback>{etatError}</FormFeedback>}
                </FormGroup>
                <FormGroup className='col-6' style={{ marginTop:"-15px" }}>
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
              </div>

              <FormGroup style={{ marginTop:"-15px" }}>
                <Label>Patient affecté</Label>
                <Input
                  type="text"
                  name="patientAffecte"
                  value={machine.patientAffecte}
                  onChange={handleChange}
                />
              </FormGroup>
              <div className='row'>
                <FormGroup className='col-6' style={{ marginTop:"-15px" }}>
                  <Label>Date de début</Label>
                  <Input 
                    type="date"
                    name="dateDebut"
                    value={machine.dateDebut.slice(0, 10)}
                    onChange={handleChange}
                  />
                </FormGroup>
                <FormGroup className='col-6' style={{ marginTop:"-15px" }}>
                  <Label>Date de fin</Label>
                  <Input
                    type="date"
                    name="dateFin"
                    value={machine.dateFin.slice(0, 10)}
                    onChange={handleChange}
                  />
                </FormGroup>
              </div>
              <FormGroup style={{ marginTop:"-15px" }}>
                <Label>Date de fin étendue</Label>
                <Input
                  type="date"
                  name="dateFinEtendu"
                  value={machine.dateFinEtendu.slice(0, 10)}
                  onChange={handleChange}
                />
              </FormGroup>
              <div className="text-center">
                <Button color="primary" onClick={handleUpdate}>
                  Mettre à jour la machine
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

export default MachineEdit;