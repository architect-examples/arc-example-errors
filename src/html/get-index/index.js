var arc = require('@architect/functions')

function route(req, res) {
  if (!req.query.code) {
    // 200 response
    res({
      html: `
        <h1>happy days: no errors!</h1>
        <li><a href=${req._url('/?code=promise')}>Unhandled Promise Rejection</a></li>
        <li><a href=${req._url('/?code=err')}>Error passed to res</a></li>
        <li><a href=${req._url('/?code=undef')}>Raise an undefined Error</a></li>
        <li><a href=${req._url('/?code=any')}>throw</a></li>
        <p><a href=https://github.com/arc-repos/arc-example-errors>check our the source code here</a></p>
      `
    })
  }
  else if (req.query.code === 'promise') {
    // 404 response: rejects a promise and leave off .catch
    new Promise((resolve, reject)=> {
      var e = Error('promise rejected')
      e.code = 404
      reject(e)
    }).then(function() {
      res({html:'nope'}) 
    })
  }
  else if (req.query.code === 'err') {
    // 403 response: pass an error thru to res
    var e = Error('response invoked with Error')
    e.code = 403
    res(e)
  }
  else if (req.query.code === 'undef') {
    // 500 response: note bar is undefined so this will throw a ReferenceError
    res({html:bar})
  }
  else {
    // 500 response: just throw! savage
    throw Error('Error throw directly')
  }
}

exports.handler = arc.html.get(route)
