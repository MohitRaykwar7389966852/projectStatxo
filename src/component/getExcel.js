import 'bootstrap/dist/css/bootstrap.css';
import axios from "axios";
import Navbar from './navbar';
import { useState, useEffect } from 'react';

function GetExcel() {

    const [list, setList] = useState('');

    const [msg, setMsg] = useState('');

    const [status, setStatus] = useState('');
    const [postyear, setPY] = useState('');
    const [postmonth, setPM] = useState('');


    function clear(e){
        setStatus('')
        setPY('')
        setPM('')
        dataLoad()
    }

     function filter(e){
        e.preventDefault()

         axios.get('http://localhost:4000/getExcel?Status='+status+"&PostingYear="+postyear+"&PostingMonth="+postmonth)
            .then(res => {
                console.log(res.data)
                let arr = res.data.data
                if(arr.length != 0){
                    setList(arr)
                    setMsg('')
                }else{
                    setMsg("No Data Available To Show")
                    setList('')
                } 
                
            })
    }

    let dataLoad = async () => {
        await axios.get('http://localhost:4000/getExcel')
            .then(res => {
                console.log(res.data)
                let arr = res.data.data
                if(arr.length!=0){
                     setList(arr)
                     setMsg('')
                    }
                else {
                    setMsg("No Data Available To Show")
                    setList('')
                }
            })
            .catch(error => {
                console.log(error.message)
            })
        }

    useEffect(dataLoad
    , [])

    let array = [...list]

    return (
        <div>
            {<Navbar />}
            <h3 class="text-center mt-3 ">Data List</h3>

            <form class="form-inline row m-4" onSubmit={filter}>
                <div class="col-sm-3">
                <select class="form-select" name="status" onChange={e=>setStatus(e.target.value)} value={status}>
                        <option selected>Status</option>
                        <option value="In-Progress">In-Progress</option>
                        <option value="Pending">Pending</option>
                        <option value="Completed">Completed</option>
                    </select>
                </div>

                <div class="col-sm-3">
                <select class="form-select" name="postyear" onChange={e=>setPY(e.target.value)} value={postyear}>
                        <option selected>Posting Year</option>
                        <option value="2020">2020</option>
                        <option value="2021">2021</option>
                        <option value="2022">2022</option>
                    </select>
                </div>

                <div class="col-sm-3">
                <select class="form-select" name="postmonth" onChange={e=>setPM(e.target.value)} value={postmonth}>
                        <option selected>Posting Month</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                        <option value="6">6</option>
                        <option value="7">7</option>
                        <option value="8">8</option>
                        <option value="9">9</option>
                        <option value="10">10</option>
                        <option value="11">11</option>
                        <option value="12">12</option>
                    </select>
                </div>

                <div class="col-sm-3">
                    <button type="submit" class="btn btn-primary">Filter</button>
                    <button type='button' class="btn btn-danger ms-2" onClick={clear}>Clear</button>
                </div>
            </form>

            

            <table class="table mt-2 table-striped">
                <thead class = "bg-info text-light">
                    <tr>
                        <th scope="col">CompanyName</th>
                        <th scope="col">BusinessUnitName</th>
                        <th scope="col">ReportingLevel4</th>
                        <th scope="col">Quantity</th>
                        <th scope="col">AmountEUR</th>
                        <th scope="col">PostingYear</th>
                        <th scope="col">PostingMonth</th>
                        <th scope="col">ActionType</th>
                        <th scope="col">ActionNumber</th>
                        <th scope="col">ActionName</th>
                        <th scope="col">Status</th>
                    </tr>
                </thead>
                <tbody>
                    {array.map((i) => {

                        return (
                            <tr>
                                <td>{i.CompanyName}</td>
                                <td>{i.BusinessUnitName}</td>
                                <td>{i.ReportingLevel4}</td>
                                <td>{i.Quantity}</td>
                                <td>{i.AmountEUR}</td>
                                <td>{i.PostingYear}</td>
                                <td>{i.PostingMonth}</td>
                                <td>{i.ActionType}</td>
                                <td>{i.ActionNumber}</td>
                                <td>{i.ActionName}</td>
                                <td>{i.Status}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
            <p class="font-monospace text-center fs-4 mt-5">{msg}</p>
        </div>
    );
}

export default GetExcel;