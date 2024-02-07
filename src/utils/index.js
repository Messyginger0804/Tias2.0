export const fakeData = [{
    _id: '659d938902a508d9f3e109c8',
    name: "mens tshirt blue",
    description: "slim fit blue mens t-shirt",
    price: 19,
    category: "men",
    sizes: [
        {

            id: "s",
            label: "S"
        }
    ],
    deliveryInfo: "same day",
    onSale: "yes",
    priceDrop: 4,
    imageUrl: "htt]ps://firebasestorage.googleapis.com/v0/b/tias-thenewone.appspot.com/o/ecommerce%2Fmens-shirt-blue.jpg%20-%201704825600763-%20e0f5pczn66?alt=media&token=5977c51e-7b86-42dd-9327-ba887b34cbbf",

},
]

export const navOptions = [
    {
        id: "home",
        label: "Home",
        path: "/",
    },
    {
        id: "listing",
        label: "All Products",
        path: "/product/listing/allProducts",
    },
    {
        id: "listingMen",
        label: "Men",
        path: "/product/listing/men",
    },
    {
        id: "listingWomen",
        label: "Women",
        path: "/product/listing/women",
    },
    {
        id: "listingKGirls",
        label: "girls",
        path: "/product/listing/girls",
    },
    {
        id: "listingBoys",
        label: "boys",
        path: "/product/listing/boys",
    },
];

export const adminNavOptions = [
    {
        id: "adminListing",
        label: "Manage All Products",
        path: "/adminView/allProducts",
    },
    {
        id: "adminNewProduct",
        label: "Add New Product",
        path: "/adminView/addProduct",
    },
];

export const registrationFormControls = [
    {
        id: "name",
        type: "text",
        placeholder: "Enter your name",
        label: "Name",
        componentType: "input",
    },
    {
        id: "email",
        type: "email",
        placeholder: "Enter your email",
        label: "Email",
        componentType: "input",
    },
    {
        id: "password",
        type: "password",
        placeholder: "Enter your password",
        label: "Password",
        componentType: "input",
    },
    {
        id: "role",
        type: "",
        placeholder: "",
        label: "Role",
        componentType: "select",
        options: [
            {
                id: "admin",
                label: "Admin",
            },
            {
                id: "customer",
                label: "customer",
            },
        ],
    },
];

export const loginFormControls = [
    {
        id: "email",
        type: "email",
        placeholder: "Enter your email",
        label: "Email",
        componentType: "input",
    },
    {
        id: "password",
        type: "password",
        placeholder: "Enter your password",
        label: "Password",
        componentType: "input",
    },
];

export const adminAddProductformControls = [
    {
        id: "name",
        type: "text",
        placeholder: "Enter name",
        label: "Name",
        componentType: "input",
    },
    {
        id: "price",
        type: "number",
        placeholder: "Enter price",
        label: "Price",
        componentType: "input",
    },
    {
        id: "description",
        type: "text",
        placeholder: "Enter description",
        label: "Description",
        componentType: "input",
    },
    {
        id: "category",
        type: "",
        placeholder: "",
        label: "Category",
        componentType: "select",
        options: [
            {
                id: "men",
                label: "Men",
            },
            {
                id: "women",
                label: "Women",
            },
            {
                id: "girls",
                label: "girls",
            },
            {
                id: "boys",
                label: "boys",
            },
        ],
    },
    {
        id: "deliveryInfo",
        type: "text",
        placeholder: "Enter deliveryInfo",
        label: "Delivery Info",
        componentType: "input",
    },
    {
        id: "onSale",
        type: "",
        placeholder: "",
        label: "On Sale",
        componentType: "select",
        options: [
            {
                id: "yes",
                label: "Yes",
            },
            {
                id: "no",
                label: "No",
            },
        ],
    },
    {
        id: "priceDrop",
        type: "number",
        placeholder: "Enter Price Drop",
        label: "Price Drop",
        componentType: "input",
    },
];

export const styles = {
    button:
        "'mt-1.5 inline-block bg-black px-5 py-3 text-xs font-medium uppercase tracking-wide text-white rounded'",
}

export const AvailableSizes = [
    {
        id: "s",
        label: "S",
    },
    {
        id: "m",
        label: "M",
    },
    {
        id: "l",
        label: "L",
    },
    {
        id: "xl",
        label: "xL",
    },
    {
        id: "2xl",
        label: "2xL",
    },
];

export const firebaseConfig = {
    apiKey: "AIzaSyDn6-GWKw1cy0_UlzgrLP9OGR_timYctDE",
    authDomain: "tias-thenewone.firebaseapp.com",
    projectId: "tias-thenewone",
    storageBucket: "tias-thenewone.appspot.com",
    messagingSenderId: "724378780514",
    appId: "1:724378780514:web:9f5a4228f65473933da23b",
    measurementId: "G-299VG4TKJC"
};

export const firebaseStroageURL =
    "gs://tias-thenewone.appspot.com";

export const addNewAddressFormControls = [
    {
        id: "fullName",
        type: "input",
        placeholder: "Enter your full name",
        label: "Full Name",
        componentType: "input",
    },
    {
        id: "address",
        type: "input",
        placeholder: "Enter your full address",
        label: "Address",
        componentType: "input",
    },
    {
        id: "city",
        type: "input",
        placeholder: "Enter your city",
        label: "City",
        componentType: "input",
    },
    {
        id: "state",
        type: "input",
        placeholder: "Enter your state",
        label: "State",
        componentType: "input",
    },
    {
        id: "postalCode",
        type: "input",
        placeholder: "Enter your postal code",
        label: "Postal Code",
        componentType: "input",
    },
];

export const initialCheckoutFormData = {
    shippingAddress: {},
    paymentMethod: "",
    totalPrice: 0,
    isPaid: false,
    paidAt: new Date(),
    isProcessing: true,
};