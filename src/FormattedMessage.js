const format = (ctx, values) => ctx.parent.$formatMessage(ctx.props, values)
const placeholder = (name) => `@\0@\0${name}\0@\0@`
const placeholderRegex = /@\0@\0(.*?)\0@\0@/g

export default {
    functional: true,

    props: {
        id: {type: String, required: true},
        defaultMessage: String,
        values: Object,
        tagName: {type: String, default: 'span'}
    },

    render (h, ctx) {
        const slots = ctx.slots()
        const slotNames = Object.keys(slots)
        if (slotNames.length === 0) {
            return h(ctx.props.tagName, ctx.data, format(ctx, ctx.props.values))
        }

        const values = Object.assign({}, ctx.props.values)
        slotNames.forEach(slot => {
            values[slot] = placeholder(slot)
        })

        const message = format(ctx, values)

        let match;
        let pos = 0;
        const children = []
        while ((match = placeholderRegex.exec(message)) !== null) {
            children.push(message.substring(pos, match.index), slots[match[1]])
            pos = match.index + match[0].length
        }
        children.push(message.substring(pos))
        return h(ctx.props.tagName, ctx.data, children)
    }
}
