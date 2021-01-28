export class CreateSupplier{
	full_name : String;
	email : String;
	password : String
}

export class Business{
	id : Number
	name : String;
	organisationType : String;
	ownershipType : String;
	businessType : String;
	businessEmail : String;
	websiteLink : String;
	address : String;
	description : String;
	profileViews : Number;
	yearOfEstablishment : Date;
	gst : String;
	pan : String;
	cin : String;
	dgft : String;
}

export class Supplier{
    id : Number;
	full_name : String;
    phone_number : String;
	mobile_number : String;
	email : String;
	password : String;
	email_optional : String;
	address : String;
	city : String
    area_street : String;
	district : String;
	taluka : String;
    state : String;
    pincode : String;
	designation : String;
}


export class createBusiness{
	name : String;
	organisationType : String;
	ownershipType : String;
	businessType : String;
	businessEmail : String;
	websiteLink : String;
	address : String;
	description : String;
	profileViews : Number;
	yearOfEstablishment : Date;
	gst : String;
	pan : String;
	cin : String;
	dgft : String;
}

export class updateProduct{

	name : String;
	price : Number;
	arrival : String;
	unit : String;
	brand : String;
	code : Number;
	offer : Number;
	categoryId : Number;
	additional_information : String;
	specification_1 : String;
	specification_2 : String;
	specification_3 : String;
	specification_4 : String;
	specification_5 : String;
	specification_6 : String;
	specification_7 : String;
	specification_8 : String;
	specification_9 : String;
	specification_10 : String;
	description_1 : String;
	description_2 : String;
	description_3 : String;
	description_4 : String;
	description_5 : String;
	description_6 : String;
	description_7 : String;
	description_8 : String;
	description_9 : String;
	description_10 : String;
	created_date : Date;
	updated_date : Date;
	clicks : Number;	
}

export class Product{
	name : String;
	price : Number;
	arrival : String;
	unit : String;
	brand : String;
	code : Number;
	offer : Number;
	categoryId : Number;
	additional_information : String;
	specification_1 : String;
	specification_2 : String;
	specification_3 : String;
	specification_4 : String;
	specification_5 : String;
	specification_6 : String;
	specification_7 : String;
	specification_8 : String;
	specification_9 : String;
	specification_10 : String;
	description_1 : String;
	description_2 : String;
	description_3 : String;
	description_4 : String;
	description_5 : String;
	description_6 : String;
	description_7 : String;
	description_8 : String;
	description_9 : String;
	description_10 : String;
}


export class Quotes{

	customerId: Number
	customerName: String
	customerMobileNumber: Number
	productId: Number
	productName: String
	quantity: Number
	requirement: String;
					
}