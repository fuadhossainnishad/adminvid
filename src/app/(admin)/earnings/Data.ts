export enum TSubscription {
    ANNUAL = "Annual",
    FREE = "Free",
    MONTHLY = "Monthly",
}

export interface IEarnings {
    Serial: string;
    User: {
        photo: string;
        name: string;
    };
    Subscription: TSubscription;
    Amount: number;
    "Acc Number": string;
    Date: Date;
}

export interface Action {
    view: React.ReactNode;
    block: React.ReactNode;
}

export const earningsData: IEarnings[] = [
    {
        Serial: "1",
        User: { photo: "/assets/images/profile.svg", name: "John Doe" },
        Subscription: TSubscription.ANNUAL,
        Amount: 120.5,
        "Acc Number": "123456789",
        Date: new Date("Jan 15, 2025"),
    },
    {
        Serial: "2",
        User: { photo: "/assets/images/profile.svg", name: "Jane Smith" },
        Subscription: TSubscription.FREE,
        Amount: 50.75,
        "Acc Number": "987654321",
        Date: new Date("2023-09-02"),
    },
    {
        Serial: "3",
        User: { photo: "/assets/images/profile.svg", name: "Alice Johnson" },
        Subscription: TSubscription.MONTHLY,
        Amount: 80.25,
        "Acc Number": "456789123",
        Date: new Date("2023-09-03"),
    },
];