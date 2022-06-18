const express = require('express');
const router = express.Router();
import locationController from "../../../controllers/locations";


router.get('/',locationController.fetch_all_locations); 

router.get('/:id',locationController.fetch_by_id_locations); 

router.post('/',locationController.create_new_location);

router.put('/:id',locationController.update_location);


module.exports = router