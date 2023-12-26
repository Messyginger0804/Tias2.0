



export default function Tile({ data, selected = [], onClick }) {

    return data && data.length ?
        <div className='mt-3 flex flex-wrap items-center gap-1'>
            {
                data.map(dataItem => (
                    <label
                        className="cursor-pointer"
                        key={data.id}
                    >
                        <span
                            className="rounded-lg border border-black px-6 py-2 font-bold">
                            {dataItem.label}
                        </span>
                    </label>
                ))
            }
        </div>
        : null

} 