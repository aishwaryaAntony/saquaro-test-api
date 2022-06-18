import db from '../models';
const { Op } = require("sequelize");

exports.fetch_all_location_test_types = async (req, res, next) => {
    try {
        let fetch_all_location_test_types = await db.LocationTestType.findAll(
            {
                include: [
                    {
                        model: db.Location,
                        as: "location",
                    },
                    {
                        model: db.TestType,
                        as: "testType",
                    }
                ]
            }
        );

        res.status(200).json({
            status: 'success',
            payload: fetch_all_location_test_types,
            message: 'Location test types fetched successfully'
        });

    } catch (error) {
        console.log("Error at fetch Location test types ==> " + error);
        res.status(500).json({
            status: "failed",
            payload: {},
            message: "Error while Location test types",
        });
    }
}

exports.fetch_by_id_location_test_type = async (req, res, next) => {
    try {
        let { id } = req.params;

        let fetch_location_test_type = await db.LocationTestType.findOne({
            where: {
                id: id
            }
        });

        res.status(200).json({
            status: 'success',
            payload: fetch_location_test_type,
            message: 'Location test type fetched by id successfully'
        });

    } catch (error) {
        console.log("Error at fetch by id Location test type  ==> " + error);
        res.status(500).json({
            status: "failed",
            payload: {},
            message: "Error while by id  Location test type",
        });
    }
}

exports.create_new_location_test_type = async (req, res, next) => {
    try {

        const { test_type_id, location_id, location_test_type_ref, price, is_paid_type, is_insurance_test, acuity_ref, display_name, rank_order } = req.body;

        let fetchTestType = await db.TestType.findOne({
            where: {
                id: test_type_id
            }
        });

        let fetchLocation = await db.Location.findOne({
            where: {
                id: location_id
            }
        });

        let qrCode = `${fetchLocation.code}-${fetchTestType.code}`;

        let new_test_type = await db.LocationTestType.create({
            test_type_id,
            location_id,
            location_test_type_ref,
            price,
            is_paid_type,
            is_insurance_test,
            qr_code: qrCode,
            display_name: display_name,
            rank_order: rank_order,
            status: "ACTIVE",
            acuity_ref: acuity_ref
        });

        res.status(200).json({
            status: 'success',
            payload: new_test_type,
            message: 'Location test type created successfully'
        });

    } catch (error) {
        console.log("Error at fet create new Location test type ==> " + error);
        res.status(500).json({
            status: "failed",
            payload: {},
            message: "Error while create new Location test type",
        });
    }
}

exports.update_location_test_type = async (req, res, next) => {
    try {
        let { id } = req.params;

        const { test_type_id, location_id, location_test_type_ref, price, is_paid_type, is_insurance_test, status, acuity_ref, display_name, rank_order } = req.body;

        let update_test_type = await db.LocationTestType.update({
            test_type_id,
            location_id,
            location_test_type_ref,
            price,
            is_paid_type,
            is_insurance_test,
            display_name: display_name,
            rank_order: rank_order,
            status,
            acuity_ref: acuity_ref
        }, {
            where: {
                id: id
            }
        })

        res.status(200).json({
            status: 'success',
            payload: update_test_type,
            message: 'Location test type updated successfully'
        });

    } catch (error) {
        console.log("Error at fet update Location test type ==> " + error);
        res.status(500).json({
            status: "failed",
            payload: {},
            message: "Error while update Location test type",
        });
    }
}

exports.delete_location_test_type = async (req, res, next) => {
    try {
        let { id } = req.params;

        await db.LocationTestType.destroy({
            where: {
				id: id
			}
        });
        res.status(200).json({
            status: 'success',
            message: 'Location test type deleted successfully'
        });
    } catch (error) {
        console.log("Error at delete Location test type ==> " + error);
        res.status(500).json({
            status: "failed",
            payload: {},
            message: "Error while deleting Location test type",
        });
    }
}

exports.delete_location_test_type_by_date = async (req, res, next) => {
    try {
        let { date, ids } = req.body;

        // await db.LocationTestType.destroy({
        //     where: {
		// 		"createdAt": {
        //             [Op.lt]: currentDate,
        //             [Op.gt]: new Date(currentDate - 24 * 60 * 60 * 1000)
        //         }
		// 	}
        // });

        await db.LocationTestType.destroy({
            where: {
				id: ids
			}
        });
        res.status(200).json({
            status: 'success',
            message: 'Location test type deleted successfully'
        });
    } catch (error) {
        console.log("Error at delete Location test type ==> " + error);
        res.status(500).json({
            status: "failed",
            payload: {},
            message: "Error while deleting Location test type",
        });
    }
}