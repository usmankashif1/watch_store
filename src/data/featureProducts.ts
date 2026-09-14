import { products } from "./products";

export const featureProducts = [
    {
        id: "feature-bremont",
        label: "New Arrival",
        title: products[0].brand.split(" ")[0],
        description: "A refined timepiece built for those who value precision.",
        image: require("../assets/images/watches/Bremont.png"),
        product: products[0],
    },

    {
        id: "feature-2",
        label: "Featured",
        title: products[1].brand.split(" ")[0],
        description: "Designed with timeless style and precision craftsmanship.",
        image: products[1].image,
        product: products[1],
    },

    {
        id: "feature-3",
        label: "Trending",
        title: products[2].brand.split(" ")[0],
        description: "A standout piece made to elevate your everyday style.",
        image: products[2].image,
        product: products[2],
    },

];