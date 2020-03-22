const axios = require('axios')

exports.addItem = async function(partyID, body, isSocket) {
  const res = await axios.post(`${process.env.API_URL}/party/${partyID}/items`, body)
  return res
}

exports.getItems = async function(partyID) {
  const res =  await axios.get(`${process.env.API_URL}/party/${partyID}`)
  return res.data.items
}

exports.deleteItem = async function(partyID, itemID) {
  await axios.delete(`${process.env.API_URL}/party/${partyID}/items/${itemID}`)
}