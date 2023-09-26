function AboutComponent() {


    return (

        <>
            <section>
                <div className="container-xxl py-5">
                    <div className="container">
                        <div className="row g-5">
                            <div className="col-lg-6 wow fadeIn" data-wow-delay="0.1s">
                                <div className="d-flex flex-column">
                                    <img className="img-fluid rounded w-75 align-self-end" src="../assetsTemplates/template1/img/about-1.jpg" alt="" />
                                    <img className="img-fluid rounded w-50 bg-white pt-3 pe-3" src="../assetsTemplates/template1/img/about-2.jpg" alt="" style={{ marginTop: '-25%' }} />
                                </div>
                            </div>
                            <div className="col-lg-6 wow fadeIn" data-wow-delay="0.5s">
                                <p className="d-inline-block border rounded-pill py-1 px-4">About Us</p>
                                <h1 className="mb-4">Why You Should Trust Us? Get Know About Us!</h1>
                                <p>Tempor erat elitr rebum at clita. Diam dolor diam ipsum sit. Aliqu diam amet diam et eos. Clita erat ipsum et lorem et sit, sed stet lorem sit clita duo justo magna dolore erat amet</p>
                                <p className="mb-4">Stet no et lorem dolor et diam, amet duo ut dolore vero eos. No stet est diam rebum amet diam ipsum. Clita clita labore, dolor duo nonumy clita sit at, sed sit sanctus dolor eos.</p>
                                <p><i className="far fa-check-circle text-primary me-3" />Quality health care</p>
                                <p><i className="far fa-check-circle text-primary me-3" />Only Qualified Doctors</p>
                                <p><i className="far fa-check-circle text-primary me-3" />Medical Research Professionals</p>
                                <a className="btn btn-primary rounded-pill py-3 px-5 mt-3" href="">Read More</a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

        </>

    );
}

export default AboutComponent;