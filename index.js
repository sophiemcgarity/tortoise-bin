const express = require('express')
const bodyParser = require('body-parser') // middleware that parses incoming requests
const app = express()
const { pool } = require('./config')  // Enables connection to postgres
const cors = require('cors')          // Helps us avoid cors issues
const port = 3000

// We might need to get rid of the middleware in order to get the raw. Not sure about this
app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)
app.use(cors())

// Test route to make sure app is listening on the desired port
app.get('/', (request, response) => {
  response.json({ info: 'Node.js, Express, and Postgres API' })
})

// Homepage, returns static content
app.get('/', (request, response) => {

})

// Creation of new bin
app.post('/createBin', (request, response) => {
  // Generate a 8 digit string made up from letters and numbers
  // Insert this into database
  // Redirect to inspect page? Maybe simply display the URL generated like requestbin does
})

// This is the endpoint for the webhook
app.post('/:bin_path', (request, response) => {
  // We need to parse through the body of the request, as well as headers
  // Determine request type, origin ip
  // Generate a timestamp for when the request was received
  // Obtain the id associated with this bin path, and insert a new record to the request and payload tables (or we can just have the payload in the request to avoid like Sophie suggested)
})

// Route that will display all the requests associated with a bin_path
// Will have to query DB and then use templating to generate HTML and return that as response
// This is when one of thise templating engines comes in
app.get('/:bin_path?inspect', (request, response) => {

})

// Test route just to make sure we can query the DB Charles made
app.get('/bins', (request, response) => {
  pool.query('SELECT * FROM bins', (error, results) => {
    if (error) {
      throw error
    }

    response.status(200).json(results.rows)
  })
})


app.listen(port, () => {
  console.log(`App running on port ${port}.`)
})