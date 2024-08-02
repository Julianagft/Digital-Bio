export default function getInitials(string) {
    if (string) {
        const nameParts = string.split(" ");

        const firstName = nameParts.length > 0 ? nameParts[0] : "";
        const lastName = nameParts.length > 1 ? nameParts[nameParts.length - 1] : "";
    
        const avatarInitials = `${firstName[0]?.toUpperCase() || ""}${lastName[0]?.toUpperCase() || ""}`;
        
        return avatarInitials;

    }
}