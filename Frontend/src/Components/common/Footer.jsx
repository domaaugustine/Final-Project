import React from 'react'

function Footer() {
  return (
    <div className='footer mt-5 d-flex flex-column justify-content-between'>
    < hr />
      <div className="three row row-cols-1 row-cols-sm-1 row-cols-md-2 row-cols-lg-3 mt-3 px-4 ">

        <div className='col'>
          <h4> Help</h4>
          <ul className='list-unstyled d-flex flex-column text-secondary gap-2 mt-3'>
            <li>Help Center</li>
            <li>Help Forum</li>
            <li>Video Tutorials</li>
          </ul>
        </div>

      <div className="col px-5">
          <h4>Community</h4>
              <ul className='list-unstyled d-flex flex-column text-secondary gap-2 mt-3'>
              <li>Bloggers Buzz</li>
              <li >Terms-Services</li>
              <li >Contact us</li>
              <li>Privacy Policy</li>
              </ul>
      </div>

      <div className="col px-3 ml-4">
          <h4>Developers</h4>
          <ul className='d-flex flex-column list-unstyled text-secondary gap-2 mt-3'>
          <li>Blogger API</li>
          <li>Developer's Forum</li>
          </ul>
      </div>

</div>
      <div className="copy mt-4">
        <p className='text-center m-1'>Copyright 2025 @BloogersSpeech.dev - All Rights Reserved.</p>
      </div>

  </div>
  )
}

export default Footer