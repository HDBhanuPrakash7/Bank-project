import express from 'express';
import joi from 'joi';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

const router = express.Router();

router.get('/', (req, res) => {

    var headers = req.headers;
    var branchname = headers['branchname'];

    const schema = joi.object({
        branchname: joi.string().required()
    });

    const options = {
        abortEarly: false, 
        allowUnknown: true, 
        stripUnknown: true 
    };

    const { error, value } = schema.validate(req.headers, options);

    if (error) {
        res.send("Please enter the valid branch name");
    } else {
        let url = `https://api.lloydsbank.com/open-banking/v2.2/branches`;
        axios.get(url).then(resp => {
         var result = resp.data.data[0].Brand[0].Branch;
            var i = null;
            var resData = false;
            for (i = 0; result.length > i; i += 1) {
               if (result[i].Name === branchname) {
                    resData = result[i];
                } 
            }
            if(resData){
              res.send(resData);
            }
            else{
              res.send("Branch not found");
            }
        });
    }

});

export default router;