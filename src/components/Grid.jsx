import React from 'react'

function Grid(props) {
  return (
    <div className='grid' onClick={props.click}>
        <p>{props.text}</p>
    </div>
  )
}

export default Grid