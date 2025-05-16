import React from 'react'
import "../MaintainerCommunicateWithContributor/MaintainerCommunicate.css"

function MaintainerCommunicate() {
  return (
    <div>
      <div className="maintainer-chat-parent p-3">
        <div className="row maintainer-chat-row mt-3">
          <div className="col-sm-3 rounded">
            <input type='text' className='form-control p-3 mt-3 mb-4' placeholder='Search Conversation'></input>
            <input type='text' className='form-control p-3' value="userName"></input>
            <input type='text' className='form-control p-3' value="userName"></input>


          </div>
          <div className="col-sm-9 bg-light rounded">
            <input type='text' className='form-control p-3 mt-3' value="userName"></input>
            <div className='d-flex maintainer-send-msg'>
              <div className='maintainer-input-field'>              
                <input type='text' className='form-control' placeholder='Type a Message'></input></div>
              <div>
                <button className='btn btn-primary'>Send</button>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MaintainerCommunicate
