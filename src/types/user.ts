export interface User {
    id: number;
    username: string;
    email: string;
    first_name?: string;
    last_name?: string;
    encrypted_pass: string;
    profile_picture_url?: string;
    is_active: boolean;
    created_at: Date;
    updated_at: Date;
}
