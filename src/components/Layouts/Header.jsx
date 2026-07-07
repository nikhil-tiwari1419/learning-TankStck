import React from 'react'
import { NavLink } from 'react-router-dom'
function Header() {
    return (
        <header>
            <div className='flex justify-between items-center p-4 border-b-2 border-gray-300 font-bold text-2xl'>
                <NavLink to="/">Nikhil-Tiwari</NavLink>
                <ul className='flex gap-4 text-xl '>
                    <NavLink to="/">Home</NavLink>
                    <li><NavLink to="/trad">FetchOld</NavLink></li>
                    <li><NavLink to="/qr">FetchQuery</NavLink></li>
                    <li><NavLink to="/infinite">InfinityScroll</NavLink></li>
                </ul>

            </div>
        </header>
    )
}

export default Header
