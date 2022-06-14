import React, { SVGProps } from 'react'
import './error.css'

const Error = (props: SVGProps<SVGSVGElement>) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        className="icon-error"
        width={44}
        height={44}
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
        {...props}
    >
        <path d="M0 0h24v24H0z" stroke="none" />
        <circle cx={12} cy={12} r={9} />
        <path d="M12 8v4M12 16h.01" />
    </svg>
)

export default Error
