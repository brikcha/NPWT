import { useEffect, useState } from "react";
import jwt_decode from "jwt-decode";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import '../NavBarComponent/sideNavbarUpdateProfile';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import moment from 'moment';
import SidebarApp from '../NavBarComponent/SidebarApp';
import Alert from "react-bootstrap/Alert";


function WorktimeDoc() {
    const [doctor, setDoctor] = useState({});
    const [doctorId, setDoctorId] = useState('');
    const [selectedDates, setSelectedDates] = useState([]);
    const [dates, setDates] = useState([]);
    const [dates0, setDates0] = useState(false);
    const [dates1, setDates1] = useState(false);

    // Function to handle when a date is selected on the calendar
    const handleDateSelect = (date) => {
        const formattedDate = moment(date).format('YYYY-MM-DD');
        setSelectedDates([...selectedDates, date]);
        setDates([...dates, formattedDate]);
    };


    const handleSubmit = () => {
        if (dates.length > 0) {
            axios.put(`${process.env.REACT_APP_BACKEND_URL}/appointment/addApp/${doctorId}`, {
                "WorkTime": dates
            }).then((response) => {
                setDates1(true)
                setTimeout(() => {
                    setDates1(false);
                  }, 3000);
                // toast.success(`Worktime added for doctor ${response.data.userName}`, {
                //     position: toast.POSITION.BOTTOM_RIGHT
                // });
            }).catch((error) => {
                toast.error(`An error occurred while adding worktime: ${error.response.data.message}`, {
                    position: toast.POSITION.BOTTOM_RIGHT
                });
            })
        }
        else {
            setDates0(true);
            setTimeout(() => {
                setDates0(false);
              }, 3000);
            // toast.warning(`Please select worktime`, {
            //     position: toast.POSITION.BOTTOM_RIGHT
            // });
        }
    }


    useEffect(() => {
        const token = localStorage.getItem("jwtToken");
        if (token) {
            const decodedToken = jwt_decode(token);
            axios
                .get(`${process.env.REACT_APP_BACKEND_URL}/patient/getUserById/${decodedToken.id}`)
                .then((response) => {
                    setDoctor(response.data);
                    setDoctorId(response.data._id);
                })
                .catch((error) => {
                    console.error(error);
                });
        }
    }, []);




    return (
        <>
            <ToastContainer />
            <div className="container pt-5  ">
                <div className=" row  ">
                    <SidebarApp></SidebarApp>
                    <div className="col-lg-8  mb-5">
                        <div className="  ">
                            {/* Account details card*/}
                            <div className="card cardMD px-5 cardRes">
                                <div className="card-header ">
                                    <i className="fas fa-user-md iconMed" />
                                    Add your worktime Mr {doctor.userName}
                                </div>
                                <div className="card-body">
                                    {dates1 &&
                                        (<div>
                                            <Alert
                                                className="form-group"
                                                variant="success"
                                                style={{ marginTop: "-13px" }}
                                            >
                                                <div
                                                    className="form-icon-wrapper"
                                                    style={{ marginTop: "-11px", marginBottom: "-13px" }}
                                                >
                                                    Worktime added successfully
                                                </div>
                                            </Alert>
                                        </div>)
                                    }
                                    <div className="form-group d-flex flex-row">
                                        <div style={{ width: "50%" }} className="offset-md-1">
                                            <label htmlFor="worktime"><b>Select worktime dates:</b></label>
                                            <Calendar
                                                onChange={handleDateSelect}
                                                value={selectedDates}
                                                minDate={new Date()}
                                            />
                                        </div>
                                        <div style={{ width: "50%", marginLeft: "50px" }}>
                                            {selectedDates.length > 0 && (
                                                <>
                                                    <label><b>Selected dates:</b></label>
                                                    <div style={{ backgroundColor: "white", borderRadius: "10px" }}>
                                                        <ul>
                                                            {selectedDates.map((date, index) => (
                                                                <li key={index}>{date.toLocaleDateString()}</li>
                                                            ))}
                                                        </ul>
                                                    </div>
                                                </>
                                            )}
                                        </div>
                                    </div>

                                    {dates0 &&
                                        (<div>
                                            <Alert
                                                className="form-group"
                                                variant="danger"
                                                style={{ marginTop: "-13px" }}
                                            >
                                                <div
                                                    className="form-icon-wrapper  text-danger"
                                                    style={{ marginTop: "-11px", marginBottom: "-13px" }}
                                                >
                                                    You have to choose your worktime dates first
                                                </div>
                                            </Alert>
                                        </div>)
                                    }



                                </div>
                                <button
                                    className="btn btn-primary offset-md-7"
                                    style={{ width: "180px", marginBottom: "30px", marginTop: "0px" }}
                                    type="button"
                                    onClick={handleSubmit}
                                >
                                    Save worktime
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default WorktimeDoc;