import {Link} from 'react-router-dom';
import { Card, CardHeader, CardBody, NavbarBrand, Navbar,  Container} from "reactstrap";
  import backgroundVideo from "../../assets/img/brand/video.mp4"
import Img from "../../assets/img/brand/mailVerif.jpg"

function PasswordVerification () {
  return (   
    <>
        <Navbar className="navbar-top navbar-horizontal navbar-dark" style={{ position:"absolute" }} expand="md">
          <Container className="px-4">
            <NavbarBrand to="/" tag={Link}>
              <img style={{ width:"140px", height:"60px" }}
                alt="..."
                src={require("../../assets/img/brand/npwtLogo.jpg")}
              />
            </NavbarBrand>
          </Container>
        </Navbar>
        <video autoPlay loop muted style={{ position: "fixed", objectFit: "cover", zIndex: "-1",}}>
          <source src={backgroundVideo} type="video/mp4" />
          Your browser does not support the video tag.
        </video> 
        <div className='vh-100 d-flex justify-content-center align-items-center'>
          <div className="container">
            <div className="col-12  col-lg-6  offset-lg-3 .col-md-6 .offset-md-3 ">
              <div className="card rounded">
                <Card className="bg-secondary shadow border-0 px-4 text-center">
                  <CardHeader className="bg-transparent pb-1">
                    <h1 className="font-weight-bold mb-3">Réinitialisation du mot de passe</h1>
                  </CardHeader>
                  <CardBody className="px-lg-2 py-lg-3">
                    <p className="text-muted">Vérifiez votre boîte de réception pour réinitialiser votre mot de passe.</p>
                    <div className="row mb-1">
                      <div className="col-md-8 offset-md-2">
                        <img className="img-fluid" src={Img} alt="send_mail" />
                      </div>
                    </div>
                    <Link to ={'/registre'}>Retourner à la page d'inscription</Link>
                  </CardBody>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </>
      );
}

export default PasswordVerification;