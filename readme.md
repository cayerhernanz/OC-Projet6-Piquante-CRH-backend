## Installing the server
Clone this repo then run 'npm install'.

## Before running the server
Create 'images' folder.
Create a '.env' file with the variables:
'RANDOM_TOKEN_SECRET:' ( followed by your personal token key).
'MONGO_DB:' (followed by your mongo atlas credentials for your cluster).

## Running server
Run 'node server' for backend server. Server loads on: http://localhost:3000/api 
If the server runs on another port for any reason, this is printed to the
console when the server starts ('Listening on port xxxx').