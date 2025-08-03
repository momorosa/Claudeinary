export default function LoadingMessage({ message }) {
    return(
        <div className="flex item-center gap-10 mt-4">
            <div className="text-black"/>
            <p className="m-0">{ message }</p>
        </div>
    )
}