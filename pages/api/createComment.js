import { client } from "../../sanity"

export default function handler(req, res) {
    const {_id, name, email, comment} = JSON.parse(req.body)
    const doc = {
        _type: 'comment',
        name: name,
        email:email,
        comment:comment,
        post:{
            _type:'reference',
            _ref:_id
        }
    }
    client.create(doc).catch(
        (err) => {res.status(500).json({msg:"Can't create comment"}, err)}
    )
    res.status(200).json({msg:"Comment Created"})
}