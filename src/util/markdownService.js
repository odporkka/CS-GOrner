import marked from "marked"
import DOMPurify from "dompurify"

const config = {
    ADD_TAGS: ['iframe'],
    ADD_ATTR: ['allowfullscreen', 'allow', 'frameborder']
}

export const markdownToHtml = (markdown) => {
    // Allow iframe embeds from youtube
    DOMPurify.addHook('uponSanitizeElement', (node, data) => {
        if (data.tagName === 'iframe') {
            const src = node.getAttribute('src') || ''
            console.log(src)
            if (!src.startsWith('https://www.youtube.com/embed/')) {
                return node.remove()
            }
        }
    })
    const dirtyHtml = marked(markdown)
    return DOMPurify.sanitize(dirtyHtml, config)
}