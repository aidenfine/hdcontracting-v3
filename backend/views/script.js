import dotenv from 'dotenv'
var status = '<%- JSON.stringify(status) %>';
const URL = 'http://localhost:5001/'

if (JSON.parse(status) == "verified") {
    window.location.href(`${URL}`);
  }