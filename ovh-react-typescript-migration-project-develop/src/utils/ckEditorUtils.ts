export const ckeditorConfig = {
  toolbarGroups: [
    { name: 'styles', groups: ['styles'] },
    { name: 'basicstyles', groups: ['basicstyles', 'cleanup'] },
    { name: 'clipboard', groups: ['clipboard', 'undo'] },
    {
      name: 'paragraph',
      groups: ['blocks', 'list', 'indent', 'align', 'bidi', 'paragraph'],
    },
    {
      name: 'editing',
      groups: ['find', 'selection', 'spellchecker', 'editing'],
    },
    { name: 'links', groups: ['links'] },
    { name: 'insert', groups: ['insert'] },
    { name: 'forms', groups: ['forms'] },
    { name: 'tools', groups: ['tools'] },
    { name: 'document', groups: ['mode', 'document', 'doctools'] },
    { name: 'others', groups: ['others'] },
    { name: 'colors', groups: ['colors'] },
    { name: 'about', groups: ['about'] },
  ],
  format_tags: 'p;h1;h2;h3;h4;h5;h6;pre',
  extraPlugins: 'justify, uploadimage',
  filebrowserUploadMethod: 'form',
  filebrowserUploadUrl: '/uploader/upload',
  removeButtons:
    'Subscript,Superscript,Cut,Paste,Copy,PasteText,PasteFromWord,Scayt,Anchor,HorizontalRule,SpecialChar,Maximize,Source,Strike,Styles,About,Indent,Outdent,Blockquote',
  removeDialogTabs: 'image:Link;image:Upload;image:Advanced',
}
