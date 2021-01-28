export class UrlMappings{
   
    // Supplier Url
    public static supplierLogIn  = "supplier/login/"
    public static supplierLogout = "supplier/logout"
    public static getLoggedInSupplier = "supplier/getSupplier"

    public static createSupplier = "supplier/createSupplier"
    public static updateSupplier = "supplier/updateSupplier"
    
    public static createBusiness = "business/createBusines"
    public static updateBusiness = "business/updateBusiness"

    public static getSupplierByBusinessId = "business/getBusinessId/"
    //Customer Url
    public static customerSignIn = ""
    public static customerLogin = "customer/customerLogin/"
    public static createcustomer = "customer/createCustomer"

    //Category
    public static getMainCategory = "mainCategory/getMainCategoryById/"

    // Product
    public static getProduct = "product/getProductById/"
    public static createProduct = "product/createProduct"
    public static getAllProductByBusiness =  "product/getAllProductByBusiness/"
    public static getSearchedProduct = "product/getListSearchedProduct/"

    //Product Image
    public static uploadProductImage = "productImage/uploadImage"

    //Quotes
    public static getQuotesBySessionId = "quotes/getQuotes/"
    public static newQuote = "quotes/saveQuotes"
}   