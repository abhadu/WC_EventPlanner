import React from "react";
import MatchCard from "./matchcard";
import SlideShow from "./slideshow";

export default function Slider({ children, slotSize }: {
    children: React.ReactNode | Array<React.ReactNode>
    slotSize: number
}) {
    const _children = Array.isArray(children) ? children : [children]
    const arrOfArrBySlotSize = []

    for (let i = 0; i < _children.length; i += slotSize)
        arrOfArrBySlotSize.push(_children.slice(i, i + slotSize))

    return (
        <div className="w-full bg-[#363969] py-4 rounded">
            <SlideShow className="relative h-36 overflow-hidden rounded-lg md:h-96">
                {
                    arrOfArrBySlotSize.map(arr => {
                        return (
                            <div className=" flex flex-row justify-around items-center w-full h-full">
                                {
                                    arr.map(item => {
                                        return item
                                    })
                                }
                            </div>
                        )
                    })
                }
            </SlideShow>
        </div>
    )
}