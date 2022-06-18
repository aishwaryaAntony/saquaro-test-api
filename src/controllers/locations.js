import db from '../models';

exports.fetch_all_locations = async (req, res, next) => {
    try {
        let fetch_all_locations = await db.Location.findAll();

        res.status(200).json({
            status: 'success',
            payload: fetch_all_locations,
            message: 'Location fetched successfully'
        });

    } catch (error) {
        console.log("Error at fetch locations ==> " + error);
        res.status(500).json({
            status: "failed",
            payload: {},
            message: "Error while locations",
        });
    }
}

exports.fetch_by_id_locations = async (req, res, next) => {
    try {
        let { id } = req.params;

        let fetch_locations = await db.Location.findOne({
            where: {
                id: id
            }
        });

        res.status(200).json({
            status: 'success',
            payload: fetch_locations,
            message: 'Location fetched by id successfully'
        });

    } catch (error) {
        console.log("Error at fetch by id locations  ==> " + error);
        res.status(500).json({
            status: "failed",
            payload: {},
            message: "Error while by id locations",
        });
    }
}

exports.create_new_location = async (req, res, next) => {
    try {

        const { name, code, street_address_line1, street_address_line2, city, state, country, zipcode, phone, acuity_ref } = req.body;

        let new_location = await db.Location.create({
            name,
            code,
            street_address_line1,
            street_address_line2,
            city,
            state,
            country,
            zipcode,
            phone,
            status: "ACTIVE",
            acuity_ref: acuity_ref
        })

        res.status(200).json({
            status: 'success',
            payload: new_location,
            message: 'Location created successfully'
        });

    } catch (error) {
        console.log("Error at fet create new locations ==> " + error);
        res.status(500).json({
            status: "failed",
            payload: {},
            message: "Error while create new locations",
        });
    }
}

exports.update_location = async (req, res, next) => {
    try {
        let { id } = req.params;

        const { name, code, street_address_line1, street_address_line2, city, state, country, zipcode, phone, status, acuity_ref } = req.body;

        let update_location = await db.Location.update({
            name,
            code,
            street_address_line1,
            street_address_line2,
            city,
            state,
            country,
            zipcode,
            phone,
            status,
            acuity_ref: acuity_ref
        }, {
            where: {
                id: id
            }
        })

        res.status(200).json({
            status: 'success',
            payload: update_location,
            message: 'Location updated successfully'
        });

    } catch (error) {
        console.log("Error at fet update locations ==> " + error);
        res.status(500).json({
            status: "failed",
            payload: {},
            message: "Error while update locations",
        });
    }
}

