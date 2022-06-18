// Parse command line arguments using yargs
var argv = require("yargs")
	.command("master", "Load DB", function (yargs) { })
	.help("help").argv;
var command = argv._[0];
import Excel from "exceljs";
import db from "../src/models";


const loadMasterTable = filename => {
	return new Promise(async (resolve, reject) => {
		try {
			let workbook = new Excel.Workbook();
			console.log("File name => " + filename);
			await workbook.xlsx.readFile(filename).then(() => {
				console.log("\n==================Master tables started loading====================\n");
				loadLocation(workbook).then(location => {
					loadTestType(workbook).then(testType => {
						loadLocationTestType(workbook).then(locationTestType => {
							console.log("==================Master tables loaded successfully====================\n");
							resolve("Success");
						});
					});
				});
			});
		} catch (error) {
			reject(error);
		}
	});
};

const loadLocation = workbook => {
	return new Promise((resolve, reject) => {
		let worksheet = workbook.getWorksheet("Locations");
		let lastRow = worksheet.lastRow;
		let isRejected = false;
		let locationArray = [];

		try {
			worksheet.eachRow({ includeEmpty: true }, async (row, rowNumber) => {
				if (rowNumber > 1) {
					let locationObj = {};
					locationObj.code = row.getCell(1).value;
					locationObj.name = row.getCell(2).value;
					locationObj.street_address_1 = row.getCell(3).value;
					locationObj.street_address_2 = row.getCell(4).value;
					locationObj.city = row.getCell(5).value;
					locationObj.state = row.getCell(6).value;
					locationObj.country = row.getCell(7).value;
					locationObj.zipcode = row.getCell(8).value;
					locationObj.phone = row.getCell(9).value;
					locationObj.status = row.getCell(10).value;
					locationObj.acuity_ref = row.getCell(11).value;
					locationArray.push(locationObj);
					if (row === lastRow) {
						if (!isRejected === true) {
							console.log(`Location ===> ${JSON.stringify(locationArray)}`)
							for (let location of locationArray) {
								const { name, code, street_address_1, street_address_2, city, state, country, zipcode, phone, status, acuity_ref } = location;
								if(code !== null){
									let findLocation = await db.Location.findOne({
										where: {
											code: code
										}
									});
									if (findLocation === null) {
										await db.Location.create({
											name,
											code,
											street_address_line1: street_address_1,
											street_address_line2: street_address_2,
											city,
											state,
											country,
											zipcode,
											phone,
											status,
											acuity_ref
										});
									}
								}								
							}
							resolve("Location table loaded successfully");
						}
					}
				}
			});
		} catch (error) {
			resolve(error);
			console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!===> " + error);
		}
	});
};

const loadTestType = workbook => {
	return new Promise((resolve, reject) => {
		let worksheet = workbook.getWorksheet("TestTypes");
		let lastRow = worksheet.lastRow;
		let isRejected = false;
		let testArray = [];

		try {
			worksheet.eachRow({ includeEmpty: true }, async (row, rowNumber) => {
				if (rowNumber > 1) {
					let testObj = {};
					testObj.code = row.getCell(1).value;
					testObj.name = row.getCell(2).value;
					testObj.status = row.getCell(3).value;
					testObj.description = row.getCell(4).value;
					testArray.push(testObj);

					if (row === lastRow) {
						if (!isRejected === true) {
							for (let test of testArray) {
								const { name, code, description, status } = test;

								let findTestType = await db.TestType.findOne({
									where: {
										code: code
									}
								});

								if (findTestType === null) {
									await db.TestType.create({
										name,
										code,
										description,
										status
									});
								}
							}
							resolve("TestType table loaded successfully");
						}
					}
				}
			});
		} catch (error) {
			resolve(error);
			console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!===> " + error);
		}
	});
};


const loadLocationTestType = workbook => {
	return new Promise((resolve, reject) => {
		let worksheet = workbook.getWorksheet("LocationTestTypes");
		let lastRow = worksheet.lastRow;
		let isRejected = false;
		let locationTestArray = [];

		try {
			worksheet.eachRow({ includeEmpty: true }, async (row, rowNumber) => {
				if (rowNumber > 1) {
					let locationTestObj = {};
					locationTestObj.location_code = row.getCell(1).value;
					locationTestObj.test_type_code = row.getCell(3).value;
					locationTestObj.location_test_type_ref = row.getCell(5).value;

					locationTestObj.description = `${row.getCell(4).value} - ${row.getCell(2).value}`;
					locationTestObj.price = row.getCell(7).value;
					locationTestObj.is_paid_type = row.getCell(8).value;
					locationTestObj.is_insurance_test = row.getCell(9).value;
					locationTestObj.status = row.getCell(10).value;
					locationTestObj.acuity_ref = row.getCell(11).value;
					locationTestArray.push(locationTestObj);

					if (row === lastRow) {
						if (!isRejected === true) {
							let fetchLocation = await db.Location.findAll();

							let fetchTestType = await db.TestType.findAll();
							
							for (let location of locationTestArray) {
								const { test_type_code,location_code, location_test_type_ref, description, price,is_paid_type, is_insurance_test, status, acuity_ref } = location;
								let findLocation = fetchLocation.find(x=> x.code === location_code);
								let findTest = fetchTestType.find(x=> x.code === test_type_code);
								let qrCode = `${location_code}-${test_type_code}`;
								if(findLocation !== undefined && findTest !== undefined){
									await db.LocationTestType.create({
										test_type_id: findTest.id,
										location_id: findLocation.id,
										location_test_type_ref: location_test_type_ref,
										description,
										price,
										is_paid_type,
										is_insurance_test,
										qr_code: qrCode,
										status,
										acuity_ref
									});
								}
							}
							resolve("Location Test Type table loaded successfully");
						}
					}
				}
			});
		} catch (error) {
			resolve(error);
			console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!===> " + error);
		}
	});
};


if (command === "master") {
	try {
		console.log("Loading data from " + argv._[1]);
		if (argv._[1] !== undefined && argv._[1] !== "") {
			loadMasterTable(argv._[1]).then(result => {
				process.exit();
			});
		}
	} catch (error) {
		console.log("error=================>" + error);
	}
}
