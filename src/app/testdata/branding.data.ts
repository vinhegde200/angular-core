import { AppUserData, Branding, Company, Page } from "../model/access.model";
import { ApiResponse } from "../model/common.model";

export class BrandingTestData {
    comp_title: ApiResponse<Company> = {
        data: {
            title: "Testing Company"
        }
    }

    comp_name: ApiResponse<Company> = {
        data: {
            name: "Testing Company Name"
        }
    }

    comp: ApiResponse<Company> = {
        data: {
            id: 1,
            name: "Test Company",
            title: "Test Company Title",
            website: "testwebsite.com",
            domain: "testsite.com"
        }
    }

    branding: ApiResponse<Branding> = {
        data: {
            introText: "This is company intro text"
        }
    }

    user: ApiResponse<AppUserData> = {
        data: {
            userName: "Demo User",
            tenant: {
                id: 1
            },
            enabled: true
        }
    }

    user_1: ApiResponse<AppUserData> = {
        data: {
            id: 1,
            userName: "Demo User",
            email: "demo@test.com",
            roles: [
                {
                    name: "admin"
                },
                {
                    name: "user"
                }
            ],
            tenant: {
                id: 1
            },
            enabled: true
        }
    }

    page: ApiResponse<Page> = {
        data: {
            sections: [
                {
                    header: 'Test Page',
                    content: '<h3>Page Content</h3>'
                }
            ]
        }
    }
}