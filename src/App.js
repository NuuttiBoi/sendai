import React, {useEffect, useState} from "react";
import axios from "axios";
import {nanoid} from "nanoid";
import './App.css';
import work_types from "./services/work_types";
function App () {

    const API_HOST = "http://localhost:3001";
    const INVENTORY_API_URL = `${API_HOST}/work_types`;
    const [data, setData] = useState([]);
    const [rows, initRow] = useState([]);


    useEffect(() => {
        axios.get("http://localhost:3001/api/work_types")
            .then(response => setData(response.data))
            .catch(error => console.error(error));
    }, []);


    useEffect(() => {
        axios.get(work_types.getAll())
            .then(response => setData(response.data))
            .catch(error => console.error(error));
    }, []);


    const [addFormData, setAddFormData] = useState({
        product_name: '',
        product_category: "",
        unit_price: ""
    })

    const [editFormData, setEditFormData] = useState({
        product_name: '',
        product_category: "",
        unit_price: ""
    });


    const handleEventFormChange = (event) => {
        event.preventDefault();

        const fieldName = event.target.getAttribute('name');
        const fieldValue = event.target.value;

        const newFormData = {...editFormData};
        newFormData[fieldName] = fieldValue;

        setEditFormData(newFormData);
    }

    const AddNewProduct = () => {

        const [newProductName, setNewProductName] = useState("");
        const [newProductCategory, setNewProductCategory] = useState("");
        const [newUnitPrice, setNewUnitPrice] = useState("");

        function closeForm() {
            console.log("close")
            setNewProductName("")
            setNewProductCategory("")
            setNewUnitPrice("")
        }

        const saveForm = (event) => {
            event.preventDefault()
            console.log("save")

            const newProduct = {
                product_name: newProductName,
                product_category: newProductCategory,
                unit_price: newUnitPrice
            }

            work_types
                .create(newProduct)
                .then(response => {
                    console.log("success", response.data)
                    setNewProductName("")
                    setNewProductCategory("")
                    setNewUnitPrice("")
                    closeForm()
                })
                .catch(error => {
                    console.log(error)
                })

            console.log("saving user")
        }
    }


    const fetchInventory = () => {
        fetch(`${INVENTORY_API_URL}`)
            .then(res => res.json())
            .then(json => setData(json));
    }
/*
    useEffect(() => {
        work_types.getAll();
        fetchInventory();
    }, []);

 */

    const [inEditMode, setInEditMode] = useState({
        status: false,
        rowKey: null
    });

    const [unitPrice, setUnitPrice] = useState(null);
    const [productName, setProductName] = useState(null);
    const [productCategory, setProductCategory] = useState(null);


    const handleOnSubmit = async (e) => {
        e.preventDefault();
        let result = await fetch(
            {INVENTORY_API_URL}, {
                method: "post",
                body: JSON.stringify({productName, productCategory, unitPrice}),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
        result = await result.json();
        console.warn(result);
        if (result) {
            alert("Data saved succesfully");
            setProductName("");
            setProductCategory("");
            setUnitPrice("");
        }
    }

    const onEdit = ({id, currentUnitPrice, currentProductName, currentProductCategory}) => {
        setInEditMode({
            status: true,
            rowKey: id
        })
        setUnitPrice(currentUnitPrice);
        setProductName(currentProductName);
        setProductCategory(currentProductCategory);
    }

    const updateInventory = ({id, newUnitPrice, newProductName, newProductCategory}) => {
        fetch(`${INVENTORY_API_URL}/${id}`, {
            method: "PATCH",
            body: JSON.stringify({
                unit_price: newUnitPrice,
                product_name: newProductName,
                product_category: newProductCategory
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

    const addInventory = ({id, newUnitPrice, newProductName, newProductCategory}) => {
        fetch(`${INVENTORY_API_URL}`, {
            method: "POST",
            body: JSON.stringify({
                id: id,
                unit_price: newUnitPrice,
                product_name: newProductName,
                product_category: newProductCategory
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


    const onSave = ({id, newUnitPrice, newProductName, newProductCategory}) => {
        updateInventory({id, newUnitPrice, newProductName, newProductCategory});
    }

    const onCancel = () => {
        setInEditMode({
            status: false,
            rowKey: null
        })
        setUnitPrice(null);
    }

    const handeAddFormSubmit = (event) => {
        event.preventDefault();
        const newRow = {
            id: nanoid(),
            product_name: addFormData.product_name,
            product_category: addFormData.product_category,
            unit_price: addFormData.unit_price,

        }
        const newRows = [...data, newRow];
        setData(newRows);
        updateInventory({newRow});

    }

    const addRowTable = () => {
        const data = {
            id: nanoid(),
            product_name: "21",
            product_category: "22",
            unit_price: "11",
        };
        initRow([...rows, data]);
        addInventory(data);
        updateInventory(data);
    };

    /*
    const onAdd = ({id, currentUnitPrice, currentProductName, currentProductCategory}) => {
        setInEditMode({
            status: true,
            rowKey: id
        })
        setUnitPrice(currentUnitPrice);
        setProductName(currentProductName);
        setProductCategory(currentProductCategory);
    }
     */

    const onAdd = ({id, newUnitPrice, newProductName, newProductCategory}) => {
        const newRows = [...data];

        const newRow = [id, newUnitPrice, newProductName, newProductCategory];

        newRows.push(newRow);

        setData(newRows);
    }

    const onDelete = (productId) => {
        // delete a row
        const newRows = [...data];

        const index = data.findIndex((product) => product.id === productId);

        newRows.splice(index, 1);

        setData(newRows);
    }

    const Print = () =>{
        //console.log('print');
        let printContents = document.getElementById('printablediv').innerHTML;
        let originalContents = document.body.innerHTML;
        document.body.innerHTML = printContents;
        window.print();
        document.body.innerHTML = originalContents;
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
                                        <input value={productName}
                                               onChange={(event) => setProductName(event.target.value)}
                                        />
                                    ) : (
                                        item.product_name
                                    )
                                }
                            </td>
                            <td>
                                {
                                    inEditMode.status && inEditMode.rowKey === item.id ? (
                                        <input value={productCategory}
                                               onChange={(event) => setProductCategory(event.target.value)}
                                        />
                                    ) : (
                                        item.product_category
                                    )
                                }
                            </td>
                            <td>
                                {
                                    inEditMode.status && inEditMode.rowKey === item.id ? (
                                        <input value={unitPrice}
                                               onChange={(event) => setUnitPrice(event.target.value)}
                                        />
                                    ) : (
                                        item.unit_price
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
                                                    id: item.id, newUnitPrice: unitPrice,
                                                    newProductName: productName, newProductCategory: productCategory
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
                                            <button
                                                className={"btn-secondary"}
                                                style={{marginLeft: 8}}
                                                onClick={addRowTable}
                                            >
                                                Add
                                            </button>

                                        </React.Fragment>
                                    ) : (
                                        <button
                                            className={"btn-primary"}
                                            onClick={() => onEdit({
                                                id: item.id,
                                                currentUnitPrice: item.unit_price,
                                                currentProductName: item.product_name,
                                                currentProductCategory: item.product_category
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


            <h2>Print</h2>
            <button type="button" onClick={Print} > Print div</button>


            <h2>Add a row</h2>
            <form onSubmit={handeAddFormSubmit}>
                <input type="text" name="product_name"/>
                <input type="text" name="product_category"/>
                <input type="text" name="unit_price"/>
                <button type="submit" onSubmit={AddNewProduct}>Add</button>
                <button type="submit" onSubmit={onDelete}>Delete</button>
            </form>


        </div>
    );
}

export default App;
