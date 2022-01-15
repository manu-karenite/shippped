import React from "react";

function NotFound() {
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col">
          <div className="card text-center">
            <div className="card-body">
              <h2 className="card-title text-danger">404 ! NOT FOUND</h2>
              <p className="card-text">
                <pre className="text-warning h5">
                  This is an Invalid Route. Kindly Go to Home Page.
                </pre>
              </p>
              <a href="/home" className="btn btn-success">
                Visit Home
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NotFound;
