const fs = require('fs')
const path = require("path")
const { Router } = require('express')
const router = Router()
router.get("/books/get", (req, res) => {
    fs.readFile(path.join(__dirname, "../data.json"), 'utf8', (err, data) => {
        if (err) {
            return (
                res.status(500).send({
                    resposneCode: -1,
                    userMessage: err
                })
            )
        }
        return (
            res.send({
                data: JSON.parse(data),
                responseCode: 0
            })
        )
    })
})
router.get("/book/get/:id", (req, res) => {
    fs.readFile(path.join(__dirname, "../data.json"), 'utf8', (err, data) => {
        if (err) {
            return (
                res.status(500).send({
                    resposneCode: -1,
                    userMessage: err
                })
            )
        }
        let book = JSON.parse(data).find(i => i?.id === +req.params.id)
        if (!book) {
            return (
                res.status(404).send({
                    responseCode: -1,
                    userMessage: "Bunday id bo'yicha kitob topilmadi."
                })
            )
        }
        return (
            res.send({
                data: book,
                responseCode: 0
            })
        )
    })
})
router.post('/book/create', (req, res) => {
    fs.readFile(path.join(__dirname, "../data.json"), (err, data) => {
        if (err) {
            return (
                res.status(500).send({
                    resposneCode: -1,
                    userMessage: err
                })
            )
        }
        let result = JSON.parse(data)
        if (result.findIndex(i => i?.title === req.body.title) !== -1) {
            return (
                res.status(400).send({
                    responseCode: -1,
                    userMessage: `Bu kitob bazada mavjud!`
                })
            )
        }
        result.push({ id: result.length + 1, ...req.body })
        let put = JSON.stringify(result, null, 2)
        fs.writeFile(path.join(__dirname, "../data.json"), put, (err) => {
            if (err) {
                return (
                    res.status(500).send({
                        responseCode: -1,
                        userMessage: err
                    })
                )
            }
            return (
                res.send(JSON.stringify({
                    data: { id: result.length + 1, ...req.body },
                    responseCode: 0
                }))
            )
        })
    })
})
router.put("/book/update", (req, res) => {
    fs.readFile(path.join(__dirname, "../data.json"), (err, data) => {
        if (err) {
            return (
                res.status(500).send({
                    resposneCode: -1,
                    userMessage: err
                })
            )
        }
        let result = JSON.parse(data)
        if (result.findIndex(i => i?.title === req.body.title) !== -1) {
            return (
                res.status(400).send({
                    responseCode: -1,
                    userMessage: `Bu kitob bazada mavjud!`
                })
            )
        }
        result = result.map(i => {
            if (i.id === +req.body.id) {
                i = { ...i, ...req.body }
            }
            return i
        })
        let put = JSON.stringify(result, null, 2)
        fs.writeFile(path.join(__dirname, "../data.json"), put, (err) => {
            if (err) {
                return (
                    res.status(500).send({
                        responseCode: -1,
                        userMessage: err
                    })
                )
            }
            return (
                res.send(JSON.stringify({
                    data: { id: result.length + 1, ...req.body },
                    responseCode: 0
                }))
            )
        })
    })
})
router.delete('/book/delete/:id', (req, res) => {
    fs.readFile(path.join(__dirname, "../data.json"), (err, data) => {
        if (err) {
            return (
                res.status(500).send({
                    resposneCode: -1,
                    userMessage: err
                })
            )
        }
        let result = JSON.parse(data)
        result = result.filter(i => i.id !== +req.params.id)
        let put = JSON.stringify(result, null, 2)
        fs.writeFile(path.join(__dirname, "data.json"), put, (err) => {
            if (err) {
                return (
                    res.status(500).send({
                        responseCode: -1,
                        userMessage: err
                    })
                )
            }
            return (
                res.send(JSON.stringify({
                    data: { id: result.length + 1, ...req.body },
                    responseCode: 0
                }))
            )
        })
    })
})
module.exports = router