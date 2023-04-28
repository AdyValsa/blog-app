// Positive response
const positiveRes = (res,status,data={},message) =>{
    return res.status(status).json({ok:true,data, message})
}   

module.exports = {positiveRes} 