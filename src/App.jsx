import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavMenu from './NavMenu';
import ItemDetail from './ItemDetail';
import AdminPanel from './AdminPanel';
import './index.css';

function App() {
    return (
        <Router>
            <NavMenu />
            <Routes>
                <Route path='/' element={<h1>Welcome to SCP CRUD Application</h1>} />
                <Route path='/item/:id' element={<ItemDetail />} />
                <Route path='/admin' element={<AdminPanel />} />
                <Route path="/item/:id" />
            </Routes>
        </Router>
    );
}

export default App;