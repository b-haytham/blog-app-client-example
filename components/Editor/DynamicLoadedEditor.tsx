import dynamic from 'next/dynamic'


const DynamicLoadedEditor = dynamic(import('./Editor'), {
    loading: () => <div>..loading</div>,
    ssr: false
})

export default DynamicLoadedEditor
