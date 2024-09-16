const { urlModel } = require('../model/url')
const shortid = require('shortid');
async function URLGenerator(req, res) {
  if (!req.body) return res.send({ msg: "url is not found something !!!!",status:false });
    const shortId = shortid();

    urlModel.create({
      shortId: shortId,
      redirectURL: req.body.redirectURL,
      visitHistory: [],
      createdBy: req.user._id
    })


    res.send({ Id: shortId,domain:process.env.url,status: true });

}


async function redirectUrl(req, res) {
  const shortId = req.params.shortId;
  if(!shortId){
    res.send({status:false})
  }
  try {
  const entry = await urlModel.findOneAndUpdate(
    {
      shortId,
    },
    {
      $push: {
        visitHistory: {
          timestamp: Date.now(),
        },
      },
    }
  );
    res.redirect(entry.redirectURL);
    // res.send({ redirectURL: entry.redirectURL,status:true });
  } catch (err) {
    console.log(err);
  }
}


module.exports = {
  URLGenerator,
  redirectUrl
}