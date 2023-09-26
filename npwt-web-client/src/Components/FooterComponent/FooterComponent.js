function FooterComponent() {
    return (  

        <div className="container-fluid bg-dark text-light footer position-sticky wow fadeIn " data-wow-delay="0.1s">
        <div className="container py-5">
          <div className="row g-5">
            <div className="col-lg-3 col-md-6">
              <h5 className="text-light mb-4">Address</h5>
              <p className="mb-2"><i className="fa fa-map-marker-alt me-3" />123 Street, New York, USA</p>
              <p className="mb-2"><i className="fa fa-phone-alt me-3" />+012 345 67890</p>
              <p className="mb-2"><i className="fa fa-envelope me-3" />info@example.com</p>
              <div className="d-flex pt-2">
                <a className="btn btn-outline-light btn-social rounded-circle" href=""><i className="fab fa-twitter" /></a>
                <a className="btn btn-outline-light btn-social rounded-circle" href=""><i className="fab fa-facebook-f" /></a>
                <a className="btn btn-outline-light btn-social rounded-circle" href=""><i className="fab fa-youtube" /></a>
                <a className="btn btn-outline-light btn-social rounded-circle" href=""><i className="fab fa-linkedin-in" /></a>
              </div>
            </div>
            <div className="col-lg-3 col-md-6">
              <h5 className="text-light mb-4">Services</h5>
              <a className="btn btn-link" href="">Cardiology</a>
              <a className="btn btn-link" href="">Pulmonary</a>
              <a className="btn btn-link" href="">Neurology</a>
              <a className="btn btn-link" href="">Orthopedics</a>
              <a className="btn btn-link" href="">Laboratory</a>
            </div>
            <div className="col-lg-3 col-md-6">
              <h5 className="text-light mb-4">Quick Links</h5>
              <a className="btn btn-link" href="">About Us</a>
              <a className="btn btn-link" href="">Contact Us</a>
              <a className="btn btn-link" href="">Our Services</a>
              <a className="btn btn-link" href="">Terms &amp; Condition</a>
              <a className="btn btn-link" href="">Support</a>
            </div>
            
          </div>
        </div>
        <div className="container">
          <div className="copyright">
            <div className="row">
              <div className="col-md-6 text-center text-md-start mb-3 mb-md-0">
                © <a className="border-bottom" href="#">Your Site Name</a>, All Right Reserved.
              </div>
              <div className="col-md-6 text-center text-md-end">
                {/*/*** This template is free as long as you keep the footer author’s credit link/attribution link/backlink. If you'd like to use the template without the footer author’s credit link/attribution link/backlink, you can purchase the Credit Removal License from "https://htmlcodex.com/credit-removal". Thank you for your support. *** /*/}
                Designed By <a className="border-bottom" href="https://htmlcodex.com">HTML Codex</a>
                <br />
                Distributed By <a className="border-bottom" href="https://themewagon.com" target="_blank">ThemeWagon</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
}

export default FooterComponent ;