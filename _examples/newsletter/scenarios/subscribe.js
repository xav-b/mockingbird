function success(req, res) {
  return res.status(200).json({ fake: true, listID: req.params.listID })
}

// anything not 2**
function fail(req, res) {
  return res.status(400).json({ err: "user already exists" })
}

// TODO implement something like { delay(success, 2300) }
module.exports = { success, fail }
