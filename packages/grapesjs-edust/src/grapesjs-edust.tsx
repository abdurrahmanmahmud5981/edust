import React, { useRef } from "react"
import { Toaster } from "sonner"
import grapesjs, { Component, Editor } from "@edust/grapesjs"
import GjsEditor, { Canvas, WithEditor } from "@grapesjs/react"
import options from "./options"
import { default as customOnEditor } from "./on-editor"
import { SidebarInset, SidebarProvider } from "@/components/ui"

// import grapesjs css
import "@edust/grapesjs/css/grapes.min.css"
import "./index.css"
import { TopArea } from "./top-area"
import { TooltipProvider } from "@radix-ui/react-tooltip"
import { cn } from "./utils"
import { LeftArea } from "./left-area"
import { RightArea } from "./right-area"
import { useRightPanelContext } from "./context/right-panel"
import { ActivePanel } from "./types"
import { FullSpinner } from "./components/full-spinner"

interface GrapesjsEdustProps {
  onEditor: (editor: Editor) => Promise<void>
  optionsCustomize: (editor: React.MutableRefObject<Editor | null>) => object
}

export const GrapesjsEdust: React.FC<GrapesjsEdustProps> = (props) => {
  const { dispatch } = useRightPanelContext()

  const { onEditor, optionsCustomize } = props
  const editorRef = useRef<Editor | null>(null)

  async function gsOnEditor(editor: Editor) {
    if (!editor) {
      console.error("Editor is not initialized")
      return
    }

    editorRef.current = editor

    editor.on(
      "canvas:drop",
      (_DataTransfer: DataTransfer, model: Component) => {
        dispatch({ type: ActivePanel.SELECTORS })
        editor.select(model)
      },
    )
    editor.on("component:selected", (model: Component) => {
      dispatch({ type: ActivePanel.SELECTORS })
      editor.select(model)
    })

    await onEditor(editor)

    return customOnEditor(editor)
  }

  return (
    <TooltipProvider>
      <Toaster richColors />

      <GjsEditor
        className="gjs-custom-editor"
        // Pass the core GrapesJS library to the wrapper (required).
        // You can also pass the CDN url (eg. "https://unpkg.com/grapesjs")
        grapesjs={grapesjs}
        // Load the GrapesJS CSS file asynchronously from URL.
        // This is an optional prop, you can always import the CSS directly in your JS if you wish.
        options={{ ...options(), ...optionsCustomize(editorRef) }}
        onEditor={gsOnEditor}
        waitReady={<FullSpinner />}
      >
        <TopArea />
        <SidebarProvider
          className={cn(
            "eg-max-h-[calc(100svh-40px)] !eg-min-h-[calc(100svh-40px)]",
          )}
        >
          <div
            className={cn(
              "eg-w-36 eg-border-sidebar-border eg-bg-sidebar eg-text-sidebar-foreground md:eg-w-48 lg:eg-w-52 2xl:eg-w-56",
              "eg-flex eg-flex-col eg-border-r",
            )}
          >
            <LeftArea />
          </div>
          <SidebarInset
            className={cn(
              "eg-max-h-[calc(100svh-40px)] !eg-min-h-[calc(100svh-40px)] eg-bg-slate-100 eg-p-2",
            )}
          >
            <Canvas className="eg-border-transparent" />
          </SidebarInset>
          <div
            className={cn(
              "eg-w-36 eg-border-sidebar-border eg-bg-sidebar eg-text-sidebar-foreground md:eg-w-48 lg:eg-w-52 2xl:eg-w-56",
              "eg-border-l",
            )}
          >
            <WithEditor>
              <RightArea />
            </WithEditor>
          </div>
        </SidebarProvider>
      </GjsEditor>
    </TooltipProvider>
  )
}
