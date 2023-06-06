const axios = require('axios');
exports.stalkml = async(id, zon) => {
return new Promise(async (resolve, reject) => {
  
const url = `https://v1.apigames.id/merchant/M220930BQKS2252EJ/cek-username/mobilelegend?user_id=${id}${zon}&signature=7979b05fcbaf0b0c2d0dd80604abee9b`;

axios.get(url)
  .then((response) => {
    resolve({
      status: 200,
      id: id,
      zon: zon,
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