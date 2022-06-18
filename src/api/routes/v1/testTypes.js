const express = require('express');
const router = express.Router();
import testTypesController from "../../../controllers/testTypes";


router.get('/', testTypesController.fetch_all_test_types); 

router.get('/:id',testTypesController.fetch_by_id_test_type); 

router.post('/',testTypesController.create_new_test_type);

router.put('/:id',testTypesController.update_test_type);

module.exports = router