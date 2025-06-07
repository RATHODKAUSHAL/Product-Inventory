const express = require("express")
const cors = require("cors")
require("dotenv").config()
const connectBD = require("./config/db")
const productRoute = require("./routes/productRoute.js")
const categoryRoute = require("./routes/categoryRoutes.js")

const app = express()
const port = process.env.PORT || 5000

app.use(express.json())
app.use(cors())

connectBD()

app.use('/api/product', productRoute)
app.use('/api/categories', categoryRoute)

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ 
      message: 'Something went wrong!', 
      error: process.env.NODE_ENV === 'development' ? err.message : {}
    });
  });
  

app.get('/', (req, res) => {
res.send("API Working")
})

app.listen(port,()=>{
    console.log(`Server Started on http://localhost:${port}`)
})