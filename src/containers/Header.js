import React, { useContext } from 'react';
import { ThemeContext } from '../context/ThemeContext'
import { Link } from 'react-router-dom';
import './Header.scss'


const Header = () => {
    const { selectedTheme, setSelectedTheme } = useContext(ThemeContext);

    return (
        <div className='header-container'>
            <div>
            <nav>
                <ul>
                    <li>
                        <Link to="/">Home</Link>
                    </li>
                    <li>
                        <Link to="/live-chart">LiveChart</Link>
                    </li>
                </ul>
            </nav>
            </div>
            <div className="Toggle-container">
                <label class="switch">
                    <input type="checkbox" onChange={setSelectedTheme} />
                    <span class="slider round"></span>
                </label>
            </div>
        </div>

    );
}

export default Header;