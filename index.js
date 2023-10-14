import express from "express"

const app = express()

app.listen(8000, () => console.log("App running on port 8000"))

app.get('/', (req, res) => {
    res.json('API running :)')
})