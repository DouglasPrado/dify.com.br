//https://github.com/ueberdosis/tiptap-templates/blob/main/templates/next-block-editor-app/src/extensions/TableOfContentsNode/TableOfContentsNode.tsx
import { TableOfContents } from '@/components/global/table-of-content'
import { Node, NodeViewRendererProps } from '@tiptap/core'
import { NodeViewWrapper, ReactNodeViewRenderer } from '@tiptap/react'

const TableOfNodeContent = (props: NodeViewRendererProps) => {
  const { editor } = props

  return (
    <NodeViewWrapper>
      <div className="p-2 -m-2 rounded-lg" contentEditable={true}>
        <TableOfContents editor={editor} />
      </div>
    </NodeViewWrapper>
  )
}

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    tableOfContentsNode: {
      insertTableOfContents: () => ReturnType
    }
  }
}

export const TableOfContentsNode = Node.create({
  name: 'tableOfContentsNode',
  group: 'block',
  atom: true,
  selectable: true,
  draggable: true,
  inline: false,
  parseHTML() {
    return [
      {
        tag: 'div[data-type="table-of-content"]',
      },
    ]
  },

  renderHTML({ HTMLAttributes }) {
    return ['div', { ...HTMLAttributes, 'data-type': 'table-of-content' }]
  },

  renderText(){
    return "[[TABLEOFNODECONTENT]]"
  },

  addNodeView() {
    return ReactNodeViewRenderer(TableOfNodeContent)
  },

  addCommands() {
    return {
      insertTableOfContents:
        () =>
        ({ commands }) => {
          return commands.insertContent({
            type: this.name, 
            code: `<TableOfContentsNode />`
          })
        },
    }
  },
})