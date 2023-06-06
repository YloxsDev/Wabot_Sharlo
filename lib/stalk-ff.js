const axios = require('axios');
exports.stalkff = async(id) => {
return new Promise(async (resolve, reject) => {
  
const url = `https://v1.apigames.id/merchant/M220930BQKS2252EJ/cek-username/freefire?user_id=${id}&signature=7979b05fcbaf0b0c2d0dd80604abee9b`;

axios.get(url)
  .then((response) => {
    resolve({
      status: 200,
      id: id,
      nickname: response.data.data.username
    })
  })
  .catch((error) => {
    resolve({
      status: 404,
      msg: 'User Id Not Found'
    })
  });
})
}