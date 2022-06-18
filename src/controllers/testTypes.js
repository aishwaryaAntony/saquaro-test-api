import db from '../models';

exports.fetch_all_test_types = async (req, res, next) => {
    try {
        let fetch_all_test_type = await db.TestType.findAll();

        res.status(200).json({
            status: 'success',
            payload: fetch_all_test_type,
            message: 'Test Type fetched successfully'
        });

    } catch (error) {
        console.log("Error at fetch test type ==> " + error);
        res.status(500).json({
            status: "failed",
            payload: {},
            message: "Error while test type",
        });
    }
}

exports.fetch_by_id_test_type = async (req, res, next) => {
    try {
        let { id } = req.params;

        let fetch_all_test_type = await db.TestType.findOne({
            where: {
                id: id
            }
        });

        res.status(200).json({
            status: 'success',
            payload: fetch_all_test_type,
            message: 'test type fetched by id successfully'
        });

    } catch (error) {
        console.log("Error at fetch by id test type  ==> " + error);
        res.status(500).json({
            status: "failed",
            payload: {},
            message: "Error while by id test type",
        });
    }
}

exports.create_new_test_type = async (req, res, next) => {
    try {

        const { name, code, description, status, display_name } = req.body;

        let new_test_type = await db.TestType.create({
            name,
            code,
            description,
            display_name,
            status: "ACTIVE"
        })

        res.status(200).json({
            status: 'success',
            payload: new_test_type,
            message: 'test type created successfully'
        });

    } catch (error) {
        console.log("Error at fet create new test type ==> " + error);
        res.status(500).json({
            status: "failed",
            payload: {},
            message: "Error while create new test type",
        });
    }
}

exports.update_test_type = async (req, res, next) => {
    try {
        let { id } = req.params;

        const { name, code, description, status, display_name } = req.body;
        let update_test_type = await db.TestType.update({
            name,
            code,
            description,
            display_name,
            status
        }, {
            where: {
                id: id
            }
        })

        res.status(200).json({
            status: 'success',
            payload: update_test_type,
            message: 'test type updated successfully'
        });

    } catch (error) {
        console.log("Error at fet update test type ==> " + error);
        res.status(500).json({
            status: "failed",
            payload: {},
            message: "Error while update test type",
        });
    }
}

