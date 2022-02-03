import React from 'react'
function NavComponent() {
  return (
    <main>
      <div className="container py-4">
        <div className="p-5 mb-4 bg-light rounded-3">
          <div className="container-fluid py-5">
            <h1 className="display-5 fw-bold">Learning System</h1>
            <p className="col-md-8 fs-4">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque molestiae dicta natus provident quo beatae quos, porro aut error suscipit iusto excepturi exercitationem. Rem vitae eius voluptatem nobis adipisci sint.
            </p>
            <button className="btn btn-primary btn-lg" type="button">
              See how it works.
            </button>
          </div>
        </div>

        <div className="row align-items-md-stretch">
          <div className="col-md-6">
            <div className="h-100 p-5 text-white bg-dark rounded-3">
              <h2>As a student</h2>
              <p>
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quam, omnis temporibus eius laudantium sunt aliquam voluptatum, nostrum velit, accusamus repellendus amet? Provident, dolorum omnis. Mollitia similique saepe ducimus obcaecati excepturi?
              </p>
              <button className="btn btn-outline-light" type="button">
                Login or Register Now
              </button>
            </div>
          </div>
          <div className="col-md-6">
            <div className="h-100 p-5 bg-light border rounded-3">
              <h2>As an Instructor</h2>
              <p>
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Voluptate non repellat dolorem quia, libero eveniet quae quibusdam doloremque dolor illum cupiditate distinctio autem nulla ad officia odit quas, sunt hic.
              </p>
              <button className="btn btn-outline-secondary" type="button">
                Login or Register Now
              </button>
            </div>
          </div>
        </div>

        <footer className="pt-3 mt-4 text-muted border-top">
          &copy; 
        </footer>
      </div>
    </main>
  )
}

export default NavComponent
