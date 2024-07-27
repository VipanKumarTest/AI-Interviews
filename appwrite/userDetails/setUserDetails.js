import userDetailService from "./userDetails";

class SetUserDetails {
    async setUserDetail(slug, userData) {
        try {
            userDetailService.createUserDetail(slug, userData);
        } catch (error) {
            console.error("Appwrite service :: createUserDetail :: error", error);
        }
    }

    async setUpdateUserDetail(slug, userData) {
        try {
            userDetailService.updateUserDetail(slug, userData);
        } catch (error) {
            console.error("Appwrite service :: updateUserDetail :: error", error);
        }
    }

    async getUserDetail(slug) {
        try {
            return userDetailService.getUserDetails(slug);
        } catch (error) {
            console.error("Appwrite service :: getUserDetails :: error", error);
        }
    }
}

const setUserDetailService = new SetUserDetails();

export default setUserDetailService;