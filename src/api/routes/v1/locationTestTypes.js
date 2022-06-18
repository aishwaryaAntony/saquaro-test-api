const express = require('express');
const router = express.Router();
import locationTestTypesController from "../../../controllers/locationTestTypes";


router.get('/',locationTestTypesController.fetch_all_location_test_types);

router.get('/:id',locationTestTypesController.fetch_by_id_location_test_type); 

router.post('/',locationTestTypesController.create_new_location_test_type);

router.put('/:id',locationTestTypesController.update_location_test_type);

router.delete('/:id', locationTestTypesController.delete_location_test_type);

router.post('/delete-by-date', locationTestTypesController.delete_location_test_type_by_date);

module.exports = router