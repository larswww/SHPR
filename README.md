# SHPR
Shanghai Pizza Reviews 

live: [shanghaipizzareviews.com](http://shanghaipizzareviews.com)
demo video: https://youtu.be/djKOyoJA8ZM


To run the app, .env files must be created in root of client and server folders. 

The server .env:
NODE_ENV=debug
server_port=5000
productiondb=mongodb://localhost:27017/SHPR
debugdb=mongodb://localhost:27017/SHPR-debug
testdb=mongodb://localhost:27017/SHPR-test
admin_email=hi@larsw.net
admin_password=indulger
jwt_secret=keyboardcat
roles=ADMIN,USER
testbase_url=http://localhost:8080
debugbase_url=http://0.0.0.0:8080
upload_path=/Users/mbp/Documents/Code/SHPR/server/uploads


Please note that upload_path will be spec to your machine and will need changing

The client .env:
base_url=http://localhost:5000
hostname=0.0.0.0


At the top of index.js, path to the server.env must be specified. 

npm install in both client and server folder


##Tests

###Server

Run all tests in server/test directory with mocha, specify env variable as debug to engage the seed script, that will clear the db on each run


###Client

PLEASE NOTE, as these are e2e tests, you need to be running the server, altough some should work without the content from the server
'npm run e2e' in client folder will launch nightwatch/selenium
