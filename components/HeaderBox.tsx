import { Span } from 'next/dist/trace'
import React from 'react'

const HeaderBox = ({title, subtext, user, type="title"}:HeaderBoxProps) => {
  return (
    <div className='header-box'>
        <h1 className='header-box-title'>
            {title}
            {type === "greeting" && (
                <span className='text-bankGradient'>
                &nbsp;{user}
            </span>)}
        </h1>
        <p className='header-box-subtext'>
            {subtext}
        </p>
        </div>
  )
}

export default HeaderBox