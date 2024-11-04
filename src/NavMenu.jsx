import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from './supabase';
import '../node_modules/bootstrap/dist/css/bootstrap.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './index.css';

function NavMenu() {
    const [items, setItems] = useState([]);

    useEffect(() => {
        const fetchItems = async () => {
            const { data, error } = await supabase.from('scp').select('id, item');
            if (error) {
                console.error(error);
            } else {
                setItems(data);
            }
        };

        fetchItems();
    }, []);

    return (
        <header>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="container-fluid">
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarText">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            {/* adminpanel link */}
                            <li className="nav-item">
                                <Link className="nav-link"  to="/admin">Admin Panel</Link> 
                            </li>
                            {items.map(item => (
                                // menu link
                                <li className="nav-item" key={item.id}>
                                    <Link className="nav-link" to={`/item/${item.id}`}>
                                        {item.item}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </nav>
        </header>
    );
}

export default NavMenu;