import redis  from 'redis';
// import bluebird from 'bluebird';
// bluebird.promisifyAll(redis)
const client = redis.createClient();
// bluebird.promisifyAll(redis)

client.on('connect', () => {
  console.log('redis server connected')
})
client.on("error", function (err) {
    console.log("Error " + err);
});


export default client;
