import React from 'react'
import GetFeedBacks from './getFeedBacks'
import Feedback from './createFeedbacks'
const page = () => {
  return (
    <div className='feedbackCard'>
        <GetFeedBacks />
        <Feedback />
    </div>
  )
}

export default page