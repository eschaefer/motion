import * as React from "react"
import { useContext } from "react"
import { MotionConfigContext } from "../context/MotionConfigContext"
import { VisualElement } from "../../render/VisualElement"
import { MotionProps } from ".."
import { MotionContextProps } from "../context/MotionContext"
import { VisualElementAnimationControls } from "../../animation/VisualElementAnimationControls"
import { MotionFeature } from "./types"

/**
 * Load features via renderless components based on the provided MotionProps
 */
export function useFeatures(
    defaultFeatures: MotionFeature[],
    isStatic: boolean,
    visualElement: VisualElement,
    controls: VisualElementAnimationControls,
    props: MotionProps,
    context: MotionContextProps,
    parentContext: MotionContextProps,
    shouldInheritVariant: boolean
): null | JSX.Element[] {
    const plugins = useContext(MotionConfigContext)

    // If this is a static component, or we're rendering on the server, we don't load
    // any feature components
    if (isStatic || typeof window === "undefined") return null

    const allFeatures = [...defaultFeatures, ...plugins.features]
    const numFeatures = allFeatures.length
    const features: JSX.Element[] = []

    // Decide which features we should render and add them to the returned array
    for (let i = 0; i < numFeatures; i++) {
        const { shouldRender, key, getComponent } = allFeatures[i]

        if (shouldRender(props, parentContext)) {
            const Component = getComponent(props)
            Component &&
                features.push(
                    <Component
                        key={key}
                        {...props}
                        localContext={context}
                        parentContext={parentContext}
                        visualElement={visualElement as any}
                        controls={controls}
                        inherit={shouldInheritVariant}
                    />
                )
        }
    }

    return features
}
