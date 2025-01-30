import {useOktaAuth} from '@okta/okta-react';
import { Link } from "react-router-dom";

export const Heroes = () => {

  const {authState} = useOktaAuth();


    return (
      <div>
        <div className="d-none d-lg-block">
          <div className="row g-0 mt-5">
            <div className="col-sm-6 col-md-6">
              <div className="col-image-left"></div>
              </div>
              <div className="col-4 col-md-4 container d-flex justify-content-center align-items-center">
                <div className="ml-2">
                  <h1>What have you been reading?</h1>
                  <p className="lead">
                    The Library would love to know what you have been reading.
                    Whether it is to learn a new skill or grow within one, we will
                    be able to provide top content to you!
                  </p>
                  {authState?.isAuthenticated ?
                      <Link type='button' className='btn btn-primary btn-lg' to='search'>Explore top Books</Link>
                      :
                      <Link to='/login' className="btn btn-primary btn-lg text-white">
                        Sign in
                      </Link>
                  }

                </div>
              </div>
          </div>
          <div className="row g-0">
            <div className="col-4 col-md-4 container d-flex justify-content-center align-items-center">
              <div className="ml-2">
                <h1>Our collection is always changing</h1>
                <p className="lead">
                  Try to check daily because our collection is always changing! We
                  work nonstop to provide the most accurate book selection
                  possible!
                </p>
              </div>
            </div>
            <div className="col-sm-6 col-md-6">
              <div className="col-image-right"></div>
            </div>
          </div>
        </div>
  
  
        {/* Mobile Heroes */}
        <div className="d-lg-none">
          <div className="container">
            <div className="m-2">
              <div className="col-image-left"></div>
                <div className="mt-2">
                  <h1>What have you been reading?</h1>
                  <p className="lead">
                    The Library would love to know what you have been reading.
                    Whether it is to learn a new skill or grow within one, we will
                    be able to provide top content to you!
                  </p>
                  {authState?.isAuthenticated ?
                  <Link type='button' className='btn btn-primary btn-lg' to='search'>Explore Top Books</Link>
                      :
                  <Link to='/login' className="btn btn-primary btn-lg">Sign up</Link>
                  }
                </div>
                </div>
              <div className="m-2">
                <div className="col-image-right"></div>
                <div className="mt-2">
                  <h1>Our collection is always changing</h1>
                  <p className="lead">
                    Try to check daily because our collection is always changing!
                    We work nonstop to provide the most accurate book selection
                    possible!
                  </p>
                </div>
              </div>
          </div>
        </div>
      </div>
    );
  };