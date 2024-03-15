export function getAvailableUsers(usernames) {
    usernames.split('\n').filter(username => username.trim() !== '');
    
}