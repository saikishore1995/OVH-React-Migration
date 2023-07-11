import { ContentState, EditorState, convertToRaw } from 'draft-js'
import React, { useState } from 'react'

import { Editor } from 'react-draft-wysiwyg'
import { TextEditorProps } from '../../types/commonTypes'
import draftToHtml from 'draftjs-to-html'
import htmlToDraft from 'html-to-draftjs'

export const OTextEditor = ({
  value,
  setFieldValue,
}: TextEditorProps): JSX.Element => {
  const prepareDraft = (value: string) => {
    const draft = htmlToDraft(value)
    const contentState = ContentState.createFromBlockArray(draft.contentBlocks)
    const editorState = EditorState.createWithContent(contentState)
    return editorState
  }

  const [editorState, setEditorState] = useState(
    value ? prepareDraft(value) : EditorState.createEmpty(),
  )

  const onEditorStateChange = (editorState: EditorState) => {
    const forFormik = draftToHtml(convertToRaw(editorState.getCurrentContent()))
    setFieldValue(forFormik)
    setEditorState(editorState)
  }
  return (
    <div>
      <Editor
        editorState={editorState}
        wrapperClassName="custom-wrapper"
        editorClassName="custom-editor"
        onEditorStateChange={onEditorStateChange}
      />
    </div>
  )
}
