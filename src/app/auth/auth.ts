export interface LoginResponse {
    message: string,
    token: string,
    profile: UserProfile
};

export interface UserProfile {
    firstName: string,
    lastName: string,
    profileId: number,
    workerId?: number,
    doctorId?: number,
    state: string,
    languagePreference: string,
    specialization: string,
}
