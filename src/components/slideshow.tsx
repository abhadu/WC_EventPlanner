'use client'
import { Carousel } from "flowbite-react"
import React from "react"

export default function SlideShow({ children, className }: {
    children: Array<React.ReactNode> | React.ReactNode,
    className: string
}) {
    return (
        <div className={className}>
            <Carousel>
                {
                    (Array.isArray(children)) ? children.map((item, index) => {
                        return (
                            <div className="h-full">
                                {item}
                            </div>
                        )
                    }) : <div className="h-full">{children}</div>
                }
            </Carousel>
        </div>
    )
}