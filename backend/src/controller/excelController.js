const excelModel = require('../model/excelModel')
const { isValid, isValidBody, isValidObjectId } = require('../validation/validator')

const addExcel = async function (req, res) {
    try {
        let data = req.body
        if (!isValidBody(data)) return res.status(400).send({ status: false, message: "No Data Found" });

        let { CompanyName, BusinessUnitName, ReportingLevel4, Quantity, AmountEUR, PostingYear, PostingMonth, ActionType, ActionNumber, ActionName, Status } = data

        if (!isValid(CompanyName)) return res.status(400).send({ status: false, message: "Please Enter Company Name" });
        if (!isValid(BusinessUnitName)) return res.status(400).send({ status: false, message: "Please Enter Business Unit Name" });
        if (!isValid(ReportingLevel4)) return res.status(400).send({ status: false, message: "Please Enter Reporting Level" });
        if (!isValid(Quantity)) return res.status(400).send({ status: false, message: "Please Enter Quantity" });
        if (!isValid(AmountEUR)) return res.status(400).send({ status: false, message: "Please Enter Amount EU" });
        if (!isValid(PostingYear)) return res.status(400).send({ status: false, message: "Please Enter Posting Year" });
        if (!isValid(PostingMonth)) return res.status(400).send({ status: false, message: "Please Enter Posting Month" });
        if (!isValid(ActionType)) return res.status(400).send({ status: false, message: "Please Enter Action Type" });
        if (!isValid(ActionNumber)) return res.status(400).send({ status: false, message: "Please Enter Action Number" });
        if (!isValid(ActionName)) return res.status(400).send({ status: false, message: "Please Enter Action Name" });
        if (!isValid(Status)) return res.status(400).send({ status: false, message: "Please Enter Status" });

        let saved = await excelModel.create(data)
        return res.status(201).send({ status: true, message: "data saved successfully", data: saved })
    }
    catch (e) {
        res.status(500).send({ status: false, message: e.message })
    }
}


const getExcel = async function (req, res) {
    try {
        let f
        if (req.query) f = req.query
        let filter = {}
        if (f.Status) filter.Status = f.Status
        if (f.PostingYear) filter.PostingYear = f.PostingYear
        if (f.PostingMonth) filter.PostingMonth = f.PostingMonth

        let data = await excelModel.find(filter)
        return res.status(200).send({ status: true, message: "excel data list", data: data })
    }
    catch (e) {
        res.status(500).send({ status: false, message: e.message })
    }
}

const editExcel = async function (req, res) {
    try {

        let editId = req.params.editId
        if(!isValidObjectId(editId)) return res.status(400).send({status:false , message:"Please Enter Valid edit Id"})

        let findData = await excelModel.findOne({ _id: editId })
        if (!findData) return res.status(404).send({ status: false, message: "data not found" });

        let data = req.body
        if (!isValidBody(data)) return res.status(400).send({ status: false, message: "No Data Found" });

        let fd = {}
        if(data.ActionName) fd.ActionName = data.ActionName
        if(data.ActionType) fd.ActionType = data.ActionType

        let saved = await excelModel.findOneAndUpdate(
            { _id: editId },
            fd,
            { new: true }

        )
        return res.status(200).send({ status: true, message: "data edited successfully", data: saved })
    }
    catch (e) {
        res.status(500).send({ status: false, message: e.message })
    }
}


module.exports = { addExcel, getExcel, editExcel }