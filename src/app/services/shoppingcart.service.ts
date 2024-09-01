import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { CartSummary, ShipmentAddressDto, ShipmentCartItemDto, ShipmentPurchaseOrderDto, ShoppingCart, ShoppingCartItem } from "../model/shoppingcart.model";
import { ApiResponse } from "../model/common.model";
import { Observable, Subject } from "rxjs";
import { API_ENDPOINTS } from "../model/constants";

@Injectable({providedIn: 'root'})
export class ShoppingCartService {
    cartSubject = new Subject<string>();
    cartDataSubject = new Subject<ShoppingCart>();
    constructor(private http: HttpClient) {

    }

    refreshCartData() {
        this.cartSubject.next("update_cart");
    }

    refreshCart(cart: ShoppingCart) {
        this.cartDataSubject.next(cart);
    }

    AddToCart(cart: ShoppingCart): Observable<ApiResponse<ShoppingCart>> {
        return this.http.post<ApiResponse<ShoppingCart>>(API_ENDPOINTS.ADD_ITEMS_TO_USER_CART(), cart);
    }

    getUserCart(): Observable<ApiResponse<ShoppingCart[]>> {
        return this.http.get<ApiResponse<ShoppingCart[]>>(API_ENDPOINTS.GET_USER_CART_ITEMS());
    }
    
    removeCartItem(cartItemId: number): Observable<ApiResponse<ShoppingCart[]>> {
        return this.http.delete<ApiResponse<ShoppingCart[]>>(API_ENDPOINTS.DELETE_USER_CART_ITEM(cartItemId));
    }

    updateQuantity(cartItemDto: ShipmentCartItemDto): Observable<ApiResponse<boolean>> {
        return this.http.patch<ApiResponse<boolean>>(API_ENDPOINTS.UPDATE_ORDER_QUANTITY(), cartItemDto);
    }

    getShipmentData(cartId: number): Observable<ApiResponse<ShipmentAddressDto[]>> {
        return this.http.get<ApiResponse<ShipmentAddressDto[]>>(API_ENDPOINTS.GET_ORDER_SHIPMENTS(cartId));
    }

    addShipment(dto: ShipmentAddressDto): Observable<ApiResponse<ShipmentAddressDto[]>> {
        return this.http.post<ApiResponse<ShipmentAddressDto[]>>(API_ENDPOINTS.ADD_ORDER_SHIPMENT(), dto);
    }

    deleteShipment(cartId: number, shipmentId: number): Observable<ApiResponse<ShipmentAddressDto[]>> {
        return this.http.delete<ApiResponse<ShipmentAddressDto[]>>(API_ENDPOINTS.DELETE_ORDER_SHIPMENTS(cartId, shipmentId));
    }

    updateShipment(cartId: number, shipmentId: number, address: ShipmentAddressDto): Observable<ApiResponse<ShipmentAddressDto[]>> {
        return this.http.patch<ApiResponse<ShipmentAddressDto[]>>(API_ENDPOINTS.UPDATE_ORDER_SHIPMENTS(cartId, shipmentId), address);
    }

    addShipmentPo(cartId: number, purchaseOrder: ShipmentPurchaseOrderDto): Observable<ApiResponse<ShipmentPurchaseOrderDto>> {
        return this.http.post<ApiResponse<ShipmentPurchaseOrderDto>>(API_ENDPOINTS.ADD_SHIPMENT_PO(cartId), purchaseOrder);
    }

    updateShipmentPo(cartId: number, purchaseOrder: ShipmentPurchaseOrderDto): Observable<ApiResponse<ShipmentPurchaseOrderDto>> {
        return this.http.patch<ApiResponse<ShipmentPurchaseOrderDto>>(API_ENDPOINTS.UPDATE_SHIPMENT_PO(cartId), purchaseOrder);
    }
    getShipmentPo(cartId: number): Observable<ApiResponse<ShipmentPurchaseOrderDto>> {
        return this.http.get<ApiResponse<ShipmentPurchaseOrderDto>>(API_ENDPOINTS.GET_SHIPMENT_PO(cartId));
    }

    orderCart(cartId: number): Observable<ApiResponse<Boolean>> {
        return this.http.post<ApiResponse<Boolean>>(API_ENDPOINTS.PLACE_ORDER(cartId), {});
    }

    deleteCart(cartId: number): Observable<ApiResponse<Boolean>> {
        return this.http.delete<ApiResponse<Boolean>>(API_ENDPOINTS.DELETE_CART(cartId));
    }

    calculateSummary(shoppingCart?: ShoppingCart): CartSummary {
        let total: number = 0;
        shoppingCart?.shoppingCartItem.forEach((item: ShoppingCartItem) => {
          total += (item.totalPrice || 0);
        });
        const cartSummary: CartSummary = {
          subTotal: total,
          discounts: 0,
          shippingCharge: 0,
          handlingCharge: 0,
          taxes: 0,
          totalPrice: 0
        };
        cartSummary.totalPrice = cartSummary.subTotal - cartSummary.discounts 
                                + cartSummary.shippingCharge + cartSummary.handlingCharge
                                + cartSummary.taxes;
        return cartSummary;
    }
}