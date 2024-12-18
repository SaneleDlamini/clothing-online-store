import image1 from '../images/dress8.png';
import image2 from '../images/t-shirt.png';
import image3 from '../images/hoody2.png';
import image4 from '../images/suit.png';
import image5 from '../images/tekkie.png';
const products = [
    {
        id : 'p1',
        title : "Warm T-Shirt",
        price : 200,
        description : "This is the formal t-shit",
        onSale : true,
        salePrice : 150,
        quantity : 1,
        image : image2,
        category : "top",
        subCategory : "T-shirt",
        gender : "male",
        size : "Medium",
        color : "white",
        totalInStock : 20,
        isFeatured : false
    },
    {
        id : 'p2',
        title : "Warm Jacket",
        price : 300,
        description : "This is the formal ",
        onSale : false,
        salePrice : 150,
        quantity : 1,
        image : image3,
        category : "top",
        subCategory : "T-shirt",
        gender : "male",
        size : "Medium",
        color : "white",
        totalInStock : 20,
        isFeatured : false
    },
    {
        id : 'p3',
        title : "Hoody",
        price : 700,
        description : "This is the formal hoody",
        onSale : true,
        salePrice : 150,
        quantity : 1,
        image : image4,
        category : "top",
        subCategory : "Jacket",
        gender : "male",
        size : "Medium",
        color : "white",
        totalInStock : 20,
        isFeatured : false
    },
    {
        id : 'p4',
        title : "Long dress",
        price : 500,
        description : "This is the formal dress",
        onSale : false,
        salePrice : 150,
        quantity : 1,
        image : image1,
        category : "bottom",
        subCategory : "dress",
        gender : "female",
        size : "Medium",
        color : "white",
        totalInStock : 20,
        isFeatured : false
    },
    {
        id : 'p5',
        title : "Tekkie",
        price : 1000,
        description : "This is the formal jean",
        onSale : false,
        salePrice : 150,
        quantity : 1,
        image : image5,
        category : "top",
        subCategory : "T-shirt",
        gender : "male",
        size : "Medium",
        color : "white",
        totalInStock : 20,
        isFeatured : false
    },
]

export default products;

