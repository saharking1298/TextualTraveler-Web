export function processInput (text) {
    // This function splits an input text to command and argument.
    const arr = text.trim().replace(/ +/g, " ").split(" ", 2);
    return {
        command: arr[0],
        argument: arr.length > 1 ? arr[1] : ""
    };
}