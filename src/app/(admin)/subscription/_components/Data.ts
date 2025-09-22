export enum ECycle {
    ANNUAL = "Annual",
    MONTHLY = "Monthly",
}

export interface ISubscription {
    id: string,
    "Subscription Name": string;
    "Billing Cycle": ECycle;
    "Short Description": string[];
    Price: number;
}
export const subscriptions: ISubscription[] = [
    {
        id: "1",
        "Subscription Name": "Premium Plan",
        "Billing Cycle": ECycle.ANNUAL,
        "Short Description": [
            "Unlimited access to all features",
            "Priority support",
            "Access to exclusive content",
            "Unlimited access to all features",
            "Priority support",
            "Access to exclusive content",
        ],
        Price: 120,
    },
    {
        id: "2",
        "Subscription Name": "Basic Plan",
        "Billing Cycle": ECycle.MONTHLY,
        "Short Description": [
            "Access to basic features",
            "Limited support",
            "Unlimited access to all features",
            "Priority support",
            "Access to exclusive content",
        ],
        Price: 15,
    },
];