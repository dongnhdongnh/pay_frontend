import { Model } from "model/Model";

export class PriceUsd{
    timestamp: string;
    price: string;

    constructor(timestamp, price){
        this.timestamp = timestamp;
        this.price = price;
    }
}