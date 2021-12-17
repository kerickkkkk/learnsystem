import React, { Component } from 'react'
export class NavComponent extends Component {
  render() {
    return (
      <main>
        <div class="container py-4">
          <div class="p-5 mb-4 bg-light rounded-3">
            <div class="container-fluid py-5">
              <h1 class="display-5 fw-bold">Learning System</h1>
              <p class="col-md-8 fs-4">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque molestiae dicta natus provident quo beatae quos, porro aut error suscipit iusto excepturi exercitationem. Rem vitae eius voluptatem nobis adipisci sint.
              </p>
              <button class="btn btn-primary btn-lg" type="button">
                See how it works.
              </button>
            </div>
          </div>

          <div class="row align-items-md-stretch">
            <div class="col-md-6">
              <div class="h-100 p-5 text-white bg-dark rounded-3">
                <h2>As a student</h2>
                <p>
                  Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quam, omnis temporibus eius laudantium sunt aliquam voluptatum, nostrum velit, accusamus repellendus amet? Provident, dolorum omnis. Mollitia similique saepe ducimus obcaecati excepturi?
                </p>
                <button class="btn btn-outline-light" type="button">
                  Login or Register Now
                </button>
              </div>
            </div>
            <div class="col-md-6">
              <div class="h-100 p-5 bg-light border rounded-3">
                <h2>As an Instructor</h2>
                <p>
                  Lorem, ipsum dolor sit amet consectetur adipisicing elit. Voluptate non repellat dolorem quia, libero eveniet quae quibusdam doloremque dolor illum cupiditate distinctio autem nulla ad officia odit quas, sunt hic.
                </p>
                <button class="btn btn-outline-secondary" type="button">
                  Login or Register Now
                </button>
              </div>
            </div>
          </div>

          <footer class="pt-3 mt-4 text-muted border-top">
            &copy; 
          </footer>
        </div>
      </main>
    )
  }
}

export default NavComponent
