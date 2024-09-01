import { ErpCustomerAddressDTO, ErpCustomerContactDTO } from "./erpcustomer.model";
import { Item } from "./item.model";

export interface ShoppingCartItem {
    id?: number;
    itemCode: string;
    orderQuantity: number;
    price: number;
    totalPrice?: number;
    priceUnitCode?: string;
    breakUnitCode?: string;
    freeQty: number;
    itemId: number;
    item?: Item;
}

export interface ShoppingCart {
    id?: number;
    cartName?: string;
    status?: number;
    createdBy?: string;
    modifiedBy?: string;
    shoppingCartItem: ShoppingCartItem[];
}

export interface CartSummary {
    subTotal: number;
    discounts: number;
    shippingCharge: number;
    handlingCharge: number;
    taxes: number;
    totalPrice: number;
}

export interface ShipmentCartItemDto {
    cartId: number;
    cartItemId: number;
    orderQuantity: number;
}

export interface ItemShipmentDto {
    id?: number;
    items: ItemQuantity[];
    address?: ErpCustomerAddressDTO;
    contact?: ErpCustomerContactDTO;
    percentageSplit?: number;
    dueDate?: Date;
    deliveryInstruction?: string;
}

export interface ItemQuantity {
    id?: number;
    itemDesc: string;
    itemType: string;
    item?: ShoppingCartItem;
    quantity: number;
    remQuantity: number;
}

export interface ShipmentAddressDto {
    id?: number;
    ShoppingCartId: number;
    percentSplit: number;
    shippingAddressId: number;
    billingAddressId: number;
    customerContatId: number;
    shipmentAddressItem: ShipmentAddressItemDto[];
    dueDate?: Date;
    deliveryInstructions?: string;
}

export interface ShipmentAddressItemDto {
    id?: number;
    itemId: number;
    quantity: number;
}

export interface ShipmentPurchaseOrderDto {
    id?: number;
    shoppingCartId: number;
    poNumber?: string;
    accNumber?: string;
    poFilePath?: string;
}
