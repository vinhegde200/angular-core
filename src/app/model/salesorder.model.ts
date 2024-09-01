import { OrderStatusMap } from "./orderstatus.map.model";

export interface ErpSalesOrder {
    ackAddrNum: number;
    addtCustRef: string;
    ccAuthToken: string;
    compNum: number;
    csrUserCode: string;
    currCode: string;
    custCode: string;
    custRef: string;
    custReqDate: string; // Assuming this is represented as a string
    daysPrior: number;
    estCode: string;
    interfaceOrderCode: string;
    interfaceOrderGroup: string;
    ourContact: string;
    plannedAvailDate: string; // Assuming this is represented as a string
    plantCode: string;
    repUserCode: string;
    riskStock: boolean;
    shipAddrNum: number;
    sOrderDate: string; // Assuming this is represented as a string
    sOrderNum: number;
    sOrderStat: number;
    sOrderText: string;
    soSourceCode: string;
    subClientName: string;
    tableRecId: number;
    termsCode: string;
    tpbTaxCode: string;
    yourContact: string;
    orderStatusMap: OrderStatusMap;
    attributes: { [key: string]: string };
}