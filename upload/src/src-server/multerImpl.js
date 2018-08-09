module.exports = (app) => {
    var redis = require('redis');
    const redis_host= process.env.REDIS_HOST

    var host = "redis://" + redis_host + ":6379";
    var redisclient = redis.createClient(host);
    redisclient.select(2);

    const multer = require('multer');
    
    var config={
      onFileUploadComplete: function (file) {
      console.log(file.fieldname + ' uploaded to ' + file.path)
      }}


    const storage = multer.diskStorage({
      destination: app.get('destination'),
      filename: function (req, file, cb) {
      
        // Mimetype stores the file type, set extensions according to filetype
        
        cb(null, file.originalname);
      }
    });
    const upload = multer({storage: storage});
    
    


    app.post('/uploadHandler', upload.single('file'), function (req, res, redisclient) {
      if (req.file && req.file.originalname) {
        console.log(`Received file ${req.file.originalname}`);
        let obj = {filename : req.file.originalname, token: req.token}
        redisclient.hmset('uploadpdf.'+obj.filename, obj)
        //TODO add key to redis with token and hash
      }
  
      res.send({ responseText: req.file.path }); // You can send any response to the user here
    });
    app.post('/getstatus', function (req, res, next) {
        if (req.file && req.file.originalname) {
          console.log(`Received file ${req.file.originalname}`);
        }
    
        res.send({ responseText: "file conversion in progress :" + req.file.path }); // You can send any response to the user here
      });

    
  }