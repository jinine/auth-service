import * as bcrypt from 'bcrypt';

export const HashPassword = async(password: string): Promise<String> => { 
    const salt = await bcrypt.genSalt();
    const hash = await bcrypt.hash(password, salt);
    return hash;
}

export const ComparePassword = async (hash: string, password: string): Promise<boolean> => {
    const isMatch = await bcrypt.compare(password, hash);
    return isMatch;
}