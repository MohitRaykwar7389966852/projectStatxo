import 'bootstrap/dist/css/bootstrap.css';
import axios from "axios";
import Navbar from './navbar';
import { useState, useEffect } from 'react';
import { Link } from "react-router-dom";

function GetExcel() {

    const [list, setList] = useState('');

    const [msg, setMsg] = useState('');

    const [status, setStatus] = useState('');
    const [postyear, setPY] = useState('');
    const [postmonth, setPM] = useState('');

    const [sort, setSort] = useState('');
    const [order, setOrder] = useState("");

    function clear(e) {
        setStatus('')
        setPY('')
        setPM('')
        dataLoad()
    }

    function filter(e) {
        e.preventDefault()

        axios.get('http://localhost:4000/getExcel?Status=' + status + "&PostingYear=" + postyear + "&PostingMonth=" + postmonth)
            .then(res => {
                console.log(res.data)
                let arr = res.data.data
                if (arr.length != 0) {
                    setList(arr)
                    setMsg('')
                } else {
                    setMsg("No Data Available To Show")
                    setList('')
                }

            })
    }

    let dataLoad = async () => {
        await axios.get('http://localhost:4000/getExcel?sortby='+sort+'&order='+order)
            .then(res => {
                console.log(res.data)
                let arr = res.data.data
                if (arr.length != 0) {
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

    function sorting(e){
        e.preventDefault()
        console.log(sort,order)
        dataLoad()
    }

    let array = [...list]

    let arr = [];
    for (let i = 0; i < array.length; i++) {
        arr.push({
            "CompanyName": array[i].CompanyName,
            "BusinessUnitName": array[i].BusinessUnitName,
            "ReportingLevel4": array[i].ReportingLevel4,
            "Quantity": array[i].Quantity,
            "AmountEUR": array[i].AmountEUR,
            "PostingYear": array[i].PostingYear,
            "PostingMonth": array[i].PostingMonth,
            "ActionType": array[i].ActionType,
            "ActionNumber": array[i].ActionNumber,
            "ActionName": array[i].ActionName,
            "Status": array[i].Status,
            "Edit": <Link class="btn btn-primary" to={"/editExcel/" + array[i]["_id"]} >Edit</Link>
        });
    }

    let columns = [
        "CompanyName",
        "BusinessUnitName",
        "ReportingLevel4",
        "Quantity",
        "AmountEUR",
        "PostingYear",
        "PostingMonth",
        "ActionType",
        "ActionNumber",
        "ActionName",
        "Status",
        "Edit"
    ]

    const [cols, setCols] = useState(columns);
    const [dragOver, setDragOver] = useState("");

    const handleDragStart = e => {
        const { id } = e.target;
        const idx = cols.indexOf(id);
        e.dataTransfer.setData("colIdx", idx);
    };

    const handleDragOver = e => e.preventDefault();
    const handleDragEnter = e => {
        const { id } = e.target;
        setDragOver(id);
    };

    const handleOnDrop = e => {
        const { id } = e.target;
        const droppedColIdx = cols.indexOf(id);
        const draggedColIdx = e.dataTransfer.getData("colIdx");
        const tempCols = [...cols];

        tempCols[draggedColIdx] = cols[droppedColIdx];
        tempCols[droppedColIdx] = cols[draggedColIdx];
        setCols(tempCols);
        setDragOver("");
    };

    return (
        <div>
            {<Navbar />}
            <h3 class="text-center mt-3 ">Data List</h3>

            <form class="form-inline row m-4" onSubmit={filter}>
                <div class="col-sm-3 mt-1">
                    <select class="form-select" name="status" onChange={e => setStatus(e.target.value)} value={status}>
                        <option selected>Status</option>
                        <option value="In-Progress">In-Progress</option>
                        <option value="Pending">Pending</option>
                        <option value="Completed">Completed</option>
                    </select>
                </div>

                <div class="col-sm-3 mt-1">
                    <select class="form-select" name="postyear" onChange={e => setPY(e.target.value)} value={postyear}>
                        <option selected>Posting Year</option>
                        <option value="2020">2020</option>
                        <option value="2021">2021</option>
                        <option value="2022">2022</option>
                    </select>
                </div>

                <div class="col-sm-3 mt-1">
                    <select class="form-select" name="postmonth" onChange={e => setPM(e.target.value)} value={postmonth}>
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

                <div class="col-sm-3 mt-1">
                    <button type="submit" class="btn btn-primary ms-1">Filter</button>
                    <button type='button' class="btn btn-danger ms-1" onClick={clear}>Clear</button>
                </div>
            </form>

            <form class="form-inline row m-4" onSubmit={sorting}>
                <div class="col-sm-2">
                    <select class="form-select" value={sort} onChange={e=>setSort(e.target.value)}>
                        <option value="" selected>Sort By</option>
                        <option value="CompanyName">Company Name</option>
                        <option value="BusinessUnitName">Business Unit</option>
                        <option value="PostingMonth">Posting Month</option>
                        <option value="PostingYear">Posting Year</option>
                    </select>
                </div>
                <div class="col-sm-2 ms-2">
                    <button name="asn"  type="submit" class="btn btn-sm btn-outline-primary m-1" value="1" onClick={e=>setOrder(e.target.value)}>Asn</button>
                    <button name="dsn" type="submit" class="btn btn-sm btn-outline-danger m-1" value="-1" onClick={e=>setOrder(e.target.value)}>Dsn</button>
                </div>
            </form>

            <table class="table mt-2 table-striped table-bordered">
                <thead class="bg-info text-light">
                    <tr>
                        {cols.map(col => (
                            <th
                                id={col}
                                key={col}
                                draggable
                                onDragStart={handleDragStart}
                                onDragOver={handleDragOver}
                                onDrop={handleOnDrop}
                                onDragEnter={handleDragEnter}
                                dragOver={col === dragOver}
                            >
                                {col}
                            </th>
                        ))}


                    </tr>
                </thead>
                <tbody>
                    {arr.map(row => (
                        <tr key={row.id}>
                            {Object.entries(row).map(([k, v], idx) => (
                                <td key={v} dragOver={cols[idx] === dragOver}>
                                    {
                                        row[cols[idx]]}
                                </td>
                            ))}

                        </tr>
                    ))}
                </tbody>
            </table>
            <p class="font-monospace text-center fs-4 mt-5">{msg}</p>
        </div>
    );
}

export default GetExcel;