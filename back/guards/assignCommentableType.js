
async function assignCommentableType(req, res, next) {
const { type } = req.params
const { element } = req.params
  const { data } = req.body
if (type === "pinboard") return { commentableType : "worker"}
return { commentableType : type }
}

module.exports = assignCommentableType;