function capitalize(text: string) {
    if (!text) return "";

    return text
        .split(" ")
        .map(word =>
            word ? word.charAt(0).toUpperCase() + word.slice(1) : ""
        )
        .join(" ");
}

export default capitalize;
