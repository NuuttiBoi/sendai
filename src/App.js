import React, {useEffect, useState} from "react";
import axios from "axios";
import {nanoid} from "nanoid";
import './App.css';
import work_types_service from "./services/work_types_service";
function App () {

    const API_HOST = "http://localhost:3001";
    const INVENTORY_API_URL = `${API_HOST}/work_types`;
    const [data, setData] = useState([]);
    const [rows, initRow] = useState([]);


    useEffect(() => {
        axios.get("http://localhost:3001/work_types")
            .then(response => setData(response.data))
            .catch(error => console.error(error));
    }, []);


    const fetchInventory = async () => {
        const response = await axios.get('http://localhost:3001/work_types')
        return await response.data
    }

    fetchInventory();

    /*
    const fetchInventory = () => {
        fetch(`http://localhost:3001/work_types`)
            .then(res => res.json())
            .then(json => setData(json));
    }
     */


    const [inEditMode, setInEditMode] = useState({
        status: false,
        rowKey: null
    });

    const [work3Name, setWork3Name] = useState(null);
    const [work1Name, setWork1Name] = useState(null);
    const [work2Name, setWork2Name] = useState(null);



    const onEdit = ({id, currentWork3Name, currentWork1Name, currentWork2Name}) => {
        setInEditMode({
            status: true,
            rowKey: id
        })
        setWork3Name(currentWork3Name);
        setWork1Name(currentWork1Name);
        setWork2Name(currentWork2Name);
    }


/*
    const updateInventory = ({id, newUnitPrice, newProductName, newProductCategory}) => {
        useEffect(() => {
                work_types_service
                    .getWorkType(id)
                    .then(response => {
                        console.log(response)
                        setUnitPrice(newUnitPrice)
                        setProductName(newProductName)
                        setProductCategory(newProductCategory)
                    })
                    .catch(error => {
                        console.log(error)
                    })
            }])
        )}

 */


    const updateInventory = ({id, newWork3Name, newWork1Name, newWork2Name}) => {
        fetch(`${INVENTORY_API_URL}/${id}`, {
            method: "PATCH",
            body: JSON.stringify({
                work3_name: newWork3Name,
                work1_name: newWork1Name,
                work2_name: newWork2Name
            }),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        })
            .then(response => response.json())
            .then(json => {
                onCancel();
                fetchInventory();
            })
    }

    const addInventory = ({id, newWork3Name, newWork1Name, newWork2Name}) => {
        fetch(`${INVENTORY_API_URL}`, {
            method: "POST",
            body: JSON.stringify({
                id: id,
                work3_name: newWork3Name,
                work1_name: newWork1Name,
                work2_name: newWork2Name
            }),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        })
            .then(response => response.json())
            .then(json => {
                onCancel();
                fetchInventory();
            })
    }


    const onSave = ({id, newWork3Name, newWork1Name, newWork2Name}) => {
        updateInventory({id, newWork3Name, newWork1Name, newWork2Name});
    }

    const onCancel = () => {
        setInEditMode({
            status: false,
            rowKey: null
        })
        setWork3Name(null);
    }


    const onDelete = (productId) => {
        // delete a row
        const newRows = [...data];

        const index = data.findIndex((product) => product.id === productId);

        newRows.splice(index, 1);

        setData(newRows);
    }


    return (
        <div className="container">
            <h1>Create Your Own Work Table</h1>
            <table>
                <thead>
                <tr>
                    <th>Example</th>
                    <th>Example</th>
                    <th>Example</th>
                </tr>
                </thead>

                <tbody>
                {
                    data.map((item) => (
                        <tr key={item.id}>
                            <td>
                                {
                                    inEditMode.status && inEditMode.rowKey === item.id ? (
                                        <input value={work1Name}
                                               onChange={(event) => setWork1Name(event.target.value)}
                                        />
                                    ) : (
                                        item.work1_name
                                    )
                                }
                            </td>
                            <td>
                                {
                                    inEditMode.status && inEditMode.rowKey === item.id ? (
                                        <input value={work2Name}
                                               onChange={(event) => setWork2Name(event.target.value)}
                                        />
                                    ) : (
                                        item.work2_name
                                    )
                                }
                            </td>
                            <td>
                                {
                                    inEditMode.status && inEditMode.rowKey === item.id ? (
                                        <input value={work3Name}
                                               onChange={(event) => setWork3Name(event.target.value)}
                                        />
                                    ) : (
                                        item.work3_name
                                    )
                                }
                            </td>
                            <td>
                                {
                                    inEditMode.status && inEditMode.rowKey === item.id ? (
                                        <React.Fragment>
                                            <button
                                                className={"btn-success"}
                                                onClick={() => onSave({
                                                    id: item.id, newWork3Name: work3Name,
                                                    newWork1Name: work1Name, newWork2Name: work2Name
                                                })}
                                            >
                                                Save
                                            </button>

                                            <button
                                                className={"btn-secondary"}
                                                style={{marginLeft: 8}}
                                                onClick={() => onCancel()}
                                            >
                                                Cancel
                                            </button>
                                            <button
                                                className={"btn-secondary"}
                                                style={{marginLeft: 8}}
                                                onClick={() => onDelete()}
                                            >
                                                Delete
                                            </button>

                                        </React.Fragment>
                                    ) : (
                                        <button
                                            className={"btn-primary"}
                                            onClick={() => onEdit({
                                                id: item.id,
                                                currentWork3Name: item.work3_name,
                                                currentWork1Name: item.work1_name,
                                                currentWork2Name: item.work2_name
                                            })}
                                        >
                                            Edit
                                        </button>

                                    )
                                }
                            </td>
                        </tr>
                    ))
                }
                </tbody>
            </table>


        </div>
    );
}

export default App;
