import express from 'express'
import cors from 'cors'

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cors())

app.listen(3000, ()=>{
    console.log('ta rodando!')
})