const functions = require('firebase-functions');
const admin = require('firebase-admin');
const cors = require('cors')({
  origin: true,
});
admin.initializeApp(functions.config().firebase);

exports.testUserExists = functions.https.onRequest((req, res) => {

  if (req.method === 'PUT') {
    return res.status(403).send('Forbidden');
  }


  // [START usingMiddleware]
  // Enable CORS using the `cors` express middleware.
  return cors(req, res, () => {
    // [END usingMiddleware]
    // [START readQueryParam]
    let slug = req.query.slug;
    // [END readQueryParam]
    // Reading date format from request body query parameter
    if (!slug) {
      // [START readBodyParam]
      slug = req.body.slug;
      // [END readBodyParam]
    }
    // [START sendResponse]
    var db = admin.firestore();

    let ref = db.collection('users').doc(slug)
    ref.get()
      .then(doc => {
        if (doc.exists){
          res.status(200).send({"exists": true})
        } else {
          res.status(200).send({"exists": false})
        }
      })
      .catch(reason => {
        res.status(404).send(reason)
      })
    // [END sendResponse]
  });
});
