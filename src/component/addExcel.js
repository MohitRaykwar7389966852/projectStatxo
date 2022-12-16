import 'bootstrap/dist/css/bootstrap.css';
import { useState } from 'react';
import * as XLSX from "xlsx";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from './navbar';

function AddExcel() {

    //excel file state
    const [excel, setExcel] = useState('');

    function handleChange(e) {
        const files = e.target.files[0];
        setExcel(files);
    }
    //upload fucntion
    function upload(e) {
        e.preventDefault()

        let f = excel
        const reader = new FileReader();
        reader.onload = (evt) => {
            /* Parse data */
            const bstr = evt.target.result;
            const wb = XLSX.read(bstr, { type: "array" });
            /* Get first worksheet */
            const wsname = wb.SheetNames[0];
            const ws = wb.Sheets[wsname];
            /* Convert array of arrays */
            const data = XLSX.utils.sheet_to_json(ws);
            /* Update state */
            console.log(data);

            //axios call to send data in backend
            let success = 0
            let fail = 0

            data.map((i, index) => {
                console.log(i)
                axios.post('http://localhost:4000/addExcel', i,
                    {
                        headers: { 'Content-Type': 'application/json' }
                    }).then(res => {
                        console.log(res)
                        success++

                        if (success === data.length) {
                            toast.success("Excel File All Data Saved Successfully", {
                                position: toast.POSITION.TOP_CENTER
                            });
                        }

                    }).catch(error => {
                        fail++
                        console.log(error.message)

                        if (fail === data.length) {
                            toast.error("Failed To Saved Excel File Data", {
                                position: toast.POSITION.TOP_CENTER
                            });
                        }
                    })
            })
        };
        reader.readAsArrayBuffer(f);
    }
    return (
        <div>
            {<Navbar/>}
            <form class="m-5" onSubmit={upload} encType="multipart/form-data">
                <div class="mb-3">
                    <label for="exampleInputEmail1" class="form-label">Upload Excel File</label>
                    <input type="file" name='excelfile' class="form-control" onChange={handleChange}></input>
                    <div class="form-text">select excel file and upload</div>
                </div>
                <button type="submit" class="btn btn-primary">Upload</button>
            </form>
            {<ToastContainer />}
        </div>
    );
}

export default AddExcel;