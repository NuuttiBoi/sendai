import React, {useEffect, useState} from "react";
import axios from "axios";
import './App.css';
import work_types_service from "./services/work_types_service";
import AddNewForm from "./components/addNewWork";
import EditWorkForm from "./components/editWork";
import addNewWork from "./components/addNewWork";
import {useParams} from "react-router-dom";
function App () {

    const API_HOST = "http://localhost:3001";
    const INVENTORY_API_URL = `${API_HOST}/work_types`;
    const [data, setData] = useState([]);


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



    const onEdit = ({id, currentWork1Name, currentWork2Name, currentWork3Name}) => {
        setInEditMode({
            status: true,
            rowKey: id
        })
        setWork1Name(currentWork1Name);
        setWork2Name(currentWork2Name);
        setWork3Name(currentWork3Name);
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


    const updateInventory = ({id, newWork1Name, newWork2Name, newWork3Name}) => {
        const newType = {
            id : id,
            work1_name : newWork1Name,
            work2_name : newWork2Name,
            work3_name : newWork3Name
        }

        work_types_service.createNew(newType)
            .then(response => {
                console.log("success", response.data)
            })
            .catch(error => {
                console.log(error)
            })

        /*
        work_types_service.createNew(id, newType)
            .then(response => response.json())
            .then(json => {
                onCancel();
                fetchInventory();
            })
            .catch(error => {
                console.log(error)
            })

         */

        /*
        axios.post(`http://localhost:3001/work_types/getWorkType/${id}`, {
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

         */
    }




    /*
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

     */

    const addInventory = ({id, newWork1Name, newWork2Name, newWork3Name}) => {

        fetch(`${INVENTORY_API_URL}/${id}`, {
            method: "PATCH",
            body: JSON.stringify({
                work1_name: newWork1Name,
                work2_name: newWork2Name,
                work3_name: newWork3Name            }),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        })
            .then(response => response.json())
            .then(json => {
                // reset inEditMode and unit price state values
                onCancel();
                // fetch the updated data
                fetchInventory();
            })

        /*
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

         */
    }


    const onSave = ({id, newWork1Name, newWork2Name, newWork3Name}) => {
        setWork1Name(newWork1Name);
        setWork2Name(newWork2Name);
        setWork3Name(newWork3Name);
        //addInventory({id, newWork1Name, newWork2Name, newWork3Name});
    }

    const onCancel = () => {
        setInEditMode({
            status: false,
            rowKey: null
        })
    }


    const onDelete = (index, _id) => {
        // delete a row
        setData(data.filter((item, i) => i !== index));
    }

    const deleteWork = (id) => {
        fetch("http://localhost:3001/deleteWork", {
            method: "POST",
            crossDomain: true,
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                "Access-Control-Allow-Origin": "*",
            },
            body: JSON.stringify({
                id: id,
            }),
        })
            .then((res) => res.json())
            .then((data) => {
                alert(data.data);
            });
    }

    const handeAddFormSubmit = (event) => {
        event.preventDefault();
        /*
        setWork1Name(event.target.value);
        setWork2Name(event.target.value);
        setWork3Name(event.target.value);

         */

        /*
            axios.post("api/addwork", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    work1_name: 'homo',
                    work2_name: 'paska',
                    work3_name: 'vittu'
                })
            })

         */
        const workkii = {
            work1_name: "nnhhr",
            work2_name: "turrpffa",
            work3_name: "kiinnrffri"
        }

        work_types_service.create(workkii)
            .then(response => {
                console.log("success", response.data)
            })
            .catch(error => {
                console.log(error)
            })
    };

    const openForm = (event) => {
        event.preventDefault()
        document.getElementById('addNewForm').classList.remove('visuallyhidden')
        document.querySelector('body').classList.add('locked')
        console.log('open form')
    }

    const openEditForm = (event) => {
        event.preventDefault()
        document.getElementById('editWorkForm').classList.remove('visuallyhidden')
        document.querySelector('body').classList.add('locked')
        console.log('open form')
    }

    const updatePage = (newWork_type) => {
        console.log(newWork_type)
        setData(data.concat(newWork_type))
    }

    function UpdateValue ()  {
        const id = useParams();
        const [values, setValues] = useState({
            id: id,
            work1_name: '',
            work2_name: '',
            work3_name: ''
        })
        useEffect(() =>{
            axios.get(`http://localhost:3001/work_types`+id)
                .then(res => {
                    setValues({
                        ...values, work1_name: res.data.work1_name, work2_name: res.data.work1_name,
                        work3_name: res.data.work1_name})
                })
                .catch(error => console.log(error))
        },[])
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
                    data.map((item, index) => (
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
                            <td className={"edit"} key={item.id}>
                                {
                                    inEditMode.status && inEditMode.rowKey === item.id ? (
                                        <React.Fragment>
                                            <button
                                                className={"btn-success"}
                                                onClick={() => onSave(
                                                    {
                                                        id: item.id,
                                                        work1Name: item.work1_name,
                                                        currentWork2Name: item.work2_name,
                                                        currentWork3Name: item.work3_name
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
                                                onClick={(e) => onDelete(index, e)}
                                            >
                                                Delete
                                            </button>
                                            <button
                                                className={"btn-secondary"}
                                                style={{marginLeft: 8}}
                                                onClick={() => deleteWork(item._id)}
                                            >
                                                Delete
                                            </button>
                                            <button
                                                className={"btn-secondary"}
                                                style={{marginLeft: 8}}
                                                onClick={openEditForm}
                                            >
                                                Edit Form
                                            </button>
                                        </React.Fragment>
                                    ) : (
                                        <button
                                            className={"btn-primary"}
                                            onClick={() => onEdit({
                                                id: item.id,
                                                currentWork1Name: item.work1_name,
                                                currentWork2Name: item.work2_name,
                                                currentWork3Name: item.work3_name
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
            <button id="addReviewMobile" onClick={openForm} className="button mobileOnly">+</button>
            <button id="addReview" onClick={openForm} className="button center hideOnMobile">Add row</button>

            <AddNewForm update={updatePage}/>
            <EditWorkForm update={updatePage}/>



        </div>
    );
}

export default App;
