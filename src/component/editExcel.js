import 'bootstrap/dist/css/bootstrap.css';
import { useParams,useNavigate } from "react-router-dom";
import { useState} from 'react';
import axios from "axios";
import Navbar from './navbar';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function EditExcel() {

    const navigate = useNavigate();

    const [acType, setAT] = useState('');
    const [acName, setAN] = useState('');

    const param = useParams();
    let id = param.editId

    function edit(e){
        e.preventDefault()
        let data = {}
        if(acName) data.ActionName = acName
        if(acType) data.ActionType = acType

        console.log(id,data)

        axios.put('http://localhost:4000/editExcel/'+id,data,
                    {
                        headers: { 'Content-Type': 'application/json' }
                    }).then(res => {
                        console.log(res.data)
                        toast.success("Excel File Data Updated Successfully", {
                            position: toast.POSITION.TOP_CENTER
                        });
                    }).catch(e => {
                        console.log(e.message)
                        toast.error("Excel File Data Updation Failed", {
                            position: toast.POSITION.TOP_CENTER
                        });
                    })
    }

    return (
        <div>
            {<Navbar/>}
            <form class="m-5" onSubmit={edit}>
                <div class="mb-3">
                    <input type="actionType" class="form-control" placeholder='Action Type' value={acType} onChange={e=>setAT(e.target.value)}></input>
                </div>
                <div class="mb-3">
                    <input type="actionName" class="form-control" placeholder='Action Name' value={acName} onChange={e=>setAN(e.target.value)}></input>
                </div>
                <button type="submit" class="btn btn-primary">Save</button>
            </form>
            {<ToastContainer />}
        </div>
    );
}

export default EditExcel;