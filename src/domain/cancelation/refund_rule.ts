export interface IRefundRule {
    calculateRefund(totalprice: number): number
}

export class fullRefund implements IRefundRule{
    calculateRefund(totalprice: number): number {
        return totalprice = 0;
    }
}

export class parcialRefund implements IRefundRule{
    calculateRefund(totalprice: number): number {
        return totalprice * 0.5;
    }
}

export class noRefund implements IRefundRule{
    calculateRefund(totalprice: number): number {
        return totalprice;
    }
}

export class RefunRuleFactory {
    static getRefunRule(daysUntilCheckin: number): IRefundRule {
        if(daysUntilCheckin > 7) {
            return new fullRefund;
        } else if (daysUntilCheckin >= 1) {
            return new parcialRefund;
        }
        return new noRefund;
    }
}