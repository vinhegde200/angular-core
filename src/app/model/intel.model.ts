export interface Message {
    role: string;
    content: string;
}

export interface IntelPrompt {
    model?: string;
    messages: Message[];
}

export interface FormFillerResponse<T> {
    data: T;
    message: Message;
}

let Prompts: any = {
    "pkgcompany": "Here is an json defining a company information {\"Code\":\"mycompany\",\"Name\":\"My Company\",\"ContactName\":\"My Contact\",\"ContactEmail\":\"contact@company.com\",\"Address\":\"This is my address\",\"IsActive\":true,\"TenantCompanyMap\":{\"Tenant\":{\"Id\":23}}}",
    "none": ""
}

export class EntityPrompt {
    basePrompt: IntelPrompt;
    entity?: string;

    constructor(entity?: string) {
        this.entity = entity;
        this.basePrompt = {
            messages: [
                {
                    role: "system",
                    content: "You are a helpful assistant"
                },
                {
                    role: "system",
                    content: Prompts[this.entity || 'none']
                }
            ]
        }
    }
    addPrompt (input: string) {
        const resp = this.basePrompt;
        resp.messages.push();
        this.basePrompt.messages.push({
            role: "user",
            content: input
        });
    }

    addMessage(msg: Message) {
        this.basePrompt.messages.push(msg);
    }
}