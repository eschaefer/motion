import { MotionProps } from "../types"
import { useGestures } from "../../gestures"
import { FeatureProps, MotionFeature } from "./types"
import { makeRenderlessComponent } from "../utils/make-renderless-component"

export const gestureProps = [
    "onPan",
    "onPanStart",
    "onPanEnd",
    "onPanSessionStart",
    "onTap",
    "onTapStart",
    "onTapCancel",
    "whileTap",
    "whileHover",
    "onHoverStart",
    "onHoverEnd",
]

const GestureComponent = makeRenderlessComponent(
    ({ visualElement, ...props }: FeatureProps) => {
        useGestures(props, visualElement)
    }
)

export const Gestures: MotionFeature = {
    key: "gestures",
    shouldRender: (props: MotionProps) => {
        return gestureProps.some(key => props.hasOwnProperty(key))
    },
    getComponent: () => GestureComponent,
}
