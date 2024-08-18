const app = express();

const handle = (request) =>{
    var success = false;
    var message = "";
    var data = {};
    
    return {
        success,
        message,
        data,
    }
}

app.use((req,res)=>res.json(handle(req)));

app.listen(8080);