import marked from "marked"
import DOMPurify from "dompurify"


export const markdownToHtml = (markdown) => {
    const dirtyHtml = marked(markdown)
    return DOMPurify.sanitize(dirtyHtml)
}