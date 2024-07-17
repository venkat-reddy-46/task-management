import React from 'react'
import { Link } from 'react-router-dom'

import './Header.css'

const Header = () => {
  return (
    <header>
        <div class="container">
            <h1>Task Management</h1>
            <nav>
                <ul>
                    <li><Link to='/'>Dashboard</Link></li>
                    <li><Link to='/add-task'>Add Task</Link></li>
                    <li><Link to='/login'>Login</Link></li>
                    <li><Link to='/register'>Register</Link></li>
                </ul>
            </nav>
        </div>
    </header>
  )
}

export default Header