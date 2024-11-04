import { useState, useEffect } from 'react';
import { supabase } from './supabase';
// boostrap data
import '../node_modules/bootstrap/dist/css/bootstrap.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/bootstrap/dist/js/bootstrap.min.js';
import './index.css';

function AdminPanel() {
    const [items, setItems] = useState([]);
    // Declare newRecord variable
    const [newRecord, setNewRecord] = useState({
        item: '',
        class: '',
        description: '',
        containment: '',
        image: null
    });
    const [editRecord, setEditRecord] = useState(null);

    // This function work for fetch data from database
    useEffect(() => {
        const fetchItems = async () => {
            const { data, error } = await supabase.from('scp').select('*');
            if (error) {
                console.error(error);
            } else {
                setItems(data);
            }
        };
        fetchItems();
    }, []);

    // add new SCP function in supabase database
    const addItem = async (event) => {
        event.preventDefault();
        let imageUrl = null;
        // this function copy from AI
        if (newRecord.image) {
            // Check for unique file name
            const uniqueFileName = `${Date.now()}_${newRecord.image.name}`;
            const { data: uploadData, error: uploadError } = await supabase.storage
                .from('image')
                .upload(uniqueFileName, newRecord.image);
            
            if (uploadError) {
                console.error(uploadError);
                return;
            }
    
            imageUrl = `https://gvdujixjhezcqdeyvgjs.supabase.co/storage/v1/object/public/image/${uploadData.path}`;
            newRecord.image = imageUrl; // Use the uploaded image URL
        }
    
        // Log the newRecord for debugging
        console.log('Adding new record:', newRecord);
    
        // Insert the new record directly
        const { error } = await supabase.from('scp').insert([newRecord]);
    
        if (error) {
            console.error('Insert error:', error);
        } else {
            setNewRecord({ item: '', class: '', description: '', containment: '', image: null });
            setItems((prev) => [...prev, { ...newRecord, image: imageUrl }]); // Ensure image URL is used
        }
    };
    

    const deleteItem = async (id) => {
        const { error } = await supabase.from('scp').delete().eq('id', id);
        if (error) {
            console.error(error);
        } else {
            setItems((prev) => prev.filter(item => item.id !== id));
        }
    };

    const startEditing = (item) => {
        setEditRecord(item);
    };

    const saveEdit = async (id) => {
        const { error } = await supabase.from('scp').update(editRecord).eq('id', id);
        if (error) {
            console.error(error);
        } else {
            setEditRecord(null);
            setItems((prev) => prev.map(item => (item.id === id ? editRecord : item)));
        }
    };

    return (
        <div>
            <h2>Admin Panel</h2>
            <ul>
                {items.map((item) => (
                    <li key={item.id}>
                        {editRecord && editRecord.id === item.id ? (
                            // edit scp data form
                            <form className="form-inline" onSubmit={(e) => { e.preventDefault(); saveEdit(item.id); }}>
                                <div className="card">
                                    <div className="card-detail">
                                            <input value={editRecord.item} onChange={(e) => setEditRecord({ ...editRecord, item: e.target.value })} />
                                            <input value={editRecord.class} onChange={(e) => setEditRecord({ ...editRecord, class: e.target.value })} />
                                            <input value={editRecord.description} onChange={(e) => setEditRecord({ ...editRecord, description: e.target.value })} />
                                            <input value={editRecord.containment} onChange={(e) => setEditRecord({ ...editRecord, containment: e.target.value })} />
                                            <input type="file" onChange={(e) => setEditRecord({ ...editRecord, image: e.target.files[0] })} />
                                        <button type="button" onClick={() => saveEdit(item.id)} className='btn btn-primary'>Save</button>
                                        <button type="button" onClick={() => setEditRecord(null)} className='btn btn-danger'>Cancel</button>
                                    </div>
                                </div>
                            </form>
                        ) : (
                            // Display 20 scp name as well edit and delete button
                            <div className="card p-2 m-2">
                            <h5 className="card-header">{item.item}</h5>
                            <div className="card-body">
                            <button onClick={() => startEditing(item)} className='btn btn-success m-1'>Edit</button>
                            <button onClick={() => deleteItem(item.id)} className='btn btn-danger m-1'>Delete</button>
                            </div>
                            </div>
                        )}
                    </li>
                ))}
            </ul>
            {/* Add new record */}
            <div className="row">
               <div className="col-md-12">
               <div className="card">
                  <div className="card-body">
                    <h5 className="card-header">New SCP</h5>
                        <form onSubmit={addItem} className="form-inline">
                                <input value={newRecord.item} placeholder='Item Name' onChange={(e) => setNewRecord({ ...newRecord, item: e.target.value })} />
                                <input value={newRecord.class} placeholder='Class Name' onChange={(e) => setNewRecord({ ...newRecord, class: e.target.value })} />
                                <input value={newRecord.description} placeholder='Description' onChange={(e) => setNewRecord({ ...newRecord, description: e.target.value })} />
                                <input value={newRecord.containment} placeholder='containment' onChange={(e) => setNewRecord({ ...newRecord, containment: e.target.value })} />
                                <input type='file' onChange={(e) => setNewRecord({ ...newRecord, image: e.target.files[0] })} />
                            <button type="submit" className='btn btn-primary'>Add Item</button>
                        </form>
                      </div>
                   </div>
                </div>
            </div>
        </div>
    );
}

export default AdminPanel;
