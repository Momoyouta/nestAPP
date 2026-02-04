'use client'

export default function Post ({content}: {content:any}) {
    console.log(content)
    return (
        <div>{content.content}</div>
    )
}
