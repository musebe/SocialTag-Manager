// src/types.ts
// src/types.ts

export interface Tag {
    Id: string;
    Created: string;
    Tag: string;
    LastUsedDate: string;
    Color: string; // Confirm this is correctly included
}

export interface Message {
    Id: string;
    Created: string;
    Network: string;
    Message: string;
    Tags: Tag[];
}
