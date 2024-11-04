import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { supabase } from './supabase';
import '../node_modules/bootstrap/dist/css/bootstrap.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/bootstrap/dist/js/bootstrap.min.js';
import './index.css';

//ItemDetail function
function ItemDetail() {
    const { id } = useParams();
    const [itemData, setItemData] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchItemDetails = async () => {
            // this query for data fetch from supabase database (20 scp)
            const { data, error } = await supabase.from('scp').select('*').eq('id', id).single();
            if (error) {
                console.error(error);
                setError("Failed to fetch item details.");
            } else {
                setItemData(data);
            }
        };
        fetchItemDetails();
    }, [id]);

    return (
        //this print in print item data from supabase
        <div className="card pt-5">
        {error && <p>{error}</p>}
            {itemData ? (
                <>
                    <div className="card">
                    <h5 className="card-header">{itemData.item}</h5>
                    <div className="card-body">
                        <h3 className="card-title"><b>Object className: </b>{itemData.class}</h3>
                        <p className="card-text"><img src={`${itemData.image}`} className="img w-50 h-50"  alt={itemData.item}/></p>
                        <h3 className="card-title">Description:</h3>
                        <p className="card-text">{itemData.description}</p>
                        <p className="card-text">{itemData.containment}</p>
                    </div>
                    </div>
                </>
            ) : (
                <p>Loading....</p>
            )}
        </div>
        );
}

export default ItemDetail;
