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